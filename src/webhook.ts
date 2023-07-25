export const sendWebhook = async (carData: JSON) => {
  try {
    console.log("Enviando webhook de novo carro cadastrado:", carData);
  } catch (error) {
    console.error("Erro ao enviar o webhook:", error);
  }
};
