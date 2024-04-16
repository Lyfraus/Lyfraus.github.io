
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

function DeleteSerie(boton) {

    boton.parentElement.remove();

}

function AddSerie(object) {

    let seriesdiv = object.parentElement.parentElement.querySelector(".seriesdiv");

    let serie = document.createElement("div");
    serie.classList.add("serie");

    let serienum = document.createElement("h3");
    let x = 0;
    if (seriesdiv.querySelectorAll("div") != null) {

        x = seriesdiv.querySelectorAll("div").length +1;

    }   
    else {

        x = 1;

    }
    serienum.textContent = "S." + x; 

    let input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Reps";

    let button = document.createElement("button");
    button.textContent = "X";
    button.onclick = function (){

        DeleteSerie(this);

    }

    serie.appendChild(serienum);
    serie.appendChild(input);
    serie.appendChild(button);
    seriesdiv.appendChild(serie);


}

function AddExercise() {

    let exercisesdiv = document.getElementById("exercises");

    let title = document.createElement("input");
    title.placeholder = "Nombre del ejercicio";
    title.type = "text";

    let series = document.createElement("div");
    series.classList.add("seriesdiv");

    let addbutton = document.createElement("button");
    addbutton.textContent = "+ Serie";
    addbutton.classList.add("greenclass");
    addbutton.classList.add("subbutton");
    addbutton.onclick = function (){

        AddSerie(this);

    }

    let deletebutton = document.createElement("button");
    deletebutton.textContent = "- Ejercicio";
    deletebutton.classList.add("redclass");
    deletebutton.classList.add("subbutton");
    deletebutton.onclick = function (){

        DeleteExercise(this);

    };

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
    if (ancho > 775) {

        elemento.style.width = "60%";

    }
    else {

        elemento.style.width = "95%";

    }

}

window.addEventListener("resize",handleResize);

handleResize();