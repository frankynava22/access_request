// Client-side validation for the Skyward form
const skywardForm = document.getElementById('skyward-form');
skywardForm.addEventListener('submit', function (event) {
  const firstNameInput = document.getElementById('first-name');
  const middleInitialInput = document.getElementById('middle-initial');
  const lastNameInput = document.getElementById('last-name');
  const userIDInput = document.getElementById('user-id');
  const firstNameError = document.getElementById('first-name-error');
  const lastNameError = document.getElementById('last-name-error');
  const userIDError = document.getElementById('user-id-error');
  let isValid = true;
  if (!firstNameInput.value) {
    firstNameError.textContent = 'First name is required';
    isValid = false;
  } else {
    firstNameError.textContent = '';
  }
  if (!lastNameInput.value) {
    lastNameError.textContent = 'Last name is required';
    isValid = false;
  } else {
    lastNameError.textContent = '';
  }
  if (!userIDInput.value) {
    userIDError.textContent = 'User ID is required';
    isValid = false;
  } else {
    userIDError.textContent = '';
  }
  if (!isValid) {
    event.preventDefault();
  }
});
