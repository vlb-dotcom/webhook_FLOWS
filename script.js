

function onChatBotReady() {
  // You have to define HTML meta "bs:input:buttonName" in order to inform bot send data to buttonName parameter webview
  var btnName = BotStarWebview('getParameter', 'buttonName');

  var btn = document.getElementById('btn');
  if (btnName) {
    btn.appendChild(document.createTextNode(btnName));
    btn.style.display = 'inline-block';
  }
}

function sendResponse() {
  // var inputFirstName = document.getElementById("inFname").textContent;
  // var inputLastName = document.getElementById("inLname").textContent;
  // var inputAddress = document.getElementById("inADRSname").textContent;

  // var inputFirstName = document.getElementById("inFname").textContent;
  var inputName = document.getElementById("inFname").textContent;
  var inputAddress = document.getElementById("inADRSname").textContent;
  var inputMobile = document.getElementById("inMobile").textContent;
  var inputEmail = document.getElementById("inEmail").textContent;
  var inputInstruction = document.getElementById("inInstructions").textContent;

  var outputs = {
    userName: inputName,
    userAddress: inputAddress,
    userMobile: inputMobile,
    userEmail: inputEmail,
    userInstruction: inputInstruction,
  };

  BotStarWebview('sendResponse', '', outputs, 'Button Clicked').catch((err) => {
    console.log(err);
  });
}

// Send data to google sheet
 const scriptURL = 'https://script.google.com/macros/s/AKfycbz_UhPBOV3tsgOwVKJorZUYbf7QRd3uhItdtk9Me8MwYNsPdAdF/exec'
 const form = document.forms['submit-to-google-sheet']

//  form.addEventListener('btn', e => {
//    e.preventDefault()
//    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
// 	 .then(response => console.log('Success!', response))
// 	 .catch(error => console.error('Error!', error.message))
//  })


document.getElementById('done-btn').addEventListener('click', doneBtn)

function doneBtn() {
  alert("Button is clicked!")
}
