const { Router } = require("express");
const { pbkdf2 } = require("crypto");
const { promisify } = require("util");
const { readFile, writeFile } = require("fs/promises");
const path = require("path");

// # Promisify the method to easily handle it (avoiding callback)
const promisifiedPBKDF2 = promisify(pbkdf2);

// # keep it in your env file. These are our secret
const salt = "my-secret-password";
// # end

const app = Router();

/**
 * #### We will use `pbkdf2 (Password-Based Key Derivation Function 2 )` encryption to encrypt the password, it used HMAC based encryption internally. But remember it's a very CPU intensive process.
 
 * ##### This is one way process
 
 *  -----
 *
 * ### Wanna know why `pbkdf2` is used and how to optimize it when million of user register or login? Let me tell you on Linkedin
 */
async function encrypt(password) {
  const encryptedPassword = await promisifiedPBKDF2(
    password,
    salt,
    10,
    64,
    "sha512"
  );
  return encryptedPassword.toString("hex");
}

/**
 * Search user in our local `JSON` file
 * @param {string} email
 * @returns
 */
async function getUser(email) {
  const rawDB = await readFile(path.join(__dirname, "user.json"));
  const parseDB = JSON.parse(rawDB);

  const userFound = parseDB.find((el) => el.email === email);
  return {
    users: parseDB,
    searchedUser: userFound,
  };
}

/**
 * # Registration route
 * POST http://localhost:3000/encryption/register
 * {
 *  "email": "user@test.com",
 *  "password": "test"
 *  }
 */
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw Error("Invalid data.");
    }

    const { users, searchedUser } = await getUser(email);
    if (searchedUser) {
      throw Error("User already present");
    }

    const hashedPassword = await encrypt(password);
    await writeFile(
      path.join(__dirname, "user.json"),
      JSON.stringify([...users, { email, password: hashedPassword }])
    );

    res.json({ message: "User created successfully.", email });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

/**
 * # Log in route
 * POST http://localhost:3000/encryption/login
 * {
 *  "email": "user@test.com",
 *  "password": "test"
 * }
 */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw Error("Invalid data.");
    }

    const { searchedUser } = await getUser(email);
    if (!searchedUser) {
      throw Error("User not found");
    }
    const hashedPassword = await encrypt(password);
    if (hashedPassword !== searchedUser.password) {
      throw Error("Credential not match");
    }

    res.json({ message: "User logged in successfully.", email });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = app;
