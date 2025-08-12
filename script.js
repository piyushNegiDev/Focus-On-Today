let bar = document.querySelector(".green-bar");
function goalsHtml() {
  let html = "";
  for (let index = 0; index < 3; index++) {
    html += `
        <div class="input-container">
        <div class="circle"></div>
        <div class="input" id=${index}>
        <input type="text" placeholder="Add new goal  |  Press Enter after filling task" />
        </div>
        </div>`;
  }
  document.querySelector(".goals").innerHTML = html;
}

function inputsListener() {
  let inputs = document.getElementsByTagName("input");
  inputs = Array.from(inputs);
  inputs.forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        input.parentElement.innerHTML = input.value;
      }
    });
  });
}

function tick() {
  let barWidth = 0;
  let circles = document.querySelectorAll(".circle");
  circles.forEach((circle) => {
    circle.addEventListener("click", () => {
      if (circle.innerHTML === "") {
        circle.innerHTML = `<img src="green tick.png" width="19" height="19" alt="" />`;

        circle.classList.add("circle-border");
        circle.nextElementSibling.classList.add("line");

        if (barWidth < 100) {
          barWidth = barWidth + 33.33;
          bar.style.width = `${barWidth}%`;
        }
      } else {
        circle.innerHTML = "";

        circle.classList.remove("circle-border");
        circle.nextElementSibling.classList.remove("line");

        barWidth = barWidth - 33.33;
        bar.style.width = `${barWidth}%`;
      }
    });
  });
}

goalsHtml();
inputsListener();
tick();
