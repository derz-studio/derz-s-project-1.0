function isFingerUp(tip, pip, landmarks){

    return landmarks[tip].y < landmarks[pip].y;

}

function isPeaceSign(landmarks){

    const indexUp = isFingerUp(8,6,landmarks);

    const middleUp = isFingerUp(12,10,landmarks);

    const ringUp = !isFingerUp(16,14,landmarks);

    const pinkyUp = !isFingerUp(20,18,landmarks);

    return indexUp && middleUp && ringUp && pinkyUp;

}