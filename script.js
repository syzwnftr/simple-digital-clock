const chckbox = document.querySelector('#checkbox');
let theme = localStorage.getItem('theme');
const body = document.querySelector('body');
const clock = document.querySelector('.clock');

const enableDarkMode = () => {
    body.classList.add('dark');
    clock.classList.add('dark');
    localStorage.setItem('theme', 'dark');
}

const disableDarkMode = () => {
    body.classList.remove('dark');
    clock.classList.remove('dark');
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
        this.element = element;
    }

    // Start the clock upon opening, updating every half a second
    start() {
        this.updateTime();
        
        setInterval(() => {
            this.updateTime();
        }, 500); 
    }

    updateTime() {
        const parts = this.getTimeParts();
        const minutesFormatted = parts.minutes.toString().padStart(2, '0');
        const timesFormatted = `${parts.hour}:${minutesFormatted}`;
        const amPm = parts.isAm ? "AM" : "PM";

        this.element.querySelector('.clock-time').textContent = timesFormatted;
        this.element.querySelector('.clock-ampm').textContent = amPm;
    }

    getTimeParts() {
        const now = new Date();

        return {
            hour : now.getHours() % 12 || 12, // returning 0-23 
            minutes : now.getMinutes(), // returning 0-59
            isAm : now.getHours() < 12  // returning boolean values
        };
    }
}

const clockElement = document.querySelector('.clock');
const clockObject = new DigitalClock(clockElement);

clockObject.start();