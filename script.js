// Canvas & Context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// UI Elements
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const livesEl = document.getElementById('lives');
const levelEl = document.getElementById('level');

// Overlay Screens
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const levelCompleteScreen = document.getElementById('levelCompleteScreen');
const winScreen = document.getElementById('winScreen');
const finalScoreEl = document.getElementById('finalScore');

// Buttons
const startGameButton = document.getElementById('startGameButton');
const playAgainButton = document.getElementById('playAgainButton');
const playAgainWinButton = document.getElementById('playAgainWinButton');

// Game Constants
const TILE_SIZE = 20;
const PELLET_RADIUS = 2;
const POWER_PELLET_RADIUS = 6;
const MAX_LEVELS = 3;

// Maze Definitions (L1_MAZE is primary, others can be simplified versions or variations)
const L1_MAZE_TEMPLATE = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
    [0,3,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,3,0],
    [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,2,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,2,0],
    [0,2,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,2,0],
    [0,2,2,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,2,2,0],
    [0,0,0,0,0,0,2,0,0,0,0,0,1,0,0,1,0,0,0,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,0,0,0,1,0,0,1,0,0,0,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,1,1,1,1,1,1,1,1,1,1,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,1,0,0,0,5,5,0,0,0,1,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,1,0,4,4,4,4,4,4,0,1,0,0,2,0,0,0,0,0,0],
    [1,1,1,1,1,1,2,1,1,1,0,4,4,4,4,4,4,0,1,1,1,2,1,1,1,1,1,1],
    [0,0,0,0,0,0,2,0,0,1,0,4,4,4,4,4,4,0,1,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,1,1,1,1,1,1,1,1,1,1,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
    [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
    [0,3,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,3,0],
    [0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0],
    [0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0],
    [0,2,2,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,2,2,0],
    [0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0],
    [0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];
// For simplicity, levels 2 and 3 will use the same maze layout as Level 1.
// Difficulty will be adjusted by ghost speed and frightened duration.
const MAZE_LAYOUTS = {
    1: L1_MAZE_TEMPLATE,
    2: L1_MAZE_TEMPLATE, // Can be a different array for a different maze
    3: L1_MAZE_TEMPLATE  // Can be a different array for a different maze
};
let currentMaze = JSON.parse(JSON.stringify(MAZE_LAYOUTS[1]));

// Level-specific settings
const LEVEL_SETTINGS = [
    { level: 1, ghostSpeed: 1.6, frightenedDuration: 8 * 60 }, // 8 seconds
    { level: 2, ghostSpeed: 1.8, frightenedDuration: 5 * 60 }, // 5 seconds
    { level: 3, ghostSpeed: 2.0, frightenedDuration: 3 * 60 }  // 3 seconds
];

// Game State Variables
let score = 0;
let highScore = 0;
let currentLevel = 1;
let gameRunning = false;
let eatenGhostScoreMultiplier = 1;

const pacMan = {
    x: 0, y: 0, radius: TILE_SIZE / 2 - 2, speed: 2, dx: 0, dy: 0,
    nextDx: 0, nextDy: 0, mouthOpenValue: 0, mouthOpenSpeed: 0.07,
    color: 'yellow', lives: 3, stuck: false
};

const GHOST_COLORS = ['red', '#FFB8FF', '#00FFFF', '#FFB851'];
const GHOST_AIS = ['blinky', 'pinky', 'inky', 'clyde'];
const GHOST_START_POSITIONS = [
    { x: 13.5, y: 11.5, startOutside: true }, { x: 13.5, y: 14.5, startOutside: false },
    { x: 11.5, y: 14.5, startOutside: false },{ x: 15.5, y: 14.5, startOutside: false }
];
const GHOST_HOUSE_EXIT_POS = { x: 13.5, y: 11.5 };
const GHOST_HOUSE_CENTER_POS = { x: 13.5, y: 14.5 };
const ghosts = [];
const GHOST_MODES = { SCATTER: 'scatter', CHASE: 'chase', FRIGHTENED: 'frightened', EATEN: 'eaten', HOUSE: 'house' };
const MODE_SCHEDULE = [
    { mode: GHOST_MODES.SCATTER, duration: 7 * 60 }, { mode: GHOST_MODES.CHASE, duration: 20 * 60 },
    { mode: GHOST_MODES.SCATTER, duration: 7 * 60 }, { mode: GHOST_MODES.CHASE, duration: 20 * 60 },
    { mode: GHOST_MODES.SCATTER, duration: 5 * 60 }, { mode: GHOST_MODES.CHASE, duration: 20 * 60 },
    { mode: GHOST_MODES.SCATTER, duration: 5 * 60 }, { mode: GHOST_MODES.CHASE, duration: Infinity }
];
let globalModeIndex = 0;
let globalModeTimer = 0;

function createGhost(id, color, startX, startY, aiType, startOutside, speed) {
    return {
        id: id, startPixelX: startX * TILE_SIZE, startPixelY: startY * TILE_SIZE,
        x: startX * TILE_SIZE, y: startY * TILE_SIZE,
        radius: pacMan.radius - 1, speed: speed, baseSpeed: speed,
        dx: 0, dy: startOutside ? -1 : 0,
        color: color, aiType: aiType, isFrightened: false, frightenedTimer: 0, isEaten: false,
        targetTile: { x: 0, y: 0 }, scatterTarget: { x: 0, y: 0 },
        mode: startOutside ? MODE_SCHEDULE[0].mode : GHOST_MODES.HOUSE,
        canUseDoor: startOutside, startOutside: startOutside
    };
}

function initializeGhosts() {
    ghosts.length = 0;
    const levelConfig = LEVEL_SETTINGS[currentLevel - 1];
    const mazeWidth = currentMaze[0].length; const mazeHeight = currentMaze.length;

    GHOST_START_POSITIONS.forEach((pos, index) => {
        let g = createGhost(index, GHOST_COLORS[index], pos.x, pos.y, GHOST_AIS[index], pos.startOutside, levelConfig.ghostSpeed);
        if (g.aiType === 'blinky') g.scatterTarget = { x: mazeWidth - 2, y: 1 };
        else if (g.aiType === 'pinky') g.scatterTarget = { x: 1, y: 1 };
        else if (g.aiType === 'inky') g.scatterTarget = { x: mazeWidth - 2, y: mazeHeight - 2 };
        else if (g.aiType === 'clyde') g.scatterTarget = { x: 1, y: mazeHeight - 2 };
        ghosts.push(g);
    });
    globalModeIndex = 0; globalModeTimer = MODE_SCHEDULE[globalModeIndex].duration;
    ghosts.forEach(g => { if (g.startOutside) g.mode = MODE_SCHEDULE[globalModeIndex].mode; });
}

function switchGlobalGhostMode() { /* ... (same as before) ... */
    globalModeIndex++;
    if (globalModeIndex >= MODE_SCHEDULE.length) globalModeIndex = MODE_SCHEDULE.length - 1;
    const newGlobalMode = MODE_SCHEDULE[globalModeIndex].mode;
    globalModeTimer = MODE_SCHEDULE[globalModeIndex].duration;
    ghosts.forEach(ghost => {
        if (!ghost.isFrightened && ghost.mode !== GHOST_MODES.EATEN && ghost.mode !== GHOST_MODES.HOUSE) {
            ghost.mode = newGlobalMode;
            if (ghost.dx !== 0 || ghost.dy !== 0) { ghost.dx = -ghost.dx; ghost.dy = -ghost.dy; }
        }
    });
}
function setPacmanInitialPosition() { /* ... (same as before) ... */
    pacMan.x = 13.5 * TILE_SIZE; pacMan.y = 23.5 * TILE_SIZE;
    pacMan.dx = 0; pacMan.dy = 0; pacMan.nextDx = 0; pacMan.nextDy = 0;
}
function setCanvasSize() { /* ... (same as before) ... */
    canvas.width = currentMaze[0].length*TILE_SIZE; canvas.height = currentMaze.length*TILE_SIZE;
}
function drawMaze() { /* ... (same as before) ... */
    for (let r = 0; r < currentMaze.length; r++) {
        for (let c = 0; c < currentMaze[r].length; c++) {
            const tile = currentMaze[r][c];
            const x = c * TILE_SIZE; const y = r * TILE_SIZE;
            if (tile === 0) { ctx.fillStyle = 'blue'; ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE); }
            else { ctx.fillStyle = 'black'; ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE); }
        }
    }
}
function drawCollectibles() { /* ... (same as before) ... */
    for (let r = 0; r < currentMaze.length; r++) {
        for (let c = 0; c < currentMaze[r].length; c++) {
            const tile = currentMaze[r][c];
            const x = c * TILE_SIZE + TILE_SIZE / 2; const y = r * TILE_SIZE + TILE_SIZE / 2;
            if (tile === 2) {
                ctx.beginPath(); ctx.arc(x, y, PELLET_RADIUS, 0, Math.PI * 2);
                ctx.fillStyle = 'white'; ctx.fill(); ctx.closePath();
            } else if (tile === 3) {
                ctx.beginPath(); ctx.arc(x, y, POWER_PELLET_RADIUS, 0, Math.PI * 2);
                ctx.fillStyle = Math.floor(Date.now() / 150) % 2 === 0 ? '#FFD700' : '#FFA500';
                ctx.fill(); ctx.closePath();
            }
        }
    }
}
function updateUI() { /* ... (same as before) ... */
    scoreEl.textContent = score; highScoreEl.textContent = highScore;
    livesEl.textContent = pacMan.lives; levelEl.textContent = currentLevel;
}

