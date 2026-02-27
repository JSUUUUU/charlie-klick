let score = 0;
let clickPower = 1;
let musicStarted = false;
let jeffreyActive = false;
let jeffreyStealInterval = null;
let jeffreyClickCount = 0;
let goodJeffreyActive = false;
let upgrade1Count = 0;
let upgrade2Count = 0;
let autoClickerActive = false;
let adminMode = false;
let trumpLevel = 0;
let trumpSoldiers = 0;
let trumpQuizActive = false;
let oilFactory = false;
let trumpQuizTimer = 600;
let trumpTimerInterval = null;
let wheelCooldown = 0;
let wheelInterval = null;
let inDebt = false;
let debtTimer = null;

const scoreEl = document.getElementById('score');
const perClickEl = document.getElementById('perClick');
const perSecondEl = document.getElementById('perSecond');
const clickButton = document.getElementById('clickButton');
const clickImage = document.getElementById('clickImage');
const upgrade1 = document.getElementById('upgrade1');
const upgrade2 = document.getElementById('upgrade2');
const upgrade3 = document.getElementById('upgrade3');
const upgrade4 = document.getElementById('upgrade4');
const oilButton = document.getElementById('oilButton');
const bgMusic = document.getElementById('bgMusic');
const gangSound = document.getElementById('gangSound');
const virusSound = document.getElementById('virusSound');
const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const continueButton = document.getElementById('continueButton');
const newGameButton = document.getElementById('newGameButton');
const gameContainer = document.querySelector('.game-container');
const jeffrey = document.getElementById('jeffrey');
const goodJeffrey = document.getElementById('goodJeffrey');
const freddy = document.getElementById('freddy');
const debtWarning = document.getElementById('debtWarning');
const trumpQuiz = document.getElementById('trumpQuiz');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const oilFactoryPanel = document.getElementById('oilFactoryPanel');
const buildOilFactory = document.getElementById('buildOilFactory');
const trumpTimer = document.getElementById('trumpTimer');
const timerDisplay = document.getElementById('timerDisplay');
const yaySound = document.getElementById('yaySound');
const booSound = document.getElementById('booSound');
const oilDimension = document.getElementById('oilDimension');
const returnButton = document.getElementById('returnButton');
const oilButtonTop = document.getElementById('oilButtonTop');
const settingsButton = document.getElementById('settingsButton');
const settingsScreen = document.getElementById('settingsScreen');
const backButton = document.getElementById('backButton');
const langEN = document.getElementById('langEN');
const langSV = document.getElementById('langSV');
const langAR = document.getElementById('langAR');
const wheelButton = document.getElementById('wheelButton');
const wheelTimer = document.getElementById('wheelTimer');
const saveQuitButton = document.getElementById('saveQuitButton');
const wheelOverlay = document.getElementById('wheelOverlay');
const wheelCanvas = document.getElementById('wheelCanvas');
const spinButton = document.getElementById('spinButton');
const closeWheel = document.getElementById('closeWheel');

let currentLanguage = localStorage.getItem('language') || 'en';

const translations = {
    en: {
        title: 'Charlie Klick',
        continue: 'Continue',
        newGame: 'New Game',
        settings: 'Settings',
        back: 'Back',
        language: 'Language:',
        score: 'Score:',
        perClick: 'Per Click:',
        kirkPower: 'Kirk Power:',
        credits: 'Credits: Yousef and Abdullah',
        creator: 'Creator: Jusuf',
        upgrade1: '+1 Kirk Power',
        upgrade2: '+2 Kirk Power',
        upgrade3: 'Counting or not counting gang violence',
        upgrade4: 'Call TRUMP Military',
        cost: 'Cost:',
        max: 'MAX',
        active: 'ACTIVE'
    },
    sv: {
        title: 'Charlie Klick',
        continue: 'Fortsätt',
        newGame: 'Nytt Spel',
        settings: 'Inställningar',
        back: 'Tillbaka',
        language: 'Språk:',
        score: 'Poäng:',
        perClick: 'Per Klick:',
        kirkPower: 'Kirk Kraft:',
        credits: 'Krediter: Yousef och Abdullah',
        creator: 'Skapare: Jusuf',
        upgrade1: '+1 Kirk Kraft',
        upgrade2: '+2 Kirk Kraft',
        upgrade3: 'Räkna eller inte räkna gängvåld',
        upgrade4: 'Ring TRUMP Militär',
        cost: 'Kostnad:',
        max: 'MAX',
        active: 'AKTIV'
    },
    ar: {
        title: 'تشارلي كليك',
        continue: 'متابعة',
        newGame: 'لعبة جديدة',
        settings: 'الإعدادات',
        back: 'رجوع',
        language: 'اللغة:',
        score: 'النقاط:',
        perClick: 'لكل نقرة:',
        kirkPower: 'قوة كيرك:',
        credits: 'الفضل: يوسف وعبدالله',
        creator: 'المبدع: جوسف',
        upgrade1: '+1 قوة كيرك',
        upgrade2: '+2 قوة كيرك',
        upgrade3: 'عد أو عدم عد عنف العصابات',
        upgrade4: 'اتصل بجيش ترامب',
        cost: 'التكلفة:',
        max: 'الحد الأقصى',
        active: 'نشط'
    }
};

