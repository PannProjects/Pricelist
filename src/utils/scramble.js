// Text scramble utility — terminal decryption effect
// Cycles through random chars before settling on final text

const CHARS = '!<>-_\\/[]{}—=+*^?#@$%&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * @param {HTMLElement} el
 * @param {string} finalText
 * @param {{ duration?: number, delay?: number }} opts
 */
export function scrambleText(el, finalText, { duration = 700, delay = 0 } = {}) {
  const totalFrames = Math.ceil(duration / 16);
  let frame = 0;
  let timer = null;

  const run = () => {
    timer = setInterval(() => {
      const progress = frame / totalFrames;
      const revealed = Math.floor(progress * finalText.length);

      el.textContent = Array.from(finalText).map((char, i) => {
        if (char === ' ') return ' ';
        if (i < revealed) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');

      if (frame++ >= totalFrames) {
        clearInterval(timer);
        el.textContent = finalText;
      }
    }, 16);
  };

  if (delay > 0) setTimeout(run, delay);
  else run();

  return () => clearInterval(timer);
}
