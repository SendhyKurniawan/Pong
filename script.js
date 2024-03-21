document.addEventListener("DOMContentLoaded", function () {
  const leftPaddle = document.getElementById("leftPaddle");
  const rightPaddle = document.getElementById("rightPaddle");
  const ball = document.getElementById("ball");
  const scoreboard = document.getElementById("scoreboard"); //Menambahkan constanta untuk scoreboard
  const score1 = document.getElementById("score1");
  const score2 = document.getElementById("score2");
  const startbtn = document.getElementById("startBtn"); //Menambahkan constanta untuk tombol start game

  let ballX = 300;
  let ballY = 200;
  let ballSpeedX = -5;
  let ballSpeedY = 5;
  let leftPaddleY = 150;
  let rightPaddleY = 150;
  let scorePlayer1 = 0;
  let scorePlayer2 = 0;

  const gameLoop = () => {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY > 390 || ballY < 10) {
      ballSpeedY *= -1;
    }
    // Memperbaiki bola memantul bila menyentuh paddle yang sebelumnya bola menembus paddle baru memantul
    if (ballX > 570) {
      if (ballY > rightPaddleY && ballY < rightPaddleY + 100) {
        ballSpeedX *= -1;
        //Membuat skor akan tercetak bila bola menyentuh border
      } else if (ballX == 600) {
        // Player 1 scores a point
        scorePlayer1++;
        score1.textContent = scorePlayer1;
        resetBall();
      }
    }
    // Memperbaiki bola memantul bila menyentuh paddle yang sebelumnya bola menembus paddle baru memantul
    if (ballX < 20) {
      if (ballY > leftPaddleY && ballY < leftPaddleY + 100) {
        ballSpeedX *= -1;
        //Membuat skor akan tercetak bila bola menyentuh border
      } else if (ballX == 0) {
        // Player 2 scores a point
        scorePlayer2++;
        score2.textContent = scorePlayer2;
        resetBall();
      }
    }
    if (leftPaddleY > 300) {
      leftPaddleY = 300;
    } else if (leftPaddleY < 0) {
      leftPaddleY = 0;
    }
    if (rightPaddleY > 300) {
      rightPaddleY = 300;
    } else if (rightPaddleY < 0) {
      rightPaddleY = 0;
    }

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
    leftPaddle.style.top = leftPaddleY + "px";
    rightPaddle.style.top = rightPaddleY + "px";
    requestAnimationFrame(gameLoop);
  };

  const resetBall = () => {
    ballX = 300;
    ballY = 200;
    ballSpeedX = -5;
    ballSpeedY = 5;
  };

  // Menyesuaikan kecepatan paddle
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      rightPaddleY -= 50;
    } else if (e.key === "ArrowDown") {
      rightPaddleY += 50;
    }

    if (e.key === "w") {
      leftPaddleY -= 50;
    } else if (e.key === "s") {
      leftPaddleY += 50;
    }
  });

  // Tombol Start Game
  startbtn.addEventListener("click", function () {
    gameLoop();
    // Scoreboard toggle ketika di klik start game
    scoreboard.classList.toggle("hidden");
    startbtn.classList.toggle("hidden");
    ball.classList.toggle("hidden");
  });
});
