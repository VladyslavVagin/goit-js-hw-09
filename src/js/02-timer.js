import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const chooseDateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysRem = document.querySelector('[data-days]');
const hoursRem = document.querySelector('[data-hours]');
const minutesRem = document.querySelector('[data-minutes]');
const secRem = document.querySelector('[data-seconds]');

// by default button start will be disabled 
startBtn.setAttribute('disabled', '');
let timerId = null;

// SET CONFIGURATION FOR CHOOSE DATA IN CALENDAR 
const options = {
    enableTime: true,
    time_24hr: true,
    // minDate: 'today',   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ANOTHER OPTION
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= new Date()) {
            return Notify.failure('Please choose a date in the future');
        } else {
            Notify.success('TIMER STARTED! For choose another date - reopen your browser-page!');
            console.log(selectedDates[0]);
            startBtn.removeAttribute('disabled');
            chooseDateInput.setAttribute('disabled', '');
            startBtn.addEventListener('click', onClickStart);
            timerId = setInterval(onClickStart, 1000);
            function onClickStart() {
                startBtn.setAttribute('disabled', '');
                const differenceTime = selectedDates[0].getTime() - new Date().getTime();
                const remainTiming = convertMs(differenceTime);
                daysRem.textContent = addLeadingZero(remainTiming.days);
                hoursRem.textContent = addLeadingZero(remainTiming.hours);
                minutesRem.textContent = addLeadingZero(remainTiming.minutes);
                secRem.textContent = addLeadingZero(remainTiming.seconds);
                if (remainTiming.days === 0 && remainTiming.hours === 0 && remainTiming.minutes === 0 && remainTiming.seconds === 0) {
                    clearInterval(timerId);
                    Notify.info('TIME IS OVER !!!!!')
                    chooseDateInput.removeAttribute('disabled');
                }
                console.log(remainTiming);
            };
        }
    },
    onOpen() {
        startBtn.setAttribute('disabled', '');
    },
};
// put calendar for choosing data to input 
const fp = flatpickr(chooseDateInput, options);


// FUNCTION FOR CALCULATING DATE (DAY, HOURS, MIN, SEC)
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
// for make format 00 00 00 00
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

