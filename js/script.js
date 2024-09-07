const app_buttons = document.getElementsByClassName("app_btn");

window.addEventListener("load", (event) => {
    app_buttons[0].addEventListener("click", () => {
        window.location.href = "/ScreenSizeVisualizer/index.html";
    });
});