import { useState, useEffect } from 'react'
import './App.css'
import Spiral from './components/Spiral'

function App() {
  const [height, setHeight] = useState(500);
  const [width, setWidth] = useState(500);
  const [scale, setScale] = useState(1);
  const [sides, setSides] = useState(4);
  const [primeColorSetting, setPrimeColorSetting] = useState('#AEFF00');
  const [backgroundColorSetting, setBackgroundColorSetting] = useState('#000000');
  const [primeColor, setPrimeColor] = useState('#AEFF00');
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [dvdMode, setDvdMode] = useState(false);

  useEffect(() => {
    if (!dvdMode) {
      setTranslateX(0);
      setTranslateY(0);
      return;
    }

    const speed = 2;
    let directionX = 1;
    let directionY = 1;
    let hueRotate = 0;

    const interval = setInterval(() => {
      setTranslateX((prev) => {
        if (prev + directionX * speed > width / 2 || prev + directionX * speed < -width / 2) {
          directionX *= -1;
          hueRotate = (hueRotate + 160) % 360;
          document.documentElement.style.setProperty('--hue-rotate', `${hueRotate}deg`);
        }
        return prev + directionX * speed;
      });

      setTranslateY((prev) => {
        if (prev + directionY * speed > height / 2 || prev + directionY * speed < -height / 2) {
          directionY *= -1;
          hueRotate = (hueRotate + 160) % 360;
          document.documentElement.style.setProperty('--hue-rotate', `${hueRotate}deg`);
        }
        return prev + directionY * speed;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [dvdMode, width, height]);

  return (
    <div className='hero'>
      <div>
        <h1>ULEWM</h1>
        <h2>Ulam Prime Spiral Generator</h2>
      </div>
      <div className="sliders">
        <div className="settings-row">
          <label htmlFor="height">Height:</label>
          <input
            type="range"
            id="height"
            name="height"
            min="100"
            max="1000"
            step="10"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
          <label htmlFor="width">Width:</label>
          <input
            type="range"
            id="width"
            name="width"
            min="100"
            max="1000"
            step="10"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
          <label htmlFor="scale">Scale:</label>
          <input
            type="range"
            id="scale"
            name="scale"
            min="0.3"
            max="2.5"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
          />
          <label htmlFor="sides">Sides:</label>
          <input
            type="range"
            id="sides"
            name="sides"
            min="3"
            max="8"
            step="1"
            value={sides}
            onChange={(e) => setSides(Number(e.target.value))}
          />
        </div>
        <div className="settings-row">
          <label htmlFor="primeColor">Prime Color:</label>
          <input
            type="color"
            id="primeColor"
            name="primeColor"
            value={primeColorSetting}
            onChange={(e) => setPrimeColorSetting(e.target.value)}
          />
          <label htmlFor="backgroundColor">Background Color:</label>
          <input
            type="color"
            id="backgroundColor"
            name="backgroundColor"
            value={backgroundColorSetting}
            onChange={(e) => setBackgroundColorSetting(e.target.value)}
          />
          <button onClick={() => {
            setPrimeColor(primeColorSetting);
            setBackgroundColor(backgroundColorSetting);
          }}>
            Change Colors
          </button>
          <label htmlFor="dvdMode">DVD Mode:</label>
          <input
            type="checkbox"
            id="dvdMode"
            name="dvdMode"
            checked={dvdMode}
            onChange={(e) => setDvdMode(e.target.checked)}
          />
        </div>
      </div>
      <div>
        <Spiral height={height} width={width} backgroundColor={backgroundColor} primeColor={primeColor} scale={scale} sides={sides} translateX={translateX} translateY={translateY} />
      </div>
    </div>
  )
}

export default App
