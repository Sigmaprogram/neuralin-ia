// Layout
const btnMenu = document.getElementById('btn-menu');
const submenu = document.querySelector('.submenu');

btnMenu.addEventListener('click', () => {
    submenu.classList.toggle('hide');
})


// Api request
document.getElementById('send-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput == '') return;

    const responseArea = document.getElementById('response-area');

    // Mostrar la pregunta del usuario
    const userMessage = document.createElement('div');
    userMessage.textContent = "Usuario: " + userInput;
    userMessage.style.color = '#000';
    responseArea.appendChild(userMessage);

    // Simular respuesta de la IA (aquí puedes conectar tu lógica IA real)
    const iaResponse = document.createElement('div');
    iaResponse.textContent = "IA: " + generarRespuesta(userInput);
    iaResponse.style.color = '#007bff';
    responseArea.appendChild(iaResponse);

    // Limpiar el input
    document.getElementById('user-input').value = '';

    // Hacer scroll automático al final
    responseArea.scrollTop = responseArea.scrollHeight;
});

function generarRespuesta(input) {
    // Aquí puede ir la lógica de tu IA (de momento una respuesta simulada)
    return "Esta es una respuesta simulada para: " + input;
}



const apiKey = "AIzaSyCEhUUxSViWyF0j4RiCAEvuAd51UzGde4k";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

// El cuerpo de la solicitud, como en el curl original
const requestBody = {
    contents: [
      {
        parts: [
          {
            text: "Generame 5 ideas de negocios para un ingeniero en sistemas"
          }
        ]
      }
    ]
  };
  
  // Petición fetch
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('Respuesta de la IA:', data);
    })
    .catch(error => {
      console.error('Hubo un error:', error);
    });