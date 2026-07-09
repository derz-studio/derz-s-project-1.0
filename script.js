const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const gestureText = document.getElementById("gesture");
const blurStatus = document.getElementById("blurStatus");
const tracking = document.getElementById("tracking");
const hud = document.querySelector(".hud");

const ctx = canvas.getContext("2d");
const clock = document.getElementById("clock");
const fpsText = document.getElementById("fps");

let lastFrame = performance.now();

const hands = new Hands({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});

hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
});

hands.onResults(onResults);

function onResults(results) {const now = performance.now();

const fps = Math.round(1000 / (now - lastFrame));

lastFrame = now;

fpsText.innerText = fps;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.multiHandLandmarks) {

        tracking.innerText = "TRACKING";

        for (const landmarks of results.multiHandLandmarks) {

            drawConnectors(ctx, landmarks, HAND_CONNECTIONS);
            drawLandmarks(ctx, landmarks);

            if (isPeaceSign(landmarks)) {

                gestureText.innerText = "✌️ Peace";

                blurStatus.innerText = "ACTIVE";

                tracking.innerText = "LOCKED";

                video.classList.add("blur");

                hud.classList.add("active");

            } else {

                gestureText.innerText = "Hand";

                blurStatus.innerText = "OFF";

                tracking.innerText = "TRACKING";

                video.classList.remove("blur");

                hud.classList.remove("active");

            }

        }

    } else {

        gestureText.innerText = "No Hand";

        blurStatus.innerText = "OFF";

        tracking.innerText = "SEARCHING";

        video.classList.remove("blur");

        hud.classList.remove("active");

    }

}

const camera = new Camera(video, {

    onFrame: async () => {

        await hands.send({ image: video });

    },

    width: 1280,
    height: 720

});

camera.start();
setInterval(() => {

    const now = new Date();

    clock.innerText = now.toLocaleTimeString();

},1000);