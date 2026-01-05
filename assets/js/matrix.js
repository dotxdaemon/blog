/* ABOUTME: Generates a monochrome matrix rain animation behind the page content. */
/* ABOUTME: Exports a starter that returns a cleanup handler for callers. */
function startMatrixRain(canvas, options = {}) {
  const globalWindow = typeof window !== 'undefined' ? window : null;

  if (!canvas || typeof canvas.getContext !== 'function' || !globalWindow) {
    return () => {};
  }

  const context = canvas.getContext('2d');
  const characters = (options.characters && String(options.characters)) || '01';
  const fontSize = Number.isFinite(options.fontSize) ? options.fontSize : 16;
  const fadeStrength = Number.isFinite(options.fadeStrength) ? options.fadeStrength : 0.08;
  let animationId = null;
  let columns = 0;
  let drops = [];

  function resizeCanvas() {
    canvas.width = globalWindow.innerWidth;
    canvas.height = globalWindow.innerHeight;
    columns = Math.max(1, Math.floor(canvas.width / fontSize));
    drops = Array.from({ length: columns }, () => Math.random() * canvas.height);
  }

  function draw() {
    context.fillStyle = `rgba(0, 0, 0, ${Math.min(0.5, Math.max(0.05, fadeStrength))})`;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#f5f5f5';
    context.font = `${fontSize}px 'IBM Plex Mono', 'Atkinson Hyperlegible', monospace`;

    for (let index = 0; index < drops.length; index += 1) {
      const character = characters.charAt(Math.floor(Math.random() * characters.length));
      const x = index * fontSize;
      const y = drops[index] * fontSize;
      context.fillText(character, x, y);
      if (y > canvas.height && Math.random() > 0.975) {
        drops[index] = 0;
      } else {
        drops[index] += 1;
      }
    }

    animationId = globalWindow.requestAnimationFrame(draw);
  }

  resizeCanvas();
  draw();

  globalWindow.addEventListener('resize', resizeCanvas);

  return () => {
    if (animationId) {
      globalWindow.cancelAnimationFrame(animationId);
    }
    globalWindow.removeEventListener('resize', resizeCanvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
}

if (typeof window !== 'undefined') {
  window.startMatrixRain = startMatrixRain;
}

if (typeof module !== 'undefined') {
  module.exports = { startMatrixRain };
}
