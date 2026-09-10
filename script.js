const texts = [
    "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.",
    "We are not afflicted with a new life, but we are gifted with the capacity to begin anew each day. What you do today is important, because you are exchanging a day of your life for it. When tomorrow comes, this day will be gone forever, leaving in its place something that you have traded for it.",
    "To walk deep into the quiet forest is to enter a world where time moves at a different pace. Sunlight filters through the dense canopy above, casting shifting patterns of gold and shadow across the ancient moss, while the distant rush of a hidden stream provides a steady, grounding rhythm to the afternoon.",
    "Deep work is the ability to focus without distraction on a cognitively demanding task. It is a skill that allows you to quickly master complicated information and produce better results in less time. In a world full of constant digital noise, cultivating this practice makes you rare, valuable, and highly impactful.",
    "The Milky Way galaxy spans roughly 100,000 light-years in diameter and contains upwards of 100 billion stars. Our own solar system resides in the Orion Cygnus arm, orbiting the galactic center at a speed of 230 kilometers per second. It takes approximately 230 million years for Earth to complete just one full cosmic voyage.",
    "Modern web-development requires a deep understanding of user-experience design and responsive layouts. Developers must balance high-performance code with accessible user-interfaces across desktop and mobile-first platforms. Static-site generators and server-side rendering have become the industry-standard for building fast, secure websites.",

];

let currentText = '';
let currentIndex = 0;
let startTime = null;
let timeleft = 60;
let timer = null;
let isActive = false;
let errors = 0;
let totalChars = 0;

const textContent = document.getElementById('textContent');
const typingInput = document.getElementById('typingInput');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const charactersElement = document.getElementById('characters');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const timerElement = document.getElementById('timer');
const tryAgainBtn = document.getElementById('tryAgainBtn');
const resultsModal = document.getElementById('resultsModal');

function loadNewText() {
    currentText = texts[
        Math.floor(Math.random() * texts.length)
    ];
    displayText();
}

function displayText() {
    textContent.innerHTML = currentText
    .split('').
    map((char, index) => 
        `<span class="char pending" data-index = "${index}">${char}</span>`
    ).join('');
}

function startTest() {
    isActive = true;
    startTime = Date.now();
    typingInput.disabled = false;
    typingInput.placeholder = "start typing...";
    typingInput.focus();
    startBtn.style.display = 'none';
    progressText.textContent = 'Test in Progress...';
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeleft--;
        timerElement.querySelector("span").textContent = timeleft;


        if (timeleft <= 0) {
           endTest();
        }
    }, 1000);
}

function handleInput(e) {
    if (!isActive) return;

    const inputValue = e.target.value;
    currentIndex = inputValue.length;

    updateDisplay(inputValue);
    updateStats();
    updateProgress();

    if (currentIndex >= currentText.length) {
        endTest();
    }
}

function updateDisplay(inputValue) {
    const chars = document.querySelectorAll(".char");
    errors = 0;
    totalChars = currentIndex;

    chars.forEach((char, index) => {
        char.className = 'char';


        if (index < inputValue.length) {
            if (inputValue[index] === currentText[index]) {
                char.classList.add('correct')
            } else {
                char.classList.add('incorrect');
                errors++;
            }
        } else if (index === inputValue.length && index < currentText.length) {
            char.classList.add('current');
        } else {
            char.classList.add('pending');
        }
    });
}

function updateStats() {
    const timeElapsed = (Date.now() - startTime) / 1000 / 60;
    const grossWPM = (currentIndex / 5) / timeElapsed;
    const netWPM = Math.max(0, Math.round(grossWPM - (errors / timeElapsed)));
    const accuracy = totalChars > 0 ? Math.round(((totalChars - errors) / totalChars) * 100) : 100;
    
    
    wpmElement.textContent = isFinite(netWPM) ? netWPM : 0;
    accuracyElement.textContent = accuracy;
    charactersElement.textContent = totalChars;

}



function updateProgress() {
    const progress = (currentIndex / currentText.length) * 100;
    progressFill.style.width = `${Math.min(progress, 100)}%`
    if (progress >= 100) {
        progressText.textContent = "Complete!";
    } else {
        progressText.textContent = `${Math.round(progress)}% complete`;
    }
}

function endTest() {
    isActive = false;
    typingInput.disabled = true;
    clearInterval(timer);

    updateStats()
    showResults();
}

function showResults() {
    const finalWPM = wpmElement.textContent;
    const finalAccuracy = accuracyElement.textContent;
    const finalCharacters = charactersElement.textContent;

    document.getElementById('finalWPM').textContent = finalWPM;
    document.getElementById('finalAccuracy').textContent = finalAccuracy;
    document.getElementById('finalCharacters').textContent = finalCharacters;

    resultsModal.classList.add('show')
}

function resetTest() {
    isActive = false;
    currentIndex = 0;
    errors = 0;
    totalChars = 0;
    timeleft = 60;
    startTime = null;

    clearInterval(timer);

    typingInput.value = '';
    typingInput.disabled = true;
    typingInput.placeholder = 'click start to begin typing...';
    typingInput.style.display = 'inline-flex';
    timerElement.querySelector('span').textContent = '60';
    progressText.textContent = 'Ready to start';

    wpmElement.textContent = '0';
    accuracyElement.textContent = '100';
    charactersElement.textContent = '0';
    progressFill.style.width = '0%';

    loadNewText();
    resultsModal.classList.remove('show');
}

function closeResults() {
    resultsModal.classList.remove('show');
    resetTest();
}

startBtn.addEventListener('click', startTest)
resetBtn.addEventListener('click', resetTest)
typingInput.addEventListener('input', handleInput)
typingInput.addEventListener('paste', (e) => e.preventDefault())
tryAgainBtn.addEventListener('click', closeResults)

document.addEventListener('DOMContentLoaded', () => {
    loadNewText();
})