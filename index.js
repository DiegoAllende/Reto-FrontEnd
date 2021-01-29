document.addEventListener('DOMContentLoaded', function () {
    let IDTABLA = document.getElementById("contenido-paises");
    let MODAL = document.getElementById("contenedor-modal");
    let REGION = document.getElementById("region");
    let SUBREGION = document.getElementById("subregion");
    let CERRAR = document.getElementById("cerrar");
    function obtenerDatos(){
        fetch("https://restcountries.eu/rest/v2/lang/es")
        .then(data => {
            return data.json();
        }).then(data => {
            llenarTabla(data);
        });
    }

    function llenarTabla(datos){
        IDTABLA.innerHTML += "";
        for(let i=0; i<12; i++){
            let tr = `<tr>
            <td class="nombre">`+datos[i].name+`</td>
            <td>`+datos[i].capital+`</td>
            <td>`+datos[i].alpha3Code+`</td>
            <td>`+datos[i].callingCodes+`</td>
            <td class="poblacion">`+formato(datos[i].population)+`</td>
            <td class="oculto">`+datos[i].region+`</td>
            <td class="oculto">`+datos[i].subregion+`</td>
            </tr>`;
            IDTABLA.innerHTML += tr;
        }

        IDTABLA.addEventListener("click", function(e){
            abrirModal(e.target.parentNode);
        });

        CERRAR.addEventListener("click", function(e){
            cerrarModal(e.target.parentNode);
            
        });
    }

    function abrirModal(fila){
        MODAL.classList.remove("oculto");
        REGION.innerText = fila.children[5].textContent;
        SUBREGION.innerText = fila.children[6].textContent;
    }

    function cerrarModal(){
        MODAL.classList.add("oculto");
    }

    function formato(n){
        n = String(n).replace(/\D/g, "");
        return n === '' ? n : Number(n).toLocaleString();
    }
    

    obtenerDatos();

});