// switch button-positioning classes for each trial type
function setButtonLayoutClass(className) {
var content = document.querySelector("#jspsych-content");
    content.classList.remove("trial-button-position", "subset-button-position", "yes-no-button-position");
    if (className) {
        content.classList.add(className);
    }
}

// play audio and manage button visibiliy for instruction trials
function loadNextButton() {
    var wrapper = document.querySelector(".audio-prompt-wrapper");
    var audioPath = wrapper ? wrapper.getAttribute("data-audio-path") : "";
    var button = document.querySelector(".child-next-btn");

    lockAudio();

    function playNextPrompt() {
        playAudioFile("audios/next.m4a", function () {
            unlockAudio();
            button.disabled = false;
        });
    }

    if (audioPath) {
        playAudioFile(audioPath, playNextPrompt);
    } else {
        playNextPrompt();
    }
}

// invisible button for test trials
var hidden_button_html = `
<button class="side-character-btn" aria-label="%choice%"></button>
`;

// party transition video shown after every 4 test trials
var partyArrow = '<button class="party-introduction-arrow" aria-label="%choice%" hidden disabled><svg viewBox="0 0 100 100" aria-hidden="true"><path d="M15 50 H72 M55 30 L75 50 L55 70" fill="none" stroke="white" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>';

var childNextButtonHtml =
    '<button class="child-next-btn" disabled>%choice%</button>';

var subsetCircleButtonHtml =
    '<button class="subset-circle-button" aria-label="%choice%"></button>';

var probabilityFaceButtonHtml = `
<button class="probability-face-button" aria-label="%choice%">
    <img class="probability-face-img">
</button>
`;