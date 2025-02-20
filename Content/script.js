const urlParams = new URLSearchParams(window.location.search);
const successMessage = urlParams.get('success');
const errorMessage = urlParams.get('error');

const messageBox = document.getElementById("messageBox");
const messageText = document.getElementById("messageText");

if ((successMessage || errorMessage) && messageBox && messageText) {
    if (successMessage) {
        messageBox.style.backgroundColor = "green";
        messageText.innerText = successMessage;
    } else if (errorMessage) {
        messageBox.style.backgroundColor = "red";
        messageText.innerText = errorMessage;
    }

    messageBox.style.display = "block";

    const newUrl = window.location.pathname;
    window.history.replaceState(null, "", newUrl);

    setTimeout(() => {
        messageBox.style.display = "none";
    }, 5000);
}

