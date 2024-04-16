



function handleResize(){

    console.log(document.documentElement.clientWidth);
    if (document.documentElement.clientWidth > 1207) {

        let elements = document.getElementsByClassName("opcionmain");
        
        for (let i=0 ; i<(elements.length) ; i++) {

            elements[i].querySelector("p").style.textAlign = "center";

        }
        console.log("mid");

    }
    else {

        let elements = document.getElementsByClassName("opcionmain");
        
        for (let i=0 ; i<(elements.length) ; i++) {

            elements[i].querySelector("p").style.textAlign = "left";

        }
        console.log("left");

        if (document.documentElement.clientWidth < 934) {

            document.getElementById("opciones").style.flexDirection = "column";
            console.log("column");

            let elements = document.getElementsByClassName("opcioninicio");
        
            for (let i=0 ; i<(elements.length) ; i++) {

                elements[i].style.width = "90%";

            }

        }
        else {

            document.getElementById("opciones").style.flexDirection = "row";
            console.log("row");

            let elements = document.getElementsByClassName("opcioninicio");
        
            for (let i=0 ; i<(elements.length) ; i++) {

                elements[i].style.width = "";

            }

        }

    }

}

handleResize();

window.addEventListener("resize",handleResize);