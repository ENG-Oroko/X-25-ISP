export const passwordChangedTemplate = ({
  firstName,
}) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 10px;">

      <h2 style="color: #2563eb; text-align: center;">
        Password Changed
      </h2>

      <p>Hello ${firstName || "User"},</p>

      <p>
        Your account password was changed successfully.
      </p>

      <p>
        If you made this change, no further action is required.
      </p>

      <p style="color: red;">
        If you did NOT change your password, please contact support immediately.
      </p>

      <div style="margin-top: 30px;">
        <p>
          Regards,<br/>
          Security Team
        </p>
      </div>

    </div>
  `;
};