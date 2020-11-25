// ==UserScript==
// @name         andrew-ng-deesser
// @namespace    https://github.com/casab
// @version      0.1
// @description  Removes the annoying high frequency sound in Andrew NG Courses
// @author       casab
// @iconurl      https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-instructor-photos.s3.amazonaws.com/2a/6192a04f1311e7ba12057425631cbc/AndrewNg-Headshot.jpg
// @match        https://www.coursera.org/learn/machine-learning/lecture/*
// @match        https://www.coursera.org/learn/ai-for-everyone/lecture/*
// @match        https://www.coursera.org/learn/deep-neural-network/lecture/*
// @match        https://www.coursera.org/learn/machine-learning-projects/lecture/*
// @match        https://www.coursera.org/learn/convolutional-neural-networks/lecture/*
// @match        https://www.coursera.org/learn/nlp-sequence-models/lecture/*
// @match        https://www.coursera.org/learn/neural-networks-deep-learning/lecture/*
// @require      http://code.jquery.com/jquery-3.5.1.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @updateURL    https://raw.githubusercontent.com/casab/andrew-ng-deesser/main/andrew-ng-deesser.js
// @downloadURL  https://raw.githubusercontent.com/casab/andrew-ng-deesser/main/andrew-ng-deesser.js
// ==/UserScript==

// Wait for the video node to load
waitForKeyElements("video", onVideoLoad);

function onVideoLoad() {
  document.querySelector("video.vjs-tech").onplay = applyNotchFilter;
}

function applyNotchFilter() {
  // Create a Audio context
  const context = new AudioContext();

  const source = context.createMediaElementSource(
    document.getElementsByTagName("video")[0]
  );

  // Create a Notch filter
  const filter = context.createBiquadFilter();
  filter.type = "notch";
  filter.frequency.value = 11300;
  filter.Q.value = 2;

  // Connect filter to the audio source
  source.connect(filter);
  // Connect context destination to filter output
  filter.connect(context.destination);
  console.info(
    `Applied a notch filter to the video with f=${filter.frequency.value}Hz Q=${filter.Q.value}`
  );
}
