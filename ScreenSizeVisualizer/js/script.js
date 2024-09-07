const screen_sim = document.getElementById("screen_sim");
const setup_box = document.getElementById("setup_box");
const setupInputs = document.querySelectorAll("#setup_box > input");
const setup_alert = document.getElementById("setup_alert");
const desktop_checkbox = document.getElementById("desktop_checkbox");
const simulate_btn = document.getElementById("simulate_btn");
const screen_capture = document.getElementById("screen_capture");

window.addEventListener("load", (event) => {
    initialView();
    addEvents();
});

function initialView() {
    setup_box.classList.add("hover");
    updateScreenSize(7, 16/9);
}

function addEvents() {
    document.getElementById("home_btn").addEventListener("click", () => {
        window.location.href = "../index.html";
    });
    
    simulate_btn.addEventListener("click", async () => {
        if (setupInputs[0].value != "" && setupInputs[1].value != "")
        {
            let size = setupInputs[0].value.includes('"') ? setupInputs[0].value.replace('"', '') : setupInputs[0].value;
            let aspect_ratio = setupInputs[1].value.split(":");
            updateScreenSize(size, aspect_ratio[0]/aspect_ratio[1]);

            if (desktop_checkbox.checked)
            {
                try {
                    screen_capture.srcObject = await navigator.mediaDevices.getDisplayMedia({video: true});
                } catch (err) {
                    console.error("Error accessing display media", err);
                }
            }
            else if (screen_capture.srcObject)
            {
                screen_capture.srcObject.getTracks().forEach(track => track.stop());
                screen_capture.srcObject = null;
            }

            setup_box.classList.remove("hover");
            setup_alert.innerHTML = "";
        }
        else
        {
            setup_alert.innerHTML = "Please fill in all fields";
        }
    });
}

function updateScreenSize(size, ratio) {
    let height = size/Math.sqrt(1 + ratio**2);
    screen_sim.style.height = height + "in";
    screen_sim.style.width = ratio*height + "in";
    document.querySelector("#screen_sim p").innerHTML = size + '"';
}