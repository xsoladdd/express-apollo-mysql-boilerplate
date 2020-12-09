import crypto from "crypto";

export const encrypt = function (toEncrypt) {
  const algorithm = "aes-256-cbc";
  // TODO Assure that there is an encryption key
  const password = process.env.ENCRYPTION_KEY;
  let key = crypto
    .createHash("md5")
    .update(password, "utf-8")
    .digest("hex")
    .toUpperCase();

  let iv = new Buffer.alloc(16);
  console.log(toEncrypt);
  let encrypt = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = encrypt.update(`${toEncrypt}`, "utf8", "hex");
  encrypted += encrypt.final("hex");
  return encrypted;
};

export const encryptIds = function (args) {
  if (args && typeof args == "object") {
    for (const prop in args) {
      if (typeof args[prop] == "object") {
        encryptIds(args[prop]);
      } else {
        const pattern = /(?:^id$|_id$)/gm;

        if (pattern.test(prop)) args[prop] = encrypt(args[prop]);
      }
    }
  }

  return args;
};

export const encryptSha1 = function (source) {
  const hmac = crypto.createHmac("sha1", process.env.GCHECK_SECRET_KEY);

  hmac.update(source);
  return hmac.digest("hex");
};

export const verifySha1 = function (token, source) {
  return token === encryptSha1(source);
};
