export const forgotPasswordOtpTemplate = ({
  firstName,
  otp,
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
        color: #2563eb;
        text-align: center;
      ">
        Password Reset OTP
      </h2>

      <p>
        Hello ${firstName || "User"},
      </p>

      <p>
        Use the OTP below to reset your password:
      </p>

      <div style="
        text-align: center;
        margin: 30px 0;
      ">

        <span style="
          font-size: 32px;
          letter-spacing: 8px;
          font-weight: bold;
          color: #2563eb;
        ">
          ${otp}
        </span>

      </div>

      <p>
        This OTP expires in 10 minutes.
      </p>

      <p style="color:red;">
        If you did not request this,
        please ignore this email.
      </p>

    </div>
  `;
};