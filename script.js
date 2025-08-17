let inputs = document.getElementsByTagName("input");
let goals = 4;

function goalsHtml() {
  let html = "";
  for (let index = 0; index < goals; index++) {
    html += `
    <div class="goalsChild">
          <div class="input-container">
            <div class="circle"></div>
            <div class="input" id="0">
              <input
                type="text"
                placeholder="Add new goal  |  Press Enter after filling task"
              />
            </div>
          </div>
          <button>SAVE</button>
    </div>
    `;
  }
  document.querySelector(".goals").innerHTML = html;
}

function inputsListener() {
  let selectGoalsMsg = document.querySelector(".selectGoalsMsg");
  inputs = Array.from(inputs);

  inputs.forEach((input, index) => {
    input.addEventListener("keydown", (event) => {
      if (input.value.trim() !== "") {
        if (event.key === "Enter") {
          input.parentElement.innerHTML = input.value;

          selectGoalsMsg.innerHTML = `${index + 1}/${goals} task filled`;
          selectGoalsMsg.style.color = "green";
        }
      }
    });
  });
}

function tick() {
  let completedGoals = 0;
  let totalGoals = inputs.length;
  let bar = document.querySelector(".green-bar");
  let barWidth = 0;
  let circles = document.querySelectorAll(".circle");
  circles.forEach((circle, index) => {
    circle.addEventListener("click", () => {
      if (document.getElementById(index).innerText.length > 0) {
        if (circle.innerHTML === "") {
          circle.innerHTML = `<img src="green tick.png" width="19" height="19" alt="" />`;

          circle.classList.add("circle-border");
          circle.nextElementSibling.classList.add("line");

          completedGoals++;

          barWidth = (completedGoals / totalGoals) * 100;
          bar.style.width = `${barWidth}%`;
        } else {
          circle.innerHTML = "";

          circle.classList.remove("circle-border");
          circle.nextElementSibling.classList.remove("line");

          completedGoals--;

          barWidth = (completedGoals / totalGoals) * 100;
          bar.style.width = `${barWidth}%`;
        }
      }
    });
  });
}

goalsHtml();
inputsListener();
tick();
