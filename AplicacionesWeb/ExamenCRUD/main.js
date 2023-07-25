let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tarea = document.getElementById("tasks");
let add = document.getElementById("add");
let botonBorrar = document.getElementById('delete-all-btn');
var data = JSON.parse(localStorage.getItem("data")) || []



form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});
// Solución talla cinta scotch
botonBorrar.addEventListener('click', () => {
  BorrarTodos();
});


let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "No puede estar en blanco!";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  crearTarea();
};

let crearTarea = () => {
  tarea.innerHTML = "";
  data.map((x, y) => {
    return (tarea.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editarTarea(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="borrarTarea(this);crearTarea()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  limpiarForm();
};



let editarTarea = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  borrarTarea(e);
};

let borrarTarea = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  
};

let limpiarForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
  console.log(data);
  crearTarea();
})();


function BorrarTodos() {
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = '';
    
    localStorage.clear();
  }
  
  
