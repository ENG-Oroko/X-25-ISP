import { transporter }
from "../config/smpt.js";

export const sendEmail =
  async ({
    to,
    subject,
    html,
  }) => {

    try {

      const response =
        await transporter.sendMail({
          from:
            process.env.SMTP_EMAIL,
          to,
          subject,
          html,
        });

      console.log(
        "Email Sent:",
        response.messageId
      );

      return response;

    } catch (error) {

      console.error(
        "Email Error:",
        error.message
      );

      throw error;
    }
  };