document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const todoList = document.getElementById("todoList");
    const doneList = document.getElementById("doneList");

    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && taskInput.value.trim() !== "") {
            addTask(taskInput.value.trim());
            taskInput.value = "";
        }
    });

    function addTask(task) {
        const li = document.createElement("li");
        li.textContent = task;

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "완료";
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", () => moveToDone(li));

        li.appendChild(completeBtn);
        todoList.appendChild(li);
    }

    function moveToDone(taskItem) {
        const doneTask = taskItem.cloneNode(true);
        doneTask.removeChild(doneTask.querySelector("button"));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => doneList.removeChild(doneTask));

        doneTask.appendChild(deleteBtn);
        doneList.appendChild(doneTask);
        todoList.removeChild(taskItem);
    }
});
