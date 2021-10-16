// define ui variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

window.onload = start;

// load all event listeners
loadEventListeners();

function loadEventListeners(){
  // add task event
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", deleteTask);
  clearBtn.addEventListener("click", deleteAll);
  filter.addEventListener("keyup", filterTask);
}

function start(e){
 
  let tasks;
  if(localStorage.getItem("tasks") != null){
  
    // tasks = localStorage.getItem("tasks");
    tasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(tasks);
    
    let i = 0;
    tasks.forEach(function(){
      // add to ui
      // create li element
      const li = document.createElement("li");
      // add class
      li.className = "collection-item";
      // create text node, append to li
      li.appendChild(document.createTextNode(tasks[i]));
      // create new link element
      const link = document.createElement("a");
      link.className = "delete-item secondary-content";
      link.innerHTML = "<i class = 'fa fa-remove'></i>";
      li.appendChild(link);

      // append li to ul;
      taskList.appendChild(li);
      i++;
    });

  }
  
}

function addTask(e){
  if(taskInput.value === ""){
    alert("no task input, add a task");
  } else {

    // check if task already exists in local storage
    let tasks;
    if(localStorage.getItem("tasks") == null){
      tasks = [];
    } else {
      // tasks = localStorage.getItem("tasks");
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    if(tasks.indexOf(taskInput.value) === -1){
      // add to storage
      tasks.push(taskInput.value);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // add to ui
      // create li element
      const li = document.createElement("li");
      // add class
      li.className = "collection-item";
      // create text node, append to li
      li.appendChild(document.createTextNode(taskInput.value));
      // create new link element
      const link = document.createElement("a");
      link.className = "delete-item secondary-content";
      link.innerHTML = "<i class = 'fa fa-remove'></i>";
      li.appendChild(link);

      // append li to ul;
      taskList.appendChild(li);
    } else {
      alert("No duplicate tasks allowed.")
    }

  }

  taskInput.value = "";
  e.preventDefault();
}

function deleteTask(e){
  if(e.target.parentElement.classList.contains("delete-item")){
    e.target.parentElement.parentElement.remove();

    
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let item = e.target.parentElement.parentElement.textContent;
    let index = tasks.indexOf(item);
    tasks.splice(index, 1);
    localStorage.removeItem("tasks");
    localStorage.setItem("tasks", JSON.stringify(tasks));;

    // if no more tasks in storage, delete the node list
    if(localStorage.getItem("tasks")=="[]"){
      localStorage.removeItem("tasks");
    }
  }

  

}

function deleteAll(e){
  if(confirm("Delete all tasks?")){
    // taskList.innerHTML="";
    // taskList.textContent="";

    // faster method
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }
    // jsperf.com/innerhtml-vs-removechild

    // remove from local storage
    localStorage.removeItem("tasks");

  }
}

function filterTask(e){
  // filter text
  const fText = e.target.value.toLowerCase();
  
  // queryselectorall returns a node list, so can use foreach
  document.querySelectorAll(".collection-item").forEach(function(task){
    // every loop check first child
    const item = task.firstChild.textContent;
    // if first child contains the filter text
    if(item.toLowerCase().indexOf(fText) != -1){
      task.style.display="block";
    }else {
      task.style.display="none";
    }
  });
}

