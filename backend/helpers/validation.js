/* create a form with regex to validate email-adresses, part one(can include a-z & numbers), part two(@), 
part three(can include a-z & numbers), part four (can include a-z, min 2 or max 12 characters),
part five(.), part six(can include a-z & numbers), part four (can include a-z, min 2 or max 12 characters))  */

const User = require("../models/User");

exports.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};

exports.validateLength = (text, min, max) => {
  return text.length < min || text.length > max ? false : true;
};

exports.validateUsername = async (username) => {
  let a = false;
  do {
    let check = await User.findOne({ username });
    if (check) {
      username += (+new Date() * Math.random()).toString().substring(0, 2);
      a = true;
    } else {
      a = false;
    }
  } while (a);

  return username;
};
