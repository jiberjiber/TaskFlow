//===USING NODEMAILER AND SENDGRID===

const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
// const jwt = require("jsonwebtoken");
require("dotenv").config();
// const { EmployeeSchema } = require("../models/");
// const appImg = require("../../client/public/app-screenshot.jpg")

// const transport = nodemailer.createTransport(
//   nodemailerSendgrid({
//     apiKey: process.env.SENDGRID_API_KEY,
//   })
// );

// const sendConfirmationEmail = async (employee) => {
//   const token = await jwt.sign(
//     {
//         _id: employee._id,
//         firstName: employee.firstName,
//         lastName: employee.lastName,
//         username: employee.username,
//         email: employee.email,
//         isManager: employee.isManager,
//         company: employee.company,
//     },
//     process.env.SECRET, {expiresIn: "3m"}
//   );
//   const url = `${process.env.CLIENT_URL}/confirmation/${token}`;

//   transport
//     .sendMail({
//       from: "rt.terabytes@gmail.com",
//       to: `${employee.firstName} <${employee.email}>`,
//       subject: "confirmation",
//       html: `<h1>Hi ${employee.firstName}, please use this link to confirm your accout: <a href=${url}>Confirmation</h1>. This link expires in 3 minutes`,
//     })
//     .then(() => {
//       console.log("Email sent!");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// //TODO: confirm account
// const confirmAccount = (req, res) => {
//   const {token} = req.body;
//   if(token) {
//     jwt.verify(token, process.env.SECRET, function(err, decodedToken) {
//       if(err) {
//         return res.status(400).json({error: "Incorrect or expired link"})
//       }
//       // const {name, email, password}
//     })
//   } else {
//     return res.json({error: "Something went wrong!"})
//   }
// }

// // module.exports = sendConfirmationEmail;
// exports.sendConfirmationEmail = sendConfirmationEmail;

//===USING JUST NODEMAILER AND GMAIL

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS,
//   },
// });

// // const mailOptions =
// const sendConfirmationEmail = async (employee) => {
//   try {
//     const emailToken = jwt.sign(
//       {
//         _id: employee._id,
//         firstName: employee.firstName,
//         lastName: employee.lastName,
//         username: employee.username,
//         email: employee.email,
//         isManager: employee.isManager,
//         company: employee.company,
//       },
//       process.env.SECRET,
//       { expiresIn: "4m" }
//     );
//     const url = `http:localhost:3001/confirmation/${emailToken}`;

//     await transporter.sendMail({
//       to: `${employee.firstName} <${employee.email}>`,
//       subject: "confirmation",
//       html: `<h3>Confirmation email: <a href=${url}>Confirmation</h3>`,
//     });
//     console.log("email send!");
//   } catch (err) {
//     console.log(err);
//   }
// };

// exports.sendConfirmationEmail = sendConfirmationEmail;

// const transport = nodemailer.createTransport(
//   nodemailerSendgrid({
//     apiKey: process.env.SENDGRID_API_KEY,
//   })
// );

//TODO: reset pw
// const sendPwResetEmail = async (req, res) => {
//   const { _id, email, password, firstName } = await req.employee;
//   // const userId = await jwt.sign(
//   //   {
//   //       _id: employee._id,
//   //       firstName: employee.firstName,
//   //       lastName: employee.lastName,
//   //       username: employee.username,
//   //       email: employee.email,
//   //       isManager: employee.isManager,
//   //       company: employee.company,
//   //   },
//   //   process.env.SECRET, {expiresIn: "3m"}
//   // );
//   const url = `${process.env.CLIENT_URL}/passwordrecovery/${_id}`;

//   transport
//     .sendMail({
//       from: "rt.terabytes@gmail.com",
//       to: `${firstName} <${email}>`,
//       subject: "confirmation",
//       html: `<h1>Hi ${firstName}, please use this link to reset your password: <a href=${url}>Password reset</h1>.
//       <p>This link expires in 3 minutes</p>`,
//     })
//     .then(([res]) => {
//       console.log("Email sent!");
//     })
//     .catch((err) => {
//       console.log("Errors. Failed to deliver message");

//       if(err.response && err.body && err.response.body.errors) {
//         err.response.body.errors.forEach(error => console.log(res.statusCode, res,statusMessage));
//           } else {
//             console.log(err);
//           }
//     });
// };

