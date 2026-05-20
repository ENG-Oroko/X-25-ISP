export const passwordChangedTemplate = (name) => {
  return `
  <div style="
    font-family: Arial, sans-serif;
    background-color: #f4f6f8;
    padding: 40px 0;
  ">
    <div style="
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    ">

      <!-- Header -->
      <div style="
        background: #1e293b;
        padding: 20px;
        text-align: center;
        color: #ffffff;
      ">
        <h2 style="margin: 0; font-size: 22px;">🔐 Security Alert</h2>
      </div>

      <!-- Body -->
      <div style="padding: 30px; color: #333;">
        <h3 style="margin-top: 0;">Hello ${name},</h3>

        <p style="font-size: 15px; line-height: 1.6;">
          Your account password has been successfully changed.
        </p>

        <div style="
          background: #e0f2fe;
          border-left: 5px solid #0284c7;
          padding: 12px 15px;
          margin: 20px 0;
          border-radius: 5px;
          font-size: 14px;
        ">
          If this was NOT you, please contact support immediately.
        </div>

        <p style="font-size: 14px; color: #555;">
          For your security, we recommend changing your password regularly.
        </p>

        <p style="font-size: 14px; color: #555;">
          Regards,<br/>
          <strong>X-25 ISP System</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="
        background: #f1f5f9;
        text-align: center;
        padding: 15px;
        font-size: 12px;
        color: #777;
      ">
        © ${new Date().getFullYear()} X-25 ISP. All rights reserved.
      </div>

    </div>
  </div>
  `;
};