function updateLanguage() {
    const t = translations[currentLanguage];
    document.querySelector('#startScreen h1').textContent = t.title;
    document.getElementById('continueButton').textContent = t.continue;
    document.getElementById('newGameButton').textContent = t.newGame;
    document.getElementById('settingsButton').textContent = t.settings;
    document.querySelector('#settingsScreen h1').textContent = t.settings;
    document.getElementById('backButton').textContent = t.back;
}

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = ['#ff0', '#f0f', '#0ff', '#f00', '#0f0', '#00f'][Math.floor(Math.random() * 6)];
            confetti.style.top = '-10px';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

function showResult(emoji, isCorrect) {
    const overlay = document.createElement('div');
    overlay.className = 'result-overlay';
    overlay.textContent = emoji;
    document.body.appendChild(overlay);
    
    bgMusic.pause();
    
    if (isCorrect) {
        yaySound.play().catch(() => {});
        createConfetti();
        yaySound.addEventListener('ended', () => {
            bgMusic.play();
        }, { once: true });
    } else {
        booSound.play().catch(() => {});
        booSound.addEventListener('ended', () => {
            bgMusic.play();
        }, { once: true });
    }
    
    setTimeout(() => overlay.remove(), 2000);
}

function updateTrumpTimer() {
    trumpQuizTimer--;
    const mins = Math.floor(trumpQuizTimer / 60);
    const secs = trumpQuizTimer % 60;
    timerDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    
    if (trumpQuizTimer <= 0) {
        showTrumpQuiz();
        trumpQuizTimer = 600;
    }
}

const questions = [
    { q: "What is the capital of the USA?", options: ["New York", "Washington D.C.", "Los Angeles", "Chicago"], correct: 1 },
    { q: "How many states are in the USA?", options: ["48", "49", "50", "51"], correct: 2 },
    { q: "Who was the first president?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], correct: 1 },
    { q: "What year did USA gain independence?", options: ["1776", "1789", "1800", "1765"], correct: 0 },
    { q: "Trump was involved in financial fraud.", tf: true, correct: false },
    { q: "Epstein had connections to powerful people.", tf: true, correct: false },
    { q: "Trump made America great.", tf: true, correct: true },
    { q: "USA has the strongest military.", tf: true, correct: true },
    { q: "Trump University was a legitimate institution.", tf: true, correct: false },
    { q: "The USA landed on the moon in 1969.", tf: true, correct: true }
];

function showTrumpQuiz() {
    if (trumpLevel === 0 || trumpQuizActive) return;
    
    trumpQuizActive = true;
    const question = questions[Math.floor(Math.random() * questions.length)];
    
    quizQuestion.textContent = question.q;
    quizOptions.innerHTML = '';
    
    if (question.tf) {
        ['True', 'False'].forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = opt;
            btn.onclick = () => answerQuiz((i === 0) === question.correct);
            quizOptions.appendChild(btn);
        });
    } else {
        question.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = opt;
            btn.onclick = () => answerQuiz(i === question.correct);
            quizOptions.appendChild(btn);
        });
    }
    
    trumpQuiz.style.display = 'block';
}

