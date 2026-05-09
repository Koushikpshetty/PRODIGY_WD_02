class Stopwatch {
    constructor() {
        this.isRunning = false;
        this.time = 0;
        this.lapTime = 0;
        this.laps = [];
        this.intervalId = null;

        this.initElements();
        this.attachEventListeners();
    }

    initElements() {
        this.hoursDisplay = document.querySelector('.hours');
        this.minutesDisplay = document.querySelector('.minutes');
        this.secondsDisplay = document.querySelector('.seconds');
        this.millisecondsDisplay = document.querySelector('.milliseconds');
        
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.clearLapsBtn = document.getElementById('clearLapsBtn');
        this.lapsList = document.getElementById('lapsList');
    }

    attachEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.recordLap());
        this.clearLapsBtn.addEventListener('click', () => this.clearLaps());
    }

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        this.lapBtn.disabled = false;

        this.intervalId = setInterval(() => {
            this.time++;
            this.updateDisplay();
        }, 10);
    }

    pause() {
        if (!this.isRunning) return;

        this.isRunning = false;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;

        clearInterval(this.intervalId);
    }

    reset() {
        this.isRunning = false;
        this.time = 0;
        this.lapTime = 0;
        this.laps = [];

        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.lapBtn.disabled = true;
        this.clearLapsBtn.style.display = 'none';

        clearInterval(this.intervalId);
        this.updateDisplay();
        this.renderLaps();
    }

    recordLap() {
        const lapDuration = this.time - this.lapTime;
        this.laps.push({
            number: this.laps.length + 1,
            time: lapDuration,
            totalTime: this.time
        });

        this.lapTime = this.time;
        this.renderLaps();
    }

    updateDisplay() {
        const totalMilliseconds = this.time * 10;
        
        const hours = Math.floor(totalMilliseconds / 3600000);
        const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
        const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
        const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

        this.hoursDisplay.textContent = String(hours).padStart(2, '0');
        this.minutesDisplay.textContent = String(minutes).padStart(2, '0');
        this.secondsDisplay.textContent = String(seconds).padStart(2, '0');
        this.millisecondsDisplay.textContent = String(milliseconds).padStart(2, '0');
    }

    formatTime(centiseconds) {
        const totalMilliseconds = centiseconds * 10;
        
        const hours = Math.floor(totalMilliseconds / 3600000);
        const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
        const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
        const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
    }

    renderLaps() {
        if (this.laps.length === 0) {
            this.lapsList.innerHTML = '<li class="empty-laps">No laps recorded yet</li>';
            this.clearLapsBtn.style.display = 'none';
            return;
        }

        this.clearLapsBtn.style.display = 'block';
        this.lapsList.innerHTML = this.laps.map(lap => `
            <li class="lap-item">
                <span class="lap-number">Lap ${lap.number}</span>
                <span class="lap-time">${this.formatTime(lap.time)}</span>
            </li>
        `).reverse().join('');
    }

    clearLaps() {
        if (confirm('Are you sure you want to clear all lap times?')) {
            this.laps = [];
            this.lapTime = 0;
            this.renderLaps();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Stopwatch();
});
