const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config(); 

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const EMAIL_USER = process.env.EMAIL_USER;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function enviarCorreo(destinatarios, asunto, contenido) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        type: "OAuth2",
        user: EMAIL_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const info = await transporter.sendMail({
      from: `"TeacherApp" <${EMAIL_USER}>`,
      to: destinatarios.join(", "),
      subject: asunto,
      html: contenido,
    });

    console.log("Correo enviado: %s", info.messageId);
  } catch (error) {
    console.error("Error al enviar correo: ", error);
  }
}

function generarMensajeRegistroProfesor(profesor) {
  const asunto = "Nuevo registro de profesor - Requiere validación";
  const contenido = `
    <h2>Se ha registrado un nuevo profesor</h2>
    <p><strong>Nombre:</strong> ${profesor.usuario.nombre} ${profesor.usuario.apellidos}</p>
    <p><strong>Email:</strong> ${profesor.usuario.email}</p>
    <p><strong>Teléfono:</strong> ${profesor.profesor.telefono || "No disponible"}</p>
    <p>Por favor, accede a la plataforma para validar el registro del profesor.</p>
  `;
  return { asunto, contenido };
}

module.exports = { enviarCorreo, generarMensajeRegistroProfesor };
