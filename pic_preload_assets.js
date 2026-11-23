// preload audios 
var preload_audio = [
"audios/introduction_party.m4a",
"audios/start.m4a",
"audios/arrow.m4a",
"audios/next.m4a",
"audios/click_instructions.m4a",
"audios/practice_transition.m4a",
"audios/left_prompt.m4a",
"audios/right_prompt.m4a",
"audios/probability/task_introduction.m4a",
"audios/mixture/task_introduction.m4a",
"audios/sharing/task_introduction.m4a",
"audios/probability/task_prompt.m4a",
"audios/mixture/task_prompt.m4a",
"audios/sharing/task_prompt.m4a",
"audios/mixture/introducing_parts.m4a",
"audios/probability/demo1_transition.m4a",
"audios/sharing/demo1_transition.m4a",
"audios/probability/identifyingparts_orange.m4a",
"audios/mixture/identifyingparts_orange.m4a",
"audios/sharing/identifyingparts_orange.m4a",
"audios/probability/correct_feedback_orange.m4a",
"audios/probability/incorrect_feedback_orange.m4a",
"audios/mixture/correct_feedback_orange.m4a",
"audios/mixture/incorrect_feedback_orange.m4a",
"audios/sharing/correct_feedback_orange.m4a",
"audios/sharing/incorrect_feedback_orange.m4a",
"audios/probability/demo2_transition.m4a",
"audios/probability/identifyingparts_blue.m4a",
"audios/mixture/identifyingparts_blue.m4a",
"audios/sharing/identifyingparts_blue.m4a",
"audios/probability/correct_feedback_blue.m4a",
"audios/probability/incorrect_feedback_blue.m4a",
"audios/probability/click_instructions.m4a",
"audios/mixture/correct_feedback_blue.m4a",
"audios/mixture/incorrect_feedback_blue.m4a",
"audios/sharing/correct_feedback_blue.m4a",
"audios/sharing/incorrect_feedback_blue.m4a",
"audios/sharing/click_instructions.m4a",
"audios/probability/block1_transition.m4a",
"audios/sharing/block1_transition.m4a",
"audios/mixture/block1_transition.m4a",
"audios/mixture/click_instructions.m4a",
"audios/probability/block2_transition.m4a",
"audios/mixture/block2_transition.m4a",
"audios/sharing/block2_transition.m4a",
"audios/sharing/demo.m4a",
];
// preload animal imgs
var trial_img = [
"img/tiger.png",
"img/party_tiger.png",
"img/elephant.png",
"img/animals/dog.png",
"img/animals/lion.png",
"img/animals/moose.png",
"img/animals/hummingbird.png",
"img/animals/sloth.png",
"img/animals/monkey.png",
"img/animals/leopard.png",
"img/animals/turtle.png",
"img/animals/wolf.png",
"img/animals/octopus.png",
"img/animals/penguin.png",
"img/animals/parrot.png",
"img/animals/cow.png",
"img/animals/dolphin.png",
"img/animals/hippo.png",
"img/animals/frog.png",
"img/animals/polarbear.png",
"img/animals/shark.png",
"img/animals/squirrel.png",
"img/animals/beaver.png",
"img/animals/bear.png",
"img/animals/bat.png",
"img/animals/seagull.png",
"img/animals/bluewhale.png",
"img/animals/seahorse.png",
"img/animals/fox.png",
"img/animals/narwhal.png",
"img/animals/zebra.png",
"img/animals/fish.png",
"img/animals/giraffe.png",
"img/animals/bluejay.png",
"img/animals/starfish.png",
];
// preload test stimuli by format for each block
function getStimPath(stimList, formatCondition) {
var paths = [];
    stimList.forEach(function (trial) {
        paths.push(
        "StimFiles_test/" +
        formatCondition +
        "_" +
        participantBottomColor +
        "_bottom_" +
        trial.opt1_stim +
        ".png",
    );
    paths.push(
    "StimFiles_test/" +
    formatCondition +
    "_" +
    participantBottomColor +
    "_bottom_" +
    trial.opt2_stim +
    ".png",
);
});
return paths;
}
// preload format-specific instruction stim
var instructions_img = [
"img/format_instructions/ContRectInt_blue_bottom_7_7.png",
"img/format_instructions/ContRectInt_orange_bottom_7_7.png",
"img/format_instructions/DivRectInt_blue_bottom_7_7.png",
"img/format_instructions/DivRectInt_orange_bottom_7_7.png",
];
// preload sharing-specific assets
var sharing_img = ["img/sharing_instructions/total.png"];
var probability_img = [
"img/probability_instructions/happy_face.png",
"img/probability_instructions/sad_face.png",
];
// preload probability-specific assets
var probability_videos = [
"videos/probability_instructions/ContRectInt_blue_bottom_7_7_orange.mp4",
"videos/probability_instructions/ContRectInt_blue_bottom_7_7_blue.mp4",
"videos/probability_instructions/ContRectInt_orange_bottom_7_7_orange.mp4",
"videos/probability_instructions/ContRectInt_orange_bottom_7_7_blue.mp4",
"videos/probability_instructions/DivRectInt_blue_bottom_7_7_orange.mp4",
"videos/probability_instructions/DivRectInt_blue_bottom_7_7_blue.mp4",
"videos/probability_instructions/DivRectInt_orange_bottom_7_7_orange.mp4",
"videos/probability_instructions/DivRectInt_orange_bottom_7_7_blue.mp4",
];
// preload party transition videos shown after every 4 test trials
var party_transition_videos = [
    "videos/party_transitions/decorations.mp4",
    "videos/party_transitions/party_favors.mp4",
    "videos/party_transitions/cake.mp4",
    "videos/party_transitions/ending.mp4",
];
var partyTransitionIndex = 0;
var parent_introduction = [
    "videos/introduction.mp4"
];
var party_introduction = [
"img/party_introduction.png"
];

