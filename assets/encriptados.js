let mensaje = document.getElementById('contenido');
let textoEncriptado = document.getElementById('contenidoFinal');
let opcion=document.getElementById('opciones');
let clave=document.getElementById('clave');

let botonCifrar = document.getElementById('botonCifrar');
botonCifrar.addEventListener("click", cifrarMensaje);

let botonDescifrar = document.getElementById('botonDescifrar');
botonDescifrar.addEventListener("click", DescifrarMensaje);


function cifrarMensaje() {
  let opcionSeleccionada = opcion.value;
  let message = mensaje.value;
  let claveNum = parseInt(clave.value);
  let key = clave.value;
  let mensajeCifrado = "";

  switch (opcionSeleccionada) {
    case "cesar":
      mensajeCifrado = cifradoCesar(message);
      break;
    case "cifradoPuro":
      mensajeCifrado = cifradoPuro(message, claveNum);
      break;
    case "vigenere":
      mensajeCifrado = cifradoVigenere(message, key);
      break;
    default:
      mensajeCifrado = "Selecciona una opción válida";
  }
  textoEncriptado.value = mensajeCifrado ;
}

function DescifrarMensaje() {
  let opcionSeleccionada = opcion.value;
  let message = mensaje.value;
  let clave = document.getElementById('clave').value;
  let mensajeCifrado = "";

  switch (opcionSeleccionada) {
    case "cesar":
      mensajeCifrado = desCifradoCesar(message);
      break;
    case "cifradoPuro":
      mensajeCifrado = DesCifradoPuro(message, clave);
      break;
    case "vigenere":
      mensajeCifrado = DesCifradoVigenere(message, clave);
      break;
    default:
      mensajeCifrado = "Selecciona una opción válida";
  }
  textoEncriptado.value = mensajeCifrado ;
}

// //sacar posicion encriptado
let alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
function sacarPosicion(letra){
    let indiceAlfabeto = 0;
    let bandera = false;
    while((bandera == false) && (indiceAlfabeto < alfabeto.length)){
        if(letra == alfabeto.charAt(indiceAlfabeto)){
            bandera = true;
        }else{ 
            indiceAlfabeto++;
        }
    }
    return indiceAlfabeto;
}

function cifradoCesar(message) {
    //let message = mensaje.value;
    let i = 0;
    let mensajeEncriptado = "";
    message = message.toUpperCase();
    while (i < message.length) {
      if (message.charAt(i) == ' ') {
        mensajeEncriptado += message.charAt(i);
      } else {
        let posicionLetra = sacarPosicion(message.charAt(i));
        posicionLetra = posicionLetra + 3;
        if (posicionLetra >= 27) {
          posicionLetra = posicionLetra - 27;
        }
        mensajeEncriptado = mensajeEncriptado + alfabeto.charAt(posicionLetra);
      }
      i++;
    }
    return mensajeEncriptado;
}
  
function desCifradoCesar(message){   
      let i = 0;
      let mensajeDesencriptado = "";
      message = message.toUpperCase();
      while (i < message.length) {
        if (message.charAt(i) == ' ') {
          mensajeDesencriptado += message.charAt(i);
        } else {
          let posicionLetra = sacarPosicion(message.charAt(i));
          posicionLetra = posicionLetra - 3;
          if (posicionLetra < 0) {
            posicionLetra = posicionLetra + 27;
          }
          mensajeDesencriptado = mensajeDesencriptado + alfabeto.charAt(posicionLetra);
        }
        i++;
      }
      return mensajeDesencriptado;
}
  

function cifradoPuro(message, desplazamiento){
  let i = 0;
    let mensajeEncriptado = "";
    message = message.toUpperCase();
    while (i < message.length) {
      if (message.charAt(i) == ' ') {
        mensajeEncriptado += message.charAt(i);
      } else {
        let posicionLetra = sacarPosicion(message.charAt(i));
        posicionLetra = posicionLetra + desplazamiento;
        if (posicionLetra >= 27) {
          posicionLetra = posicionLetra - 27;
        }
        mensajeEncriptado = mensajeEncriptado + alfabeto.charAt(posicionLetra);
      }
      i++;
    }
    return mensajeEncriptado;
}

function DesCifradoPuro(message,clavee){
  let i = 0;
  let mensajeEncriptado = "";
  message = message.toUpperCase();
  while (i < message.length) {
    if (message.charAt(i) == ' ') {
      mensajeEncriptado += message.charAt(i);
    } else {
      let posicionLetra = sacarPosicion(message.charAt(i));
      posicionLetra = posicionLetra - clavee;
      if (posicionLetra < 0) {
        posicionLetra = posicionLetra - 27;
      }
      mensajeEncriptado = mensajeEncriptado + alfabeto.charAt(posicionLetra);
    }
    i++;
  }
  return mensajeEncriptado;
}


function cifradoVigenere(message,clavee){
  let mensajeEncriptado = "";
  message = message.toUpperCase();
  clavee = clavee.toUpperCase();
  let posClave=0;
  for (let i = 0; i <= message.length-1 ; i++) {
      if (message.charAt(i)!=' ') {
          if (posClave>clavee.length-1) {
              posClave=0;               
          } 
          let c = sacarPosicion(message.charAt(i));  
          let c2 = sacarPosicion(clavee.charAt(posClave));
          c=c+c2;
          if (c>=27) {
              c=c-27;
          }
          mensajeEncriptado=mensajeEncriptado+alfabeto.charAt(c);
          posClave++;
      }else{
          if (message.charAt(i)==' ') {
            mensajeEncriptado=mensajeEncriptado+' ';
          }else{
            mensajeEncriptado=mensajeEncriptado+message.charAt(i);}
      }             
  }
  return mensajeEncriptado;
}

function DesCifradoVigenere(message,clavee){
  let mensajeEncriptado="";
  message = message.toUpperCase();
  clavee = clavee.toUpperCase();
  let posClave=0;
  for (let i = 0; i <= message.length-1 ; i++) {
      if (message.charAt(i)!=' ') {
          if (posClave>clavee.length-1) {
              posClave=0;               
          } 
          let c = sacarPosicion(message.charAt(i));  
          let c2 = sacarPosicion(clavee.charAt(posClave));
          c=c-c2;
          if (c<0) {
              c=c+27;
          }
          mensajeEncriptado=mensajeEncriptado+alfabeto.charAt(c);
          posClave++;
      }else{
          if (message.charAt(i)==' ') {
            mensajeEncriptado=mensajeEncriptado+' ';
          }else{
            mensajeEncriptado=mensajeEncriptado+message.charAt(i);}
      }             
  }
  return mensajeEncriptado;
}