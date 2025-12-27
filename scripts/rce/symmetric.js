const nacl = require("tweetnacl");
const naclUtil = require("tweetnacl-util");

const keyPair = nacl.box.keyPair();
console.log(
  "Public Key (safe to embed in app):",
  naclUtil.encodeBase64(keyPair.publicKey)
);
console.log(
  "Secret Key (KEEP PRIVATE, only on your server):",
  naclUtil.encodeBase64(keyPair.secretKey)
);
