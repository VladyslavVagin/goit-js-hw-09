const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    bodyShow: document.querySelector('body'),
};
let timerId = null;

refs.startBtn.addEventListener('click', showColorsStart);
refs.stopBtn.addEventListener('click', stopColorsShow);

function showColorsStart() {
    refs.startBtn.setAttribute('disabled', '');
    timerId = setInterval(() => {
        refs.bodyShow.style.backgroundColor = getRandomHexColor();
    }, 1000);
};

function stopColorsShow() {
    clearInterval(timerId);
    refs.startBtn.removeAttribute('disabled');
};
// Make random color 
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}