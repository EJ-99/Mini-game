'use strict';

const alert = new Audio('sound/alert.wav');
const bg = new Audio('sound/bg.mp3');
const bug = new Audio('sound/bug_pull.mp3');
const carrot = new Audio('sound/carrot_pull.mp3');
const win = new Audio('sound/game_win.mp3');

export function playAlert() {
  play(alert);
}

export function playCarrot() {
  play(carrot);
}

export function playLose() {
  play(bug);
}

export function playWin() {
  play(win);
}

export function playBackground() {
  play(bg);
}

export function stopBackground() {
  stop(bg);
}

function play(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stop(sound) {
  sound.pause();
}
