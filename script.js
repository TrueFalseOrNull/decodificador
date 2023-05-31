/**
 * Object with the values to replace characters
 * ToDo: let user add their own characters and replacements.
 */
/* spell-checker: disable */
const KEY = {
    e: "enter",     // e replaces "enter"
    i: "imes",      // i replaces "imes"
    a: "ai",        // a replaces "ai"
    o: "ober",      // o replaces "ober"
    u: "ufat"       // u replaces "ufat"
};
/* cSpell:enable */

/**
 * Flips properties and values from an object guide from Todd Motto:
 * https://ultimatecourses.com/blog/reverse-object-keys-and-values-in-javascript
 * @param {any} data
 */
const flip = (data) => Object.fromEntries(
    Object
        .entries(data)
        .map(([key, value]) => [value, key])
);
const FLIPPEDKEY = flip(KEY);

/**
 * Reads the left panel's text
 * @param {any} input HTML's ID of the textarea
 * @returns {string} The coontent of the panel
 */
function readText(input) {
    let checkInput = document.getElementById(input).value
    if (/[A-ZÁÉÍÓÚáéíóú]/.test(checkInput)) {
        alert("Cambiando maysuculas por minusculas y quitando acentos.");
    }
    return checkInput
        .toLowerCase()
        .replace(/[Áá]/g, "a")
        .replace(/[Éé]/g, "e")
        .replace(/[Íí]/g, "i")
        .replace(/[Óó]/g, "o")
        .replace(/[Úú]/g, "u");
}

/**
 * Encrypts the text from the left panel and calls displayText() with the encrypted text
 */
function encryptText() {
    const TEXTINPUT = readText("cryptInput")
    let textOutput = "";

    /**
     * ToDo: replace the loops to String.prototype.replace()
     */
    for (let i = 0; i < TEXTINPUT.length; i++) {
        const element = TEXTINPUT[i];
        if (Object.keys(KEY).includes(element)) {   // found current char in KEY's key
            textOutput += KEY[element];             // adding the replacment
        } else {
            textOutput += element;                  // adding regular char outside the scope of KEY
        }
    }
    displayMessage("Encriptado");
    copyButton(textOutput);
    displayText(textOutput);
}

/**
 * Dencrypts the text from the left panel and calls displayText() with the decripted text
 */
function decryptText() {
    const TEXTINPUT = readText("cryptInput")  /* cspell: disable-line */
    let textOutput = "";

    /**
    * ToDo: Change this function to use FLIPPEDKEY object to make it dinamic when I got more time
    */
    textOutput = TEXTINPUT.replace(/enter/g, 'e');
    textOutput = textOutput.replace(/imes/g, 'i');
    textOutput = textOutput.replace(/ai/g, 'a');
    textOutput = textOutput.replace(/ober/g, 'o');
    textOutput = textOutput.replace(/ufat/g, 'u');

    displayMessage("Decriptado");
    copyButton(textOutput);
    displayText(textOutput);
}

/**
 * Displays a button, copies the result in the system's copy/paste buffer and hides the button
 * @param {string} textToCopy text to copy to system's copy/paste
 */
function copyButton(textToCopy) {
    let copyButton = document.getElementById("copyButton");
    copyButton.hidden = false;                              // show button
    copyButton.addEventListener('click', function () {      // on click
        navigator.clipboard.writeText(textToCopy);          // copy to clipboard
        copyButton.hidden = true;                           // hide it again
        displayMessage("Copiado");
    });
}

/**
 * Displays a message in the messageArea
 * @param {any} message message to send
 */
function displayMessage(message) {
    return document.getElementById("message").innerHTML = message;
}

/**
 * Displays the text on the right panel
 * @param {string} text text to display
 */
function displayText(text) {
    document.getElementById("cryptOutput").value = text;
}
