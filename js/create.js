
let storage = localStorage.getItem("RutinasStorageByLyfraus");

console.log(storage);

if (~storage) {

    let storage = [];
    localStorage.setItem("RutinasStorageByLyfraus", storage);

}

function DeleteExercise(boton){ 
    
    let divBoton = boton.parentElement;
        
    let articulo = divBoton.parentElement;
        
    articulo.remove();
}

function AddExercise() {

    let exercisesdiv = document.getElementById("exercises");

    let title = document.createElement("input");
    title.placeholder = "Nombre del ejercicio";
    title.type = "text";

    let series = document.createElement("div");

    let addbutton = document.createElement("button");
    addbutton.textContent = "+ Serie";
    addbutton.classList.add("greenclass");
    addbutton.classList.add("subbutton");

    let deletebutton = document.createElement("button");
    deletebutton.textContent = "- Ejercicio";
    deletebutton.classList.add("redclass");
    deletebutton.classList.add("subbutton");
    deletebutton.onclick = function (){this.parentElement.parentElement.remove()};

    let buttons = document.createElement("div");
    buttons.appendChild(addbutton);
    buttons.appendChild(deletebutton);
    buttons.classList.add("divbuttons");

    let exercise = document.createElement("div");
    exercise.classList.add("exercise")
    exercise.appendChild(title);
    exercise.appendChild(series);
    exercise.appendChild(buttons);
    exercisesdiv.appendChild(exercise);

}

function handleResize() {

    let elemento = document.getElementById("maindiv");
    let ancho = document.documentElement.clientWidth;
    let ejercicios = document.getElementsByClassName("ejercicio")
    if (ancho > 775) {

        elemento.style.width = "60%";

    }
    else {

        elemento.style.width = "90%";

    }

}

window.addEventListener("resize",handleResize);

handleResize();