// // Get references to the form, input, and output elements
const form = document.getElementById('policy-form');
const input = document.getElementById('policy-input');
const output = document.getElementById('json-output');
const preload = document.getElementById('preload');

preload.style.display = 'none';
// Add an event listener to the form to handle submissions
form.addEventListener('submit', event => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the input text
  const inputText = input.value;
  preload.style.display = 'block';
  output.innerText = ''

  // Call the chatgpt API with the input text
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "text": inputText
    })
  })
    .then((response) => response.text())
    .then((data) => {
      // Convert the JSON data to a string
      const jsonString = data;// JSON.stringify(data, null, 2);
      
      preload.style.display = 'none';

      // Set the inner HTML of the container element to the formatted JSON string
      output.innerText = jsonString;

      console.log(data)
      // output.textContent = data
    })
    .catch(error => {
      output.innerText = error
    });
});


// Get a reference to the copy button
const copyButton = document.getElementById('copy-button');

// Add a click event listener to the copy button
copyButton.addEventListener('click', () => {

  navigator.clipboard.writeText(output.innerText).then(function () {
    console.log('Async: Copying to clipboard was successful!');
  }, function (err) {
    console.error('Async: Could not copy text: ', err);
  });
});




const textarea = document.getElementById('policy-input');
const placeholder = textarea.getAttribute('placeholder');

textarea.addEventListener('focus', () => {
  textarea.setAttribute('placeholder', '');
});

textarea.addEventListener('blur', () => {
  textarea.setAttribute('placeholder', placeholder);
});

let suggestionIndex = 0;
const suggestions = ["I need permissions to list and describe Amazon S3 buckets.",
  "I need permissions to create, update, and delete CloudFormation stacks.",
  "I need permissions to list and terminate Amazon EC2 instances.",
  "I need permissions to read and write to an Amazon DynamoDB table.",
  "I need permissions to invoke AWS Lambda functions.",
  "I need permissions to access the AWS Management Console.",
  "I need permissions to read and write to Amazon S3 objects.",
  "I need permissions to access Amazon CloudWatch logs.",
  "I need permissions to create and delete Amazon RDS database instances.",
  "I need permissions to create and delete Amazon SNS topics.",
];

function animateSuggestion(suggestion) {
  let i = 0;
  const intervalId = setInterval(() => {
    textarea.setAttribute('placeholder', suggestion.substring(0, i));
    i++;
    if (i > suggestion.length) {
      clearInterval(intervalId);
    }
  }, 50);
}

setInterval(() => {
  animateSuggestion(suggestions[suggestionIndex]);
  suggestionIndex = (suggestionIndex + 1) % suggestions.length;
}, 4000);
