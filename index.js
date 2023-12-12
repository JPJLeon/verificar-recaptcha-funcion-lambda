const axios = require("axios");

exports.handler = async (data) => {
  const recaptchaToken = data.recaptchaToken;
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: recaptchaSecretKey,
          response: recaptchaToken,
        },
      }
    );

    console.log("respuesta verificacion recaptcha: ", response.data);

    const { success } = response.data;
    if (success) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: "Verificación de reCAPTCHA exitosa.",
        }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Verificación de reCAPTCHA fallida.",
        }),
      };
    }
  } catch (error) {
    console.error("Error al tratar de verificar el reCAPTCHA:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Error interno del servidor.",
      }),
    };
  }
};
