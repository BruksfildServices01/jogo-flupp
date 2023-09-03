document.addEventListener("DOMContentLoaded", function() {
    let gameCanvas = document.getElementById("gameCanvas");
    const downButton = document.getElementById("downButton");
    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;
    const ctx = gameCanvas.getContext("2d");

    let birdY = gameCanvas.height / 2;
    let birdVelocity = 0;
    let gravity = 0.5;
    let score = 0;
    let isGameOver = false;

    function findLastObstacle(obstacles) {
        let lastObstacle = obstacles[0];
        for (let i = 1; i < obstacles.length; i++) {
            if (obstacles[i].x > lastObstacle.x) {
                lastObstacle = obstacles[i];
            }
        }
        return lastObstacle;
    }

    window.addEventListener("keydown", function(e) {
        if (e.code === "Space") {
            birdVelocity = -10;
        }
        if (e.code === "ArrowDown") {
            birdVelocity = 10;
        }
    });
    
    gameCanvas.addEventListener("touchstart", function(e) {
        birdVelocity = -10;
    });

    downButton.addEventListener("click", function() {
        birdVelocity = 10;
    });

    let obstacles = [];

    for(let i = 0; i < 8; i++) { 
        let height = Math.random() * (gameCanvas.height - 300) + 100;
        obstacles.push({
            x: gameCanvas.width + i * 250,
            height: height,
            counted: false
        });
    }

    function resetGame() {
        birdY = gameCanvas.height / 2;
        birdVelocity = 0;
        score = 0;
        isGameOver = false;
        obstacles.forEach((obs, i) => {
            obs.x = gameCanvas.width + i * 250;
            obs.height = Math.random() * (gameCanvas.height - 300) + 100;
            obs.counted = false;
        });
        draw();
    }

    function drawBird(y) {
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(100, y, 20, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawObstacle(obs) {
        ctx.fillStyle = "green";
        ctx.fillRect(obs.x, 0, 50, obs.height);
        ctx.fillRect(obs.x, obs.height + 150, 50, gameCanvas.height - obs.height);
    }

    function draw() {
        if (isGameOver) return;

        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

        birdVelocity += gravity;
        birdY += birdVelocity;

        drawBird(birdY);

        obstacles.forEach(obs => {
            drawObstacle(obs);
            obs.x -= 5;

            if (obs.x < -50) {
                let lastObstacle = findLastObstacle(obstacles);
                obs.x = lastObstacle.x + 250; // Ajuste conforme necessário
                obs.height = Math.random() * (gameCanvas.height - 300) + 100;
                obs.counted = false;
            }

            if (!obs.counted && obs.x <= 100) {
                score++;
                obs.counted = true;
            }
        });

        for(let obs of obstacles) {
            if (birdY > gameCanvas.height || birdY < 0 ||
                (obs.x < 120 && obs.x > 70 && (birdY < obs.height || birdY > obs.height + 150))) {
                isGameOver = true;
                alert("Game Over");
                resetGame();
                return;
            }
        }

        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + score, 10, 50);

        requestAnimationFrame(draw);
    }

    draw();
});
