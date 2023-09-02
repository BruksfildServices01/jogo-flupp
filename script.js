document.addEventListener("DOMContentLoaded", function() {
    let gameCanvas = document.getElementById("gameCanvas");
    const downButton = document.getElementById("downButton");
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
        if (e.code === "Space") {
            birdVelocity = 5;
        }
    });

    gameCanvas.addEventListener("touchstart", function(e) {
        birdVelocity = -7;
    });

    downButton.addEventListener("click", function() {
        birdVelocity = 5;
    });

    let obstacles = [];

    let lastHeight = Math.random() * (gameCanvas.height - 300) + 100; // initial height

    for(let i = 0; i < 8; i++) { 
        let height;

        if (i % 2 === 0) { // New random height
            height = Math.random() * (gameCanvas.height - 300) + 100;
        } else { // Make height similar to last obstacle with 60% similarity
            height = lastHeight + (Math.random() * 60 - 30);
        }

        lastHeight = height;

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
                obs.x = gameCanvas.width;
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
