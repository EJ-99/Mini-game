'use strict';

import { GameBuilder, Reason } from './game.js';
import Banner from './banner.js';
import * as sound from './sound.js';

const game = new GameBuilder()
  .withCarrotCount(10)
  .withBugCount(10)
  .withGameDuration(10)
  .build();

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