function setupLevel(levelNum) {
    currentLevel = levelNum;
    const levelConfig = LEVEL_SETTINGS[currentLevel - 1];
    if (!levelConfig) { // Should not happen if MAX_LEVELS is respected
        console.error("Invalid level configuration for level: " + currentLevel);
        // Default to last known good config or handle error
        return;
    }

    currentMaze = JSON.parse(JSON.stringify(MAZE_LAYOUTS[currentLevel]));
    setCanvasSize(); // Important if maze dimensions change per level
    setPacmanInitialPosition();
    initializeGhosts(); // Ghosts will get speed from levelConfig

    pacMan.dx = 0; pacMan.dy = 0; pacMan.nextDx = 0; pacMan.nextDy = 0;
    updateUI();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze(); drawCollectibles(); drawPacMan(); drawGhosts();
    console.log(`Setting up Level ${currentLevel}. Ghost speed: ${levelConfig.ghostSpeed}, Fright time: ${levelConfig.frightenedDuration/60}s`);
}

function fullGameReset() {
    resetGameVariables();
    setupLevel(1);
    updateUI();
}

function resetGameVariables() {
    score = 0; pacMan.lives = 3; currentLevel = 1;
    eatenGhostScoreMultiplier = 1;
    // highScore is preserved
}

