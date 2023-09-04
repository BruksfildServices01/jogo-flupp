document.addEventListener("DOMContentLoaded", function() {
    let gameCanvas = document.getElementById("gameCanvas");
    const downButton = document.getElementById("downButton");
    const ctx = gameCanvas.getContext("2d");
    const gameOverModal = document.getElementById("gameOverModal");
    const gameOverClose = document.getElementById("gameOverClose");
    const finalScoreElement = document.getElementById("finalScore");
    const instructionsModal = document.getElementById("instructionsModal");
    const instructionsClose = document.getElementById("instructionsClose");

    let birdY = gameCanvas.height / 2;
    let birdVelocity = 0;
    let gravity = isMobileDevice() ? 0.2 : 0.5;
    let obstacleSpeed = isMobileDevice() ? 2 : 5;
    let score = 0;
    let isGameOver = false;

    let birdRadius = isMobileDevice() ? 7 : 20;
    let birdSpeed = isMobileDevice() ? -5 : -10;
    let obstacleWidth = isMobileDevice() ? 20 : 50;
    let obstacleDistance = isMobileDevice() ? 200 : 300;
    let obstacleGap = isMobileDevice() ? 160 : 200;


    

    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }

    function resizeCanvas() {
        gameCanvas.width = window.innerWidth;
        gameCanvas.height = window.innerHeight;
        birdY = gameCanvas.height / 2;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    window.addEventListener("keydown", function(e) {
        if (e.code === "Space") {
            birdVelocity = birdSpeed;
        }
        if (e.code === "ArrowDown") {
            birdVelocity = 5;
        }
    });

    gameCanvas.addEventListener("touchstart", function(e) {
        birdVelocity = birdSpeed;
    });

    downButton.addEventListener("click", function() {
        birdVelocity = 5;
    });

    gameOverClose.addEventListener("click", function() {
        gameOverModal.style.display = "none";
        resetGame();
    });

    let obstacles = [];

    function generateObstacle() {
        let height = Math.random() * (gameCanvas.height - 150) + 50;
        return {
            x: gameCanvas.width,
            height: height,
            counted: false
        };
    }

    obstacles = Array.from({ length: 10 }, (_, i) => {
        const obstacle = generateObstacle();
        obstacle.x = gameCanvas.width + i * obstacleDistance;
        return obstacle;
    });

    function resetGame() {
        birdY = gameCanvas.height / 2;
        birdVelocity = 0;
        score = 0;
        isGameOver = false;
        obstacles.forEach((obs, i) => {
            obs.x = gameCanvas.width + i * obstacleDistance;
            obs.height = Math.random() * (gameCanvas.height - 150) + 50;
            obs.counted = false;
        });
        draw();
    }

    function showGameOverModal() {
        finalScoreElement.textContent = "Sua pontuação final é: " + score;
        gameOverModal.style.display = "block";
    }

    function drawBird(y) {
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(50, y, birdRadius, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawObstacle(obs) {
        ctx.fillStyle = "green";
        ctx.fillRect(obs.x, 0, obstacleWidth, obs.height);
        ctx.fillRect(obs.x, obs.height + obstacleGap, obstacleWidth, gameCanvas.height - obs.height);
    }

    function findLastObstacle(obstacles) {
        let lastObstacle = obstacles[0];
        for (let i = 1; i < obstacles.length; i++) {
            if (obstacles[i].x > lastObstacle.x) {
                lastObstacle = obstacles[i];
            }
        }
        return lastObstacle;
    }

    function draw() {
        if (isGameOver) return;

        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

        birdVelocity += gravity;
        birdY += birdVelocity;

        drawBird(birdY);

        obstacles.forEach(obs => {
            drawObstacle(obs);
            obs.x -= obstacleSpeed;

            if (obs.x < -obstacleWidth) {
                let lastObstacle = findLastObstacle(obstacles);
                obs.x = lastObstacle.x + obstacleDistance;
                obs.height = Math.random() * (gameCanvas.height - 150) + 50;
                obs.counted = false;
            }

            if (!obs.counted && obs.x <= 50) {
                score++;
                obs.counted = true;
            }
        });

        for (let obs of obstacles) {
            if (birdY > gameCanvas.height || birdY < 0 ||
                (obs.x < 50 + birdRadius && obs.x > 50 - birdRadius && (birdY < obs.height || birdY > obs.height + obstacleGap))) {
                isGameOver = true;
                showGameOverModal();
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
