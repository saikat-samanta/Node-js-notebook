# Crypto

Node.js `crypto` module provides cryptographic functionality, including a set of cryptographic hash functions, a way to create cryptographic digests, and other cryptographic operations. It is commonly used for creating secure applications and handling sensitive information.

## Key concept

- **Plaintext**: The original, readable data that is to be protected.
- **Ciphertext**: The result of the encryption process, which appears as a random and unreadable sequence of characters.
- **Encryption Key**: The secret parameter or algorithm used to perform the encryption. Knowledge of this key is required to decrypt the data.

## Symmetric vs. Asymmetric Encryption

- **Symmetric Encryption**: Uses a single secret key for both encryption and decryption. Common algorithms include AES (Advanced Encryption Standard) and DES (Data Encryption Standard).
- **Asymmetric Encryption**: Uses a pair of public and private keys. The public key is used for encryption, and the private key is used for decryption. Common algorithms include RSA (Rivest–Shamir–Adleman) and ECC (Elliptic Curve Cryptography).

## Symmetric-Key Encryption Algorithms

In symmetric-key encryption, the same key is used for both encryption and decryption. Both communicating parties must possess the shared secret key.

1. **Advanced Encryption Standard (AES):** A widely used symmetric encryption algorithm standardized by the National Institute of Standards and Technology (NIST). AES supports key lengths of 128, 192, and 256 bits.

2. **Data Encryption Standard (DES):** One of the earliest widely adopted symmetric encryption algorithms. However, due to its small key size (56 bits), DES is considered insecure and has largely been replaced by more robust algorithms.

3. **Triple DES (3DES):** An extension of DES that applies the DES algorithm three times to each data block, increasing the key size and providing improved security compared to DES.

4. **Blowfish:** A symmetric-key block cipher that uses variable-length keys. It is known for its simplicity and flexibility.

## Asymmetric-Key Encryption Algorithms

In asymmetric-key encryption, a pair of keys is used: a public key for encryption and a private key for decryption. Messages encrypted with the public key can only be decrypted by the corresponding private key, and vice versa.

1. **RSA (Rivest–Shamir–Adleman):** A widely used asymmetric encryption algorithm for secure data transmission. RSA is based on the mathematical properties of large prime numbers.

2. **Elliptic Curve Cryptography (ECC):** A family of asymmetric algorithms that use the mathematics of elliptic curves. ECC provides strong security with shorter key lengths compared to RSA.

3. **Diffie-Hellman Key Exchange:** Although not an encryption algorithm itself, Diffie-Hellman is a key exchange protocol used to securely share secret keys between parties over an insecure channel. It is often used in conjunction with symmetric-key algorithms.

## Hybrid Cryptosystems

Many modern cryptographic systems use a combination of symmetric and asymmetric encryption in a hybrid approach to leverage the strengths of both types of algorithms. For example, a public-key algorithm may be used for secure key exchange, and a symmetric-key algorithm may be used for the actual data encryption.

## Hashing

The `createHash(algorithm)` method is used to create a hash object for a specified algorithm (e.g., MD5, SHA-256).

```js
// # Import the 'crypto' module
const crypto = require("crypto");

// # This line creates a hash object using the SHA-256 algorithm. The createHash method takes the hash algorithm ('sha256' in this case) as an argument and returns a hash object.
const hash = crypto.createHash("sha256");

// # This line updates the hash object with the message 'Hello, world!'. The update method is used to feed data into the hash algorithm.
hash.update("Hello, world!");

// # This line finalizes the hash and obtains the result in hexadecimal format using the digest method. The argument 'hex' specifies the output format.
const hashedMessage = hash.digest("hex");

// # Print the hashed message to the console. The hashed value is a fixed-size string (in this case, 64 characters for SHA-256) that uniquely represents the input message.
console.log("Hashed Message:", hashedMessage);
```

## HMAC (Hash-based Message Authentication Code)

The `createHmac(algorithm, key)` method is used to create an HMAC object.

```js
// # Import the 'crypto' module
const crypto = require("crypto");

// Define the secret key and data
const secretKey = "mySecretKey";
const data = "Hello, HMAC!";

// # This line creates an HMAC object using the SHA-256 hash algorithm. The `createHmac` method takes two parameters: the hash algorithm ('sha256' in this case) and a secret key.
const hmac = crypto.createHmac("sha256", secretKey);

// # This line updates the HMAC object with the data. The `update` method is used to feed data into the HMAC algorithm.
hmac.update(data);

// # This line finalizes the HMAC and obtains the result in hexadecimal format using the `digest` method. The argument 'hex' specifies the output format.
const hmacResult = hmac.digest("hex");

// # Calculated HMAC is printed to the console. The HMAC is a fixed-size string (in this case, 64 characters for SHA-256) that serves as a unique authentication code for the given message and key.
console.log("HMAC:", hmacResult);
```

## HMAC Verification

