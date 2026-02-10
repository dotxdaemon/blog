/* ABOUTME: Matrix rain animation with layered glow. */
/* ABOUTME: Streams glyphs with complementary trails across the viewport. */

function startMatrixRain(canvas) {
  const globalWindow = typeof window !== 'undefined' ? window : null;

  if (!canvas || typeof canvas.getContext !== 'function' || !globalWindow) {
    return () => {};
  }

  const context = canvas.getContext('2d');
  const glyphSets = [
    'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789△◇◆○●▲▼□■◯',
  ];
  const fadeFill = 'rgba(0, 0, 0, 0.4)';
  const glyphChangeInterval = 160;
  const columnSpacingRatio = 1.8;
  const alternationInterval = 240;
  const palettes = [
    {
      brightAccent: { r: 210, g: 210, b: 210, hex: '#d2d2d2' },
      deepAccent: { r: 90, g: 90, b: 90 },
    },
    {
      brightAccent: { r: 180, g: 180, b: 180, hex: '#b4b4b4' },
      deepAccent: { r: 70, g: 70, b: 70 },
    },
  ];
  const layers = [
    { fontSize: 32, speedMin: 0.02, speedMax: 0.05, tail: 24, glow: 4, opacity: 0.42 },
    { fontSize: 44, speedMin: 0.03, speedMax: 0.06, tail: 20, glow: 5, opacity: 0.35 },
    { fontSize: 56, speedMin: 0.04, speedMax: 0.08, tail: 18, glow: 6, opacity: 0.3 },
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

  let activeGlyphSet = glyphSets[0];
  let activePalette = palettes[0];
  let currentAlternationIndex = 0;

  function randomChar() {
    return activeGlyphSet[Math.floor(Math.random() * activeGlyphSet.length)];
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
    const { brightAccent, deepAccent } = activePalette;
    context.shadowBlur = layer.glow;
    context.shadowColor = `rgba(${brightAccent.r}, ${brightAccent.g}, ${brightAccent.b}, 0.22)`;

    const stream = streams[layerIndex][columnIndex];
    if ((frameCount + stream.glyphOffset) % glyphChangeInterval === 0) {
      stream.glyphs = stream.glyphs.map(randomChar);
    }

    const headChar = stream.glyphs[0];
    const headAlpha = 0.1 + Math.random() * 0.05;
    context.fillStyle = `rgba(${brightAccent.r}, ${brightAccent.g}, ${brightAccent.b}, ${headAlpha})`;
    context.fillText(headChar, x, y);

    for (let depth = 1; depth <= layer.tail; depth += 1) {
      const trailY = y - depth * layer.fontSize;
      if (trailY < -layer.fontSize) break;

      const fade = 1 - depth / (layer.tail + 2);
      const colorMix = blendColor(brightAccent, deepAccent, fade);
      const alpha = 0.1 + Math.random() * 0.05;
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
    const nextAlternationIndex =
      Math.floor(frameCount / alternationInterval) % palettes.length;
    if (nextAlternationIndex !== currentAlternationIndex) {
      currentAlternationIndex = nextAlternationIndex;
      activePalette = palettes[currentAlternationIndex];
      activeGlyphSet = glyphSets[currentAlternationIndex % glyphSets.length];
      streams.forEach((layerStreams) => {
        layerStreams.forEach((stream) => {
          stream.glyphs = stream.glyphs.map(randomChar);
        });
      });
    }
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
