console.log("Connected");

// getting all div elements here 
const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');


startScreen.addEventListener('click', start);

let player = { speed: 5 , score : 0};


// getting user inputs 

let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}

function carCollosion(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function moveLines() {
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function (item) {

        if (item.y >= 700) {
            item.y -= 750;
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = " Game Over !! <br> Your final Score is " + (player.score +1) + " <br> Press here to restart .";
}

function moveOther(car) {
    let other = document.querySelectorAll('.other');

    other.forEach(function (item) {

        if (carCollosion(car, item)) {
            console.log("Collide");
            endGame();
        }

        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function gamePlay() {
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    if (player.start) {

        moveLines();
        moveOther(car);

        if (keys.ArrowUp && player.y > (road.top + 140)) { player.y -= player.speed; }
        if (keys.ArrowDown && player.y < (road.bottom - 95)) { player.y += player.speed; }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed; }
        if (keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed; }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);
        player.score++;
        score.innerText = "Score = " + player.score;
    }
}

function start() {
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for (x = 0; x < 6; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (x = 0; x < 3; x++) {
        let otherCar = document.createElement('div');
        otherCar.setAttribute('class', 'other');
        otherCar.y = ((x + 1) * 350) * -1;
        otherCar.style.top = otherCar.y + "px";
        otherCar.style.backgroundColor = randomColor();
        otherCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(otherCar);
    }
}

function randomColor(){
    function c(){
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0"+ String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();
}
