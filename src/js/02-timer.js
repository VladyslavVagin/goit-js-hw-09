import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const chooseDateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
// by default button start will be disabled 
startBtn.setAttribute('disabled', '');

// SET CONFIGURATION FOR CHOOSE DATA IN CALENDAR 
const options = {
    enableTime: true,
    time_24hr: true,
    // minDate: 'today',   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ANOTHER OPTION
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates[0] > new Date()) {
            startBtn.removeAttribute('disabled');
            return selectedDates[0];
        } else {
            return alert('Please choose a date in the future');
        }
    },
    onOpen() {
        startBtn.setAttribute('disabled', '');
    },
};
// put calendar for choosing data to input 
const fp = flatpickr(chooseDateInput, options);



// add event listener to the button "Start"
startBtn.addEventListener('click', startTimer);

function startTimer() { };


