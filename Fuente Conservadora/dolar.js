
const dolaresDivElement = document.getElementById("dolares");

const dolarTypes = ["oficial","blue","bolsa","contadoconliqui","tarjeta","mayorista","cripto"];




for(const dolarType of dolarTypes){
    fetch(`https://dolarapi.com/v1/dolares/${dolarType}`)
        .then(response => response.json())
        .then(data => cargarDato(data));
}

const cargarDato = (dato)=>{
    console.log(dato);
    const stringElement = `
        <div class="dolar-div">
            <h2 class="dolar-name">${dato.nombre}</h2>
            <div>
            <div class="dolar-values">
                <div class="dolar-value-div">
                    <p class="dolar-value-name">Compra</p>
                    <p class="dolar-value">$${dato.compra}</p>
                </div>
                <div class="dolar-value-div">
                    <p class="dolar-value-name">Venta</p>
                    <p class="dolar-value">$${dato.venta}</p>
                </div>
            </div>
            <p class="dolar-update-date">${dato.fechaActualizacion}</p>
            </div>
        </div>
    `;
    dolaresDivElement.innerHTML += stringElement;
}

