/* Get Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');

// array
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
function togglePlay() {
  // const method = video.paused ? 'play' : 'pause';
  // video[method]();
  if (video.paused) { // paused is a property on video
    video.play();  // methods on video
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
  // console.log('Update the button');
}

function skip() {
  console.log('skipping', this.dataset);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  console.log(this.value);
  console.log(this.name); // volume or playbackRate
  video[this.name] = this.value;
}

function handleProgress() {
  // Get percentage
  const percent = (video.currentTime / video.duration) * 100;

  // Update flex-basis percentage
  progressBar.style.flexBasis = `${percent}%`;
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
