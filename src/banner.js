'use strict';

export default class Banner {
  constructor() {
    this.banner = document.querySelector('.banner');
    this.replay = document.querySelector('.banner__replay');
    this.title = document.querySelector('.banner__title');
  }

  setClickListener(onClick) {
    this.replay.addEventListener('click', onClick);
  }

  showWithTitle(message) {
    this.banner.classList.remove('banner--hide');
    this.title.textContent = message;
  }

  hide() {
    this.banner.classList.add('banner--hide');
  }
}
