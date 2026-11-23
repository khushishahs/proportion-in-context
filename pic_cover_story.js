// choose the next party transition video in the fixed order
function getCurrentPartyTransitionVideo() {
    return party_transition_videos[partyTransitionIndex];
}

// play an audio file, then show and enable the arrow to proceed to the next trial
function revealPartyArrow() {
    var button = document.querySelector(".party-introduction-arrow");
    playAudioFile("audios/arrow.m4a", function () {
        unlockAudio();
        button.disabled = false;
        button.hidden = false;
    });
}
var party_transition_video = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function () {
var videoPath = getCurrentPartyTransitionVideo();
        return `
        <div class="party-transition-layout">
            <video
                id="party-transition-video"
                class="party-transition-video"
                autoplay
                playsinline
                preload="auto"
            >
                <source src="${videoPath}" type="video/mp4">
            </video>
        </div>
        `;
    },
    choices: ["Next"],
    button_html: partyArrow,
    data: function () {
        return {
            event: "party_transition_video",
            party_transition_number: partyTransitionIndex + 1,
            party_transition_video: getCurrentPartyTransitionVideo(),
        };
    },
    on_load: function () {
        lockAudio();
var video = document.getElementById("party-transition-video");
var hasFinished = false;
// reveal the arrow transition button when it finishes or errs; end the trial if it is the last party transition
function finishVideo() {
            if (hasFinished) {
                return;
            }
            hasFinished = true;
            if (partyTransitionIndex === party_transition_videos.length - 1) {
                unlockAudio();
                jsPsych.finishTrial({ response: null, rt: null });
            } else {
                revealPartyArrow();
            }
        }
        if (video) {
            video.onended = finishVideo;
            video.onerror = finishVideo;
var playPromise = video.play();
            if (playPromise && typeof playPromise.catch === "function") {
                playPromise.catch(function () {
                    finishVideo();
                });
            }
        } else {
            finishVideo();
        }
    },
    on_finish: function (data) {
        data.party_transition_completed = true;
        partyTransitionIndex++;
    },
};

// play two party transitions per eight-trial block, after trials 4 and 8.
var party_transitions= {
    timeline: [party_transition_video],
    conditional_function: function () {
        return trialIndex > 0 && trialIndex % 4 === 0 && partyTransitionIndex < party_transition_videos.length;
    },
};

// define the party introduction trial that shows the party introduction img and plays the introductory audio
var party_introduction_trial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div class="party-transition-layout">
            <img src="img/party_introduction.png" alt="Tiger's party" class="party-transition-video">
        </div>
    `,
    choices: ["Next"],
    button_html: partyArrow,
    on_load: function () {
        lockAudio();
        playAudioFile("audios/introduction_party.m4a", revealPartyArrow);
    },
    data: { event: "party_introduction_audio" },
};