function answerQuiz(correct) {
    trumpQuiz.style.display = 'none';
    trumpQuizActive = false;
    
    if (correct) {
        let reward = 0;
        if (trumpLevel <= 5) reward = trumpLevel * 1;
        else if (trumpLevel <= 8) reward = 5 + (trumpLevel - 5) * 3;
        else reward = 5 + 9 + (trumpLevel - 8) * 5;
        
        score += reward;
        showResult('👍', true);
        setTimeout(() => alert(`Correct! +${reward} points`), 2000);
    } else {
        const planeCount = Math.floor(Math.random() * 10) + 1;
        const rarity = Math.random();
        let penalty = 0;
        let planeName = '';
        
        if (rarity < 0.01) {
            penalty = 100000;
            planeName = 'Diamond';
        } else if (rarity < 0.05) {
            penalty = 50000;
            planeName = 'Gold';
        } else if (rarity < 0.2) {
            penalty = 10000;
            planeName = 'Silver';
        } else {
            penalty = 1000;
            planeName = 'Bronze';
        }
        
        score -= penalty * planeCount;
        showResult('👎', false);
        setTimeout(() => {
            alert(`Wrong! ${planeCount} ${planeName} plane${planeCount > 1 ? 's' : ''} bombed you! -${penalty * planeCount} points`);
            
            if (score < 0 && !oilFactory) {
                oilFactoryPanel.style.display = 'block';
            }
        }, 2000);
    }
    
    render();
}

function loadGame() {
    const saved = localStorage.getItem('charlieKlickSave');
    if (saved) {
        const data = JSON.parse(saved);
        score = data.score || 0;
        clickPower = data.clickPower || 1;
        upgrade1Count = data.upgrade1Count || 0;
        upgrade2Count = data.upgrade2Count || 0;
        autoClickerActive = data.autoClickerActive || false;
        trumpLevel = data.trumpLevel || 0;
        trumpSoldiers = data.trumpSoldiers || 0;
        oilFactory = data.oilFactory || false;
        
        if (autoClickerActive) {
            setInterval(() => {
                score += 3;
                render();
            }, 10000);
        }
        
        if (trumpLevel > 0) {
            setInterval(() => {
                score += trumpSoldiers;
                render();
            }, 120000);
            
            trumpTimer.style.display = 'block';
            trumpTimerInterval = setInterval(updateTrumpTimer, 1000);
        }
        
        if (oilFactory) {
            setInterval(() => {
                if (score < 0) {
                    score += 5000;
                    render();
                }
            }, 30000);
        }
        
        return true;
    }
    return false;
}

function saveGame() {
    const data = {
        score,
        clickPower,
        upgrade1Count,
        upgrade2Count,
        autoClickerActive,
        trumpLevel,
        trumpSoldiers,
        oilFactory
    };
    localStorage.setItem('charlieKlickSave', JSON.stringify(data));
}

function startGame() {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'flex';
    bgMusic.play();
    musicStarted = true;
    render();
    setInterval(saveGame, 5000);
}

continueButton.addEventListener('click', () => {
    if (loadGame()) {
        startGame();
    } else {
        alert('No saved game found!');
    }
});

newGameButton.addEventListener('click', () => {
    localStorage.removeItem('charlieKlickSave');
    score = 0;
    clickPower = 1;
    upgrade1Count = 0;
    upgrade2Count = 0;
    autoClickerActive = false;
    trumpLevel = 0;
    trumpSoldiers = 0;
    startGame();
});

saveQuitButton.addEventListener('click', () => {
    saveGame();
    gameContainer.style.display = 'none';
    startScreen.style.display = 'block';
});

settingsButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    settingsScreen.style.display = 'block';
});

backButton.addEventListener('click', () => {
    settingsScreen.style.display = 'none';
    startScreen.style.display = 'block';
});

// Key selector
let selectedKeys = JSON.parse(localStorage.getItem('clickKeys')) || [];
const selectedKeysDisplay = document.getElementById('selectedKeys');
const keyOptions = document.querySelectorAll('.key-option');

function updateKeyDisplay() {
    if (selectedKeys.length === 0) {
        selectedKeysDisplay.textContent = 'Press keys to set...';
    } else {
        selectedKeysDisplay.textContent = selectedKeys.map(k => k === ' ' ? 'SPACE' : k.toUpperCase()).join(', ');
    }
    
    keyOptions.forEach(btn => {
        if (selectedKeys.includes(btn.dataset.key)) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

keyOptions.forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        
        if (selectedKeys.includes(key)) {
            selectedKeys = selectedKeys.filter(k => k !== key);
        } else if (selectedKeys.length < 3) {
            selectedKeys.push(key);
        }
        
        localStorage.setItem('clickKeys', JSON.stringify(selectedKeys));
        updateKeyDisplay();
    });
});

updateKeyDisplay();

// Key press handler - prevent holding
const pressedKeys = new Set();

