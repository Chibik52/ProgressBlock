document.addEventListener("DOMContentLoaded", function(){
    const progressBlock = new ProgressBarBlock("progressBarWrapper", {size: 130, strokeWidth: 15});
    const valueInput = document.getElementById("valueInput");
    const animateToggle = document.getElementById("animateToggle");
    const hideToggle = document.getElementById("hideToggle");

    valueInput.addEventListener("input", (e) => progressBlock.value = e.target.value);
    animateToggle.addEventListener("input", (e) => progressBlock.setAnimated(e.target.checked));
    hideToggle.addEventListener("input", (e) => progressBlock.setHidden(e.target.checked));
});