const crypto = require("node:crypto");

/**
 * 1. Classes:
- Certificate:
Methods for exporting challenge and public key from a Simple Public Key Certificate (SPKAC).
Verification of SPKAC.
- Cipher and Decipher:
Classes for symmetric encryption and decryption.
Methods include update for processing input data and final for obtaining the final output.
Additional methods for setting options, getting the authentication tag, and more.
- DiffieHellman, DiffieHellmanGroup, and ECDH:
Classes for Diffie-Hellman key exchange.
Methods for computing secrets, generating keys, and setting/getting public and private keys.
- Hash:
Class for creating hash digests.
Methods include update for adding data to the hash, digest for obtaining the hash value, and copy for copying the hash object.
- Hmac:
Class for creating Hash-based Message Authentication Codes (HMAC).
Methods include update for processing input data and digest for obtaining the HMAC value.
- KeyObject:
Class representing cryptographic keys.
Methods for exporting key details, checking key equality, and more.
- Sign and Verify:
Classes for signing and verifying data using asymmetric algorithms.
Methods include update for processing data and sign or verify for obtaining the signature or verifying it.
- X509Certificate:
Class representing X.509 certificates.
Methods and properties for various certificate details and operations.
2. Other Methods and Properties:
- constants:
Constants for cryptographic algorithms and operations.
- fips:
Property indicating whether the Node.js instance has FIPS (Federal Information Processing Standards) mode enabled.
- Various Methods:
Methods for key generation, prime checking, random number generation, and more.
3. Notes:
- Using Strings:
Some methods support encoding options, allowing input and output in different encodings.
- Legacy Streams API:
Prior to Node.js 0.10, there was support for a legacy streams API.
- Weak or Compromised Algorithms:
Some algorithms might be weak or compromised and should be used with caution.
- FIPS Mode:
Node.js can operate in FIPS mode to comply with cryptographic standards.
- OpenSSL Options:
Some methods accept options related to OpenSSL.
- WebCrypto:
The webcrypto property provides access to Web Cryptography API functionality when available.
- Timing-Safe Equality:
The timingSafeEqual method performs a timing-safe comparison for security purposes.
4. Crypto Constants:
- OpenSSL Constants:
Constants related to OpenSSL.
- Other OpenSSL Constants:
Additional constants for cryptographic operations.
5. Node.js Crypto Constants:
- Crypto Constants:
Constants specific to Node.js crypto operations.
 */

// // # Hashes
// const secret = "abcdefg";
// const hash = crypto
//   .createHmac("sha256", secret)
//   .update("I love cupcakes")
//   .digest("hex");

// console.log(hash);

// // # HMAC (Hash-based Message Authentication Code)

// const myHMACSecretKey = "mySecretKey";
// const data = "Hello, HMAC!";

// const hmac = crypto.createHmac("sha256", myHMACSecretKey);

// hmac.update(data);

// const hmacResult = hmac.digest("hex");

// console.log("HMAC:", hmacResult);

// // # HMAC verifying
// const originalHMAC =
//   "4f3fb8e1a96e476b3e6b1a3e0cd9a7e78b3a9bb47f61b516d63293baded33269";

// const isHMACValid = crypto.timingSafeEqual(
//   Buffer.from(hmacResult, "hex"),
//   Buffer.from(originalHMAC, "hex")
// );

// console.log("HMAC Valid:", isHMACValid);

// // # Cipher

// const secretKey = crypto.createSecretKey(crypto.randomBytes(32));

// const initializationVector = crypto.randomBytes(16);

// const algorithm = "aes-256-cbc";

// const plaintextMessage = "Hello, encryption!";

// const cipher = crypto.createCipheriv(
//   algorithm,
//   secretKey,
//   initializationVector
// );

// let encryptedMessage = cipher.update(plaintextMessage, "utf-8", "hex");

// encryptedMessage += cipher.final("hex");

// console.log(`'${plaintextMessage}' Encrypted To:`, encryptedMessage);

// // # Decipher

// const decipher = crypto.createDecipheriv(
//   "aes-256-cbc",
//   secretKey,
//   initializationVector
// );
// const decrypted =
//   decipher.update(encryptedMessage, "hex", "utf-8") + decipher.final("utf-8");
// console.log("Decrypted Data:", decrypted);

// // # DiffieHellmanGroup Class

// // # Create a Diffie-Hellman object with a 2048-bit key length
// const diffieHellman = crypto.createDiffieHellman(2048); // 2048-bit key length

// // # This line generates a new pair of public and private keys using `createDiffieHellman` method.
// diffieHellman.generateKeys();

