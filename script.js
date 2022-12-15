const uploadBox = document.querySelector(".upload-box"),
    previewImg = uploadBox.querySelector("img"),
    fileInput = uploadBox.querySelector("input"),
    widthInput = document.querySelector(".width input"),
    heightInput = document.querySelector(".height input"),
    rationInput = document.querySelector(".ratio input"),
    qualityInput = document.querySelector(".quality input"),
    downloadBtn = document.querySelector(".download-btn");

const loadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRation = previewImg.naturalWidth / previewImg.naturalHeight
        document.querySelector(".wrapper").classList.add("active");
    })
}


widthInput.addEventListener("keyup", () => {
    // getting height according to the ration checkbox status
    const height = rationInput.checked ? widthInput.value / ogImageRation : heightInput.value;
    heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () => {
    // getting width according to the ration checkbox status
    const width = rationInput.checked ? heightInput.value * ogImageRation : widthInput.value;
    widthInput.value = Math.floor(width);
});

const resizeAndDowload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    const imgQuality = qualityInput.checked ? 0.7 : 1.0;

    // setting canvas height & width according to the input
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    a.href = canvas.toDataURL("image/jpeg", imgQuality);
    a.download = new Date().getTime();
    a.click();
}


downloadBtn.addEventListener("click", resizeAndDowload);
fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());