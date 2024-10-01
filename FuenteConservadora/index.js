let noticias;
const noticiasElement = document.getElementById("noticias");
let noticiasPage = 0;
const noticiasPageElement = document.getElementById("page-number");
const noticiasMinusPageElement = document.getElementById("minus-page-number");
const noticiasPlusPageElement = document.getElementById("plus-page-number");
let topics = [];
let noticiasDisplayables;
const topicsListElement = document.getElementById("topics-list"); 
const maxNews = 14;

let actualTopicElement;



fetch('noticias/noticias.json')
  .then(response => response.json())
  .then(data => {
    noticias = data;
    noticias.forEach(not => {
        if(topics.indexOf(not.topic)===-1){
            topics.push(not.topic);
        }
    });
    for(const topic of topics){
        topicsListElement.innerHTML += `<li id="${topic}" class="topic">${topic}</li>`;
    }
    noticiasDisplayables = noticias;
    cargarNoticias();  // Llama a tu función aquí
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });




const cargarNoticias = ()=>{
    let stringElement = ``;
    let noticiasToDisplay;
    if ((noticiasPage + 1) * maxNews > noticiasDisplayables.length) {
        if(noticiasDisplayables.length-maxNews < 0){
            noticiasToDisplay = noticiasDisplayables.slice(0,noticiasDisplayables.length);
        } else {
            noticiasToDisplay = noticiasDisplayables.slice(noticiasDisplayables.length - maxNews,noticiasDisplayables.length);
        }
    } else {
        noticiasToDisplay = noticiasDisplayables.slice(noticiasPage * maxNews,(noticiasPage + 1) * maxNews);
    }
    for(const noticia of noticiasToDisplay){
        stringElement += `
            <article id="${noticia["id"]}" class="noticia">
                <a href="noticias/htmls/${noticia["id"] + ".html"}" target="">
                    <img src="${noticia["image-link"]}">
                    <p>| ${noticia["topic"]}</p>
                    <h2>${noticia["title"]}</h2>
                    <span>~ ${noticia["date"]}</span>
                </a>
            </article>
        `;
    }
    noticiasElement.innerHTML = stringElement;
};

const borrarNoticias = ()=>{
    noticiasElement.innerHTML = "";
};

const elementToString = (el,isSubRow = false,isSubColumn = false)=>{
    let theString = ``;
    if (el.type === "row"){
        theString += `<div class="row ${isSubRow || isSubColumn ? (isSubRow ? "subRow" : "subColumn") : ""}">`;
        for(const x of el.content){
            theString += elementToString(x,true,false);
        }
        theString += `</div>`;
    } else if (el.type === "column"){
        theString += `<div class="column ${isSubRow || isSubColumn ? (isSubRow ? "subRow" : "subColumn") : ""}">`;
        for(const x of el.content){
            theString += elementToString(x,false,true);
        }
        theString += `</div>`;
    } else if (el.type === "font"){
        theString += `<span class="font ${isSubRow || isSubColumn ? (isSubRow ? "subRow" : "subColumn") : ""}">${el.content}</span>`;
    } else if (el.type === "ul"){
        theString += `<ul ${isSubRow || isSubColumn ? (isSubRow ? "class='subRow'" : "class='subColumn'") : ""}">`;
        for(const x of el.content){
            theString += elementToString(x,false,false);
        }
        theString += `</ul>`;
    } else if (el.type === "img"){
        if (el.caption){
            theString += `<span class="imageWithCaption ${isSubRow || isSubColumn ? (isSubRow ? "subRow" : "subColumn") : ""}">`;
            theString += `<img src="${el.src}"/>`;
            theString += `~ ${el.caption}</span>`;
        } else {
            theString += `<img src="${el.src}" ${isSubRow || isSubColumn ? (isSubRow ? "class='subRow'" : "class='subColumn'") : ""}/>`;
        }
    } else {
        theString += `<${el.type} ${isSubRow || isSubColumn ? (isSubRow ? "class='subRow'" : "class='subColumn'") : ""}>${el.content}</${el.type}>`;
    }
    return theString;
};





const noticiasButton = document.getElementById("noticias-button");

noticiasButton.addEventListener("click",()=>{
    if(noticiasElement.innerHTML){
        noticiasPage = 0;
        noticiasDisplayables = noticias;
        if(actualTopicElement){
            actualTopicElement.classList.remove("selected");
        }
        
        actualTopicElement = null;
    }
    cargarNoticias();
});

const topicsNavElement = document.getElementById("topics-nav");

topicsNavElement.addEventListener("click",(e)=>{
    if(e.target.nodeName !== "LI"){
        return;
    }
    if(actualTopicElement){
        actualTopicElement.classList.remove("selected");
    }
    actualTopicElement = document.getElementById(e.target.id);
    actualTopicElement.classList.add("selected");
    noticiasDisplayables = noticias.filter((not)=>e.target.id === not.topic);
    noticiasPage = 0;
    noticiasPageElement.textContent = noticiasPage +1;
    cargarNoticias();
});

noticiasMinusPageElement.addEventListener("click",()=>{
    if(noticiasPage === 0){
        return;
    }
    noticiasPage -= 1;
    noticiasPageElement.textContent = noticiasPage+1;
    cargarNoticias();
});



noticiasPlusPageElement.addEventListener("click",()=>{
    if((noticiasPage+1)*maxNews > noticiasDisplayables.length){
        return;
    }
    noticiasPage += 1;
    noticiasPageElement.textContent = noticiasPage+1;
    cargarNoticias();
});