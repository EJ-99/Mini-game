'use strict';
import { Field, ItemType } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  stop: 'stop',
  win: 'win',
  lose: 'lose',
});

export class GameBuilder {
  withCarrotCount(carrotCount) {
    this.carrotCount = carrotCount;
    return this;
  }

  withBugCount(bugCount) {
    this.bugCount = bugCount;
    return this;
  }

  withGameDuration(gameDuration) {
    this.gameDuration = gameDuration;
    return this;
  }

  build() {
    return new Game(this.carrotCount, this.bugCount, this.gameDuration);
  }
}

class Game {
  constructor(carrotCount, bugCount, durationTime) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.durationTime = durationTime;

    this.score = 0;
    this.timer = undefined;
    this.started = false;

    this.gameButton = document.querySelector('.game__button');
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.field = new Field(this.carrotCount, this.bugCount);
    this.field.setClickListener(this.onItemClick);
    this.gameButton.addEventListener('click', this.onButtonClick);
  }

  init() {
    this.score = 0;
    this.updateScoreBoard();
    this.field.init();
    sound.playBackground();
  }
  start() {
    this.started = true;
    this.init();
    this.showGameButton();
    this.showTimerAndScore();
    this.startTimer();
  }
  stop(reason) {
    this.started = false;
    this.stopTimer();
    this.field.removeClickListener();
    this.hideGameButton();
    this.onGameStop && this.onGameStop(reason);
    sound.stopBackground();
  }

  setStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  onButtonClick = () => {
    if (this.started) {
      this.stop(Reason.stop);
    } else {
      this.start();
    }
  };

  onItemClick = (item) => {
    if (item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
      sound.playCarrot();
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose);
    }
  };

  showGameButton() {
    this.gameButton.style.visibility = 'visible';
    const icon = this.gameButton.querySelector('i');
    icon.classList.remove('fa-play');
    icon.classList.add('fa-stop');
  }
  hideGameButton() {
    this.gameButton.style.visibility = 'hidden';
  }
  showTimerAndScore() {
    this.gameScore.style.visibility = 'visible';
    this.gameTimer.style.visibility = 'visible';
  }
  updateScoreBoard() {
    this.gameScore.textContent = `${this.carrotCount - this.score}`;
  }
  startTimer() {
    let remainingTime = this.durationTime;
    this.updateTimeText(remainingTime);
    this.timer = setInterval(() => {
      if (remainingTime <= 0) {
        this.stop(this.score === this.carrotCount ? Reason.win : Reason.lose); // 남은 당근 개수 체크해야 함.
        return;
      }
      this.updateTimeText(--remainingTime);
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.timer);
  }
  updateTimeText = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.textContent = `${minutes} : ${seconds}`;
  };
}
