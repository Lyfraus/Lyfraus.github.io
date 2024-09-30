


const addSelectElement = (element)=>{
    element.innerHTML += `
        <div class="selection-div not-checked">
            <select class="selection">
                <option>Titulo</option>
                <option>Parrafo</option>
                <option>Imagen</option>
                <option>Fila</option>
                <option>Columna</option>
                <option>Fuente</option>
            </select>
            <button class="add-btn" onclick="createSelection(this)">Agregar</button>
        </div>
    `;
};

const removeSelection = (btnElement)=>{
    btnElement.parentElement.remove();
};

const addSubClass = (upperElement)=>{
    return upperElement.classList.contains("row") ? "subRow" : (upperElement.classList.contains("column") ? "subColumn" : "");
};

const checkSelection = (btnElement)=>{
    const pElement = btnElement.parentElement;
    const elementType = pElement.querySelector(".element-type").textContent;
    console.log(elementType);
    let element;
    if (!["img","font","row","column"].includes(elementType)){
        element = document.createElement(elementType);
        if (pElement.parentElement.classList.length !== 0){
            if(addSubClass(pElement.parentElement)){
                element.classList.add(addSubClass(pElement.parentElement));
            }
        }
        element.textContent = pElement.querySelector("textarea").value;

    } else {
        switch(elementType){
            case "img":
                element = document.createElement("div");
                element.classList.add("imageWithCaption");
                if (pElement.parentElement.classList.length !== 0){
                    if(addSubClass(pElement.parentElement)){
                        element.classList.add(addSubClass(pElement.parentElement));
                    }
                }
                element.innerHTML = `<img src="${pElement.querySelector(".image-link").value}"/> ~ ${btnElement.parentElement.querySelector(".image-caption").value}`;
                break;

            case "row":
                element = document.createElement("div");
                element.classList.add("row");
                if (pElement.parentElement.classList.length !== 0){
                    if(addSubClass(pElement.parentElement)){
                        element.classList.add(addSubClass(pElement.parentElement));
                    }
                }
                element.innerHTML = pElement.querySelector(".row-content").innerHTML;
                break;

            case "column":
                element = document.createElement("div");
                element.classList.add("column");
                if (pElement.parentElement.classList.length !== 0){
                    if(addSubClass(pElement.parentElement)){
                        element.classList.add(addSubClass(pElement.parentElement));
                    }
                }
                element.innerHTML = pElement.querySelector(".column-content").innerHTML;
                break;

            case "font":
                element = document.createElement("span");
                element.classList.add("font");
                if (pElement.parentElement.classList.length !== 0){
                    if(addSubClass(pElement.parentElement)){
                        element.classList.add(addSubClass(pElement.parentElement));
                    }
                }
                element.textContent = pElement.querySelector("textarea").value;
                break;
        }
    }
    pElement.insertAdjacentElement('afterend', element)
    pElement.remove();
};

const createSelection = (btnElement)=>{
    const elementPlace = btnElement.parentElement.parentElement;
    const selection = btnElement.parentElement.querySelector(".selection").value;
    removeSelection(btnElement);
    switch(selection){
        case "Imagen":
            elementPlace.innerHTML += `
                <div class="not-checked">
                    <span class="element-type" style="display:none;">img</span>
                    <input class="image-link" type="text" placeholder="Link de la imagen"/>
                    <input class="image-caption" type="text" placeholder="Leyenda de la imagen"/>
                    <button class="check-button" onclick="checkSelection(this)">✓</button>
                    <button class="remove-button" onclick="removeSelection(this)">✗</button>
                </div>
            `;
            addSelectElement(elementPlace);
        break;
        case "Fila":
            elementPlace.innerHTML += `
                <div class="row not-checked">
                    <span class="element-type" style="display:none;">row</span>
                    <div class="row-content"></div>
                    <button class="check-button" onclick="checkSelection(this)">✓</button>
                    <button class="remove-button" onclick="removeSelection(this)">✗</button>
                </div>
            `;
            addSelectElement(elementPlace.querySelector(".row-content"));
            addSelectElement(elementPlace);
        break;
        case "Column":
            elementPlace.innerHTML += `
                <div class="column not-checked">
                    <span class="element-type" style="display:none;">column</span>
                    <div class="column-content"></div>
                    <button class="check-button" onclick="checkSelection(this)">✓</button>
                    <button class="remove-button" onclick="removeSelection(this)">✗</button>
                </div>
            `;
            addSelectElement(elementPlace.querySelector(".column-content"));
            addSelectElement(elementPlace);
        break;
        case "Parrafo":
            elementPlace.innerHTML += `
                <div class="not-checked">
                    <span class="element-type" style="display:none;">p</span>
                    <textarea></textarea>
                    <button class="check-button" onclick="checkSelection(this)">✓</button>
                    <button class="remove-button" onclick="removeSelection(this)">✗</button>
                </div>
            `;
            addSelectElement(elementPlace);
        break;
        case "Titulo":
            elementPlace.innerHTML += `
                <div class="not-checked">
                    <span class="element-type" style="display:none;">h2</span>
                    <textarea></textarea>
                    <button class="check-button" onclick="checkSelection(this)">✓</button>
                    <button class="remove-button" onclick="removeSelection(this)">✗</button>
                </div>
            `;
            addSelectElement(elementPlace);
        break;
        case "Fuente":
            elementPlace.innerHTML += `
                <div class="not-checked">
                    <span class="element-type" style="display:none;">font</span>
                    <textarea></textarea>
                    <button class="check-button" onclick="checkSelection(this)">✓</button>
                    <button class="remove-button" onclick="removeSelection(this)">✗</button>
                </div>
            `;
            addSelectElement(elementPlace);
        break;
    }
};

