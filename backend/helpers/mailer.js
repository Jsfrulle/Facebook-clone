const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";
const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  oauth_link
);

exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken
    }
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Facebook email verification",
    html: `<div style="max-width:700px;margin-bottom:1.5rem;display:flex;align-items:center;gap:15px;font-family:'Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif;font-weight:600;color:#3b5998;"><img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png" alt="icon Facebook logo" style="width:30px"><span>Activate your facebook account</span></div><div style="max-width:900px;margin-bottom:1.2rem;font-family:'Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif;font-size:1.1rem;font-weight:530"><span>Hello ${name}</span><p>You recently created an account on Facebook. To complete your registration, please comfirm your account.</p></div><a href=${url} style="max-width:200px;margin-bottom:1.5rem;padding:.7rem;display:flex;text-decoration:none;justify-content:center;align-items:center;font-family:'Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif;font-weight:600;color:#fff;background-color:#3b5998;box-shadow:2px 3px 0 #121314">Confirm your account</a><div style="color:#aaa;font-family:'Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif;font-size:1rem"><p>Facebook help you to stay in touch with all your friends!</p></div>`
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
