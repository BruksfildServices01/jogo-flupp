document.addEventListener("DOMContentLoaded", function() {
    let gameCanvas = document.getElementById("gameCanvas");
    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;
    const ctx = gameCanvas.getContext("2d");

    let birdY = gameCanvas.height / 2;
    let birdVelocity = 0;
    let gravity = 0.25;
    let score = 0;
    let isGameOver = false;

    window.addEventListener("keydown", function(e) {
        if (e.code === "Space") {
            birdVelocity = -7;
        }
        if (e.code === "ArrowDown") {
            birdVelocity = 5;
        }
    });

    let obstacles = [];
    for(let i = 0; i < 5; i++) { // Aumentei o número de obstáculos para 5
        obstacles.push({
            x: gameCanvas.width + i * 300,
            height: Math.random() * (gameCanvas.height - 200) + 50,
            counted: false
        });
    }

    function resetGame() {
        birdY = gameCanvas.height / 2;
        birdVelocity = 0;
        score = 0;
        isGameOver = false;
        obstacles.forEach((obs, i) => {
            obs.x = gameCanvas.width + i * 300;
            obs.height = Math.random() * (gameCanvas.height - 200) + 50;
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
                obs.x = gameCanvas.width;
                obs.height = Math.random() * (gameCanvas.height - 200) + 50;
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