function resetPositionsForCurrentLevelAfterLifeLost() {
    setPacmanInitialPosition();
    initializeGhosts();
    pacMan.dx = 0; pacMan.dy = 0; pacMan.nextDx = 0; pacMan.nextDy = 0;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawMaze(); drawCollectibles(); drawPacMan(); drawGhosts();
    updateUI();
}

function pacManLosesLife() { /* ... (same as before) ... */
    pacMan.lives--;
    updateUI();
    gameRunning = false;
    if (pacMan.lives <= 0) {
        setTimeout(() => {
             gameOverScreen.style.display = 'flex';
             finalScoreEl.textContent = score; // Ensure final score is on game over screen
             console.log("Game Over!");
        }, 500);
    } else {
        setTimeout(() => {
            resetPositionsForCurrentLevelAfterLifeLost();
            gameRunning = true;
            requestAnimationFrame(gameLoop);
        }, 1500);
    }
}

// --- Event Listeners ---
startGameButton.addEventListener('click', () => {
    startScreen.style.display = 'none'; fullGameReset();
    gameRunning = true; console.log("Game Started!");
    requestAnimationFrame(gameLoop);
});
playAgainButton.addEventListener('click', () => {
    gameOverScreen.style.display = 'none'; fullGameReset();
    gameRunning = true; requestAnimationFrame(gameLoop);
});
playAgainWinButton.addEventListener('click', () => {
    winScreen.style.display = 'none'; fullGameReset();
    gameRunning = true; requestAnimationFrame(gameLoop);
});
window.addEventListener('load', initialScreenSetup);

