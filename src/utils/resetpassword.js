const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");
require("dotenv").config();

const P_CLIENT_ID = process.env.P_CLIENT_ID;
const P_CLIENT_SECRET = process.env.P_CLIENT_SECRET;
const P_REDIRECT_URI = process.env.P_REDIRECT_URI;
const P_REFRESH_TOKEN = process.env.P_REFRESH_TOKEN;
const P_EMAIL_USER = process.env.P_EMAIL_USER;
const P_BASE_URL = process.env.FRONTEND_BASE_URL || "http://localhost:4200";

//console.log("Frontend Base URL:", P_BASE_URL);

const oAuth2Client = new google.auth.OAuth2(
  P_CLIENT_ID,
  P_CLIENT_SECRET,
  P_REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: P_REFRESH_TOKEN });

async function enviarCorreoRestablecimiento(email, asunto, codigo) {
  try {
    //console.log("en funcion envio correo:", codigo);
    const resetUrl = `${P_BASE_URL}/password-recovery?code=${codigo}`;
    console.log(resetUrl);
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        type: "OAuth2",
        user: P_EMAIL_USER,
        clientId: P_CLIENT_ID,
        clientSecret: P_CLIENT_SECRET,
        refreshToken: P_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const contenido = `
        <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetUrl}">Restablecer mi contraseña</a>
        <p>Este enlace expirará en 1 hora.</p>
      `;
    const info = await transporter.sendMail({
      from: `"TeacherApp" <${P_EMAIL_USER}>`,
      to: email,
      subject: asunto,
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña:`,
      html: contenido,
    });
    //console.log("Correo enviado: %s", info.messageId);
  } catch (error) {
    console.error("Error al enviar correo: ", error);
  }
}

/* 
async function verifyAccessToken() {
  try {
    const token = await oAuth2Client.getAccessToken();
    console.log("Access Token generado correctamente:", token);
  } catch (error) {
    console.error("Error al generar Access Token:", error);
  }
} */

module.exports = { enviarCorreoRestablecimiento };
