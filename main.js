window.onload = function(){
    navigator.mediaDevices.getUserMedia({
        video: true
    })
    .then(async (stream) => {
        document.querySelector('video').srcObject = stream;

        const model = await faceLandmarksDetection.load(
            faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);
        console.log("Model Loaded");
        
        const video = document.querySelector("video");

        setInterval(async () => {
            const faces = await model.estimateFaces({ input: video });

            faces && 
                console.log("Face Left Eye", faces[0].annotations.leftEyeIris);
                console.log("Face Right Eye", faces[0].annotations.rightEyeIris);
        }, 1000)
    })
    .catch((err) => {
        console.log(err);
    })
}