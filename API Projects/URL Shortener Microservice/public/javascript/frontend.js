// select the input and submit button
const urlInput = document.querySelector('input[name="url"]');
let submitBtn = document.querySelector('button.submit');
let copyBtn = document.querySelector('button.copy');

submitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  toggleDisplay(submitBtn, copyBtn);
  // grab the url from input
  const url = urlInput.value;
  // make a get request with fetch
  fetch(`/new/${url}`)
    .then(response => response.json())
    .then(data => {
      // if url was invalid then set the input value to
      // the error
      if (data.error) {
        urlInput.value = data.error;
        toggleDisplay(copyBtn, submitBtn);
      } else {
        urlInput.value = data.short_url;
      }
    });
});

copyBtn.addEventListener('click', function(e) {
  e.preventDefault();
  toggleDisplay(copyBtn, submitBtn);
  // select text in input field
  urlInput.select();
  // copy text to clipboard
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error(err);
  }
  // clear the input field
  urlInput.value = '';
});

// hides the first arugment
// shows the second argument
function toggleDisplay(btnOne, btnTwo) {
  btnOne.style.display = 'none';
  btnTwo.style.display = 'inline-block';
}
