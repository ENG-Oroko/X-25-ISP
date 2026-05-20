export const phoneChangedTemplate = ({
  firstName,
  oldPhone,
  newPhone,
}) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 10px;">

      <h2 style="color: #2563eb; text-align: center;">
        Phone Number Changed
      </h2>

      <p>Hello ${firstName || "User"},</p>

      <p>
        Your phone number was updated successfully.
      </p>

      <p>
        <strong>Old Number:</strong> ${oldPhone}
      </p>

      <p>
        <strong>New Number:</strong> ${newPhone}
      </p>

      <p style="color: red;">
        If you did NOT make this change,
        contact support immediately.
      </p>

      <div style="margin-top: 30px;">
        Regards,<br/>
        Security Team
      </div>

    </div>
  `;
};