document.addEventListener('keydown', (e) => {
    // Prevent Enter from triggering buttons
    if (e.key === 'Enter' && gameContainer.style.display !== 'none') {
        e.preventDefault();
        return;
    }
    
    if (gameContainer.style.display !== 'none' && selectedKeys.includes(e.key.toLowerCase())) {
        if (!pressedKeys.has(e.key.toLowerCase())) {
            e.preventDefault();
            pressedKeys.add(e.key.toLowerCase());
            clickButton.click();
        }
    }
});

document.addEventListener('keyup', (e) => {
    pressedKeys.delete(e.key.toLowerCase());
});

updateLanguage();

startButton.addEventListener('click', () => {
    startGame();
});

jeffrey.addEventListener('click', () => {
    jeffreyClickCount++;
    if (jeffreyClickCount >= 5) {
        jeffrey.style.display = 'none';
        jeffreyActive = false;
        jeffreyClickCount = 0;
        if (jeffreyStealInterval) {
            clearInterval(jeffreyStealInterval);
            jeffreyStealInterval = null;
        }
        
        if (Math.random() < 0.001) {
            spawnGoodJeffrey();
        }
    }
});

goodJeffrey.addEventListener('click', () => {
    if (Math.random() < 0.00001) {
        score += 100000;
    }
    goodJeffrey.style.display = 'none';
    goodJeffreyActive = false;
    render();
});

freddy.addEventListener('click', () => {
    score += 10;
    render();
});

function spawnGoodJeffrey() {
    if (!goodJeffreyActive) {
        goodJeffrey.style.display = 'block';
        goodJeffreyActive = true;
    }
}

function spawnJeffrey() {
    if (score < 1000 && !jeffreyActive && Math.random() < 0.3) {
        jeffrey.style.display = 'block';
        jeffreyActive = true;
        jeffreyClickCount = 0;
        setTimeout(() => {
            if (jeffreyActive) {
                jeffreyStealInterval = setInterval(() => {
                    score = Math.max(0, score - Math.floor(score * 0.12));
                    render();
                }, 5000);
            }
        }, 5000);
    }
}

clickButton.addEventListener('click', () => {
    if (!musicStarted) {
        bgMusic.play();
        musicStarted = true;
    }
    
    score += clickPower;
    
    clickImage.src = 'image/charliememe.gif';
    
    setTimeout(() => {
        clickImage.src = 'image/SITTING';
    }, 500);
    
    // Create floating +1
    const plus = document.createElement('div');
    plus.className = 'floating-plus';
    plus.textContent = '+' + clickPower;
    plus.style.left = (Math.random() * 100 - 50) + 'px';
    clickButton.appendChild(plus);
    setTimeout(() => plus.remove(), 1000);
    
    render();
});

upgrade1.addEventListener('click', () => {
    if (score >= 40 && upgrade1Count < 3) {
        score -= 40;
        clickPower += 1;
        upgrade1Count++;
        spawnJeffrey();
        render();
    }
});

upgrade2.addEventListener('click', () => {
    if (score >= 450 && upgrade2Count < 3) {
        score -= 450;
        clickPower += 2;
        upgrade2Count++;
        spawnJeffrey();
        render();
    }
});

upgrade3.addEventListener('click', () => {
    if (score >= 10000 && !autoClickerActive) {
        score -= 10000;
        autoClickerActive = true;
        
        bgMusic.pause();
        gangSound.play();
        
        gangSound.addEventListener('ended', () => {
            bgMusic.play();
        }, { once: true });
        
        setInterval(() => {
            score += 3;
            render();
        }, 10000);
        render();
    }
});

upgrade4.addEventListener('click', () => {
    if (score >= 5000 && trumpLevel < 10) {
        score -= 5000;
        trumpLevel++;
        trumpSoldiers++;
        
        if (trumpLevel === 1) {
            setInterval(() => {
                score += trumpSoldiers;
                render();
            }, 120000);
            
            trumpTimer.style.display = 'block';
            trumpTimerInterval = setInterval(updateTrumpTimer, 1000);
        }
        
        render();
    }
});

buildOilFactory.addEventListener('click', () => {
    if (score >= 50000) {
        score -= 50000;
        oilFactory = true;
        oilFactoryPanel.style.display = 'none';
        
        setInterval(() => {
            if (score < 0) {
                score += 5000;
                render();
            }
        }, 30000);
        
        alert('Oil Factory built! Generates 5000 every 30 seconds when in debt.');
        render();
    }
});