Compares a calculated HMAC (Hash-based Message Authentication Code) with an original HMAC to determine if they match. It also uses crypto.timingSafeEqual to perform a constant-time comparison, which helps prevent certain timing-based attacks.

```js
// # Import the 'crypto' module
const crypto = require("crypto");

// # Define the secret key and data
const secretKey = "mySecretKey";
const data = "Hello, HMAC!";

// # Original HMAC we have
const originalHMAC =
  "4f3fb8e1a96e476b3e6b1a3e0cd9a7e78b3a9bb47f61b516d63293baded33269";

/**
 * Calculate the HMAC for the given data using the secret key
 * ########### Same As Above example ###########
 */
const hmac = crypto.createHmac("sha256", secretKey).update(data).digest("hex");

// # Perform a constant-time comparison of the calculated HMAC and the original HMAC
const isHMACValid = crypto.timingSafeEqual(
  Buffer.from(hmac, "hex"),
  Buffer.from(originalHMAC, "hex")
);

// # Print whether the HMAC is valid or not
console.log("HMAC Valid:", isHMACValid);
```

## Symmetric Encryption/Decryption

### Cipher

The Cipher class is used for symmetric encryption.

```js
/**
 * A secret key, also known as a symmetric key or private key, is a piece of information used in symmetric-key cryptography to both encrypt and decrypt data. In symmetric-key cryptography, the same key is used for both the encryption and decryption processes. This key must be kept confidential between the parties involved in secure communication.
 *
 * The key length depends on the algorithm, for example:
 * aes128 corresponds to 16 bytes
 * aes192 corresponds to 24 bytes
 * aes256 corresponds to 32 bytes
 */
const secretKey = crypto
  .createHash("sha256")
  .update("MySecretKey")
  .digest("base64")
  .slice(0, 32);

/**
 * An Initialization Vector (IV) is a random or semi-random value that is used as an additional input to cryptographic algorithms, particularly symmetric key encryption algorithms like AES (Advanced Encryption Standard) in modes such as CBC (Cipher Block Chaining). The purpose of an IV is to ensure that the same plaintext, when encrypted multiple times, does not produce the same ciphertext every time.
 */
const initializationVector = crypto.randomBytes(16);

// # We choose the `AES-256-CBC` encryption algorithm.
const algorithm = "aes-256-cbc";

const plaintextMessage = "Hello, encryption!";

// # Create a Cipher object with the specified algorithm and IV
const cipher = crypto.createCipheriv(
  algorithm,
  secretKey,
  initializationVector
);

// # Update the cipher with the plaintext message
let encryptedMessage = cipher.update(plaintextMessage, "utf-8", "hex");

// # Finalize the cipher to get the remaining encrypted data
encryptedMessage += cipher.final("hex");

console.log(`'${plaintextMessage}' Encrypted To:`, encryptedMessage);
```

### Decipher

The Decipher class is used for symmetric decryption.

```js
// ############ Encrypt the message same as above ############# //

const secretKey = crypto.createSecretKey(crypto.randomBytes(32));

const initializationVector = crypto.randomBytes(16);

const algorithm = "aes-256-cbc";

const plaintextMessage = "Hello, encryption!";

const cipher = crypto.createCipheriv(
  algorithm,
  secretKey,
  initializationVector
);

let encryptedMessage = cipher.update(plaintextMessage, "utf-8", "hex");

encryptedMessage += cipher.final("hex");

// ############ End of Encryption ############# //

/**
 * This line creates a Decipher object using the `AES-256-CBC` encryption algorithm. The `createDecipher` method takes two parameters: the encryption algorithm ('aes-256-cbc') and the secret key.
 */
const decipher = crypto.createDecipheriv(
  "aes-256-cbc",
  secretKey,
  initializationVector
);

/**
 * This line updates the Decipher object with the encrypted data. The `update` method takes the `encrypted` data (in hexadecimal format, as specified by 'hex') and the input encoding ('utf-8'). The `final` method is then called to obtain the final decrypted data with the specified output encoding ('utf-8').
 */
const decrypted =
  decipher.update(encryptedMessage, "hex", "utf-8") + decipher.final("utf-8");

/* The decrypted data is printed to the console */
console.log("Decrypted Data:", decrypted);
```

## DiffieHellmanGroup class

Generate public and private keys using the Diffie-Hellman (DH) key exchange algorithm.

```js
// # Import the 'crypto' module
const crypto = require("crypto");

// # Create a Diffie-Hellman object with a 2048-bit key length
const diffieHellman = crypto.createDiffieHellman(2048); // 2048-bit key length

// # This line generates a new pair of public and private keys using `createDiffieHellman` method.
diffieHellman.generateKeys();

// # These lines retrieve the `public` in hexadecimal format using the `getPublicKey` methods.
const publicKey = ecdh.getPublicKey("hex");

// # These lines retrieve the `private` in hexadecimal format using the `getPrivateKey` methods.
const privateKey = ecdh.getPrivateKey("hex");

// # Print the generated public and private keys to the console
console.log("Public Key:", publicKey);
console.log("Private Key:", privateKey);
```

