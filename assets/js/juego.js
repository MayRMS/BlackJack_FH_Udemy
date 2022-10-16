

let deck = [];
const tipos = [ 'C', 'D', 'H', 'S'];
const especiales = [ 'A', 'J','Q','K'];

let puntosJugador = 0
let puntosPC = 0


// referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasPC = document.querySelector('#computadora-cartas')
const puntosHTML =  document.querySelectorAll('small');



//Esta función crea una nueva baraja
const crearDeck = (params) => {
    
    for (let i = 2; i <= 10; i++) {
        //deck.push(i + 'C' );
        for( let tipo of tipos) {
            deck.push(i + tipo );
        }
    }

    for (let tipo of tipos){
        for(let esp of especiales){
            deck.push( esp + tipo);
        }
    }


     //console.log(deck);
     deck = _.shuffle(deck)
     console.log(deck);
}


crearDeck();

//Esta función me permite coger una carta //return deck.shift()
const pedirCarta = () => {

    if (!deck.length) throw 'No quedan más cartas'
    return deck.shift()
}
let carta = pedirCarta();

//console.log(carta);

//console.log(deck.includes(carta));

//pedirCarta()

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1)
                //console.log({valor});

    if (isNaN (valor)) return (valor === 'A') ? 11 : 10;
    return valor * 1; //Number (valor)
}

//turno del PC

const turnoComputadora = (puntosMinimos) =>{

   do{

        const carta = pedirCarta();

        puntosPC = puntosPC + valorCarta(carta);
        puntosHTML[1].innerText = puntosPC;
   
         //<img class="carta" src="assets/cartas/2C.png"> 
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasPC.append(imgCarta) 

        if (puntosMinimos > 21){
            break;
        }

    }while ((puntosPC < puntosMinimos) && (puntosMinimos <= 21)); 

     setTimeout (()=>{
        if (puntosPC === puntosMinimos){
            alert('Nadie gana :(');
        }else if (puntosMinimos > 21){
            alert('PC gana');
        }else if (puntosPC > 21){
            alert('Jugador gana');
        }else {
            alert('PC gana');
        }

     },1000);

}


//const valor = valorCarta(pedirCarta())
//console.log(valor);

//EVENTOS

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;
   
    //<img class="carta" src="assets/cartas/2C.png"> 
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta) 

    if (puntosJugador > 21){
        console.warn('Lo siento, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    }else if (puntosJugador === 21){
        console.warn('¡GENIAL,21!')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }

});

btnDetener.addEventListener('click',()=>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);

});

btnNuevo.addEventListener('click', () =>{

    console.clear();
    deck = []
    crearDeck();

    puntosJugador = 0;
    puntosPC = 0;

    puntosHTML[0].innerText= 0;
    puntosHTML[1].innerText= 0;

    divCartasPC.innerHTML= '';
    divCartasJugador.innerHTML= '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

});