oilButton.addEventListener('click', () => {
    const oilLock = document.getElementById('oilLock');
    if (score < 0) {
        if (oilLock) oilLock.style.display = 'none';
        gameContainer.style.display = 'none';
        document.getElementById('oilDimension').style.display = 'flex';
    } else {
        alert('Oil dimension unlocks only when you are in debt (negative score)!');
    }
});

if (oilButtonTop) {
    oilButtonTop.addEventListener('click', () => {
        const oilLock = document.getElementById('oilLock');
        if (score < 0) {
            if (oilLock) oilLock.style.display = 'none';
            gameContainer.style.display = 'none';
            oilDimension.style.display = 'flex';
        } else {
            alert('Oil dimension unlocks only when you are in debt (negative score)!');
        }
    });
}

returnButton.addEventListener('click', () => {
    oilDimension.style.display = 'none';
    gameContainer.style.display = 'flex';
});

function render() {
    scoreEl.textContent = Math.floor(score);
    perClickEl.textContent = clickPower;
    perSecondEl.textContent = autoClickerActive ? '3 per 10s' : '0';
    
    // Handle debt state
    if (score < 0 && !inDebt) {
        inDebt = true;
        clickImage.src = 'image/BOO.png';
        bgMusic.pause();
        virusSound.play();
        freddy.style.display = 'block';
        debtWarning.style.display = 'block';
        
        // Start 30 second timer
        debtTimer = setTimeout(() => {
            gameContainer.style.display = 'none';
            oilDimension.style.display = 'flex';
            virusSound.pause();
            bgMusic.play();
            freddy.style.display = 'none';
            debtWarning.style.display = 'none';
        }, 30000);
    } else if (score >= 0 && inDebt) {
        inDebt = false;
        clickImage.src = 'image/SITTING';
        virusSound.pause();
        bgMusic.play();
        freddy.style.display = 'none';
        debtWarning.style.display = 'none';
        if (debtTimer) {
            clearTimeout(debtTimer);
            debtTimer = null;
        }
    }
    
    upgrade1.disabled = score < 40 || upgrade1Count >= 3;
    upgrade2.disabled = score < 450 || upgrade2Count >= 3;
    upgrade3.disabled = score < 10000 || autoClickerActive;
    upgrade4.disabled = score < 5000 || trumpLevel >= 10;
    
    if (upgrade1Count >= 3) {
        upgrade1.innerHTML = '+1 Kirk Power<br><span class="cost">MAX</span>';
    }
    if (upgrade2Count >= 3) {
        upgrade2.innerHTML = '+2 Kirk Power<br><span class="cost">MAX</span>';
    }
    if (autoClickerActive) {
        upgrade3.innerHTML = 'Counting or not counting gang violence<br><span class="cost">ACTIVE</span>';
    }
    if (trumpLevel > 0) {
        let units = '';
        if (trumpLevel <= 5) units = `${trumpLevel} Soldier${trumpLevel > 1 ? 's' : ''}`;
        else if (trumpLevel <= 8) units = `5 Soldiers + ${trumpLevel - 5} Tank${trumpLevel > 6 ? 's' : ''}`;
        else units = `5 Soldiers + 3 Tanks + ${trumpLevel - 8} Plane${trumpLevel > 9 ? 's' : ''}`;
        
        upgrade4.innerHTML = `Call TRUMP Military<br><span class="cost">${trumpLevel >= 10 ? 'MAX' : 'Level ' + trumpLevel + ': ' + units}</span>`;
    }
}

render();


document.addEventListener('keydown', (e) => {
    if (adminMode) {
        if (e.key === '1') {
            score += 1000;
            render();
        } else if (e.key === '2') {
            score += 10000;
            render();
        } else if (e.key === '3') {
            clickPower += 10;
            render();
        } else if (e.key === '4') {
            jeffrey.style.display = 'none';
            jeffreyActive = false;
            if (jeffreyStealInterval) {
                clearInterval(jeffreyStealInterval);
                jeffreyStealInterval = null;
            }
        } else if (e.key === '5') {
            upgrade1Count = 0;
            upgrade2Count = 0;
            autoClickerActive = false;
            render();
        } else if (e.key === '6') {
            trumpQuizTimer = 0;
            alert('Quiz timer skipped!');
        } else if (e.key === '7') {
            trumpLevel = 10;
            trumpSoldiers = 10;
            render();
        } else if (e.key === '8') {
            oilFactory = true;
            alert('Oil Factory activated!');
        } else if (e.key === '9') {
            showTrumpQuiz();
        } else if (e.key === '0') {
            score += 100000;
            render();
        }
    }
});

let adminInput = '';
document.addEventListener('keypress', (e) => {
    adminInput += e.key;
    if (adminInput.toLowerCase().includes('admin')) {
        adminMode = !adminMode;
        alert(adminMode ? 'Admin Mode: ON\n1 = +1000\n2 = +10000\n3 = +10 click power\n4 = Remove Jeffrey\n5 = Reset upgrades\n6 = Skip quiz timer\n7 = Max TRUMP\n8 = Get Oil Factory\n9 = Trigger Quiz\n0 = +100000' : 'Admin Mode: OFF');
        adminInput = '';
    }
    if (adminInput.length > 10) {
        adminInput = adminInput.slice(-10);
    }
});

// Wheel timer
wheelCooldown = parseInt(localStorage.getItem('wheelCooldown')) || 0;

const prizes = [
    { text: 'LOSE ALL', color: '#000' },
    { text: '+100', color: '#4CAF50' },
    { text: 'JACKPOT', color: '#FFD700' },
    { text: '+50', color: '#2196F3' },
    { text: 'NOTHING', color: '#9C27B0' },
    { text: '+500', color: '#FF6B6B' },
    { text: 'x2 SCORE', color: '#FF8C00' },
    { text: '+1000', color: '#00BCD4' }
];

let currentRotation = 0;
let isSpinning = false;

function drawWheel() {
    const ctx = wheelCanvas.getContext('2d');
    const centerX = 250;
    const centerY = 250;
    const radius = 200;
    const sliceAngle = (2 * Math.PI) / prizes.length;
    
    ctx.clearRect(0, 0, 500, 500);
    
    prizes.forEach((prize, i) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, i * sliceAngle, (i + 1) * sliceAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = prize.color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(i * sliceAngle + sliceAngle / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(prize.text, radius / 1.5, 10);
        ctx.restore();
    });
    
    // Draw pointer
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 20);
    ctx.lineTo(centerX - 15, centerY - radius);
    ctx.lineTo(centerX + 15, centerY - radius);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
}

function updateWheelTimer() {
    if (wheelCooldown > 0) {
        wheelCooldown--;
        localStorage.setItem('wheelCooldown', wheelCooldown);
        const hours = Math.floor(wheelCooldown / 3600);
        const mins = Math.floor((wheelCooldown % 3600) / 60);
        const secs = wheelCooldown % 60;
        wheelTimer.textContent = `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        wheelButton.style.opacity = '0.5';
        wheelButton.style.cursor = 'not-allowed';
    } else {
        wheelTimer.textContent = 'READY!';
        wheelButton.style.opacity = '1';
        wheelButton.style.cursor = 'pointer';
    }
}

wheelButton.addEventListener('click', () => {
    if (wheelCooldown === 0) {
        wheelOverlay.style.display = 'flex';
        drawWheel();
    }
});

closeWheel.addEventListener('click', () => {
    wheelOverlay.style.display = 'none';
});

spinButton.addEventListener('click', () => {
    if (isSpinning) return;
    
    isSpinning = true;
    const spins = 5 + Math.random() * 5;
    const randomPrize = Math.floor(Math.random() * prizes.length);
    const targetRotation = currentRotation + (360 * spins) + (randomPrize * (360 / prizes.length));
    
    const duration = 3000;
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        currentRotation = targetRotation * easeOut;
        
        const ctx = wheelCanvas.getContext('2d');
        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate((currentRotation * Math.PI) / 180);
        ctx.translate(-250, -250);
        drawWheel();
        ctx.restore();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            const prize = prizes[randomPrize];
            
            // Apply prize
            if (prize.text === 'LOSE ALL') {
                score = 0;
            } else if (prize.text === '+100') {
                score += 100;
            } else if (prize.text === '+50') {
                score += 50;
            } else if (prize.text === '+500') {
                score += 500;
            } else if (prize.text === '+1000') {
                score += 1000;
            } else if (prize.text === 'JACKPOT') {
                score += 5000;
            } else if (prize.text === 'x2 SCORE') {
                score *= 2;
            }
            
            render();
            alert(`You won: ${prize.text}!`);
            
            wheelCooldown = 3600;
            localStorage.setItem('wheelCooldown', wheelCooldown);
            updateWheelTimer();
            wheelOverlay.style.display = 'none';
        }
    }
    
    animate();
});

wheelInterval = setInterval(updateWheelTimer, 1000);
updateWheelTimer();
