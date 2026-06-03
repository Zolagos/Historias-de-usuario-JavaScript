const userName = prompt("Ingrese su nombre:");
const ageInput = prompt("Ingrese su edad:");

const userAge = Number(ageInput);

if (isNaN(userAge) || ageInput === null || ageInput.trim() === "") {
    console.error("Error: Por favor, ingresa una edad válida en números.");
} else {
    if (userAge < 18) {
        alert(`Hola ${userName}, eres menor de edad. ¡Sigue aprendiendo y disfrutando del código!`);
    } else if (userAge >= 18) {
        alert(`Hola ${userName}, eres mayor de edad. Prepárate para grandes oportunidades en el mundo de la programación!`);
    }
}