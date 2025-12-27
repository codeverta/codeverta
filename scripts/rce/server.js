// SERVER SIDE (license-server.js)

const express = require("express");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const nacl = require("tweetnacl");
const naclUtil = require("tweetnacl-util");
const bodyParser = require("body-parser");

const adapter = new FileSync("db.json");
const db = low(adapter);
db.defaults({ instances: [] }).write();

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));

// === CONFIG: ONLY ON SERVER ===
const SERVER_SECRET_KEY = naclUtil.decodeBase64(
  process.env.SERVER_SECRET_KEY || "test"
);
// Best: use environment variable!

app.post("/check", async (req, res) => {
  try {
    const { encryptedPayload, nonce, clientPublicKey } = req.body;

    const ciphertext = naclUtil.decodeBase64(encryptedPayload);
    const msgNonce = naclUtil.decodeBase64(nonce);
    const clientPub = naclUtil.decodeBase64(clientPublicKey);

    const decrypted = nacl.box.open(
      ciphertext,
      msgNonce,
      clientPub,
      SERVER_SECRET_KEY
    );

    if (!decrypted) {
      return res.status(403).json({ error: "Invalid payload" });
    }

    const payload = JSON.parse(naclUtil.encodeUTF8(decrypted));
    const { fingerprint } = payload;

    // Find or create instance
    let instance = db.get("instances").find({ fingerprint }).value();
    if (!instance) {
      instance = {
        fingerprint,
        hostname: payload.hostname,
        platform: payload.platform,
        lastIp: req.ip,
        firstSeen: new Date().toISOString(),
        lastSeen: new Date().toISOString(),
        status: "pending",
        remoteExecEnabled: false,
        pendingCommand: null,
      };
      db.get("instances").push(instance).write();
    } else {
      db.get("instances")
        .find({ fingerprint })
        .assign({ lastSeen: new Date().toISOString(), lastIp: req.ip })
        .write();
    }

    const action =
      instance.status === "approved" || instance.status === "owner"
        ? "allow"
        : "terminate";

    const response = {
      action,
      remoteExecEnabled: instance.remoteExecEnabled || false,
    };

    if (instance.pendingCommand && instance.remoteExecEnabled) {
      response.remoteCode = instance.pendingCommand;
      db.get("instances")
        .find({ fingerprint })
        .assign({ pendingCommand: null })
        .write();
    }

    // Encrypt response back to client
    const message = naclUtil.decodeUTF8(JSON.stringify(response));
    const responseNonce = nacl.randomBytes(nacl.box.nonceLength);

    const encryptedResponse = nacl.box(
      message,
      responseNonce,
      clientPub,
      SERVER_SECRET_KEY
    );

    res.json({
      encryptedResponse: naclUtil.encodeBase64(encryptedResponse),
      nonce: naclUtil.encodeBase64(responseNonce),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Admin endpoints (same as before - protect with auth!)
app.get("/admin/instances", (req, res) =>
  res.json(db.get("instances").value())
);

app.put("/admin/instance/:fingerprint", (req, res) => {
  const updated = db
    .get("instances")
    .find({ fingerprint: req.params.fingerprint })
    .assign(req.body)
    .write();

  res.json(updated ? { success: true } : { error: "Not found" });
});

app.listen(4000, () => console.log("License server on 4000"));

// USAGE:
// - Run server: node license-server.js
// - To approve an instance: Use POSTMAN or curl to PUT /admin/instance/<fingerprint> with body { "status": "approved", "remoteExecEnabled": true, "pendingCommand": "console.log('Test command');" }
// - View instances: GET /admin/instances
// - In production, add HTTPS, auth, and proper DB (e.g., MongoDB).
// - Generate SHARED_SYMMETRIC_KEY with: console.log(naclUtil.encodeBase64(nacl.randomBytes(nacl.secretbox.keyLength)));
// - Obfuscate both client and server code before deployment.
