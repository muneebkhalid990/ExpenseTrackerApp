import nodemailer from "nodemailer";

const envdata = process.env;

if (envdata.passUse == "testing") {
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1dbe25eeaf8460",
      pass: process.env.tpass,
    },
  });
} else if (envdata.passUse == "demoDomain") {
  var transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: process.env.dpass,
    },
  });
}

const demoEmail = async (params) => {
  const { from, to, subject, text } = params;
  const info = await transporter.sendMail({
    from: from, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    // text: text, // plain text body
    html: `<b>${text}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

export default demoEmail;
