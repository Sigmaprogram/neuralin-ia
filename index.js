// LAYOUT
// ================

const chatboxTitle = document.querySelector(".chatbox-title");

// MODE
// ================

const body = document.querySelector("body");
const inputUser = document.getElementById("input-user");
const btnMode = document.querySelector(".btn-mode");
const logo = document.querySelector(".logo");
const imageResponse = document.querySelector(".image-response");

// Dark mode toggle
btnMode.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  inputUser.classList.toggle("input-dark-mode");
  logo.classList.toggle("logo-dark-mode");

  // Toggle icon
  btnMode.innerHTML = body.classList.contains("dark-mode") 
    ? `<i class="fas fa-sun"></i>` 
    : `<i class="fas fa-moon"></i>`;
});

// API REQUEST
// ================

const apiKey = "AIzaSyCEhUUxSViWyF0j4RiCAEvuAd51UzGde4k";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
const responseContainer = document.getElementById("section-response");

// Function to send a response
async function enviarRespuesta() {
  const userInputElement = document.getElementById("input-user");
  if (userInputElement.value !== "") {
    const input = userInputElement.value;
    userInputElement.value = ""; // Clear input field

    // Display user question
    responseContainer.innerHTML += `
      <div class="ask">
        <section class="section-title-ask">
          <div class="circle-image-ask">
            <img class="image-ask image-chatbox" src="assets/img/imagepeople.jpeg" alt="User profile picture" />
          </div>
          <h3 class="title-ask">Usuario Demo</h3>
        </section>
        <p class="text-ask">${input}</p>
      </div>`;
    
    try {
      const respuesta = await generarRespuesta(input);

      // Format response using `marked` for Markdown
      const formattedText = marked.parse(respuesta.candidates[0].content.parts[0].text);

      responseContainer.innerHTML += `
        <div class="response">
          <section class="section-title-response">
            <div class="circle-image-response">
              <img class="image-response image-chatbox" src="assets/icons/cerebro.png" alt="Neuralin profile picture" />
            </div>
            <h3 class="title-ask">Neuralin</h3>
          </section>
          <p class="text-response">${formattedText}</p>
        </div>`;

      // Scroll to bottom
      scrollBottom();

    } catch (error) {
      console.error("Error al generar respuesta:", error);
    }
  }
}

// Send on Enter key press
document.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    enviarRespuesta();
  }
});

// Send on button click
document.getElementById("send-btn").addEventListener("click", enviarRespuesta);

// Function to generate response (API Request)
async function generarRespuesta(input) {
  const requestBody = {
    contents: [{ parts: [{ text: `${input}` }] }],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

function scrollBottom() {
  // Scroll to bottom with smooth animation
  responseContainer.scrollTo({
    top: responseContainer.scrollHeight,
    behavior: 'smooth' // This adds a smooth scroll behavior
  });
}
