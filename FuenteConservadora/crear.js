


const selectElement = `
        <div class="selection-div">
            <select class="selection">
                <option>Titulo</option>
                <option>Parrafo</option>
                <option>Fuente</option>
                <option>Cita</option>
                <option>Imagen</option>
                <option>Fila</option>
                <option>Columna</option>
                <option>Lista</option>
                <option>Elemento de lista</option>
            </select>
            <button class="add-btn" onclick="createSelection(this)">Agregar</button>
        </div>
    `;

const removeSelection = (btnElement)=>{
    btnElement.parentElement.parentElement.remove();
};

const addSubClass = (upperElement)=>{
    return upperElement.classList.contains("row") ? "subRow" : (upperElement.classList.contains("column") ? "subColumn" : "");
};

const checkSelection = (btnElement)=>{
    const pElement = btnElement.parentElement.parentElement;
    const elementType = pElement.querySelector(".element-type").textContent;
    let element;
    if (!["img","font","row","column","ul","quote"].includes(elementType)){
        if(!pElement.querySelector("textarea").value.replace(" ","")){
            return;
        }
        element = document.createElement(elementType);
        if (pElement.parentElement.classList.length !== 0){
            if(addSubClass(pElement.parentElement)){
                element.classList.add(addSubClass(pElement.parentElement));
            }
        }
        if (pElement.querySelector(".buttons").querySelector(".box-type").checked){
            element.classList.add("boxed");
        }
        element.textContent = pElement.querySelector("textarea").value;

    } else {
        switch(elementType){
            case "img":
                if(!pElement.querySelector(".image-link").value.replace(" ","")){
                    return;
                }
                element = document.createElement("div");
                element.classList.add("imageWithCaption");
                if (pElement.parentElement.classList.length !== 0){
                    if(addSubClass(pElement.parentElement)){
                        element.classList.add(addSubClass(pElement.parentElement));
                    }
                }
                if (pElement.querySelector(".box-type").checked){
                    element.classList.add("boxed");
                }
                element.innerHTML = `<img src="${pElement.querySelector(".image-link").value}"/> ~ ${pElement.querySelector(".image-caption").value}`;
                break;

            case "row":
                if(!pElement.querySelector(".row-content").innerHTML.replace(" ","")){
                    return;
                }
                element = document.createElement("div");
                element.classList.add("row");
                if (pElement.parentElement.classList.length !== 0){
                    if(addSubClass(pElement.parentElement)){
                        element.classList.add(addSubClass(pElement.parentElement));
                    }
                }
                if (pElement.querySelector(".box-type").checked){
                    element.classList.add("boxed");
                }
                element.innerHTML = pElement.querySelector(".row-content").innerHTML;
                break;

            case "column":
                if(!pElement.querySelector(".column-content").innerHTML.replace(" ","")){
                    return;
                }
                element = document.createElement("div");
                element.classList.add("column");
                if (pElement.parentElement.classList.length !== 0){
                    if(addSubClass(pElement.parentElement)){
                        element.classList.add(addSubClass(pElement.parentElement));
                    }
                }
                if (pElement.querySelector(".box-type").checked){
                    element.classList.add("boxed");
                }
                element.innerHTML = pElement.querySelector(".column-content").innerHTML;
                break;
            
            case "ul":
                if(!pElement.querySelector(".list-content").innerHTML.replace(" ","")){
                    return;
                }
                element = document.createElement("ul");
                element.classList.add("list");
                if (pElement.parentElement.classList.length !== 0){
                    if(addSubClass(pElement.parentElement)){
                        element.classList.add(addSubClass(pElement.parentElement));
                    }
                }
                if (pElement.querySelector(".box-type").checked){
                    element.classList.add("boxed");
                }
                element.innerHTML = pElement.querySelector(".list-content").innerHTML;
                break;

            

            case "font":
                if(!pElement.querySelector("textarea").value.replace(" ","")){
                    return;
                }
                element = document.createElement("span");
                element.classList.add("font");
                if (pElement.parentElement.classList.length !== 0){
                    if(addSubClass(pElement.parentElement)){
                        element.classList.add(addSubClass(pElement.parentElement));
                    }
                }
                if (pElement.querySelector(".box-type").checked){
                    element.classList.add("boxed");
                }
                element.textContent = pElement.querySelector("textarea").value;
                break;
            
            case "quote":
                if(!pElement.querySelector("textarea").value.replace(" ","")){
                    return;
                }
                element = document.createElement("span");
                element.classList.add("quote");
                if (pElement.parentElement.classList.length !== 0){
                    if(addSubClass(pElement.parentElement)){
                        element.classList.add(addSubClass(pElement.parentElement));
                    }
                }
                if (pElement.querySelector(".box-type").checked){
                    element.classList.add("boxed");
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
    const selection = btnElement.parentElement.querySelector("select").value;
    const elementToRemove = btnElement.parentElement;
    elementToRemove.remove();
    switch(selection){
        case "Imagen":
            elementPlace.innerHTML += `
                <div class="not-checked">
                    <span class="element-type" style="display:none;">img</span>
                    <input class="image-link" type="text" placeholder="Link de la imagen"/>
                    <input class="image-caption" type="text" placeholder="Leyenda de la imagen"/>
                    <div class="buttons">
                        <input class="box-type" type="checkbox"/>
                        <button class="check-button" onclick="checkSelection(this)">✓</button>
                        <button class="remove-button" onclick="removeSelection(this)">✗</button>
                    </div>
                </div>
            `;
            elementPlace.innerHTML += selectElement;
        break;
        case "Fila":
            elementPlace.innerHTML += `
                <div class="row not-checked">
                    <span class="element-type" style="display:none;">row</span>
                    <div class="row-content"></div>
                    <div class="buttons">
                        <input class="box-type" type="checkbox"/>
                        <button class="check-button" onclick="checkSelection(this)">✓</button>
                        <button class="remove-button" onclick="removeSelection(this)">✗</button>
                    </div>
                </div>
            `;
            elementPlace.querySelector(".row-content").innerHTML += selectElement;
            elementPlace.innerHTML += selectElement;
        break;
        case "Columna":
            elementPlace.innerHTML += `
                <div class="column not-checked">
                    <span class="element-type" style="display:none;">column</span>
                    <div class="column-content"></div>
                    <div class="buttons">
                        <input class="box-type" type="checkbox"/>
                        <button class="check-button" onclick="checkSelection(this)">✓</button>
                        <button class="remove-button" onclick="removeSelection(this)">✗</button>
                    </div>
                </div>
            `;
            elementPlace.querySelector(".column-content").innerHTML += selectElement;
            elementPlace.innerHTML += selectElement;
        break;
        case "Lista":
            elementPlace.innerHTML += `
                <div class="list not-checked">
                    <span class="element-type" style="display:none;">ul</span>
                    <div class="list-content"></div>
                    <div class="buttons">
                        <input class="box-type" type="checkbox"/>
                        <button class="check-button" onclick="checkSelection(this)">✓</button>
                        <button class="remove-button" onclick="removeSelection(this)">✗</button>
                    </div>
                </div>
            `;
            elementPlace.querySelector(".list-content").innerHTML += selectElement;
            elementPlace.innerHTML += selectElement;
        break;
        case "Parrafo":
            elementPlace.innerHTML += `
                <div class="not-checked">
                    <span class="element-type" style="display:none;">p</span>
                    <textarea></textarea>
                    <div class="buttons">
                        <input class="box-type" type="checkbox"/>
                        <button class="check-button" onclick="checkSelection(this)">✓</button>
                        <button class="remove-button" onclick="removeSelection(this)">✗</button>
                    </div>
                </div>
            `;
            elementPlace.innerHTML += selectElement;
        break;
        case "Elemento de lista":
            elementPlace.innerHTML += `
                <div class="not-checked">
                    <span class="element-type" style="display:none;">li</span>
                    <textarea></textarea>
                    <div class="buttons">
                        <input class="box-type" type="checkbox"/>
                        <button class="check-button" onclick="checkSelection(this)">✓</button>
                        <button class="remove-button" onclick="removeSelection(this)">✗</button>
                    </div>
                </div>
            `;
            elementPlace.innerHTML += selectElement;
        break;
        case "Titulo":
            elementPlace.innerHTML += `
                <div class="not-checked">
                    <span class="element-type" style="display:none;">h2</span>
                    <textarea></textarea>
                    <div class="buttons">
                        <input class="box-type" type="checkbox"/>
                        <button class="check-button" onclick="checkSelection(this)">✓</button>
                        <button class="remove-button" onclick="removeSelection(this)">✗</button>
                    </div>
                </div>
            `;
            elementPlace.innerHTML += selectElement;
        break;
        case "Cita":
            elementPlace.innerHTML += `
                <div class="not-checked">
                    <span class="element-type" style="display:none;">quote</span>
                    <textarea></textarea>
                    <div class="buttons">
                        <input class="box-type" type="checkbox"/>
                        <button class="check-button" onclick="checkSelection(this)">✓</button>
                        <button class="remove-button" onclick="removeSelection(this)">✗</button>
                    </div>
                </div>
            `;
            elementPlace.innerHTML += selectElement;
        break;
        case "Fuente":
            elementPlace.innerHTML += `
                <div class="not-checked">
                    <span class="element-type" style="display:none;">font</span>
                    <textarea></textarea>
                    <div class="buttons">
                        <input class="box-type" type="checkbox"/>
                        <button class="check-button" onclick="checkSelection(this)">✓</button>
                        <button class="remove-button" onclick="removeSelection(this)">✗</button>
                    </div>
                </div>
            `;
            elementPlace.innerHTML += selectElement;
        break;
    }
};

const noticiaElement = document.getElementById("noticia");

const resetCreation = ()=>{
    noticiaElement.innerHTML = "";
    noticiaElement.innerHTML += selectElement;

};

const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", resetCreation);

resetCreation();

let isPreview = false;

const previewButton = document.getElementById("preview");

previewButton.addEventListener("click",()=>{
    const notCheckedArray = [...document.querySelectorAll(".not-checked,.selection-div")];
    const blueBordersArray = [...document.querySelectorAll(".row:not(.boxed),.column:not(.boxed),#noticia p:not(.boxed),#noticia h2:not(.boxed),#noticia span:not(.boxed)")];
    console.log(blueBordersArray);   
    if(isPreview){
        for(const notChecked of notCheckedArray){
            notChecked.style.display = "";
        }
        for(const blueBorder of blueBordersArray){
            blueBorder.style.borderColor = "blue";
        }
        isPreview = !isPreview;
    } else {
        for(const notChecked of notCheckedArray){
            notChecked.style.display = "none";
        }
        for(const blueBorder of blueBordersArray){
            blueBorder.style.borderColor = "transparent";
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

    const blueBordersArray = [...document.querySelectorAll(".row:not(.boxed),.column:not(.boxed),#noticia p:not(.boxed),#noticia h2:not(.boxed),#noticia span:not(.boxed)")];
    if(isPreview){
        for(const blueBorder of blueBordersArray){
            blueBorder.style.borderColor = "blue";
        }
        isPreview = !isPreview;
    } else {
        for(const blueBorder of blueBordersArray){
            blueBorder.style.borderColor = "transparent";
        }
        isPreview = !isPreview;
    }

    const selectDivsArray = [...document.getElementsByClassName("selection-div")];
    for(const selectDiv of selectDivsArray){
        selectDiv.remove();
    }
    document.getElementById("controls").remove();
    document.querySelector("main").innerHTML += `<section id="html-text"></section>`;
    document.getElementById("html-text").textContent = `
<!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../../styles/header.css">
        <link rel="stylesheet" href="../../styles/footer.css">
        <link rel="stylesheet" href="../../styles/base.css">
        <link rel="stylesheet" href="../../styles/noticia.css"> 
        <title>Fuente Conservadora - ${document.querySelector("#noticia h2").textContent}</title> 

    </head>

    <body>

        <header>
      
            <div>
                <a class="linkedImage" href="../../index.html"><img src="../../images/logo.png"></a><h1>FUENTE CONSERVADORA</h1></a>
            </div>

            <nav>
                <ul>
                    <li><a href="../../index.html">Noticias</a></li>
                    <li><a href="../../dolar.html">Dolar</a></li>
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

        <script src="../../noticia.js"></script>

    </body>

</html>
    `;
    document.getElementById("html-text").innerHTML = document.getElementById("html-text").innerHTML.replace(/\n/g, '<br>').replace(/ {4}/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
});

