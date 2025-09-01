const enterTask = document.getElementById("entertask")
const addBtn = document.getElementById("add-btn")
const taskList = document.getElementById("task-list")
const inputError = document.getElementById("inputerror")
const tsList = document.getElementById("tslist")
const clearList = document.getElementById("clearList")
const del = document.getElementById("del")
const uncomTask = document.getElementById("uncomTask")
const comTask = document.getElementById("comTask")
const numTask= document.getElementById("numTask")
function updateCounters() {
    const allTasks = taskList.querySelectorAll(".action-btn");
    const completedTasks = taskList.querySelectorAll(".action-btn.completed");

    numTask.innerText = allTasks.length;
    comTask.innerText = completedTasks.length;
    uncomTask.innerText = allTasks.length - completedTasks.length;
}
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach((li) => {
        tasks.push({
            text: li.firstChild.textContent.trim(), 
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach((task) => {
        createTask(task.text, task.completed);
    });
}
function createTask(text, completed = false) {
    const list = document.createElement("li");
    list.role = "listitem"
    const delBtn = document.createElement("button");
    const doneBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const actionButtons = document.createElement("div");
    const anotherDiv = document.createElement("div");
    list.innerText = text;
    doneBtn.innerText = "✓";
    delBtn.innerText = "X";
    editBtn.innerText = "Edit";
    anotherDiv.classList.add("another-div");
    actionButtons.classList.add("action-btn");
    list.classList.add("cut");
    delBtn.classList.add("del-btn");
    editBtn.classList.add("edit-btn");
    doneBtn.classList.add("done-btn");
    taskList.appendChild(actionButtons);
    actionButtons.appendChild(list);
    actionButtons.appendChild(anotherDiv);
    anotherDiv.appendChild(editBtn);
    anotherDiv.appendChild(doneBtn);
    anotherDiv.appendChild(delBtn);
    if (completed) {
        actionButtons.classList.add("completed");
        anotherDiv.removeChild(editBtn);
        const success = document.createElement("span");
        success.innerText = "Congratulations";
        success.style.color = "#00c851";
        anotherDiv.replaceChild(success, doneBtn);
    }
    delBtn.addEventListener("click", function(){
        taskList.removeChild(actionButtons);
        updateCounters();
        saveTasks();
    });
    editBtn.addEventListener("click", function(){
        if (editBtn.innerHTML === "Edit") {
            const input = document.createElement("input");
            input.classList.add("edit-input")
            input.type = "text";
            input.value = list.firstChild.textContent.trim();
            list.replaceChild(input, list.firstChild);
            editBtn.innerText = "Save";
            input.focus();
        } else {
            const input = list.querySelector("input");
            const newText = input.value.trim();
            if(newText !== "") {
                const newTextNode = document.createTextNode(newText);
                list.replaceChild(newTextNode, input);
            }
            editBtn.innerText = "Edit";
            saveTasks(); 
        }
    });


    doneBtn.addEventListener("click", function(){
        if (list.querySelector("input")) return; 
        actionButtons.classList.add("completed");
        anotherDiv.removeChild(editBtn);
        const success = document.createElement("span");
        success.innerText = "Congratulations";
        success.style.color = "#00c851";
        anotherDiv.replaceChild(success, doneBtn);
        updateCounters();
        saveTasks();
    });

    updateCounters();
    saveTasks();
}
addBtn.addEventListener("click", function(){
    if (enterTask.value === ""){
        inputError.innerHTML = "Kindly enter a to-do action";
        inputError.classList.add("inner-error");
        return;
    }
    createTask(enterTask.value);
    enterTask.value = "";
});
clearList.addEventListener("click", function() {
    if (taskList.children.length === 0){
        return;
    }
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    const confirmBox = document.createElement("div");
    confirmBox.classList.add("confirm");
    const message = document.createElement("h5");
    const cancel = document.createElement("button");
    const confirmed = document.createElement("button");
    cancel.classList.add("cancel")
    confirmed.classList.add("yes")
    message.innerText = "Are you sure you want to clear the list?";
    cancel.innerText = "Cancel";
    confirmed.innerText = "Confirm";
    confirmBox.appendChild(message);
    confirmBox.appendChild(cancel);
    confirmBox.appendChild(confirmed);
    overlay.appendChild(confirmBox);
    document.body.appendChild(overlay);
    

    const btnRect = clearList.getBoundingClientRect();
    confirmBox.style.top = (btnRect.top - 60) + "px"; 
    confirmBox.style.left = btnRect.left + "px";
    
    cancel.addEventListener("click", function() {
        document.body.removeChild(overlay);
    });
    confirmed.addEventListener("click", function() {
        taskList.innerHTML = "";
        document.body.removeChild(overlay);
        comTask.innerText =0
        uncomTask.innerText = 0
        numTask.innerText = 0 
        saveTasks();
    });

});

enterTask.addEventListener("input", function(){
    inputError.innerHTML = ""
})
loadTasks();
updateCounters();
const myMarquee = document.getElementById("myMarquee")
myMarquee.addEventListener("mouseover", function(){
    myMarquee.stop()
})
myMarquee.addEventListener("mouseout", function(){
    myMarquee.start()
})