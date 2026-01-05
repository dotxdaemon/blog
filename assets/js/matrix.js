/* ABOUTME: Enhanced matrix rain animation with visual flair. */
/* ABOUTME: Features: color gradients, varying speeds, glitch effects, mouse interaction. */

function startMatrixRain(canvas, options = {}) {
  const globalWindow = typeof window !== 'undefined' ? window : null;

  if (!canvas || typeof canvas.getContext !== 'function' || !globalWindow) {
    return () => {};
  }

  const context = canvas.getContext('2d');

  // Configuration with defaults
  const config = {
    // Character sets - mix of binary, katakana, and symbols
    characters: options.characters || '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン<>{}[]|/\\',
    fontSize: options.fontSize || 14,
    fadeStrength: options.fadeStrength || 0.05,
    // Color configuration
    primaryColor: options.primaryColor || { h: 120, s: 100, l: 50 }, // Matrix green
    secondaryColor: options.secondaryColor || { h: 180, s: 100, l: 50 }, // Cyan
    accentColor: options.accentColor || { h: 0, s: 0, l: 100 }, // White for highlights
    // Visual effects
    enableGlitch: options.enableGlitch !== false,
    enableGlow: options.enableGlow !== false,
    enableRainbow: options.enableRainbow || false,
    enableMouseInteraction: options.enableMouseInteraction !== false,
    // Speed variation
    minSpeed: options.minSpeed || 0.5,
    maxSpeed: options.maxSpeed || 1.5,
  };

  let animationId = null;
  let columns = 0;
  let drops = [];
  let speeds = [];
  let colors = [];
  let glitchTimer = 0;
  let mouseX = -1000;
  let mouseY = -1000;
  let hueOffset = 0;

  // Column state for more complex effects
  let columnStates = [];

  function resizeCanvas() {
    canvas.width = globalWindow.innerWidth;
    canvas.height = globalWindow.innerHeight;
    initColumns();
  }

  function initColumns() {
    columns = Math.max(1, Math.floor(canvas.width / config.fontSize));
    drops = [];
    speeds = [];
    colors = [];
    columnStates = [];

    for (let i = 0; i < columns; i++) {
      drops.push(Math.random() * (canvas.height / config.fontSize));
      speeds.push(config.minSpeed + Math.random() * (config.maxSpeed - config.minSpeed));
      colors.push(Math.random() < 0.7 ? 'primary' : 'secondary');
      columnStates.push({
        brightness: 0.6 + Math.random() * 0.4,
        glitching: false,
        glitchEnd: 0,
        trail: [],
      });
    }
  }

  function hslToString(h, s, l, a = 1) {
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  }

  function getColumnColor(index, yPos) {
    const state = columnStates[index];
    let color;

    if (config.enableRainbow) {
      // Rainbow mode - color shifts based on position
      const h = (hueOffset + index * 2 + yPos * 0.5) % 360;
      color = { h, s: 100, l: 50 };
    } else if (colors[index] === 'primary') {
      color = config.primaryColor;
    } else {
      color = config.secondaryColor;
    }

    // Mouse proximity effect
    if (config.enableMouseInteraction) {
      const colX = index * config.fontSize;
      const colY = yPos * config.fontSize;
      const dist = Math.sqrt((colX - mouseX) ** 2 + (colY - mouseY) ** 2);
      const maxDist = 150;

      if (dist < maxDist) {
        // Brighten and shift color near mouse
        const factor = 1 - (dist / maxDist);
        color = {
          h: color.h,
          s: color.s,
          l: Math.min(90, color.l + factor * 40),
        };
      }
    }

    return color;
  }

  function draw() {
    // Semi-transparent black to create fade effect
    context.fillStyle = `rgba(0, 0, 0, ${config.fadeStrength})`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Update hue offset for rainbow mode
    if (config.enableRainbow) {
      hueOffset = (hueOffset + 0.5) % 360;
    }

    // Glitch effect timer
    if (config.enableGlitch) {
      glitchTimer++;
      if (glitchTimer > 60 && Math.random() < 0.02) {
        triggerGlitch();
        glitchTimer = 0;
      }
    }

    context.font = `${config.fontSize}px 'IBM Plex Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const state = columnStates[i];
      const character = config.characters.charAt(
        Math.floor(Math.random() * config.characters.length)
      );
      const x = i * config.fontSize;
      const y = drops[i] * config.fontSize;

      // Check if column is glitching
      if (state.glitching && Date.now() < state.glitchEnd) {
        // Glitch: random bright colors and positions
        const glitchColor = hslToString(
          Math.random() * 360,
          100,
          70 + Math.random() * 30
        );
        context.fillStyle = glitchColor;
        const offsetX = (Math.random() - 0.5) * 10;
        context.fillText(character, x + offsetX, y);
      } else {
        state.glitching = false;

        // Get color for this position
        const color = getColumnColor(i, drops[i]);

        // Draw the leading (brightest) character
        if (config.enableGlow) {
          // Glow effect
          context.shadowBlur = 10;
          context.shadowColor = hslToString(color.h, color.s, color.l, 0.8);
        }

        // Head of the stream - brightest
        context.fillStyle = hslToString(
          config.accentColor.h,
          config.accentColor.s,
          config.accentColor.l,
          state.brightness
        );
        context.fillText(character, x, y);

        // Draw trailing characters with decreasing brightness
        const trailLength = 15;
        for (let t = 1; t <= trailLength; t++) {
          const trailY = (drops[i] - t) * config.fontSize;
          if (trailY < 0) continue;

          const trailBrightness = state.brightness * (1 - t / (trailLength + 5));
          const trailColor = getColumnColor(i, drops[i] - t);

          context.fillStyle = hslToString(
            trailColor.h,
            trailColor.s,
            Math.max(20, trailColor.l * trailBrightness),
            trailBrightness * 0.8
          );

          const trailChar = config.characters.charAt(
            Math.floor(Math.random() * config.characters.length)
          );
          context.fillText(trailChar, x, trailY);
        }

        if (config.enableGlow) {
          context.shadowBlur = 0;
        }
      }

      // Move drop down
      drops[i] += speeds[i];

      // Reset drop when it goes off screen
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
        speeds[i] = config.minSpeed + Math.random() * (config.maxSpeed - config.minSpeed);
        columnStates[i].brightness = 0.6 + Math.random() * 0.4;
      }
    }

    animationId = globalWindow.requestAnimationFrame(draw);
  }

  function triggerGlitch() {
    // Randomly glitch some columns
    const numGlitched = Math.floor(Math.random() * 10) + 3;
    const duration = 100 + Math.random() * 200;

    for (let i = 0; i < numGlitched; i++) {
      const idx = Math.floor(Math.random() * columns);
      columnStates[idx].glitching = true;
      columnStates[idx].glitchEnd = Date.now() + duration;
    }

    // Occasional screen-wide glitch
    if (Math.random() < 0.1) {
      context.fillStyle = `rgba(0, 255, 100, 0.03)`;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function handleMouseLeave() {
    mouseX = -1000;
    mouseY = -1000;
  }

  // Initialize
  resizeCanvas();
  draw();

  // Event listeners
  globalWindow.addEventListener('resize', resizeCanvas);

  if (config.enableMouseInteraction) {
    canvas.style.pointerEvents = 'auto';
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
  }

  // Return cleanup function
  return () => {
    if (animationId) {
      globalWindow.cancelAnimationFrame(animationId);
    }
    globalWindow.removeEventListener('resize', resizeCanvas);
    if (config.enableMouseInteraction) {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
}

// Export for both browser and Node
if (typeof window !== 'undefined') {
  window.startMatrixRain = startMatrixRain;
}

if (typeof module !== 'undefined') {
  module.exports = { startMatrixRain };
}
