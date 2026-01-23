import nodemailer from "nodemailer";
import { User } from "../models/user.Model";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 7);

    if (emailType === "VERIFY") {

      await User.findByIdAndUpdate(userId, {
        $set:{
         verifyToken: hashedToken,
         verifyTokenExpiry: new Date( Date.now() + 3600000),
        }     
      });

    } else if (emailType === "VERIFY") {

      await User.findByIdAndUpdate(userId, {
         $set:{
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry:new Date( Date.now() + 3600000),
        }
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "0c065c9fe46b29",
        pass: "4e09cf9d8c7842",
      },
    });

    const mailOption = {
      from: "apprince534@gmail.com",
      to: email,
      // subject:
      // emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      // html: "<b>Hello world?</b>", // HTML version of the message
      subject:
      emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>to${emailType === "VERIFY" ? "Verify your email" : "reset your password"} or copy and past the link below in your browser.
      <br/>
      ${process.env.DOMAIN}/verifyemail?Token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOption);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