## DiffieHellmanGroup Key Exchange

Diffie-Hellman key exchange algorithm, used to securely exchange cryptographic keys over an insecure channel. The Diffie-Hellman algorithm is not specified with a specific "group" in the sense of a pre-defined group of parameters, but it often involves the use of specific parameters, sometimes referred to as a "group."

In the context of Diffie-Hellman, a prime modulus `p` and a generator `g` are typically chosen. The pair (p,g) forms the group parameters. These parameters are shared between the communicating parties.

```js
// Import the 'crypto' module
const crypto = require("crypto");

// Alice generates her private and public keys
const alice = crypto.createDiffieHellman(2048); // 2048-bit key length
const alicePublicKey = alice.generateKeys();

// Bob generates his private and public keys
const bob = crypto.createDiffieHellman(alice.getPrime(), alice.getGenerator());
const bobPublicKey = bob.generateKeys();

// Alice and Bob exchange public keys
const aliceSecret = alice.computeSecret(bobPublicKey);
const bobSecret = bob.computeSecret(alicePublicKey);

// Both Alice and Bob now have the same shared secret
console.log(
  "Shared Secret:",
  aliceSecret.toString("hex") === bobSecret.toString("hex")
);
```

Here,

- Alice and Bob generate their private and public keys using the crypto.`createDiffieHellman` method.
- They exchange public keys.
- Each party computes the `shared secret` using the other party's `public key` and their own private key with the `computeSecret` method.
- Both parties end up with the same `shared secret`.

The 2048 in `crypto.createDiffieHellman(2048)` represents the desired key length. Different key lengths can be chosen based on security requirements.

## ECDH Class

Generate public and private keys using the Elliptic Curve Diffie-Hellman (ECDH) key exchange algorithm with the secp256k1 elliptic curve.

```js
// # Import the 'crypto' module
const crypto = require("crypto");

// # This line creates an ECDH (Elliptic Curve Diffie-Hellman) object with the specified elliptic curve, in this case, 'secp256k1'. The secp256k1 curve is commonly used in cryptographic applications, particularly in the context of Bitcoin.
const ecdh = crypto.createECDH("secp256k1");

// # This line generates a new pair of public and private keys using the ECDH algorithm with the specified elliptic curve.
ecdh.generateKeys();

// # These lines retrieve the `public` in hexadecimal format using the `getPublicKey` methods.
const publicKey = ecdh.getPublicKey("hex");

// # These lines retrieve the `private` in hexadecimal format using the `getPrivateKey` methods.
const privateKey = ecdh.getPrivateKey("hex");

// # Print the generated public and private keys to the console
console.log("Public Key:", publicKey);
console.log("Private Key:", privateKey);
```

## ECDH Key Exchange

Elliptic Curve Diffie-Hellman (ECDH) key exchange between two entities, Alice and Bob, using the secp256k1 elliptic curve.

```js
// # Import the 'crypto' module
const crypto = require("crypto");

// # These lines create ECDH objects for Alice using the 'secp256k1' elliptic curve.
const alice = crypto.createECDH("secp256k1");
// # These methods generate public and private key pairs for Alice.
const aliceKeys = alice.generateKeys();

// # These lines create ECDH objects for bob using the 'secp256k1' elliptic curve.
const bob = crypto.createECDH("secp256k1");
// # These methods generate public and private key pairs for bob.
const bobKeys = bob.generateKeys();

// # Alice computes a shared secret using Bob's public key in hexadecimal format.
const sharedSecretAlice = alice.computeSecret(bobKeys, "hex", "hex");
// # Bob computes a shared secret using Alice's public key in hexadecimal format.
const sharedSecretBob = bob.computeSecret(aliceKeys, "hex", "hex");

// # Print the shared secrets for Alice and Bob and they are equal
console.log("Shared Secret (Alice):", sharedSecretAlice);
console.log("Shared Secret (Bob):", sharedSecretBob);
```

## Sign and Verify Classes

The `Sign` and `Verify` classes are used for signing and verifying data.

```js
// # Import the 'crypto' module
const crypto = require("crypto");

// # This line generates an RSA key pair synchronously. The key pair consists of a private key (privateKey) and a public key (publicKey). The modulus length is set to 2048 bits, and the keys are encoded in PEM format.
const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

// # This line creates a sign object with the SHA-256 algorithm.
const sign = crypto.createSign("SHA256");
// # This updates the sign object with the data to be signed.
sign.update("Data to Sign");

// # This signs the data using the private key and outputs the signature in hexadecimal format.
const signature = sign.sign(privateKey, "hex");
console.log("Signature:", signature);

// # This line creates a verify object with the SHA-256 algorithm.
const verify = crypto.createVerify("SHA256");
// # This updates the verify object with the same data that was signed.
verify.update("Data to Sign");

// # This verifies the signature using the public key and returns a boolean indicating whether the signature is valid.
const isVerified = verify.verify(publicKey, signature, "hex");
console.log("Verification Result:", isVerified);
```
