var audioLockCount = 0;

// manage clickability controls on current screen while audio is playing
function setAudioLock(isLocked) {
var content = document.querySelector("#jspsych-content");
    if (content) {
        content.classList.toggle("audio-locked", isLocked);
    }
var nextButton = document.querySelector("#jspsych-instructions-next");
if (nextButton) {
    nextButton.disabled = isLocked;
}
var responseButtons = document.querySelectorAll(
"#jspsych-html-button-response-btngroup button"
);
responseButtons.forEach(function (button) {
    button.disabled = isLocked;
});
var responseWrappers = document.querySelectorAll(
"#jspsych-html-button-response-btngroup .jspsych-html-button-response-button"
);
responseWrappers.forEach(function (wrapper) {
    wrapper.style.pointerEvents = isLocked ? "none" : "auto";
});
}
// disable participant's response while audio/video is still playing
function lockAudio() {
    audioLockCount++;
    setAudioLock(true);
}

// re-enable participant's response after audio/video finishes
function unlockAudio() {
    audioLockCount = Math.max(0, audioLockCount - 1);
    if (audioLockCount === 0) {
        setAudioLock(false);
    }
}
document.addEventListener(
    "keydown",
function (event) {
        if (audioLockCount > 0 && event.code === "Space") {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    },
    true,
);

var lastInstructionAudio = null; // track the last instruction audio played to avoid replaying it on page reload

// create a wrapper for audio prompts that can be used to play audio and manage controls
function createAudioPrompt(audioPath, nextAudioPath, playVideoAfter) {
    return `
    <div
    class="audio-prompt-wrapper"
    data-audio-path="${audioPath}"
    data-next-audio-path="${nextAudioPath || ""}"
    data-play-video-after="${playVideoAfter ? "true" : "false"}"
    style="text-align: center; margin-top: 20px;"
    ></div>
    `;
}
// play audio and manage controls for instruction trials
function playAudioFile(audioPath, onEnded) {
var audio = new Audio(audioPath);
var hasEnded = false;
function finishAudio() {
        if (hasEnded) {
            return;
        }
    hasEnded = true;
    if (onEnded) {
        onEnded();
    }
}
audio.preload = "auto";
audio.playsInline = true;
audio.onended = finishAudio;
audio.onerror = finishAudio;
var playPromise = audio.play();
if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(function () {
        finishAudio();
    });
}
return audio;
}
// play instruction audio while keeping the page locked so participants can't interact with the experiment until it finishes
function playInstructionAudioFile(audioPath, onEnded) {
    lockAudio();
    playAudioFile(audioPath, function () {
        unlockAudio();
        if (onEnded) {
            onEnded();
        }
});
}
// play click instructions after the probability demo video ends
function finishProbabilityDemoAudio() {
    playInstructionAudioFile(getClickInstructionsAudio(), function () {
        setAudioLock(false);
    });
}

// find the current instruction page audio wrapper and start the correct audio sequence
function playCurrentInstructionAudio() {
var wrapper = document.querySelector(".audio-prompt-wrapper");
    if (!wrapper) {
        return;
    }
var audioPath = wrapper.getAttribute("data-audio-path");
var nextAudioPath = wrapper.getAttribute("data-next-audio-path");
var playVideoAfter = wrapper.getAttribute("data-play-video-after") === "true";
var audioKey = audioPath + "|" + nextAudioPath + "|" + playVideoAfter;
if (!audioPath || audioKey === lastInstructionAudio) {
    return;
}
lastInstructionAudio = audioKey;
playInstructionAudioFile(audioPath, function () {
    if (nextAudioPath) {
        playInstructionAudioFile(nextAudioPath, function () {
            if (playVideoAfter) {
                document.getElementById("probability-demo-video").play();
            }
    });
} else if (playVideoAfter) {
    setAudioLock(true);
var video = document.getElementById("probability-demo-video");
    if (video) {
        video.play();
    }
}
});
}