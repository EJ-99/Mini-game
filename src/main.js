'use strict';

import { Game, Reason } from './game.js';
import Banner from './banner.js';
import * as sound from './sound.js';

const game = new Game(10, 10, 10);
const finishBanner = new Banner();

game.setStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.stop:
      message = 'Replay❓';
      sound.playAlert();
      break;
    case Reason.win:
      message = 'You Won✨';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'You Lost😞';
      sound.playLose();
      break;
  }
  finishBanner.showWithTitle(message);
});

finishBanner.setClickListener(() => {
  finishBanner.hide();
  game.start();
});