// --- Drawing and Update Logic (mostly same as before) ---
function drawPacMan() { /* ... (same as before) ... */
    ctx.save(); ctx.translate(pacMan.x, pacMan.y);
    let angle = 0;
    if (pacMan.dx > 0) angle = 0; else if (pacMan.dx < 0) angle = Math.PI;
    else if (pacMan.dy > 0) angle = Math.PI / 2; else if (pacMan.dy < 0) angle = -Math.PI / 2;
    ctx.rotate(angle);
    pacMan.mouthOpenValue += pacMan.mouthOpenSpeed;
    if (pacMan.mouthOpenValue > 1 || pacMan.mouthOpenValue < 0) pacMan.mouthOpenSpeed *= -1;
    pacMan.mouthOpenValue = Math.max(0, Math.min(1, pacMan.mouthOpenValue));
    const mouthAngle = (Math.PI / 3.5) * pacMan.mouthOpenValue;
    ctx.beginPath(); ctx.arc(0, 0, pacMan.radius, mouthAngle, Math.PI * 2 - mouthAngle);
    ctx.lineTo(0, 0); ctx.fillStyle = pacMan.color; ctx.fill(); ctx.closePath();
    ctx.restore();
}
function canPacManMove(targetPixelX, targetPixelY, dx, dy) { /* ... (same as before) ... */
    const checks = [ {x: targetPixelX, y: targetPixelY}, {x: targetPixelX + dx*pacMan.radius*0.9, y: targetPixelY + dy*pacMan.radius*0.9} ];
    if (dx !== 0) {
        checks.push({x: targetPixelX + dx*pacMan.radius*0.9, y: targetPixelY - pacMan.radius*0.9});
        checks.push({x: targetPixelX + dx*pacMan.radius*0.9, y: targetPixelY + pacMan.radius*0.9});
    }
    if (dy !== 0) {
        checks.push({x: targetPixelX - pacMan.radius*0.9, y: targetPixelY + dy*pacMan.radius*0.9});
        checks.push({x: targetPixelX + pacMan.radius*0.9, y: targetPixelY + dy*pacMan.radius*0.9});
    }
    for (const check of checks) {
        if (isWall(Math.floor(check.x/TILE_SIZE), Math.floor(check.y/TILE_SIZE))) return false;
    }
    return true;
}
function updatePacManPosition() { /* ... (same as before) ... */
    const curGridX = Math.floor(pacMan.x/TILE_SIZE); const curGridY = Math.floor(pacMan.y/TILE_SIZE);
    const tileCenterX = (curGridX + 0.5)*TILE_SIZE; const tileCenterY = (curGridY + 0.5)*TILE_SIZE;
    const centerTol = pacMan.speed;

    if (Math.abs(pacMan.x - tileCenterX) < centerTol && Math.abs(pacMan.y - tileCenterY) < centerTol) {
        if ((pacMan.nextDx !== 0 || pacMan.nextDy !== 0) &&
            canPacManMove(tileCenterX + pacMan.nextDx*pacMan.speed, tileCenterY + pacMan.nextDy*pacMan.speed, pacMan.nextDx, pacMan.nextDy)) {
            pacMan.x = tileCenterX; pacMan.y = tileCenterY;
            pacMan.dx = pacMan.nextDx; pacMan.dy = pacMan.nextDy;
            pacMan.nextDx = 0; pacMan.nextDy = 0;
        }
    }
    const newX = pacMan.x + pacMan.dx*pacMan.speed; const newY = pacMan.y + pacMan.dy*pacMan.speed;
    if (canPacManMove(newX, newY, pacMan.dx, pacMan.dy)) { pacMan.x = newX; pacMan.y = newY; }
    else { pacMan.x = tileCenterX; pacMan.y = tileCenterY; pacMan.dx = 0; pacMan.dy = 0; }

    if (pacMan.x > canvas.width - pacMan.radius/2) pacMan.x = pacMan.radius/2;
    else if (pacMan.x < pacMan.radius/2) pacMan.x = canvas.width - pacMan.radius/2;
    checkPelletCollision();
}
function checkPelletCollision() {
    const gridX = Math.floor(pacMan.x/TILE_SIZE); const gridY = Math.floor(pacMan.y/TILE_SIZE);
    if (gridX < 0 || gridX >= currentMaze[0].length || gridY < 0 || gridY >= currentMaze.length) return;
    const tile = currentMaze[gridY][gridX];
    if (tile === 2) {
        currentMaze[gridY][gridX] = 1; score += 10; updateUI();
        checkLevelComplete();
    } else if (tile === 3) {
        currentMaze[gridY][gridX] = 1; score += 50; eatenGhostScoreMultiplier = 1;
        const levelConfig = LEVEL_SETTINGS[currentLevel - 1];
        let frightDuration = levelConfig.frightenedDuration;
        ghosts.forEach(ghost => {
            if (ghost.mode !== GHOST_MODES.EATEN && ghost.mode !== GHOST_MODES.HOUSE) {
                ghost.isFrightened = true; ghost.frightenedTimer = frightDuration;
                ghost.mode = GHOST_MODES.FRIGHTENED;
                ghost.speed = ghost.baseSpeed * 0.7; // Frightened speed could also be per-level
                if (ghost.dx !==0 || ghost.dy !==0) {ghost.dx = -ghost.dx; ghost.dy = -ghost.dy;}
            }
        });
        console.log("Power Pellet Eaten! Ghosts Frightened."); updateUI();
        checkLevelComplete();
    }
    if (score > highScore) { highScore = score; updateUI(); }
}
document.addEventListener('keydown', (e) => { /* ... (same as before) ... */
    if (!gameRunning) return; let moved = false;
    if (e.key==='ArrowUp'||e.key.toLowerCase()==='w') {pacMan.nextDx=0;pacMan.nextDy=-1;moved=true;}
    else if (e.key==='ArrowDown'||e.key.toLowerCase()==='s') {pacMan.nextDx=0;pacMan.nextDy=1;moved=true;}
    else if (e.key==='ArrowLeft'||e.key.toLowerCase()==='a') {pacMan.nextDx=-1;pacMan.nextDy=0;moved=true;}
    else if (e.key==='ArrowRight'||e.key.toLowerCase()==='d') {pacMan.nextDx=1;pacMan.nextDy=0;moved=true;}
    if (moved) {
        if ((pacMan.dx===0 && pacMan.dy===0) || (pacMan.nextDx===-pacMan.dx && pacMan.nextDy===-pacMan.dy) ) {
            const curX=Math.floor(pacMan.x/TILE_SIZE); const curY=Math.floor(pacMan.y/TILE_SIZE);
            const cenX=(curX+0.5)*TILE_SIZE; const cenY=(curY+0.5)*TILE_SIZE;
            if(canPacManMove(cenX+pacMan.nextDx*pacMan.speed,cenY+pacMan.nextDy*pacMan.speed,pacMan.nextDx,pacMan.nextDy)){
                pacMan.x=cenX; pacMan.y=cenY; pacMan.dx=pacMan.nextDx; pacMan.dy=pacMan.nextDy;
                pacMan.nextDx=0; pacMan.nextDy=0;
            }
        }
        e.preventDefault();
    }
});
function drawGhost(ghost) { /* ... (same as before) ... */
    ctx.save(); ctx.translate(ghost.x, ghost.y);
    const bodyH = ghost.radius*1.8; const headR = ghost.radius; let fill = ghost.color;
    if(ghost.isFrightened){ const flashTime=2*60; fill = (ghost.frightenedTimer<flashTime && Math.floor(ghost.frightenedTimer/15)%2===0) ? 'white':'#2121DE';}
    if(ghost.mode===GHOST_MODES.EATEN){} else {
        ctx.beginPath(); ctx.arc(0,0,headR,Math.PI,0); ctx.lineTo(headR,bodyH*0.6);
        ctx.quadraticCurveTo(headR*0.66,bodyH*0.85,headR*0.33,bodyH*0.6);
        ctx.quadraticCurveTo(0,bodyH*0.85,-headR*0.33,bodyH*0.6);
        ctx.quadraticCurveTo(-headR*0.66,bodyH*0.85,-headR,bodyH*0.6);
        ctx.lineTo(-headR,0); ctx.closePath(); ctx.fillStyle=fill; ctx.fill();
    }
    const eyeR=headR/2.2; const eyeOffX=headR/2.3; const eyeOffY=-headR/6;
    ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(-eyeOffX,eyeOffY,eyeR,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(eyeOffX,eyeOffY,eyeR,0,Math.PI*2); ctx.fill();
    const pupilR=eyeR/2.2; ctx.fillStyle=ghost.mode===GHOST_MODES.EATEN?'gray':'black';
    let pDx=ghost.dx, pDy=ghost.dy;
    if(pDx===0&&pDy===0){ const tX=ghost.targetTile.x*TILE_SIZE+TILE_SIZE/2-ghost.x; const tY=ghost.targetTile.y*TILE_SIZE+TILE_SIZE/2-ghost.y; if(Math.abs(tX)>Math.abs(tY)){pDx=Math.sign(tX);pDy=0;}else{pDy=Math.sign(tY);pDx=0;} if(pDx===0&&pDy===0)pDx=1;}
    const pSX=pDx*pupilR*0.5; const pSY=pDy*pupilR*0.5;
    ctx.beginPath();ctx.arc(-eyeOffX+pSX,eyeOffY+pSY,pupilR,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(eyeOffX+pSX,eyeOffY+pSY,pupilR,0,Math.PI*2);ctx.fill();
    ctx.restore();
}
function drawGhosts() { ghosts.forEach(drawGhost); }
function isGhostAllowedTile(g,gX,gY){ /* ... (same as before) ... */
    if(gX<0||gX>=currentMaze[0].length||gY<0||gY>=currentMaze.length)return false; const tile=currentMaze[gY][gX]; if(tile===0)return false; if(tile===4)return g.mode===GHOST_MODES.EATEN||(g.mode===GHOST_MODES.HOUSE); if(tile===5)return g.canUseDoor||g.mode===GHOST_MODES.EATEN||g.mode===GHOST_MODES.HOUSE; return true;
}
function getPossibleGhostMoves(g){ /* ... (same as before) ... */
    const poss=[]; const dirs=[{dx:0,dy:-1},{dx:-1,dy:0},{dx:0,dy:1},{dx:1,dy:0}]; const gG=getGridCoords(g.x,g.y); dirs.forEach(dir=>{if(g.mode!==GHOST_MODES.FRIGHTENED&&g.mode!==GHOST_MODES.EATEN&&g.mode!==GHOST_MODES.HOUSE){if(dir.dx===-g.dx&&dir.dy===-g.dy&&(g.dx!==0||g.dy!==0))return;} if(isGhostAllowedTile(g,gG.x+dir.dx,gG.y+dir.dy))poss.push(dir);}); return poss;
}
function chooseNextGhostDirection(g){ /* ... (same as before) ... */
    const cg=getGridCoords(g.x,g.y); let bm=null; let mDSq=Infinity; const mov=getPossibleGhostMoves(g); if(mov.length===0){g.dx=-g.dx;g.dy=-g.dy;return;} if(mov.length===1){g.dx=mov[0].dx;g.dy=mov[0].dy;return;} mov.forEach(m=>{const nX=cg.x+m.dx;const nY=cg.y+m.dy;const dSq=Math.pow(nX-g.targetTile.x,2)+Math.pow(nY-g.targetTile.y,2); if(dSq<mDSq){mDSq=dSq;bm=m;}}); if(bm){g.dx=bm.dx;g.dy=bm.dy;}else if(mov.length>0){g.dx=mov[0].dx;g.dy=mov[0].dy;}
}
function updateGhostAIAndTarget(g){ /* ... (same as before) ... */
    const pG=getGridCoords(pacMan.x,pacMan.y); const gG=getGridCoords(g.x,g.y); if(g.isFrightened){g.mode=GHOST_MODES.FRIGHTENED;g.frightenedTimer--; if(g.frightenedTimer<=0){g.isFrightened=false;g.speed=g.baseSpeed;g.mode=MODE_SCHEDULE[globalModeIndex].mode;}} switch(g.mode){case GHOST_MODES.EATEN:g.speed=4.5;g.canUseDoor=true; const hET={x:Math.floor(GHOST_HOUSE_EXIT_POS.x),y:Math.floor(GHOST_HOUSE_EXIT_POS.y)}; g.targetTile=hET; if(gG.x===hET.x&&gG.y===hET.y){g.targetTile={x:Math.floor(g.startPixelX/TILE_SIZE),y:Math.floor(g.startPixelY/TILE_SIZE)};} if(gG.x===Math.floor(g.startPixelX/TILE_SIZE)&&gG.y===Math.floor(g.startPixelY/TILE_SIZE)){g.isEaten=false;g.mode=GHOST_MODES.HOUSE;g.speed=g.baseSpeed;g.x=g.startPixelX;g.y=g.startPixelY;} break; case GHOST_MODES.HOUSE:g.canUseDoor=true;g.targetTile={x:Math.floor(GHOST_HOUSE_EXIT_POS.x),y:Math.floor(GHOST_HOUSE_EXIT_POS.y)}; if(gG.x===g.targetTile.x&&gG.y===g.targetTile.y){g.x=GHOST_HOUSE_EXIT_POS.x*TILE_SIZE;g.y=GHOST_HOUSE_EXIT_POS.y*TILE_SIZE; g.mode=MODE_SCHEDULE[globalModeIndex].mode;g.canUseDoor=false;g.dx=0;g.dy=-1;} break; case GHOST_MODES.FRIGHTENED:break; case GHOST_MODES.SCATTER:g.targetTile=g.scatterTarget;break; case GHOST_MODES.CHASE:if(g.aiType==='blinky')g.targetTile=pG; else if(g.aiType==='pinky'){let pdx=Math.sign(pacMan.dx)||(Math.sign(pacMan.nextDx)||1);let pdy=Math.sign(pacMan.dy)||Math.sign(pacMan.nextDy);g.targetTile={x:pG.x+pdx*4,y:pG.y+pdy*4};if(pdy===-1)g.targetTile.x-=4;}else if(g.aiType==='inky'){const bG=getGridCoords(ghosts[0].x,ghosts[0].y);let pdx=Math.sign(pacMan.dx)||(Math.sign(pacMan.nextDx)||1);let pdy=Math.sign(pacMan.dy)||Math.sign(pacMan.nextDy);let twoA={x:pG.x+pdx*2,y:pG.y+pdy*2};if(pdy===-1)twoA.x-=2;g.targetTile={x:twoA.x+(twoA.x-bG.x),y:twoA.y+(twoA.y-bG.y)};}else if(g.aiType==='clyde'){const dSq=Math.pow(gG.x-pG.x,2)+Math.pow(gG.y-pG.y,2);g.targetTile=dSq>64?pG:g.scatterTarget;}break;}}
}
function updateGhostPosition(g){ /* ... (same as before) ... */
    const cgX=Math.floor(g.x/TILE_SIZE);const cgY=Math.floor(g.y/TILE_SIZE); const tcX=(cgX+0.5)*TILE_SIZE;const tcY=(cgY+0.5)*TILE_SIZE; const ct=g.speed; if(Math.abs(g.x-tcX)<ct&&Math.abs(g.y-tcY)<ct){g.x=tcX;g.y=tcY; updateGhostAIAndTarget(g); if(g.mode===GHOST_MODES.FRIGHTENED){const movs=getPossibleGhostMoves(g); if(movs.length>0){const rM=movs[Math.floor(Math.random()*movs.length)];g.dx=rM.dx;g.dy=rM.dy;}else{g.dx=-g.dx;g.dy=-g.dy;}}else{chooseNextGhostDirection(g);}} g.x+=g.dx*g.speed;g.y+=g.dy*g.speed; if(g.dx!==0&&!isGhostAllowedTile(g,cgX+g.dx,cgY)){g.x=tcX;} if(g.dy!==0&&!isGhostAllowedTile(g,cgX,cgY+g.dy)){g.y=tcY;} if(g.x>canvas.width-TILE_SIZE/2)g.x=TILE_SIZE/2; else if(g.x<TILE_SIZE/2)g.x=canvas.width-TILE_SIZE/2;
}
function checkPacManGhostCollisions() { /* ... (same as before) ... */
    if (!gameRunning) return;
    for (const ghost of ghosts) {
        if (ghost.isEaten && ghost.mode === GHOST_MODES.EATEN) continue;
        const dx = pacMan.x - ghost.x; const dy = pacMan.y - ghost.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < pacMan.radius + ghost.radius) {
            if (ghost.isFrightened) {
                ghost.isEaten = true; ghost.mode = GHOST_MODES.EATEN;
                ghost.isFrightened = false; ghost.frightenedTimer = 0;
                score += 200 * eatenGhostScoreMultiplier; eatenGhostScoreMultiplier *= 2;
                if (eatenGhostScoreMultiplier > 16) eatenGhostScoreMultiplier = 8; // Max 1600 points (200 * 8)
                if (score > highScore) highScore = score;
                updateUI(); console.log(`Ate ${ghost.aiType}! Points: ${200*(eatenGhostScoreMultiplier/2)}`);
            } else { pacManLosesLife(); return; }
        }
    }
}
function checkLevelComplete() { /* ... (same as before) ... */
    for (let r = 0; r < currentMaze.length; r++) {
        for (let c = 0; c < currentMaze[r].length; c++) {
            if (currentMaze[r][c] === 2 || currentMaze[r][c] === 3) return;
        }
    }
    gameRunning = false;
    console.log(`Level ${currentLevel} Complete!`);
    if (currentLevel < MAX_LEVELS) {
        levelCompleteScreen.style.display = 'flex';
        setTimeout(() => {
            levelCompleteScreen.style.display = 'none';
            setupLevel(currentLevel + 1);
            gameRunning = true;
            requestAnimationFrame(gameLoop);
        }, 2500);
    } else {
        winScreen.style.display = 'flex';
        const winScoreDisplay = winScreen.querySelector('p'); // Assuming there's a <p> for score
        if(winScoreDisplay) winScoreDisplay.textContent = `Final Score: ${score}`;
        console.log("You Win!");
    }
}

function gameLoop() { /* ... (same as before) ... */
    if (!gameRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatePacManPosition(); updateGhosts();
    checkPacManGhostCollisions();
    drawMaze(); drawCollectibles(); drawPacMan(); drawGhosts();
    updateUI();
    if (gameRunning) { requestAnimationFrame(gameLoop); }
}

function initialScreenSetup() { /* ... (same as before) ... */
    setCanvasSize();
    startScreen.style.display = 'flex';
    gameOverScreen.style.display = 'none';
    levelCompleteScreen.style.display = 'none';
    winScreen.style.display = 'none';
    gameRunning = false;
    fullGameReset(); // Initialize game variables like score, lives for the UI
    updateUI();
}
window.addEventListener('resize', () => { /* ... (same as before) ... */
    setCanvasSize(); drawMaze(); drawCollectibles();
});

console.log("script.js loaded with Level Progression logic.");
// initialScreenSetup is called on window load, replacing initGame directly.
