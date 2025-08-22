let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(taskArray);

function goalsHtml(goals) {
  let html = "";
  for (let index = 0; index < goals; index++) {
    html += `
    <div class="goalsChild">
        <div class="input-container">
            <div class="circle"></div>
            <div class="input" id="${index}">
                <input
                type="text"
                placeholder="Add new goal  |  Press Enter after filling task"
                />
            </div>
        </div>
        <button class="saveBtn">SAVE</button>
        <button class="deleteBtn">DELETE</button>
    </div>
    `;
  }
  document.querySelector(".goals").innerHTML = html;
}

function inputsListener(goals) {
  let selectGoalsMsg = document.querySelector(".selectGoalsMsg");
  let inputs = document.getElementsByTagName("input");
  inputs = Array.from(inputs);

  inputs.forEach((input, index) => {
    if (taskArray.length !== 0) {
      console.log("entering");

      input.parentElement.innerHTML = goals[index];

      selectGoalsMsg.innerHTML = `${index + 1}/${goals.length} task filled`;
      selectGoalsMsg.style.color = "green";
    }

    input.addEventListener("keydown", (event) => {
      if (input.value.trim() !== "") {
        if (event.key === "Enter") {
          input.parentElement.innerHTML = input.value;
          taskArray.push(input.value);
          saveToLocalStorage();

          selectGoalsMsg.innerHTML = `${index + 1}/${goals} task filled`;
          selectGoalsMsg.style.color = "green";
        }
      }
    });
  });

  let saveBtnElem = document.querySelectorAll(".saveBtn");
  saveBtnElem = Array.from(saveBtnElem);
  saveBtnElem.forEach((saveBtn, index) => {
    saveBtn.addEventListener("click", () => {
      if (inputs[index].value.trim() !== "") {
        inputs[index].parentElement.innerHTML = inputs[index].value;

        selectGoalsMsg.innerHTML = `${index + 1}/${goals} task filled`;
        selectGoalsMsg.style.color = "green";
      }
    });
  });

  let deleteBtnElem = document.querySelectorAll(".deleteBtn");
  deleteBtnElem = Array.from(deleteBtnElem);
  console.log(deleteBtnElem);

  let goalsChild = document.querySelectorAll(".goalsChild");
  console.log(goalsChild);

  goalsChild = Array.from(goalsChild);

  deleteBtnElem.forEach((deleteBtn, index) => {
    deleteBtn.addEventListener("click", () => {
      console.log("Entering");

      goalsChild[index].remove();
      console.log(taskArray.splice(index, 1));
      taskArray.splice(index, 1);
      saveToLocalStorage();
    });
  });
}

function tick(goals) {
  let completedGoals = 0;
  let totalGoals = goals.length;
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

let generateBtnELem = document.querySelector(".generateBtn");
generateBtnELem.addEventListener("click", () => {
  let goalNoInput = document.querySelector(".goalsNo");
  let goals = goalNoInput.value;

  if (goals !== "") {
    console.log("Generating");
    goalsHtml(goals);
    inputsListener(goals);
    tick(document.getElementsByTagName("input"));
  }
});

//Local Storage Logic
if (taskArray.length !== 0) {
  console.log("Calling from storage");
  goalsHtml(taskArray.length);
  inputsListener(taskArray);
  tick(taskArray);
}
function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}
