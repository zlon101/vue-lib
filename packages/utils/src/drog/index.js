/**
 * dragstart drop
 * **/
export function drag(dragEle, container) {
  dragEle.setAttribute('draggable', 'true');
  const { border: oriBorder } = window.getComputedStyle(dragEle);
  // dragEle.style.width = oriWidth;
  // dragEle.style.height = oriHeight;

  const onDragstart = ev => {
    ev.currentTarget.style.border = '2px dashed green';
    ev.effectAllowed = 'move';

    const { top, left } = dragEle.getBoundingClientRect();
    const { clientX, clientY } = ev;
    ev.dataTransfer.setData(
      'json',
      JSON.stringify({
        top: top - clientY,
        left: left - clientX,
      }),
    );
  };
  const onDragend = ev => {
    ev.dataTransfer.clearData();
  };

  const onDragover = ev => {
    ev.dataTransfer.dropEffect = 'move';
    ev.preventDefault();
  };

  const onDrop = ev => {
    const { clientX, clientY } = ev;
    const offset = JSON.parse(ev.dataTransfer.getData('json'));
    const afterLeft = clientX + offset.left;
    const afterRight = Math.round(document.body.clientWidth - afterLeft - dragEle.offsetWidth);
    const afterTop = Math.round(clientY + offset.top);

    dragEle.style.border = oriBorder;
    dragEle.style.top = afterTop + 'px';
    dragEle.style.right = afterRight + 'px';
    ev.preventDefault();
  };

  dragEle.addEventListener('dragstart', onDragstart);
  dragEle.addEventListener('dragend', onDragend);
  container.addEventListener('dragover', onDragover);
  container.addEventListener('drop', onDrop);
}
