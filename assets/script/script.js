"use strict";

const create = document.querySelector(".createItem");
const field = document.querySelector(".creatingArea");
const tasksDom = document.querySelector(".tasks");

// Yeni tapşırığın yaradılması
const addTask = () => {
  if (!field.value.trim()) return;
  const task = document.createElement("li");
  task.className = "task";
  task.dataset.edstatus = "0";
  task.innerHTML = `<div class="btnGroup">
                <button class="bin">
                  <img src="./assets/images/Frame.svg" alt="" />
                </button>
                <span class="checkbox">
                  <input type="checkbox" class="xana"
                /></span>
              </div>
              <input class="taskContent" type="text" disabled value="${field.value}" />
              <button class="saveBtn" type="button">Dəyiş</button>`;
  tasksDom.prepend(task);
  field.value = "";
  counter();
};
create.addEventListener("click", addTask);

field.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    create.click();
  }
});

// Event delegation
tasksDom.addEventListener("click", (e) => {
  const input = e.target.closest("li").querySelector(".taskContent");
  const listitem = e.target.closest("li");
  const saveBtn = e.target.closest(".saveBtn");

  if (!listitem) return;
  // Tapşırığın silinməsi.
  if (e.target.closest(".bin")) {
    listitem.remove();

    counter();
  }
  // Tapşırığın redaktə edilməsi
  else if (e.target.closest(".saveBtn")) {
    listitem.classList.toggle("editing");
    const isEditing = listitem.classList.contains("editing");

    input.disabled = !isEditing;
    saveBtn.textContent = isEditing ? "Yadda saxla" : "Dəyiş";
    input.style.border = isEditing
      ? "1px solid black"
      : "1px solid transparent";
    if (isEditing) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }

  // else if (e.target.closest(".saveBtn") && listitem.dataset.edstatus == 0) {
  //   input.removeAttribute("disabled");
  //   input.focus();
  //   input.setSelectionRange(input.value.length, input.value.length);
  //   saveBtn.textContent = "Yadda saxla";
  //   input.style.border = `1px solid black`;
  //   listitem.dataset.edstatus = 1;
  // } else if (e.target.closest(".saveBtn") && listitem.dataset.edstatus == 1) {
  //   input.setAttribute("disabled", "");
  //   saveBtn.textContent = "Dəyiş";
  //   input.style.border = `1px solid transparent`;
  //   listitem.dataset.edstatus = 0;
  // }
});

// Tamamlanmış tapşırıq

tasksDom.addEventListener("change", (e) => {
  if (!e.target.matches('input[type="checkbox"]')) return;

  const listitem = e.target.closest("li");
  const input = listitem.querySelector(".taskContent");

  input.style.textDecoration = e.target.checked ? "line-through" : "none";
  counter();
});

// Counter

const counter = () => {
  let quantity = Array.from(tasksDom.querySelectorAll(".xana")).filter(
    (ch) => !ch.checked
  ).length;
  // let quantity = tasksDom.children.matches('["input[type="checkbox"]');
  document.querySelector(".quantity").textContent = quantity;
};

counter();
