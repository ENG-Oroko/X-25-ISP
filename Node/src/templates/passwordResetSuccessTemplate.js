export const passwordResetSuccessTemplate = ({
  firstName,
}) => {
  return `
    <div style="
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: auto;
      padding: 20px;
      border: 1px solid #e5e5e5;
      border-radius: 10px;
    ">

      <h2 style="
        color: #16a34a;
        text-align: center;
      ">
        Password Reset Successful
      </h2>

      <p>
        Hello ${firstName || "User"},
      </p>

      <p>
        Your password has been reset successfully.
      </p>

      <p>
        You can now log in using your new password.
      </p>

      <p style="color:red;">
        If you did not perform this action,
        please contact support immediately.
      </p>

      <div style="margin-top: 30px;">
        Regards,<br/>
        Security Team
      </div>

    </div>
  `;
};