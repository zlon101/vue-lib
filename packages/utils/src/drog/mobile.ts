function makeElMavable(el: HTMLElement) {
  function getStyleVal(xy: 'x' | 'y') {
    const s = xy === 'x' ? el.style.left : el.style.top;
    const v = parseInt(s.replace(/\D/, ''));
    return v || 0;
  }

  let startX = 0;
  let startY = 0;
  let touchStartX = 0;
  let touchStartY = 0;

  const docMoveListener = (evt: TouchEvent) => {
    const tch = evt.touches[0];
    const dx = tch.screenX - touchStartX;
    const dy = tch.screenY - touchStartY;
    el.style.left = Math.round(startX + dx) + 'px';
    el.style.top = Math.round(startY + dy) + 'px';
  };

  el.addEventListener('touchstart', (evt: TouchEvent) => {
    const tch = evt.touches[0];
    startX = getStyleVal('x');
    startY = getStyleVal('y');
    touchStartX = tch.screenX;
    touchStartY = tch.screenY;
    document.addEventListener('touchmove', docMoveListener);
  });
  el.addEventListener('touchmove', (evt) => {
    evt.preventDefault();
  });
  el.addEventListener('touchend', () => {
    document.removeEventListener('touchmove', docMoveListener);
  });
  el.addEventListener('touchcancel', () => {
    document.removeEventListener('touchmove', docMoveListener);
  });
}