// prisma/seed.ts
import "dotenv/config";
import { Pool } from "pg";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "../src/utils/hashPassword.js";
import { generatePassword } from "../src/utils/generatePassword.js";
import { sendEmail } from "../src/utils/sendEmail.js";
import { sendPasswordTemplate } from "../src/templates/sendPasswordTemplate.js";

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const ADMIN_NAME = process.env.ADMIN_NAME;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PHONE = process.env.ADMIN_PHONE;

  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PHONE) {
    throw new Error("Missing ADMIN_NAME, ADMIN_EMAIL or ADMIN_PHONE in .env");
  }

  const existingAdmin = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existingAdmin) {
    console.log("⚠️ Admin already exists");
    console.log(`📧 Email: ${existingAdmin.email}`);
    return;
  }

  const plainPassword = generatePassword();
  const hashedPassword = await hashPassword(plainPassword);

  const admin = await prisma.user.create({
    data: {
      fullName: ADMIN_NAME,
      email: ADMIN_EMAIL,
      phone: ADMIN_PHONE,
      password: hashedPassword,
      role: "ADMIN",
      status: "ACTIVE",
      isVerified: true,
      mustChangePassword: true,
    },
  });

  try {
    await sendEmail({
      to: admin.email,
      subject: "Your Admin Account Password",
      html: sendPasswordTemplate({ firstName: admin.fullName, email: admin.email, password: plainPassword, loginUrl: process.env.LOGIN_URL || "" }),
    });
    console.log("📧 Password email sent successfully");
  } catch (emailError) {
    console.error("⚠️ Admin created but email failed to send:", emailError);
    console.log(`🔑 Plain password (save this!): ${plainPassword}`);
  }

  console.log("✅ Admin account created");
  console.log(`📧 Email: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error("❌ Seed failed");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });