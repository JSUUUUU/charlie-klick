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
let totalClicks = 0;
let totalScore = 0;
let oily1Count = 0;
let oily2Count = 0;
let oily3Count = 0;

const scoreEl = document.getElementById('score');
const perClickEl = document.getElementById('perClick');
const perSecondEl = document.getElementById('perSecond');
const clickButton = document.getElementById('clickButton');
const clickImage = clickButton.querySelector('img');
const upgrade1 = document.getElementById('upgrade1');
const upgrade2 = document.getElementById('upgrade2');
const upgrade3 = document.getElementById('upgrade3');
const upgrade4 = document.getElementById('upgrade4');
const oilButton = document.getElementById('oilButton');
const bgMusic = document.getElementById('bgMusic');
const gangSound = document.getElementById('gangSound');
const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const continueButton = document.getElementById('continueButton');
const newGameButton = document.getElementById('newGameButton');
const gameContainer = document.querySelector('.game-container');
const jeffrey = document.getElementById('jeffrey');
const goodJeffrey = document.getElementById('goodJeffrey');
const trumpQuiz = document.getElementById('trumpQuiz');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const oilFactoryPanel = document.getElementById('oilFactoryPanel');
const buildOilFactory = document.getElementById('buildOilFactory');
const trumpTimer = document.getElementById('trumpTimer');
const timerDisplay = document.getElementById('timerDisplay');
const yaySound = document.getElementById('yaySound');
const booSound = document.getElementById('booSound');
const freddySound = document.getElementById('freddySound');
const virusSound = document.getElementById('virusSound');
const oilDimension = document.getElementById('oilDimension');
const returnButton = document.getElementById('returnButton');
const settingsButton = document.getElementById('settingsButton');
const oilLock = document.getElementById('oilLock');
const debtWarning = document.getElementById('debtWarning');
const debtTimer = document.getElementById('debtTimer');
let inDebt = false;
let debtCountdown = 30;
let debtInterval = null;
const settingsScreen = document.getElementById('settingsScreen');
const backButton = document.getElementById('backButton');
const langEN = document.getElementById('langEN');
const langSV = document.getElementById('langSV');
const langAR = document.getElementById('langAR');

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
        showResult('👍', true);
        
        let totalPoints = 0;
        const soldierTypes = [];
        
        // Show soldiers running - each with own rarity
        for (let i = 0; i < Math.min(trumpSoldiers, 5); i++) {
            setTimeout(() => {
                const rarity = Math.random();
                let soldierType = '';
                let backgroundColor = '';
                let points = 0;
                
                if (rarity < 0.01) {
                    soldierType = 'Diamond';
                    backgroundColor = '#b9f2ff';
                    points = 25000;
                } else if (rarity < 0.15) {
                    soldierType = 'Gold';
                    backgroundColor = '#ffd700';
                    points = 10000;
                } else if (rarity < 0.5) {
                    soldierType = 'Silver';
                    backgroundColor = '#c0c0c0';
                    points = 3000;
                } else {
                    soldierType = 'Bronze';
                    backgroundColor = '#cd7f32';
                    points = 100;
                }
                
                score += points;
                totalPoints += points;
                soldierTypes.push(soldierType);
                
                const soldier = document.createElement('img');
                soldier.src = 'image/SOLDIER';
                soldier.className = 'running-soldier';
                soldier.style.left = '-100px';
                soldier.style.backgroundColor = backgroundColor;
                soldier.style.padding = '10px';
                soldier.style.borderRadius = '10px';
                soldier.style.animationDelay = '0s';
                document.body.appendChild(soldier);
                setTimeout(() => soldier.remove(), 3000);
                
                render();
            }, i * 200);
        }
        
        setTimeout(() => {
            const summary = soldierTypes.join(', ');
            alert(`Correct! Soldiers deployed: ${summary}\nTotal: +${totalPoints} points`);
        }, Math.min(trumpSoldiers, 5) * 200 + 500);
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

settingsButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    settingsScreen.style.display = 'block';
});

backButton.addEventListener('click', () => {
    settingsScreen.style.display = 'none';
    startScreen.style.display = 'block';
});

langEN.addEventListener('click', () => {
    currentLanguage = 'en';
    localStorage.setItem('language', currentLanguage);
    updateLanguage();
});

langSV.addEventListener('click', () => {
    currentLanguage = 'sv';
    localStorage.setItem('language', currentLanguage);
    updateLanguage();
});

langAR.addEventListener('click', () => {
    currentLanguage = 'ar';
    localStorage.setItem('language', currentLanguage);
    updateLanguage();
});

updateLanguage();

function startDebtCountdown() {
    debtInterval = setInterval(() => {
        debtCountdown--;
        debtTimer.textContent = debtCountdown;
        
        // Brighten screen gradually
        const brightness = 1 + (30 - debtCountdown) * 0.1;
        document.body.style.filter = `brightness(${brightness})`;
        
        if (debtCountdown <= 0) {
            clearInterval(debtInterval);
            virusSound.pause();
            virusSound.currentTime = 0;
            bgMusic.play();
            debtWarning.style.display = 'none';
            document.body.style.filter = 'brightness(1)';
            
            // Force to Oil Dimension
            gameContainer.style.display = 'none';
            document.getElementById('loadingScreen').style.display = 'flex';
            setTimeout(() => {
                document.getElementById('loadingScreen').style.display = 'none';
                oilDimension.style.display = 'flex';
                playOilGame.style.display = 'block';
                gameStarted = false;
                ssCharacter.style.display = 'none';
                pickaxe.style.display = 'none';
            }, 2000);
        }
    }, 1000);
}

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

function spawnGoodJeffrey() {
    if (!goodJeffreyActive) {
        goodJeffrey.style.display = 'block';
        goodJeffreyActive = true;
    }
}

function spawnJeffrey() {
    if (score < 1000 && !jeffreyActive && Math.random() < 0.1) {
        jeffrey.style.display = 'block';
        jeffreyActive = true;
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
    totalClicks++;
    totalScore += clickPower;
    
    clickImage.src = 'image/CHARLIEMEME.gif';
    setTimeout(() => {
        clickImage.src = 'image/CHARLIE.png';
    }, 500);
    
    // Create floating +1
    const plus = document.createElement('div');
    plus.className = 'floating-plus';
    plus.textContent = '+' + clickPower;
    plus.style.left = (Math.random() * 200 - 100) + 'px';
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
        
        // Show soldier running animation
        showSoldierAnimation();
        
        render();
    }
});

function showSoldierAnimation() {
    const soldier = document.createElement('div');
    soldier.className = 'running-soldier';
    soldier.textContent = '🏃';
    soldier.style.left = '-50px';
    document.body.appendChild(soldier);
    
    setTimeout(() => soldier.remove(), 3000);
}

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
    if (score >= 0) {
        alert('OIL DIMENSION LOCKED!\n\nYou need to be in DEBT to access the Oil Dimension.\n\nGet bombed by Trump\'s planes to go into debt!');
        return;
    }
    
    gameContainer.style.display = 'none';
    document.getElementById('loadingScreen').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        oilDimension.style.display = 'flex';
        playOilGame.style.display = 'block';
        gameStarted = false;
        ssCharacter.style.display = 'none';
        pickaxe.style.display = 'none';
    }, 2000);
});

const canvas = document.getElementById('worldMap');
const ctx = canvas.getContext('2d');
const mapImage = new Image();
mapImage.src = 'image/MAP';
const playOilGame = document.getElementById('playOilGame');
const ssCharacter = document.getElementById('ssCharacter');
const pickaxe = document.getElementById('pickaxe');
let gameStarted = false;
let ssX = window.innerWidth / 2;
let ssY = window.innerHeight / 2;
const moveSpeed = 5;
const keys = {};
let oilDigAttempts = 2;
const pumpScreen = document.getElementById('pumpScreen');
const pumpCanvas = document.getElementById('pumpCanvas');
const pumpCtx = pumpCanvas.getContext('2d');
const finishBuilding = document.getElementById('finishBuilding');
const hireWorker = document.getElementById('hireWorker');
const gatherSteel = document.getElementById('gatherSteel');
const gatherConcrete = document.getElementById('gatherConcrete');
const buildFoundation = document.getElementById('buildFoundation');
const buildPlatform = document.getElementById('buildPlatform');
const buildDerrick = document.getElementById('buildDerrick');
const installPump = document.getElementById('installPump');
const connectPipes = document.getElementById('connectPipes');
const oilPumpImage = new Image();
oilPumpImage.src = 'image/OIL';
let currentOilReserve = 0;
let pumpCount = 0;
let maxPumps = 5;
let currentLocation = '';
let pumps = [];
let playerMoney = 0;
let steelCount = 0;
let concreteCount = 0;
let workerCount = 0;
let currentPumpStage = 0;

const drillingGame = document.getElementById('drillingGame');
const drillingCanvas = document.getElementById('drillingCanvas');
const drillingCtx = drillingCanvas.getContext('2d');
const hitButton = document.getElementById('hitButton');
let barPosition = 0;
let barDirection = 1;
let barWidth = 80;
let greenHits = 0;
let yellowHits = 0;
let redHits = 0;
let attemptsLeft = 5;
let drillingInterval = null;

canvas.width = 1364;
canvas.height = 766;

window.addEventListener('resize', () => {
    canvas.width = 1364;
    canvas.height = 766;
    drawWorldMap();
});

mapImage.onload = () => {
    drawWorldMap();
};

function drawWorldMap() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.drawImage(mapImage, 0, 0, w, h);
}

playOilGame.addEventListener('click', () => {
    playOilGame.style.display = 'none';
    ssCharacter.style.display = 'block';
    pickaxe.style.display = 'block';
    gameStarted = true;
    ssX = window.innerWidth / 2;
    ssY = window.innerHeight / 2;
    oilDigAttempts = 2;
    updateSSPosition();
    updateMovement();
});

function updateSSPosition() {
    ssCharacter.style.left = (ssX - 40) + 'px';
    ssCharacter.style.top = (ssY - 40) + 'px';
    pickaxe.style.left = (ssX + 20) + 'px';
    pickaxe.style.top = (ssY - 10) + 'px';
}

document.addEventListener('keydown', (e) => {
    if (!gameStarted) return;
    keys[e.key] = true;
    
    if (e.key === ' ') {
        e.preventDefault();
        digForOil();
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function updateMovement() {
    if (!gameStarted) {
        requestAnimationFrame(updateMovement);
        return;
    }
    
    if (keys['ArrowUp']) {
        ssY = Math.max(40, ssY - moveSpeed);
    }
    if (keys['ArrowDown']) {
        ssY = Math.min(window.innerHeight - 40, ssY + moveSpeed);
    }
    if (keys['ArrowLeft']) {
        ssX = Math.max(40, ssX - moveSpeed);
    }
    if (keys['ArrowRight']) {
        ssX = Math.min(window.innerWidth - 40, ssX + moveSpeed);
    }
    
    updateSSPosition();
    requestAnimationFrame(updateMovement);
}

updateMovement();

function digForOil() {
    if (oilDigAttempts <= 0) {
        ctx.fillStyle = '#ff0000';
        ctx.font = '24px Arial';
        ctx.fillText('No attempts left!', ssX + 15, ssY);
        setTimeout(() => drawWorldMap(), 1000);
        return;
    }
    
    const chance = Math.random();
    if (chance < 0.15) {
        oilDigAttempts--;
        const oilAmount = Math.floor(Math.random() * 150) + 50;
        currentOilReserve = Math.floor(Math.random() * 5000) + 2000;
        
        const locations = ['USA', 'Canada', 'Russia', 'Saudi Arabia', 'Brazil', 'Norway', 'Iraq', 'UAE', 'Kuwait', 'Venezuela'];
        currentLocation = locations[Math.floor(Math.random() * locations.length)];
        
        score += oilAmount;
        
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(ssX, ssY, 15, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#ffaa00';
        ctx.font = '32px Arial';
        ctx.fillText(`OIL FOUND!`, ssX + 20, ssY);
        
        setTimeout(() => {
            oilDimension.style.display = 'none';
            drillingGame.style.display = 'flex';
            startDrillingGame();
        }, 2000);
        
        render();
    } else {
        oilDigAttempts--;
        ctx.fillStyle = '#888888';
        ctx.font = '24px Arial';
        ctx.fillText(`No oil... (${oilDigAttempts} left)`, ssX + 15, ssY);
        setTimeout(() => drawWorldMap(), 1000);
    }
}

function drawPumpArea() {
    pumpCtx.fillStyle = '#5a4a2a';
    pumpCtx.fillRect(0, 0, 600, 500);
    
    pumpCtx.strokeStyle = '#8a7a5a';
    pumpCtx.lineWidth = 1;
    for (let i = 0; i < 600; i += 50) {
        pumpCtx.beginPath();
        pumpCtx.moveTo(i, 0);
        pumpCtx.lineTo(i, 500);
        pumpCtx.stroke();
    }
    for (let i = 0; i < 500; i += 50) {
        pumpCtx.beginPath();
        pumpCtx.moveTo(0, i);
        pumpCtx.lineTo(600, i);
        pumpCtx.stroke();
    }
    
    pumps.forEach(pump => {
        const x = pump.x;
        const y = pump.y;
        
        // Stage 1: Foundation
        if (pump.stage >= 1) {
            pumpCtx.fillStyle = '#6b5d4f';
            pumpCtx.fillRect(x - 30, y, 60, 20);
            pumpCtx.strokeStyle = '#4a3f35';
            pumpCtx.lineWidth = 2;
            pumpCtx.strokeRect(x - 30, y, 60, 20);
        }
        
        // Stage 2-4: Show partial construction
        if (pump.stage >= 2 && pump.stage < 5) {
            pumpCtx.globalAlpha = 0.3 + (pump.stage - 1) * 0.15;
            pumpCtx.drawImage(oilPumpImage, x - 40, y - 80, 80, 80);
            pumpCtx.globalAlpha = 1.0;
        }
        
        // Stage 5: Complete pump
        if (pump.stage >= 5) {
            pumpCtx.drawImage(oilPumpImage, x - 40, y - 80, 80, 80);
        }
    });
}

function updatePumpResources() {
    document.getElementById('playerMoney').textContent = playerMoney;
    document.getElementById('steelCount').textContent = steelCount;
    document.getElementById('concreteCount').textContent = concreteCount;
    document.getElementById('workerCount').textContent = workerCount;
    document.getElementById('pumpCount').textContent = pumpCount;
    
    const stages = ['Ready to start', 'Foundation poured', 'Platform built', 'Derrick erected', 'Pump installed', 'Complete'];
    document.getElementById('currentStage').textContent = stages[currentPumpStage];
}

hireWorker.addEventListener('click', () => {
    if (playerMoney >= 10000) {
        playerMoney -= 10000;
        workerCount++;
        updatePumpResources();
    }
});

gatherSteel.addEventListener('click', () => {
    if (steelCount < 100) {
        const amount = workerCount > 0 ? workerCount * 5 : 1;
        steelCount = Math.min(100, steelCount + amount);
        updatePumpResources();
    }
});

gatherConcrete.addEventListener('click', () => {
    if (concreteCount < 100) {
        const amount = workerCount > 0 ? workerCount * 5 : 1;
        concreteCount = Math.min(100, concreteCount + amount);
        updatePumpResources();
    }
});

buildFoundation.addEventListener('click', () => {
    if (pumpCount >= maxPumps) return;
    if (currentPumpStage === 0 && concreteCount >= 30) {
        concreteCount -= 30;
        currentPumpStage = 1;
        const x = 80 + (pumpCount * 110);
        const y = 420;
        pumps.push({x, y, stage: 1});
        updatePumpResources();
        drawPumpArea();
    }
});

buildPlatform.addEventListener('click', () => {
    if (currentPumpStage === 1 && steelCount >= 20 && concreteCount >= 10) {
        steelCount -= 20;
        concreteCount -= 10;
        currentPumpStage = 2;
        pumps[pumps.length - 1].stage = 2;
        updatePumpResources();
        drawPumpArea();
    }
});

buildDerrick.addEventListener('click', () => {
    if (currentPumpStage === 2 && steelCount >= 40) {
        steelCount -= 40;
        currentPumpStage = 3;
        pumps[pumps.length - 1].stage = 3;
        updatePumpResources();
        drawPumpArea();
    }
});

installPump.addEventListener('click', () => {
    if (currentPumpStage === 3 && steelCount >= 30 && concreteCount >= 20) {
        steelCount -= 30;
        concreteCount -= 20;
        currentPumpStage = 4;
        pumps[pumps.length - 1].stage = 4;
        updatePumpResources();
        drawPumpArea();
    }
});

connectPipes.addEventListener('click', () => {
    if (currentPumpStage === 4 && steelCount >= 20) {
        steelCount -= 20;
        currentPumpStage = 5;
        pumps[pumps.length - 1].stage = 5;
        pumpCount++;
        currentPumpStage = 0;
        updatePumpResources();
        drawPumpArea();
        
        pumpScreen.style.display = 'none';
        drillingGame.style.display = 'flex';
        startDrillingGame();
    }
});

function startDrillingGame() {
    barPosition = 0;
    barDirection = 1;
    barWidth = 80;
    greenHits = 0;
    yellowHits = 0;
    redHits = 0;
    attemptsLeft = 5;
    document.getElementById('greenHits').textContent = greenHits;
    document.getElementById('yellowHits').textContent = yellowHits;
    document.getElementById('redHits').textContent = redHits;
    document.getElementById('attemptsLeft').textContent = attemptsLeft;
    
    drillingInterval = setInterval(() => {
        barPosition += barDirection * 3;
        if (barPosition >= 600 - barWidth || barPosition <= 0) {
            barDirection *= -1;
        }
        drawDrillingBar();
    }, 20);
}

function drawDrillingBar() {
    drillingCtx.fillStyle = '#2a1a0a';
    drillingCtx.fillRect(0, 0, 600, 200);
    
    const centerX = 300;
    const greenWidth = 60;
    const yellowWidth = 40;
    const redWidth = 30;
    
    // Red zones
    drillingCtx.fillStyle = '#ff0000';
    drillingCtx.fillRect(centerX - greenWidth/2 - yellowWidth - redWidth, 50, redWidth, 100);
    drillingCtx.fillRect(centerX + greenWidth/2 + yellowWidth, 50, redWidth, 100);
    
    // Yellow zones
    drillingCtx.fillStyle = '#ffff00';
    drillingCtx.fillRect(centerX - greenWidth/2 - yellowWidth, 50, yellowWidth, 100);
    drillingCtx.fillRect(centerX + greenWidth/2, 50, yellowWidth, 100);
    
    // Green zone
    drillingCtx.fillStyle = '#00ff00';
    drillingCtx.fillRect(centerX - greenWidth/2, 50, greenWidth, 100);
    
    // Moving bar
    drillingCtx.fillStyle = '#ffffff';
    drillingCtx.fillRect(barPosition, 70, barWidth, 60);
}

hitButton.addEventListener('click', () => {
    if (attemptsLeft <= 0) return;
    
    const centerX = 300;
    const greenWidth = 60;
    const yellowWidth = 40;
    const redWidth = 30;
    const barCenter = barPosition + barWidth/2;
    
    // Check which zone was hit
    if (Math.abs(barCenter - centerX) <= greenWidth/2) {
        greenHits++;
        document.getElementById('greenHits').textContent = greenHits;
    } else if (Math.abs(barCenter - centerX) <= greenWidth/2 + yellowWidth) {
        yellowHits++;
        document.getElementById('yellowHits').textContent = yellowHits;
    } else {
        redHits++;
        document.getElementById('redHits').textContent = redHits;
    }
    
    attemptsLeft--;
    document.getElementById('attemptsLeft').textContent = attemptsLeft;
    barWidth = Math.max(20, barWidth - 12);
    
    if (attemptsLeft <= 0) {
        clearInterval(drillingInterval);
        
        let quality = 'normal';
        let oilAmount = currentOilReserve;
        
        if (greenHits === 5) {
            quality = 'BOOST';
            oilAmount *= 2;
            alert(`PERFECT! Boosted production! 2x speed! +${oilAmount} oil!`);
        } else if (yellowHits >= 3) {
            quality = 'normal';
            const breakdown = Math.random() < 0.3;
            if (breakdown) {
                oilAmount = Math.floor(oilAmount * 0.75);
                alert(`Pump broke down! Repairs needed. Only +${oilAmount} oil.`);
            } else {
                alert(`Normal production. +${oilAmount} oil.`);
            }
        } else if (redHits >= 3) {
            quality = 'minimum';
            oilAmount = Math.floor(oilAmount * 0.3);
            const breakdown = Math.random() < 0.7;
            if (breakdown) {
                oilAmount = Math.floor(oilAmount * 0.5);
                alert(`BREAKDOWN! Minimum oil + repairs! Only +${oilAmount} oil.`);
            } else {
                alert(`Minimum production. +${oilAmount} oil.`);
            }
        } else {
            alert(`Mixed results. +${oilAmount} oil.`);
        }
        
        score += oilAmount;
        drillingGame.style.display = 'none';
        oilDimension.style.display = 'flex';
        render();
    }
});

finishBuilding.addEventListener('click', () => {
    const totalOil = currentOilReserve * pumpCount;
    score = playerMoney + totalOil;
    alert(`Collected ${totalOil} oil from ${pumpCount} pumps!`);
    pumpScreen.style.display = 'none';
    oilDimension.style.display = 'flex';
    drawWorldMap();
    render();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && oilDimension.style.display === 'flex') {
        oilDimension.style.display = 'none';
        gameContainer.style.display = 'flex';
    }
});

function render() {
    scoreEl.textContent = Math.floor(score);
    perClickEl.textContent = clickPower;
    perSecondEl.textContent = autoClickerActive ? '3 per 10s' : '0';
    
    // Check if went into debt
    if (score < 0 && !inDebt) {
        inDebt = true;
        debtCountdown = 30;
        debtWarning.style.display = 'block';
        bgMusic.pause();
        virusSound.play();
        startDebtCountdown();
    } else if (score >= 0 && inDebt) {
        inDebt = false;
        debtWarning.style.display = 'none';
        virusSound.pause();
        virusSound.currentTime = 0;
        bgMusic.play();
        if (debtInterval) clearInterval(debtInterval);
        document.body.style.filter = 'brightness(1)';
    }
    
    // Show/hide lock on OIL button based on debt
    if (score < 0) {
        oilLock.style.display = 'none';
    } else {
        oilLock.style.display = 'flex';
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
    
    updateStats();
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

// Tab switching
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tab = button.dataset.tab;
        document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.upgrade-content').forEach(c => c.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(tab + 'Tab').classList.add('active');
    });
});

// Oily upgrades
document.getElementById('oily1').addEventListener('click', () => {
    if (score >= 50000) {
        score -= 50000;
        oily1Count++;
        setInterval(() => {
            score += 10;
            totalScore += 10;
            render();
        }, 5000);
        render();
    }
});

document.getElementById('oily2').addEventListener('click', () => {
    if (score >= 100000) {
        score -= 100000;
        oily2Count++;
        setInterval(() => {
            score += 25;
            totalScore += 25;
            render();
        }, 5000);
        render();
    }
});

document.getElementById('oily3').addEventListener('click', () => {
    if (score >= 500000) {
        score -= 500000;
        oily3Count++;
        setInterval(() => {
            score += 100;
            totalScore += 100;
            render();
        }, 5000);
        render();
    }
});

// Update stats display
function updateStats() {
    document.getElementById('totalClicks').textContent = totalClicks;
}


// Wheel of Fortune
let wheelCooldown = parseInt(localStorage.getItem('wheelCooldown')) || 0;
let wheelInterval = null;

const wheelButton = document.getElementById('wheelButton');
const wheelOverlay = document.getElementById('wheelOverlay');
const wheelCanvas = document.getElementById('wheelCanvas');
const spinButton = document.getElementById('spinButton');
const closeWheel = document.getElementById('closeWheel');
const wheelTimer = document.getElementById('wheelTimer');

const prizes = [
    { text: 'LOSE ALL', color: '#000' },
    { text: 'TRUMP QUIZ', color: '#FF6B6B' },
    { text: 'EXECUTED', color: '#8B0000' },
    { text: 'DOWNGRADE', color: '#FF8C00' },
    { text: '+10', color: '#4CAF50' },
    { text: 'JACKPOT', color: '#FFD700' },
    { text: 'AUTO CLICK', color: '#2196F3' },
    { text: 'FINAL QUEST', color: '#9C27B0' }
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
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(currentRotation);

    prizes.forEach((prize, i) => {
        ctx.beginPath();
        ctx.arc(0, 0, radius, i * sliceAngle, (i + 1) * sliceAngle);
        ctx.lineTo(0, 0);
        ctx.fillStyle = prize.color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.save();
        ctx.rotate(i * sliceAngle + sliceAngle / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(prize.text, radius / 1.5, 0);
        ctx.restore();
    });

    ctx.restore();

    // Draw pointer at bottom pointing up
    ctx.fillStyle = '#FF0000';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, 430);
    ctx.lineTo(centerX - 20, 480);
    ctx.lineTo(centerX + 20, 480);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
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
    spinButton.disabled = true;
    
    const spins = 5 + Math.random() * 5;
    const finalRotation = currentRotation + spins * 2 * Math.PI + Math.random() * 2 * Math.PI;
    const duration = 5000;
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        
        currentRotation = currentRotation + (finalRotation - currentRotation) * eased;
        drawWheel();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            const normalizedRotation = (currentRotation % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
            const sliceAngle = (2 * Math.PI) / prizes.length;
            const pointerAngle = (2 * Math.PI - normalizedRotation + Math.PI / 2) % (2 * Math.PI);
            const prizeIndex = Math.floor(pointerAngle / sliceAngle);
            
            handlePrize(prizes[prizeIndex].text);
            
            isSpinning = false;
            spinButton.disabled = false;
            wheelCooldown = 3600;
            
            setTimeout(() => {
                wheelOverlay.style.display = 'none';
            }, 2000);
        }
    }
    
    animate();
});

function handlePrize(prize) {
    alert('You got: ' + prize);
    
    switch(prize) {
        case 'LOSE ALL':
            score = 0;
            break;
        case 'TRUMP QUIZ':
            showTrumpQuiz();
            break;
        case 'EXECUTED':
            score = Math.max(0, score - 5000);
            break;
        case 'DOWNGRADE':
            clickPower = Math.max(1, clickPower - 1);
            break;
        case '+10':
            clickPower *= 10;
            alert('Your click power is now 10x! New power: ' + clickPower);
            break;
        case 'JACKPOT':
            const jackpot = score * 10;
            score += jackpot;
            alert('JACKPOT: 10x your score! +' + jackpot);
            break;
        case 'AUTO CLICK':
            let autoClicks = 0;
            const autoInterval = setInterval(() => {
                score += 1;
                autoClicks++;
                render();
                if (autoClicks >= 60) clearInterval(autoInterval);
            }, 2000);
            break;
        case 'FINAL QUEST':
            alert('FINAL QUEST: Coming soon!');
            break;
    }
    
    render();
}

wheelInterval = setInterval(updateWheelTimer, 1000);
updateWheelTimer();
