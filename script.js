const chckbox = document.querySelector('#checkbox');
let theme = localStorage.getItem('theme');
const body = document.querySelector('body');
const clock = document.querySelector('.clock');
const dateText = document.querySelector('.clock-date');


const inputTime = document.querySelector('.alarmTime');
const btnSetAlarm = document.querySelector('.set-alarm');
const btnClearAlarm = document.querySelector('.clear-alarm');
const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;


const enableDarkMode = () => {
    body.classList.add('dark');
    clock.classList.add('dark');
    dateText.classList.add('dark');
    chckbox.checked = true;
    localStorage.setItem('theme', 'dark');
}

const disableDarkMode = () => {
    body.classList.remove('dark');
    clock.classList.remove('dark');
    dateText.classList.remove('dark');
    chckbox.checked = false;
    localStorage.setItem('theme', 'light');
}

if(theme == 'dark') {
    enableDarkMode();
}

const toggleDarkMode = () => {
    if(theme !== 'dark') {
       enableDarkMode();
       theme = localStorage.getItem('theme');
    } else {
       disableDarkMode();
       theme = localStorage.getItem('theme');
    }  
};

chckbox.addEventListener('change', () => {
    toggleDarkMode();  
});



// Clock parts
class DigitalClock {
    constructor(element) {
        this.element = element; // refer to clockElement which refer to document.querySelector('.clock')
    }

    // Start the clock upon opening and updating every half a second
    start() {
        this.updateTime(); // start the clock
        
        setInterval(() => {
            this.updateTime();
        }, 500);  // update every half a second
    }

    updateTime() {
        const parts = this.getTimeParts();
        const minutesFormatted = parts.minutes.toString().padStart(2, '0');
        const secondsFormatted = parts.seconds.toString().padStart(2, '0');
        const timesFormatted = `${parts.hour}:${minutesFormatted}:${secondsFormatted}`;
        const amPm = parts.isAm ? "AM" : "PM";

        const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const date = `${parts.date} ${monthArr[parts.month]} ${parts.year}`;

        this.element.querySelector('.clock-time').textContent = timesFormatted;
        this.element.querySelector('.clock-ampm').textContent = amPm;
        this.element.querySelector('.clock-date').textContent = date;
    }

    getTimeParts() {
        const now = new Date();

        return {
            hour : now.getHours() % 12 || 12, // return 0-23 
            minutes : now.getMinutes(), // return 0-59
            seconds : now.getSeconds(), // return 0-59
            isAm : now.getHours() < 12,  // return boolean values
            date : now.getDate(), // return the day of the month (1-31)
            month : now.getMonth(), // return the month of the day (0-11) Note: 0 = Jan, 1 = Feb 
            year : now.getFullYear() // return the year of the date 
        };
    }
}

const clockElement = document.querySelector('.clock');
const clockObject = new DigitalClock(clockElement);

clockObject.start();


// alarm part

// function setAlarmTime(value) {
//     alarmTime = value;
//     console.log(alarmTime);
// }

function setAlarmFn() {
    if(alarmTime) {
        const current = new Date();
        const timeToAlarm = new Date(alarmTime);

        if (timeToAlarm > current) {
            const timeout = timeToAlarm.getTime() - current.getTime();
            alarmTimeout = setTimeout(() => {
                audio.play();
                alert(timeToAlarm);
            }, timeout);
            alert('Alarm set');
        }
    }
}

function clearAlarmFn() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}


inputTime.addEventListener('change', function() {
    alarmTime = this.value;
    console.log(alarmTime);
});
btnSetAlarm.addEventListener('click', setAlarmFn);
btnClearAlarm.addEventListener('click', clearAlarmFn);