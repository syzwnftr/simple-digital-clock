const chckbox = document.querySelector('#checkbox');
let theme = localStorage.getItem('theme');
const body = document.querySelector('body');
const clock = document.querySelector('.clock');

const enableDarkMode = () => {
    body.classList.add('dark');
    clock.classList.add('dark');
    chckbox.checked = true;
    localStorage.setItem('theme', 'dark');
}

const disableDarkMode = () => {
    body.classList.remove('dark');
    clock.classList.remove('dark');
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
       console.log('theme:', theme);
    } else {
       disableDarkMode();
       theme = localStorage.getItem('theme');
       console.log('theme:', theme);
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
        const timesFormatted = `${parts.hour}:${minutesFormatted}`;
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