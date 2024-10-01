const shareButton = document.getElementById("share");

const shareObject = {};

shareObject.title = document.querySelector("h2").textContent;
shareObject.text = "";
shareObject.url = window.location.href;


//if (document.getElementsByClassName("imageWithCaption")){
//    shareObject.files = [...document.getElementsByClassName("imageWithCaption")].map((element)=>element.querySelector("img").currentSrc);
//}

shareButton.addEventListener("click",()=>{
    if (!navigator.canShare) {
        output.textContent = `Your browser doesn't support the Web Share API.`;
        return;
    }
    
    navigator
        .share(shareObject)
        .then(()=> console.log("Successful share"))
        .catch(error => console.log("Error sharing", error));
});

const firstParagraph = document.querySelector("#noticia p");
firstParagraph.classList.add("first-paragraph");

