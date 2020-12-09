import crypto from "crypto";

export const decrypt = function (toDecrypt) {
  try {
    const algorithm = "aes-256-cbc";
    const password = process.env.ENCRYPTION_KEY;
    let key = crypto
      .createHash("md5")
      .update(password, "utf-8")
      .digest("hex")
      .toUpperCase();

    let iv = new Buffer.alloc(16);

    let decrypt = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decrypt.update(toDecrypt, "hex", "utf8");
    decrypted += decrypt.final("utf8");
    return decrypted;
  } catch (err) {
    return false;
  }
};

export const decryptIds = function (args) {
  if (args && typeof args == "object") {
    for (const prop in args) {
      if (typeof args[prop] == "object") {
        decryptIds(args[prop]);
      } else {
        const pattern = /(?:^id$|_id$)/gm;

        if (pattern.test(prop)) args[prop] = decrypt(args[prop]);
      }
    }
  }

  return args;
};
