let sleepiness = 0;
let isBurned = false;
let burnTimer = null;
const statusText = document.getElementById("status");

const pastaCookingImages = [
    "images/stove_and_pasta_1.png",
    "images/stove_and_pasta_2a.png",
    "images/stove_and_pasta_2b.png",
    "images/stove_and_pasta_2c.png",
    "images/stove_and_pasta_2d.png",
    "images/stove_and_pasta_3.png",
    "images/stove_and_pasta_4.png",
    "images/stove_and_pasta_5.png",
    "images/stove_and_pasta_6a.png",
    "images/stove_and_pasta_6b.png",
    "images/stove_and_pasta_6c.png",
    "images/stove_and_pasta_6d.png",
    "images/stove_and_pasta_7a.png",
    "images/stove_and_pasta_7b.png",
    "images/stove_and_pasta_7c.png",
    "images/stove_and_pasta_7d.png",
    "images/stove_and_pasta_7e.png",
    "images/stove_and_pasta_8.png",
    "images/stove_and_pasta_9.png",
    "images/stove_and_pasta_10.png",
    "images/stove_and_pasta_11.png",
    "images/stove_and_pasta_12.png",
    "images/stove_and_pasta_13.png",
    "images/stove_and_pasta_14.png",
    "images/stove_and_pasta_15.png",
    "images/stove_and_pasta_16.png",
    "images/stove_and_pasta_17.png"
];
let currentPastaStage = 0;

const finishedPastaImages = [
    "images/finished_pasta_1.png",
    "images/finished_pasta_2.png",
    "images/finished_pasta_3.png",
    "images/finished_pasta_4.png",
    "images/finished_pasta_5.png",
    "images/finished_pasta_6.png",
    "images/finished_pasta_7.png",
    "images/finished_pasta_8.png",
    "images/finished_pasta_9.png",
    "images/finished_pasta_10.png",
    "images/finished_pasta_11.png",
    "images/finished_pasta_12.png",
    "images/finished_pasta_13.png",
    "images/finished_pasta_14.png"
]
let currentFinishedPastaStage = 0;

function updateSleepBar() {
    document.getElementById("sleep-bar").style.width = sleepiness + "%";
}
function updateGazelleImage() {
    if (sleepiness < 25) {
        document.getElementById("gazelle").src = "images/gazelle_0_sleepy.png";
    } else if (sleepiness < 50) {
        document.getElementById("gazelle").src = "images/gazelle_25_sleepy.png";
    } else if (sleepiness < 75) {
        document.getElementById("gazelle").src = "images/gazelle_50_sleepy.png";
    } else if (sleepiness < 100) {
        document.getElementById("gazelle").src = "images/gazelle_75_sleepy.png";
    } else {
        document.getElementById("gazelle").src = "images/gazelle_100_sleepy.png";
    }
}
function updateStatusText() {
    switch (currentPastaStage) {
        case 0: statusText.textContent = "Switching stove on"; break;
        case 1: statusText.textContent = "Putting saucepan 1 on stove"; break;
        case 2: statusText.textContent = "Adding water"; break;
        case 3: statusText.textContent = "Adding water"; break;
        case 4: statusText.textContent = "Adding water"; break;
        case 5: statusText.textContent = "Adding pasta"; break;
        case 6: statusText.textContent = "Boiling pasta"; break;
        case 7: statusText.textContent = "Putting saucepan 2 on stove"; break;
        case 8: statusText.textContent = "Adding butter"; break;
        case 9: statusText.textContent = "Melting butter"; break;
        case 10: statusText.textContent = "Melting butter"; break;
        case 11: statusText.textContent = "Melting butter"; break;
        case 12: statusText.textContent = "Adding olive oil"; break;
        case 13: statusText.textContent = "Adding olive oil"; break;
        case 14: statusText.textContent = "Adding olive oil"; break;
        case 15: statusText.textContent = "Adding olive oil"; break;
        case 16: statusText.textContent = "Adding olive oil"; break;
        case 17: statusText.textContent = "Adding onions"; break;
        case 18: statusText.textContent = "Adding tomato paste"; break;
        case 19: statusText.textContent = "Mixing"; break;
        case 20: statusText.textContent = "Adding garlic"; break;
        case 21: statusText.textContent = "Adding heavy cream"; break;
        case 22: statusText.textContent = "Adding spices"; break;
        case 23: statusText.textContent = "Adding the pasta"; break;
        case 24: statusText.textContent = "Mixing in the pasta"; break;
        case 25: statusText.textContent = "Sprinkling cheese"; break;
        case 26: statusText.textContent = "Garnishing"; break;
        default: statusText.textContent = ""; break;
    }
}

function wakeUp() {
    if (!isBurned) {
        sleepiness = 0;
        updateSleepBar();
        updateGazelleImage();
        clearTimeout(burnTimer); // Reset burn timer when gazelle wakes up
        document.getElementById("gazelleStatus").textContent = "";
    }
}

function startBurnTimer() {
    if (!isBurned) {
        burnTimer = setTimeout(() => {
            document.getElementById("status").textContent = "Oh no! The food burned! Reload to try agian.";
            document.getElementById("pasta").style.filter = "brightness(0.3)";
            isBurned = true;
            clearInterval(pastaPreparationInterval);
        }, 2000);
    }
}

function increaseSleepiness() {
    if (!isBurned) {
        sleepiness += 20;
        if (sleepiness >= 100) {
            sleepiness = 100;
            startBurnTimer();
        } else {

        }
        updateSleepBar();
        updateGazelleImage();
        console.log(burnTimer);
    }
}
function increasePastaPreparation() {
    currentPastaStage++;
    document.getElementById("pasta").src = pastaCookingImages[currentPastaStage];
    if (currentPastaStage == pastaCookingImages.length - 1) {
        clearInterval(pastaPreparationInterval);
        clearInterval(sleepinessInterval);
        setTimeout(() => {servePasta();}, 1000);
    }
    updateStatusText();
}

function servePasta() {
    document.getElementById("instructions").remove();
    document.getElementById("sleep-bar-container").remove();
    document.getElementById("pasta").src = finishedPastaImages[0];
    document.getElementById("status").textContent = "Bone apple teeth!! Click the pasta to eat it. When you're done you can shoo away.";

    document.getElementById("pasta").addEventListener("click", function() {
        if (currentFinishedPastaStage != finishedPastaImages.length - 1) {
            currentFinishedPastaStage++;
            document.getElementById("pasta").src = finishedPastaImages[currentFinishedPastaStage];
        }
    });
}

document.getElementById("gazelle").addEventListener("click", wakeUp);
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        wakeUp();
    }
});
let sleepinessInterval = setInterval(increaseSleepiness, 2000);
let pastaPreparationInterval = setInterval(increasePastaPreparation, 1500);