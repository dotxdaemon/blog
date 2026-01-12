/* ABOUTME: Matrix rain animation with layered glow. */
/* ABOUTME: Streams glyphs with complementary trails across the viewport. */

function startMatrixRain(canvas) {
  const globalWindow = typeof window !== 'undefined' ? window : null;

  if (!canvas || typeof canvas.getContext !== 'function' || !globalWindow) {
    return () => {};
  }

  const context = canvas.getContext('2d');
  const characters =
    'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>[]{}/*=+&?';
  const fadeFill = 'rgba(13, 17, 15, 0.14)';
  const glyphChangeInterval = 8;
  const columnSpacingRatio = 1.8;
  const brightAccent = { r: 203, g: 183, b: 255, hex: '#cbb7ff' };
  const deepAccent = { r: 203, g: 183, b: 255 };
  const layers = [
    { fontSize: 14, speedMin: 0.2, speedMax: 0.4, tail: 18, glow: 3, opacity: 0.6 },
    { fontSize: 18, speedMin: 0.3, speedMax: 0.5, tail: 16, glow: 4, opacity: 0.75 },
    { fontSize: 24, speedMin: 0.4, speedMax: 0.63, tail: 14, glow: 5, opacity: 0.9 },
  ];

  let streams = [];
  let animationId = null;
  let running = false;
  let frameCount = 0;

  function blendColor(a, b, weight) {
    const inverse = 1 - weight;
    return {
      r: Math.round(a.r * weight + b.r * inverse),
      g: Math.round(a.g * weight + b.g * inverse),
      b: Math.round(a.b * weight + b.b * inverse),
    };
  }

  function randomChar() {
    return characters[Math.floor(Math.random() * characters.length)];
  }

  function setup() {
    canvas.width = globalWindow.innerWidth;
    canvas.height = globalWindow.innerHeight;
    streams = layers.map((layer) => {
      const columnSpacing = layer.fontSize * columnSpacingRatio;
      const columnCount = Math.ceil(canvas.width / columnSpacing) + 1;
      return Array.from({ length: columnCount }, () => ({
        y: Math.random() * canvas.height,
        speed: layer.speedMin + Math.random() * (layer.speedMax - layer.speedMin),
        glyphOffset: Math.floor(Math.random() * glyphChangeInterval),
        glyphs: Array.from({ length: layer.tail + 1 }, randomChar),
      }));
    });

    if (!running) {
      running = true;
      animationId = globalWindow.requestAnimationFrame(draw);
    }
  }

  function drawTrail(x, y, layer, columnIndex, layerIndex) {
    context.shadowBlur = layer.glow;
    context.shadowColor = `rgba(${brightAccent.r}, ${brightAccent.g}, ${brightAccent.b}, 0.2)`;

    const stream = streams[layerIndex][columnIndex];
    if ((frameCount + stream.glyphOffset) % glyphChangeInterval === 0) {
      stream.glyphs = stream.glyphs.map(randomChar);
    }

    const headChar = stream.glyphs[0];
    context.fillStyle = `rgba(${brightAccent.r}, ${brightAccent.g}, ${brightAccent.b}, 0.9)`;
    context.fillText(headChar, x, y);

    for (let depth = 1; depth <= layer.tail; depth += 1) {
      const trailY = y - depth * layer.fontSize;
      if (trailY < -layer.fontSize) break;

      const fade = 1 - depth / (layer.tail + 2);
      const colorMix = blendColor(brightAccent, deepAccent, fade);
      const alpha = 0.2 + layer.opacity * fade * 0.7;
      context.fillStyle = `rgba(${colorMix.r}, ${colorMix.g}, ${colorMix.b}, ${alpha})`;
      const trailChar = stream.glyphs[depth] ?? randomChar();
      context.fillText(trailChar, x, trailY);
    }

    stream.y += stream.speed;
    if (stream.y > canvas.height + layer.fontSize) {
      stream.y = Math.random() * -200;
    }
  }

  function draw() {
    frameCount += 1;
    context.fillStyle = fadeFill;
    context.fillRect(0, 0, canvas.width, canvas.height);

    layers.forEach((layer, layerIndex) => {
      context.font = `bold ${layer.fontSize}px 'Courier New', monospace`;
      const columns = streams[layerIndex];
      columns.forEach((stream, columnIndex) => {
        const x = columnIndex * layer.fontSize * columnSpacingRatio;
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
