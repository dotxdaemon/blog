/* ABOUTME: Matrix rain animation with layered glow. */
/* ABOUTME: Streams glyphs with green trails across the viewport. */

function startMatrixRain(canvas) {
  const globalWindow = typeof window !== 'undefined' ? window : null;

  if (!canvas || typeof canvas.getContext !== 'function' || !globalWindow) {
    return () => {};
  }

  const context = canvas.getContext('2d');
  const characters =
    'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>[]{}/*=+&?';
  const fadeFill = 'rgba(0, 15, 5, 0.08)';
  const brightGreen = { r: 0, g: 255, b: 0, hex: '#00ff00' };
  const deepGreen = { r: 0, g: 150, b: 0 };
  const layers = [
    { fontSize: 14, speedMin: 0.6, speedMax: 1.2, tail: 18, glow: 6, opacity: 0.6 },
    { fontSize: 18, speedMin: 0.9, speedMax: 1.5, tail: 16, glow: 9, opacity: 0.75 },
    { fontSize: 24, speedMin: 1.2, speedMax: 1.9, tail: 14, glow: 11, opacity: 0.9 },
  ];

  let streams = [];
  let animationId = null;
  let running = false;

  function blendColor(a, b, weight) {
    const inverse = 1 - weight;
    return {
      r: Math.round(a.r * weight + b.r * inverse),
      g: Math.round(a.g * weight + b.g * inverse),
      b: Math.round(a.b * weight + b.b * inverse),
    };
  }

  function setup() {
    canvas.width = globalWindow.innerWidth;
    canvas.height = globalWindow.innerHeight;
    streams = layers.map((layer) => {
      const columnCount = Math.ceil(canvas.width / layer.fontSize) + 1;
      return Array.from({ length: columnCount }, () => ({
        y: Math.random() * canvas.height,
        speed: layer.speedMin + Math.random() * (layer.speedMax - layer.speedMin),
      }));
    });

    if (!running) {
      running = true;
      animationId = globalWindow.requestAnimationFrame(draw);
    }
  }

  function drawTrail(x, y, layer, columnIndex, layerIndex) {
    context.shadowBlur = layer.glow;
    context.shadowColor = 'rgba(0, 255, 0, 0.35)';

    const headChar = characters[Math.floor(Math.random() * characters.length)];
    context.fillStyle = 'rgba(0, 255, 0, 0.9)';
    context.fillText(headChar, x, y);

    for (let depth = 1; depth <= layer.tail; depth += 1) {
      const trailY = y - depth * layer.fontSize;
      if (trailY < -layer.fontSize) break;

      const fade = 1 - depth / (layer.tail + 2);
      const colorMix = blendColor(brightGreen, deepGreen, fade);
      const alpha = 0.15 + layer.opacity * fade * 0.75;
      context.fillStyle = `rgba(${colorMix.r}, ${colorMix.g}, ${colorMix.b}, ${alpha})`;
      const trailChar = characters[Math.floor(Math.random() * characters.length)];
      context.fillText(trailChar, x, trailY);
    }

    const stream = streams[layerIndex][columnIndex];
    stream.y += stream.speed;
    if (stream.y > canvas.height + layer.fontSize) {
      stream.y = Math.random() * -200;
    }
  }

  function draw() {
    context.fillStyle = fadeFill;
    context.fillRect(0, 0, canvas.width, canvas.height);

    layers.forEach((layer, layerIndex) => {
      context.font = `bold ${layer.fontSize}px 'Courier New', monospace`;
      const columns = streams[layerIndex];
      columns.forEach((stream, columnIndex) => {
        const x = columnIndex * layer.fontSize;
        drawTrail(x, stream.y, layer, columnIndex, layerIndex);
      });
    });

    animationId = globalWindow.requestAnimationFrame(draw);
  }

  globalWindow.addEventListener('resize', setup);
  setup();

  return () => {
    if (animationId) {
      globalWindow.cancelAnimationFrame(animationId);
    }
    globalWindow.removeEventListener('resize', setup);
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
}

if (typeof window !== 'undefined') {
  window.startMatrixRain = startMatrixRain;
}

if (typeof module !== 'undefined') {
  module.exports = { startMatrixRain };
}
