const moment = require("moment");

exports.now = () => {
  return moment(new Date()).format();
};

exports.SQLDatetime = () => {
  return moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
};
