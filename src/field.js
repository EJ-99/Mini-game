'use strict';
const CARROT_SIZE = 80;
export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
  }

  addClickListener() {
    this.field.addEventListener('click', this.onClick);
  }

  removeClickListener() {
    this.field.removeEventListener('click', this.onClick);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick = (event) => {
    const target = event.target;
    if (target.className === ItemType.carrot) {
      target.remove();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.className === ItemType.bug) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };

  init() {
    this.field.innerHTML = '';
    this.addItem('carrot', this.carrotCount, 'img/carrot.png');
    this.addItem('bug', this.bugCount, 'img/bug.png');
    this.addClickListener();
  }
  addItem(className, count, path) {
    const x1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y1 = 0;
    const y2 = this.fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('src', path);
      item.setAttribute('class', className);

      item.style.left = `${getRandomNumber(x1, x2)}px`;
      item.style.top = `${getRandomNumber(y1, y2)}px`;
      this.field.appendChild(item);
    }
  }
}

function getRandomNumber(num1, num2) {
  return num1 + Math.random() * (num2 - num1);
}