const noticiaElement = document.getElementById("noticia");

const resetCreation = ()=>{
    noticiaElement.innerHTML = "";
    addSelectElement(noticiaElement);

};

const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", resetCreation);

resetCreation();

let isPreview = true;

const previewButton = document.getElementById("preview");

previewButton.addEventListener("click",()=>{
    if(isPreview){
        const notCheckedArray = [...document.getElementsByClassName("not-checked")];
        for(const notChecked of notCheckedArray){
            notChecked.style.display = "";
        }
        isPreview = !isPreview;
    } else {
        const notCheckedArray = [...document.getElementsByClassName("not-checked")];
        for(const notChecked of notCheckedArray){
            notChecked.style.display = "none";
        }
        isPreview = !isPreview;
    }
});

const createButton = document.getElementById("create");

function obtenerHtmlSinScriptsInnecesarios() {
    // Clonar todo el documento para evitar modificar el DOM real
    const copiaDocumento = document.documentElement.cloneNode(true);

    // Seleccionar todos los elementos <script>
    const scripts = copiaDocumento.querySelectorAll('script');
    scripts.forEach(script => {
        // Eliminar el <script> si su 'src' es distinto a 'crear.js'
        if (script.src && !script.src.includes("crear.js")) {
            script.remove();
        }
    });

    // Retornar el HTML del documento como string
    return copiaDocumento.outerHTML;
}

createButton.addEventListener("click",()=>{
    const notCheckedArray = [...document.getElementsByClassName("not-checked")];
    for(const notChecked of notCheckedArray){
        notChecked.remove();
    }
    document.getElementById("controls").remove();
    document.querySelector("main").innerHTML += `<section id="html-text"></section>`;
    document.getElementById("html-text").textContent = `
<!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../styles/header.css">
        <link rel="stylesheet" href="../styles/footer.css">
        <link rel="stylesheet" href="../styles/base.css">
        <link rel="stylesheet" href="../styles/noticia.css"> 
        <title>Fuente Conservadora - Crear</title> 

    </head>

    <body>

        <header>

            <div>
                <img src="images/logo.png"><h1>FUENTE CONSERVADORA</h1>
            </div>

            <nav>
                <ul>
                    <li><a href="index.html">Noticias</a></li>
                    <li><a href="dolar.html">Dolar</a></li>
                    <li><a href="#redes-nav">Redes</a></li>
                </ul>
            </nav>

        </header>

        <main>

            <section id="noticia">
                ${document.getElementById("noticia").innerHTML}
            </section>
            
            <button id="share">Compartir ➥</button>

        </main>

        <footer>
            <nav id="redes-nav">
                <ul>
                    <li><a href="https://www.instagram.com/fuenteconservadora/" target="_blank"><div class="logo-border"><img src="https://1000marcas.net/wp-content/uploads/2019/11/insta-logo.png"></div></a></li>
                    <li><a href="https://x.com/F_Conservadora" target="_blank"><div class="logo-border"><img src="https://1000marcas.net/wp-content/uploads/2019/11/Twitter-Logo.png"></div></a></li>
                    <li><a href="mailto:fuenteconservadora@gmail.com" target="_blank"><div id="mail-logo" class="logo-border"><img src="https://icons.veryicon.com/png/o/business/oa-office/mail-227.png"></div></a></li>
                </ul>
            </nav>
        </footer>

        <script src="crear.js"></script>

    </body>

</html>
    `;
    document.getElementById("html-text").innerHTML = document.getElementById("html-text").innerHTML.replace(/\n/g, '<br>').replace(/ {4}/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
});

