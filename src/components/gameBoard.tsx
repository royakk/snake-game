import { useEffect, useRef, useState } from "react";

export const GameBoard = () => {
  const blockSize = 25;
  const canvasSidesLength = 17;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);

  const [snakeX, setSnakeX] = useState(blockSize * 5);
  const [snakeY, setSnakeY] = useState(blockSize * 5);
  const [speedX, setSpeedX] = useState(0);
  const [speedY, setSpeedY] = useState(0);
  const [foodX, setFoodX] = useState(Math.floor(Math.random() * canvasSidesLength) * blockSize);
  const [foodY, setFoodY] = useState(Math.floor(Math.random() * canvasSidesLength) * blockSize);
  const [snakeBody, setSnakeBody] = useState<number[][]>([]);
  const [gameOver, setGameOver] = useState(false);

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

    // Snake eats food
    if (snakeX === foodX && snakeY === foodY) {
      console.log('eattt')
      setSnakeBody((prev) => [[foodX, foodY], ...prev]);
      placeFood();
    }

    // Move body
    const newSnakeBody = [...snakeBody];
    if (newSnakeBody.length) {
      newSnakeBody.pop();
      newSnakeBody.unshift([snakeX, snakeY]);
      setSnakeBody(newSnakeBody);
    }

    setSnakeX((prev) => prev + speedX * blockSize);
    setSnakeY((prev) => prev + speedY * blockSize);

    // Draw Snake
    ctx!.fillStyle = "white";
    ctx!.fillRect(snakeX, snakeY, blockSize, blockSize);
    newSnakeBody.forEach(([x, y]) => ctx!.fillRect(x, y, blockSize, blockSize));

    // Game Over Conditions
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height) {
      setGameOver(true);
      alert("border");
    }

    newSnakeBody.forEach(([x, y]) => {
      if (snakeX === x && snakeY === y) {
        setGameOver(true);
        alert("gggggg");
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(animate, 300);
    return () => clearInterval(interval);
  }, [snakeX, snakeY, snakeBody, foodX, foodY, gameOver, speedX, speedY]);

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
  }, [speedX, speedY]);

  return (
    <canvas
      ref={canvasRef}
      style={{ border: "1px solid #000" }}
    >
      Your browser does not support the canvas element.
    </canvas>
  );
};
