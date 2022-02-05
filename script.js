// Dark / Light theme mode
const chckbox = document.querySelector('#checkbox');

chckbox.addEventListener('change', () => {
    // Change the theme color
    document.body.classList.toggle('dark');

    // Change text color
    document.querySelector('.container').classList.toggle('dark');
})

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