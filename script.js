let html = "";
for (let index = 0; index < 3; index++) {
  html += `
    <div class="input-container">
    <div class="circle"></div>
    <div class="input">
    <input type="text" id=${index} placeholder="Add new goal" />
    </div>
    </div>`;
}
document.querySelector(".goals").innerHTML = html;

let inputs = document.getElementsByTagName("input");
inputs = Array.from(inputs);
inputs.forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      input.parentElement.innerHTML = input.value;
    }
  });
});

let circles = document.querySelectorAll(".circle");
circles.forEach((circle) => {
  circle.addEventListener("click", () => {
    circle.innerHTML = `<img src="green tick.png" width="19" height="19" alt="" />`;
    circle.style.border = "none";
  });
});
