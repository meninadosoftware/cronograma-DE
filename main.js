// Função para abrir as páginas 

function openPage(pageName, elmnt, color) {
    // esconde os elementos da  class="tabcontent" por padrão */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    //Remover a cor de fundo de todos os botões/tabelas
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
  
    // Mostra o conteúdo específico da guia
    document.getElementById(pageName).style.display = "block";
  
    // Adiciona a cor específica ao botão usado para abrir o conteúdo da guia
    elmnt.style.backgroundColor = color;
  }
  
  // Obtém o elemento com id="defaultOpen" e clica  nele
  document.getElementById("defaultOpen").click();

  // Selecionando elementos do DOM
const taskInputBooks = document.getElementById("new-book");
const taskInputDays = document.getElementById("days");
const addTaskButtonBooks = document.getElementById("add-books");
const taskListBooks = document.getElementById("task-books");

const taskInputPray = document.getElementById("new-pray");
const taskInputTime = document.getElementById("new-time");
const addTaskButtonPray = document.getElementById("add-pray");
const taskListPray = document.getElementById("task-pray");

const taskInputFasting = document.getElementById("new-fasting");
const taskInputHours = document.getElementById("new-hours");
const addTaskButtonFasting = document.getElementById("add-fasting");
const taskListFasting = document.getElementById("task-fasting");


// Carregar as tarefas do LocalStorage ao iniciar a página
document.addEventListener("DOMContentLoaded", loadTasks);

// Adiciona um novo livro
addTaskButtonBooks.addEventListener("click", () => {
    const taskText = taskInputBooks.value.trim();
    const text1 = taskInputDays.value.trim();
    if (taskText && text1 !== "") {
        add(taskText);
        saveTask(taskText);
        add(text1);
        saveTask(text1);
       // Limpar o campo de entrada
       taskInputBooks.value = ""; 
       taskInputDays.value = "";
    }
});
// Adiciona oração
addTaskButtonPray.addEventListener("click", () => {
    const taskText = taskInputPray.value.trim();
    const text1 = taskInputTime.value.trim();
    if (taskText && text1 !== "") {
        add(taskText);
        saveTask(taskText);
        add(text1);
        saveTask(text1);
       // Limpar o campo de entrada
       taskInputPray.value = ""; 
       taskInputTime.value = "";
    }
});

// Adiciona jejum
addTaskButtonFasting.addEventListener("click", () => {
    const taskText = taskInputFasting.value.trim();
    const text1 = taskInputHours.value.trim();
    if (taskText && text1 !== "") {
        add(taskText);
        saveTask(taskText);
        add(text1);
        saveTask(text1);
       // Limpar o campo de entrada
       taskInputFasting.value = ""; 
       taskInputHours.value = "";
    }
});

// Adiciona uma tarefa ao DOM e configura eventos
function add(taskText, completed = false) {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;
    taskItem.classList.toggle("completed", completed);

    // Alternar estado de conclusão ao clicar na tarefa
    taskItem.addEventListener("click", () => {
        taskItem.classList.toggle("completed");
        toggleTaskCompletion(taskText);
    });



    // Botão para remover a tarefa
    const deleteButton = document.createElement("span");
    deleteButton.textContent = "✖";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        removeTask(taskItem, taskText);
    });

    taskItem.appendChild(deleteButton);
    taskListBooks.appendChild(taskItem);
    taskListPray.appendChild(taskItem);
    taskListFasting.appendChild(taskItem);
}

// Carregar tarefas do LocalStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => add(task.text, task.completed));
}

// Salvar nova tarefa no LocalStorage
function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Alternar estado de conclusão da tarefa no LocalStorage
function toggleTaskCompletion(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const task = tasks.find((t) => t.text === taskText);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Remover a tarefa do DOM e do LocalStorage
function removeTask(taskItem, taskText) {
    taskItem.remove();
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const updatedTasks = tasks.filter((task) => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

    