// // # These lines retrieve the `public` in hexadecimal format using the `getPublicKey` methods.
// const publicKey = ecdh.getPublicKey("hex");

// // # These lines retrieve the `private` in hexadecimal format using the `getPrivateKey` methods.
// const privateKey = ecdh.getPrivateKey("hex");

// // # Print the generated public and private keys to the console
// console.log("Public Key:", publicKey);
// console.log("Private Key:", privateKey);

// // # ## DiffieHellmanGroup Key Exchange

// // Alice generates her private and public keys
// const alice = crypto.createDiffieHellman(2048); // 2048-bit key length
// const alicePublicKey = alice.generateKeys();

// // Bob generates his private and public keys
// const bob = crypto.createDiffieHellman(alice.getPrime(), alice.getGenerator());
// const bobPublicKey = bob.generateKeys();

// // Alice and Bob exchange public keys
// const aliceSecret = alice.computeSecret(bobPublicKey);
// const bobSecret = bob.computeSecret(alicePublicKey);

// // Both Alice and Bob now have the same shared secret
// console.log(
//   "Shared Secret:",
//   aliceSecret.toString("hex") === bobSecret.toString("hex")
// );

// // # ECDH Class

// // This line creates an ECDH (Elliptic Curve Diffie-Hellman) object with the specified elliptic curve, in this case, 'secp256k1'. The secp256k1 curve is commonly used in cryptographic applications, particularly in the context of Bitcoin.
// const ecdh = crypto.createECDH("secp256k1");

// // This line generates a new pair of public and private keys using the ECDH algorithm with the specified elliptic curve.
// ecdh.generateKeys();

// // These lines retrieve the `public` in hexadecimal format using the `getPublicKey` methods.
// const publicKey = ecdh.getPublicKey("hex");

// // These lines retrieve the `private` in hexadecimal format using the `getPrivateKey` methods.
// const privateKey = ecdh.getPrivateKey("hex");

// // Print the generated public and private keys to the console
// console.log("Public Key:", publicKey);
// console.log("Private Key:", privateKey);

// // # ECDH Key Exchange with Named Curves

// const alice = crypto.createECDH("secp256k1");
// const aliceKeys = alice.generateKeys();

// const bob = crypto.createECDH("secp256k1");
// const bobKeys = bob.generateKeys();

// const sharedSecretAlice = alice.computeSecret(bobKeys, "hex", "hex");
// const sharedSecretBob = bob.computeSecret(aliceKeys, "hex", "hex");

// console.log("Shared Secret (Alice):", sharedSecretAlice);
// console.log("Shared Secret (Bob):", sharedSecretBob);

// // # Sign and Verify Classes

// // # This line generates an RSA key pair synchronously. The key pair consists of a private key (privateKey) and a public key (publicKey). The modulus length is set to 2048 bits, and the keys are encoded in PEM format.
// const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
//   modulusLength: 2048,
//   publicKeyEncoding: { type: "spki", format: "pem" },
//   privateKeyEncoding: { type: "pkcs8", format: "pem" },
// });

// // # This line creates a sign object with the SHA-256 algorithm.
// const sign = crypto.createSign("SHA256");
// // # This updates the sign object with the data to be signed.
// sign.update("Data to Sign");

// // # This signs the data using the private key and outputs the signature in hexadecimal format.
// const signature = sign.sign(privateKey, "hex");
// console.log("Signature:", signature);

// // # This line creates a verify object with the SHA-256 algorithm.
// const verify = crypto.createVerify("SHA256");
// // # This updates the verify object with the same data that was signed.
// verify.update("Data to Sign");

// // # This verifies the signature using the public key and returns a boolean indicating whether the signature is valid.
// const isVerified = verify.verify(publicKey, signature, "hex");
// console.log("Verification Result:", isVerified);

// # Decipher by tag

// Generate a random key and IV for AES-GCM
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// Create an AES-GCM cipher with the generated key and IV
const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

// Define the plaintext message
const plaintext = "Hello, AES-GCM!";

// Update the cipher with the plaintext
const encrypted = Buffer.concat([
  cipher.update(plaintext, "utf-8"),
  cipher.final(),
]);

// Get the authentication tag
const tag = cipher.getAuthTag();

// Display the encrypted data and authentication tag
console.log("Encrypted Data:", encrypted.toString("hex"));
console.log("Authentication Tag:", tag.toString("hex"));

// Create a decipher with the same key, IV, and authentication tag
const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
decipher.setAuthTag(tag);

// Update the decipher with the encrypted data
const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

// Display the decrypted plaintext
console.log("Decrypted Data:", decrypted.toString("utf-8"));
