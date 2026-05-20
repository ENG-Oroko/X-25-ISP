export const sendPasswordTemplate = ({
  firstName,
  email,
  password,
  loginUrl,
}) => {

  return `
  <!DOCTYPE html>
  <html>

  <head>
    <meta charset="UTF-8" />
    <title>ISP MAN Account</title>
  </head>

  <body
    style="
      margin:0;
      padding:0;
      background:#f4f4f4;
      font-family:Arial,sans-serif;
    "
  >

    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
    >

      <tr>
        <td align="center">

          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background:#ffffff;
              margin-top:40px;
              border-radius:8px;
              overflow:hidden;
            "
          >

            <!-- Header -->
            <tr>
              <td
                align="center"
                style="
                  background:#2563eb;
                  color:white;
                  padding:20px;
                  font-size:28px;
                  font-weight:bold;
                "
              >
                ISP MAN
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td
                style="
                  padding:30px;
                  color:#333333;
                  font-size:16px;
                  line-height:1.6;
                "
              >

                <h2
                  style="
                    margin-top:0;
                    color:#111827;
                  "
                >
                  Welcome ${firstName}
                </h2>

                <p>
                  Your account has been created successfully.
                </p>

                <p>
                  Use the credentials below to login:
                </p>

                <!-- Credentials -->
                <table
                  width="100%"
                  cellpadding="10"
                  cellspacing="0"
                  style="
                    background:#f9fafb;
                    border:1px solid #e5e7eb;
                    border-radius:6px;
                    margin-top:20px;
                    margin-bottom:20px;
                  "
                >

                  <tr>
                    <td>
                      <strong>Email:</strong>
                    </td>

                    <td>
                      ${email}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong>Password:</strong>
                    </td>

                    <td>
                      ${password}
                    </td>
                  </tr>

                </table>

                <!-- Button -->
                <table
                  cellpadding="0"
                  cellspacing="0"
                >
                  <tr>
                    <td
                      align="center"
                      bgcolor="#2563eb"
                      style="
                        border-radius:6px;
                      "
                    >
                      <a
                        href="${loginUrl}"
                        style="
                          display:inline-block;
                          padding:12px 24px;
                          color:white;
                          text-decoration:none;
                          font-weight:bold;
                        "
                      >
                        Login Now
                      </a>
                    </td>
                  </tr>
                </table>

                <p
                  style="
                    margin-top:30px;
                    color:#dc2626;
                    font-size:14px;
                  "
                >
                  Please change your password after first login.
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                align="center"
                style="
                  padding:20px;
                  font-size:13px;
                  color:#6b7280;
                  background:#f9fafb;
                "
              >
                © ${new Date().getFullYear()} ISP MAN.
                All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>

    </table>

  </body>
  </html>
  `;
};