import { useEffect, useRef, useState } from "react";
import { GameOverModal } from "./gameOverModal";
import { Start } from "./controls";

export const GameBoard = () => {
  const blockSize = 25;
  const canvasSidesLength = 17;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);

  const [snakeX, setSnakeX] = useState(blockSize * 5);
  const [snakeY, setSnakeY] = useState(blockSize * 5);
  const [speedX, setSpeedX] = useState(1);
  const [speedY, setSpeedY] = useState(0);
  const [foodX, setFoodX] = useState(
    Math.floor(Math.random() * canvasSidesLength) * blockSize
  );
  const [foodY, setFoodY] = useState(
    Math.floor(Math.random() * canvasSidesLength) * blockSize
  );
  const [snakeBody, setSnakeBody] = useState<number[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [reset, setReset] = useState(false);

  const placeFood = () => {
    setFoodX(Math.floor(Math.random() * canvasSidesLength) * blockSize);
    setFoodY(Math.floor(Math.random() * canvasSidesLength) * blockSize);
  };

  const animate = () => {
    if (gameOver) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!context.current) {
      context.current = canvas.getContext("2d");
    }

    const ctx = context.current;
    canvas.width = canvasSidesLength * blockSize;
    canvas.height = canvasSidesLength * blockSize;

    // Draw background
    ctx!.fillStyle = "green";
    ctx!.fillRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx!.fillStyle = "yellow";
    ctx!.fillRect(foodX, foodY, blockSize, blockSize);

    // Add current head to body before moving
    setSnakeBody((prev) => [[snakeX, snakeY], ...prev]);

    // Check if snake eats food
    if (snakeX === foodX && snakeY === foodY) {
      placeFood(); // Place new food
    } else {
      // Remove tail if not eating food
      setSnakeBody((prev) => prev.slice(0, -1));
    }

    // Move snake head
    setSnakeX((prev) => prev + speedX * blockSize);
    setSnakeY((prev) => prev + speedY * blockSize);

    // Draw Snake
    ctx!.fillStyle = "white";
    ctx!.fillRect(snakeX, snakeY, blockSize, blockSize);
    snakeBody.forEach(([x, y]) => ctx!.fillRect(x, y, blockSize, blockSize));

    // Game Over Conditions
    if (
      snakeX < 0 ||
      snakeX >= canvas.width ||
      snakeY < 0 ||
      snakeY >= canvas.height
    ) {
      setGameOver(true);
    }

    for (let i = 1; i < snakeBody.length; i++) {
      if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
        setGameOver(true);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(animate, 300);
    return () => clearInterval(interval);
  }, [snakeX, snakeY, snakeBody, foodX, foodY, speedX, speedY]);
  useEffect(() => {
    if (reset) {
      setSnakeX(blockSize * 5);
      setSnakeY(blockSize * 5);
      setSpeedX(1);
      setSpeedY(0);
      setSnakeBody([]);
      setGameOver(false);
      placeFood();
      setReset(false);
    }
  }, [reset]);
  useEffect(() => {
    window.onkeydown = (e) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
          if (speedY === 0) {
            setSpeedX(0);
            setSpeedY(-1);
          }
          break;
        case "ArrowDown":
        case "s":
          if (speedY === 0) {
            setSpeedX(0);
            setSpeedY(1);
          }
          break;
        case "ArrowRight":
        case "d":
          
          if (speedX === 0) {
            setSpeedX(1);
            setSpeedY(0);
          }
          break;
        case "ArrowLeft":
        case "a":
          if (speedX === 0) {
            setSpeedX(-1);
            setSpeedY(0);
          }
          break;
      }
    };
    return () => {
      window.onkeydown = null;
    };
  }, [speedX, speedY]);

  return (
    <>
      <canvas ref={canvasRef} style={{ border: "1px solid #000" }}>
        Your browser does not support the canvas element.
      </canvas>
      <GameOverModal isOpen={gameOver} onClose={() => setGameOver(false)}>
        <span className="text-amber-600  font-[1000] text-2xl">
          Game Over 😂{" "}
        </span>
      </GameOverModal>
      <Start onClick={() => setReset(true)} buttonName="Reset" />
    </>
  );
};
