let resultElement = document.querySelector('.resultado')
let contenedorCentral = document.querySelector('.contenedor-central')
let filaId = 1;

let palabra = 'texto'; //palabra a adivinar. Se debe transformar a un vector o arreglo (1)
let palabraVector = palabra.toUpperCase().split(''); // Se aplicó el método split para dividir la palabra y convertirlo en vector o arreglo (2)
console.log(palabraVector)
let filaActual = document.querySelector('.fila')

crearCuadrados(filaActual);
listenInput(filaActual);
addFocus(filaActual)

function listenInput(filaActual){

    let cuadrados = filaActual.querySelectorAll('.cuadrado')
    cuadrados = [...cuadrados]
    let ingresoUsuario = []

    cuadrados.forEach(element =>{
        element.addEventListener('input', event =>{
            if (event.inputType !== 'deleteContentBackward'){
                ingresoUsuario.push(event.target.value.toUpperCase())
                console.log(ingresoUsuario)
                if(event.target.nextElementSibling){
                    event.target.nextElementSibling.focus()
                }else{
                    // Cambiar estilo si la letra está pero no en la posición correcta
                    let existIndexArray = existLetter(palabraVector, ingresoUsuario)
                    existIndexArray.forEach(element =>{
                        
                        cuadrados[element].classList.add('dorado')
                    });

                    let rightIndex = compararVectores(palabraVector, ingresoUsuario)
                    console.log(rightIndex)
                    rightIndex.forEach(element => {
                        cuadrados[element].classList.add('verde')
                    })

                    if(rightIndex.length == palabraVector.length){
                        showResult('¡Ganaste! 🏆')
                        return; /* hace un stop a la función. No permite que continue */
                    }

                    //Crear nueva fila
                    let filaActual = crearFila()
                    if(!filaActual){
                        console.log('undefined')
                        return;
                    }
                    crearCuadrados(filaActual)
                    listenInput(filaActual)
                    addFocus(filaActual)
                }    

            }else{
                ingresoUsuario.pop();
            }
            console.log/(ingresoUsuario)
            
        })
    })
}



//Funciones

function compararVectores(vector1, vector2){
    let indicesIguales = []
    vector1.forEach((elemento, index)=>{
        if(elemento == vector2[index]){
            console.log(`En la posición: ${index} sí son iguales`);
            indicesIguales.push(index);
            }else{
                console.log(`En la posición: ${index} no son iguales`)
            }
    });
    return indicesIguales
}

function existLetter(vector1, vector2){
    let existIndexArray = []
    vector2.forEach((elemento, index)=>{
        if(vector1.includes(elemento)){
            existIndexArray.push(index)
        }
    });
    return existIndexArray
}

function crearFila(){
    filaId++
    if (filaId <= 6){
        let nuevaFila = document.createElement('div');
        console.log(nuevaFila)
        nuevaFila.classList.add('fila')
        nuevaFila.setAttribute('id', filaId)
        contenedorCentral.appendChild(nuevaFila)
        return nuevaFila
    }else{
        showResult(`¡Perdiste! La respuesta es ${palabra.toUpperCase()}` )
    }
    
}  

function crearCuadrados(filaActual){
    palabraVector.forEach((item, index) => {
        if(index === 0){
            filaActual.innerHTML += `<input type="text" maxlength="1" class="cuadrado focus"></input>`;
        }else{
            filaActual.innerHTML += `<input type="text" maxlength="1" class="cuadrado"></input>`;
        }
    });
}

function addFocus(filaActual){
    let focusElement = filaActual.querySelector('.focus')
    console.log(focusElement)
    focusElement.focus();
}

function showResult(textMessage){
    resultElement.innerHTML = `
    <p>${textMessage}</p>
    <button class="boton">Reiniciar</button>`

    let botonReiniciar = document.querySelector('.boton')
        botonReiniciar.addEventListener('click', ()=>{
            location.reload();        
        });
}