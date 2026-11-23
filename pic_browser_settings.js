// position the test buttons to align with the animals on the screen
function alignTestButtons(content) {
    var buttons = content.querySelectorAll(".jspsych-html-button-response-button");
    content.querySelectorAll(".side-character-container").forEach(function (animal, index) {
        var button = buttons[index];
        button.style.left = animal.offsetLeft + animal.offsetParent.offsetLeft + "px";
        button.style.top = animal.offsetTop + animal.offsetParent.offsetTop + "px";
        button.style.width = animal.offsetWidth + "px";
        button.style.height = animal.offsetHeight + "px";
    });
}

// scale the experiment down to fit the viewport, barring party screens
function fitExperimentToViewport() {
    var content = document.getElementById("jspsych-content");
    if (!content) {
        return;
    }

    var scale = 1;
    if (!content.querySelector(".party-transition-layout")) {
        var viewport = document.documentElement;
        var testLayout = content.querySelector(".trial-layout");
        var tigerScreen = content.querySelector(".tiger-screen");
        // test grid maintains space for the tallest animal on every trial.
        var width = testLayout ? testLayout.offsetWidth : tigerScreen ? 1250 : Math.max(content.offsetWidth, content.scrollWidth);
        var height = testLayout ? testLayout.offsetHeight : tigerScreen ? 760 : Math.max(content.offsetHeight, content.scrollHeight);
        scale = Math.min(1, (viewport.clientWidth - 16) / width, (viewport.clientHeight - 16) / height);
    }
    // realign the invisible response buttons on test trials after setting the zoom
    content.style.zoom = scale;
    if (content.classList.contains("trial-button-position")) {
        alignTestButtons(content);
    }
}

// initialize the experiment layout and set up a MutationObserver to watch for changes in the DOM
function ExperimentLayout() {
    var frame;
    function scheduleFit() {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(fitExperimentToViewport);
    }
    new MutationObserver(scheduleFit).observe(document.body, { childList: true, subtree: true });
    document.addEventListener("load", scheduleFit, true);
    window.addEventListener("resize", scheduleFit);
}