//Registration confirmation Email
const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
  })
);
const sendWelcomeEmail = async (employee) => {
  const email = await employee.email;
  const firstName = await employee.firstName;
  //TODO: update the actual URL in .env file
  const url = `${process.env.CLIENT_URL}/login`;

  transport
    .sendMail({
      from: "rt.terabytes@gmail.com",
      to: `${firstName} <${email}>`,
      subject: "Welcome to {APP NAME}",
      html: `<div class="wrapper" data-link-color="#cccccc" data-body-style="font-size:16px; font-family:verdana,geneva,sans-serif; color:#516775; background-color:#e8f2ff;">
      <div class="webkit">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#f0f5fb">
          <tbody><tr>
            <td valign="top" bgcolor="#e8f2ff" width="100%">
              <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                <tbody><tr>
                  <td width="100%">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tbody>
                      <tr>
                        <td>
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                            <tbody>
                              <tr>
                                <td role="modules-container" style="padding:0px 0px 0px 0px; color:#516775; text-align:left;" bgcolor="#f0f5fb" width="100%" align="left">
                                  <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="bdzDb4B4pnnez4W7L1KpxJ">
                                    <tbody>
                                      <tr>
                                        <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                                          </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="gNWHzBzkFeWH4JDKd2Aikk">
                                    <tbody>
                                      <tr>
                                        <td style="background-color:#ffffff; padding:50px 0px 10px 0px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="#ffffff">
                                          <div style="font-family: inherit; text-align: center"><span style="color: #516775; font-size: 28px; font-family: georgia,serif"><strong>Welcome to {APP NAME}, ${firstName}!</strong></span>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="bA2FfEE6abadx6yKoMr3F9">
                                    <tbody>
                                      <tr>
                                        <td style="background-color:#ffffff; padding:10px 40px 50px 40px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="#ffffff">
                                          <div style="font-family: inherit; text-align: center"><span style="font-family: verdana,geneva,sans-serif">Thanks for signing up for our app! We created {APP} to help managers and business owners manage their team projects efficiently. We're are happy you found us!</span>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="dnNq8YR2nu8DNzse1aZUWt">
                                    <tbody>
                                      <tr>
                                        <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                                          </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="ei2zeSTvjHYmn1YhKSUfaB">
                                    <tbody>
                                      <tr>
                                        <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                                          <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
                                            <tbody>
                                              <tr>
                                                <td style="padding:0px 0px 10px 0px;" bgcolor="#ffffff"></td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="vFfA6A3u2gVDK2QbpXDqPo">
                                    <tbody>
                                      <tr>
                                        <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor=""></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="2q8x8zTfLywQieSSYmZbus">
                                    <tbody>
                                      <tr>
                                        <td style="padding:18px 0px 18px 0px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="">
                                          <div style="font-family: inherit; text-align: center"><span style="color: #3f51b5; font-size: 28px; font-family: georgia,serif"><strong>Ready to create your first project?</strong></span>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%" data-muid="bKHWQMgPkL5opYCkxiM6aS">
                                    <tbody>
                                      <tr>
                                        <td align="center" class="outer-td" style="padding:20px 0px 0px 0px;" bgcolor="">
                                          <table border="0" cellpadding="0" cellspacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center">
                                            <tbody>
                                              <tr>
                                                <td align="center" bgcolor="#993300" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                                                  <a style="background-color:#3f51b5; border:1px solid #993300; border-color:#3f51b5; border-radius:0px; border-width:1px; color:#ffffff; display:inline-block; font-family:verdana,geneva,sans-serif; font-size:16px; font-weight:normal; letter-spacing:1px; line-height:30px; padding:12px 20px 12px 20px; text-align:center; text-decoration:none; border-style:solid;" href="${url}" target="_blank">Get Started!</a>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="f5F8P1n4pQyU8o7DNMMEyW">
                                    <tbody>
                                      <tr>
                                        <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor=""></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="f5F8P1n4pQyU8o7DNMMEyW">
                                    <tbody>
                                      <tr>
                                        <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor=""></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="f5F8P1n4pQyU8o7DNMMEyW">
                                    <tbody>
                                      <tr>
                                        <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor=""></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</div>`,
    })
    .then((response) => {
      console.log("Email sent!");
    })
    .catch((err) => {
      console.log("Errors. Failed to deliver message:", err);
    });
};

// module.exports = sendConfirmationEmail;
exports.sendWelcomeEmail = sendWelcomeEmail;
