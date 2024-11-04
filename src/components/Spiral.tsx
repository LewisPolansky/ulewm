import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Spiral = ({ height = 250, width = 250, backgroundColor = 'black', primeColor = 'white', scale = 1, startNumber = 1, sides = 4, translateX = 0, translateY = 0 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    // Fill background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Function to check if a number is prime
    const isPrime = (num) => {
      if (num <= 1) return false;
      if (num <= 3) return true;
      if (num % 2 === 0 || num % 3 === 0) return false;
      for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
      }
      return true;
    };

    // Draw the Spiral centered with translation offset
    let centerX = width / 2;
    let centerY = height / 2;
    let x = centerX + translateX;
    let y = centerY + translateY;
    let num = startNumber;
    let zoomFactor = Math.min(width, height) / 100 * scale; // Adjust zoomFactor based on scale and canvas size
    let stepSize = zoomFactor; // Use zoomFactor to determine step size
    let stepsRemaining = 1;
    let stepsInCurrentLeg = 1;
    let direction = 0;
    const angleStep = (2 * Math.PI) / sides;
    let directionChanges = 0;

    while (x >= 0 && x < width && y >= 0 && y < height) {
      if (isPrime(num)) {
        ctx.fillStyle = primeColor;
        ctx.fillRect(x, y, stepSize, stepSize); // Adjust square size based on zoomFactor
      }

      // Move in the current direction
      x += Math.cos(direction) * stepSize;
      y += Math.sin(direction) * stepSize;
      stepsRemaining--;
      num++;

      if (stepsRemaining === 0) {
        // Change direction
        direction = (direction + angleStep) % (2 * Math.PI);
        directionChanges++;

        // After every two direction changes, increase the steps in the current leg
        if (directionChanges % 2 === 0) {
          stepsInCurrentLeg++;
        }

        stepsRemaining = stepsInCurrentLeg;
      }
    }
  }, [height, width, backgroundColor, primeColor, scale, startNumber, sides, translateX, translateY]);

  return <canvas ref={canvasRef} style={{ display: 'block', margin: '0 auto' }} />;
};

Spiral.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  backgroundColor: PropTypes.string,
  primeColor: PropTypes.string,
  scale: PropTypes.number,
  startNumber: PropTypes.number,
  sides: PropTypes.number,
  translateX: PropTypes.number,
  translateY: PropTypes.number,
};

export default Spiral;
