// Layout
const btnMenu = document.getElementById("btn-menu");
const submenu = document.querySelector(".submenu");
const body = document.querySelector("body");

btnMenu.addEventListener("click", () => {
  submenu.classList.toggle("hide");
});

body.addEventListener("click", (event) => {
  if (event.target !== btnMenu) {
    submenu.classList.add("hide");
  }
});

// ================
// Api request
const apiKey = "AIzaSyCEhUUxSViWyF0j4RiCAEvuAd51UzGde4k";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
const responseContainer = document.getElementById("response-area");

document
  .getElementById("send-btn")
  .addEventListener("click", async function () {
    const userInputElement = document.getElementById("user-input");
    if (userInputElement.value !== "") {
      // ocultar clean-response-container
      const cleanResponseContainer = document.querySelector(
        ".clean-response-container"
      );
      cleanResponseContainer.style.display = "none";
      const input = userInputElement.value;
      userInputElement.value = ""; // Limpiar el campo de texto
      // Mostrar caja de pregunta
      responseContainer.innerHTML += `
      <div class="ask-box">
        <div class="ask-text">
          <p class="ask-text-p">
            ${input}
          </p>
        </div>
      </div>
      <!-- Fin de caja de pregunta -->
    `;

      // Esperar el resultado de la función async
      try {
        const respuesta = await generarRespuesta(input);
        // mostrar response-area
        responseContainer.innerHTML += `
          <!-- Caja de respuesta -->
          <div class="response-box">
            <h4 class="response-title">Neuralin</h4>
            <div class="response-text">
              <p class="response-text-p">${respuesta.candidates[0].content.parts[0].text}</p>
            </div>
          </div>
          <!-- Fin de caja de respuesta -->
        `;
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
    return data; // Devolver los datos de la API
  } catch (error) {
    console.error("Hubo un error en la solicitud:", error);
    throw error; // Propagar el error para manejarlo donde se llame la función
  }
}
