const form = document.getElementById('chat-form');
const userInputField = document.getElementById('user-input');
const responseDiv = document.getElementById('response');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const userInput = userInputField.value;

  try {
    const response = await fetch('/chat', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput }),
    });

    const responseData = await response.json(); //wait for api response
    responseDiv.textContent = responseData.message;
    userInputField.value = ''; // Clear input field after response
  } catch (error) {
    console.error(error);
    responseDiv.textContent = 'Error occurred. Please try again.';
  }
});
