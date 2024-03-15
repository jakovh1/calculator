const numbers = document.querySelectorAll(".number");
const bottomScreen = document.querySelector(".bottom-screen");
const allClear = document.querySelector(".special-button");

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        console.log(e.target.value);
        bottomScreen.textContent = bottomScreen.textContent + " " + e.target.value;
    })
})

allClear.addEventListener('click', () => {
    bottomScreen.innerHTML = "";
})