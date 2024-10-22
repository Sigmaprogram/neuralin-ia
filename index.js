// LAYOUT
// ================
const circleButton = document.querySelector(".circle-button");
const chatboxTitle = document.querySelector(".chatbox-title");

// ================
// API REQUEST
// ================
const apiKey = "AIzaSyCEhUUxSViWyF0j4RiCAEvuAd51UzGde4k";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
const responseContainer = document.getElementById("section-response");

document
  .getElementById("send-btn")
  .addEventListener("click", async function () {
    const userInputElement = document.getElementById("input-user");
    if (userInputElement.value !== "") {
      // ocultar clean-response-container
      const chatboxTitle = document.querySelector(".chatbox-title");
      chatboxTitle.classList.add("hiden");
      // Obtener el valor del campo de texto
      const input = userInputElement.value;
      userInputElement.value = ""; // Limpiar el campo de texto
      // Mostrar caja de pregunta
      responseContainer.innerHTML += `<div class="ask">
<section class="section-title-ask">
  <div class="circle-image-ask">
    <img
      class="image-ask image-chatbox"
      src="assets/img/imagepeople.jpeg"
      alt="User profile picture"
    />
  </div>
  <h3 class="title-ask">Usuario Demo</h3>
</section>
<p class="text-ask">${input}</p>
</div>`;
      try {
        const respuesta = await generarRespuesta(input);
        responseContainer.innerHTML += `<div class="response">
<section class="section-title-response">
  <div class="circle-image-response">
    <img
      class="image-response image-chatbox"
      src="assets/icons/cerebro.png"
      alt="User profile picture"
    />
  </div>
  <h3 class="title-ask">Usuario Demo</h3>
</section>
<p class="text-response">${respuesta.candidates[0].content.parts[0].text}</p>
</div>`;
        responseArea.scrollTop = responseArea.scrollHeight;
      } catch (error) {
        console.error("Error al generar respuesta:", error);
      }
    }
  });

// Funcion para generar respuesta (Petición a la API)
async function generarRespuesta(input) {
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `${input}`,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Hubo un error en la solicitud:", error);
    throw error;
  }
}
