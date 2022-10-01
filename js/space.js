let inputBox = document.getElementById('inputBuscar');
let btnBuscar = document.getElementById('btnBuscar');
let contenedor = document.getElementById('contenedor');
let objectCollection = {};
let objectItems = [];

let url = 'https://images-api.nasa.gov/';
function showInfo (){
    let htmlToAppend = '';
    //usa el nasa_id para llamar a las imagenes del json que esta en el href
    for (let item of objectItems){

        if(item.links){
            htmlToAppend +=`<div class="col">
            <div class="card" style="max-width: 18rem;">
            <img src="${item.links[0].href}" class="card-img-top" alt="...">
            <div class="card-header">${item.data[0].title}</div>
            <div class="card-body text-dark">
                <p class="card-text">${item.data[0].description}</p>
            </div>
            </div>
            </div>
            `   
        } 
    }
    contenedor.innerHTML = htmlToAppend;
}
btnBuscar.addEventListener('click', function(e){
    e.preventDefault();
    fetch(url+`search?q=`+inputBox.value).then(response => response.json()).then(object =>{
        
        objectCollection = object.collection;
        objectItems = objectCollection.items;
        if(objectItems.length==0){
            let divNulo = document.createElement('div');
            contenedor.appendChild(divNulo);
            divNulo.setAttribute(`class`, `bg-light`)
            divNulo.innerHTML= `
            <h1 class='text-danger'>No hay nada</h1>
            `
        }else{
            showInfo();
        }
    
    });
})