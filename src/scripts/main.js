const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lifes"),
    },
    values:{
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 90,
        currentLife: 3,
    },
    actions: {
        countDownTimerId:setInterval(countDown, 1000),
    }
};

function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("TIME OVER!!! Your Score: " + state.values.result);
    }
}

function resetGame() {

    state.values.result = 0;
    state.values.lives = 3;
    state.values.hitPosition = null;

    state.view.score.textContent = state.values.result;
    state.view.lives.textContent = state.values.lives;
    
}

/* Feature Vida */
function lifeCount() {
    state.values.currentLife--;
    state.view.lives.textContent = state.values.currentLife;

    if (state.values.currentLife <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        resetGame();
        alert("GAME OVER! Score: " + state.values.result);
    }
}

function randomSquare () {
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy () {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
 state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
        if(square.id === state.values.hitPosition) {
            state.values.result++;
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
            playSound("hit");
        } else { 
            lifeCount();
        }
    })
 });
}

function init() {
    moveEnemy();
    addListenerHitBox();
}

init();