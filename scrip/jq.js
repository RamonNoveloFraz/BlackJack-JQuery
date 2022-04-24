let baraja = [];
let carta = '';
let puntosJugador = 0;
let puntosComputadora = 0;
const numeros = [2,3,4,5,6,7,8,9,10];
const letras = ['J','Q','K','A'];
const palo = ['C','D','H','S'];


function CrearBaraja(){
baraja =[];
for(n of numeros){
    for (p of palo){
        baraja.push(n + p);
    }
}

letras.forEach((l) => {
    palo.forEach((p) => {
        baraja.push(l + p)
    }); 
});

baraja = _.shuffle(baraja);
return baraja;
}

function nuevoJuego() {
    $('#cartasJugador').html('');
    puntosJugador = 0;
    $('#puntosJugador').text(puntosJugador);

    $('#cartasComputadora').html('');
    puntosComputadora = 0;
    $('#puntosComputadora').text(puntosJugador);

    $('#btn-card').removeClass('disabled');
    $('#btn-stop').removeClass('disabled');
    $('#mensajeGanador').attr('hidden', 'true');
    $('#mensajeGanador').removeClass('bg-danger');
    $('#mensajeGanador').removeClass('bg-info');
    console.clear();
    CrearBaraja();
}

function pedirCarta(){
    carta = baraja.shift();
    const cartaHtml = $('#cartasJugador').html() + `<img src="/cartas/${carta}.png" alt="">`;
    $('#cartasJugador').html(cartaHtml);
    return carta;
}

function sumarPuntos(carta) {
    let puntos = 0;

    let valorCarta = carta.slice(0, -1);
    if (letras.includes(valorCarta)){
        puntos = valorCarta == 'A' ? 11 : 10;
    }else{
        puntos = valorCarta * 1;
    }
    return puntos;
}

function cartaComputadora() {

    let carta = baraja.shift();
    const cartaHtml = $('#cartasComputadora').html() + `<img src="/cartas/${carta}.png" alt="">`;

    puntosComputadora += sumarPuntos(carta);

$('#cartasComputadora').html(cartaHtml);
$('#puntosComputadora').text(puntosComputadora);

return puntosComputadora;
}

function turnoComputadora() {
    $('#btn-card').addClass('disabled');
    $('#btn-stop').addClass('disabled');
    console.log('Turno de la computadora');

    const ciclo = setInterval(() =>{
        cartaComputadora();
        if(puntosJugador > 21){
            clearInterval(ciclo);
            finTurnoComputadora();
        }
        if(puntosComputadora > 21 || puntosComputadora >= puntosJugador){
            clearInterval(ciclo);
            finTurnoComputadora();   
        } 
    }, 500);
    console.log('Fin del turno de la computadora');
    return;
}

function finTurnoComputadora(){
    setTimeout(() => {
        mensajeGanador(
            (puntosComputadora <= 21 && puntosComputadora >= puntosJugador ) || puntosJugador > 21
        ?(ganador = {
            nombre : 'La Computadora gana',
            color  : 'bg-danger',
        })
        : (ganador = {
            nombre : 'El Jugador gana',
            color  : 'bg-info',
        })
        )
    }, 500)
}
    

function mensajeGanador({nombre,color}){
    console.log(nombre);
    $('#mensajeGanador').removeAttr('hidden');
    $('#mensajeGanador').html(`<h2> ${nombre}</h2>`);
    $('#mensajeGanador').addClass(color);  
}


$('#btn-new').click(function(){
    nuevoJuego();
})

$('#btn-card').click(function(){
    let carta = pedirCarta();
    puntosJugador += sumarPuntos(carta);
    $('#puntosJugador').text(puntosJugador);

    if (puntosJugador > 21){
        turnoComputadora()  
    } 
})


$('#btn-stop').click(function(){
    turnoComputadora();
})


CrearBaraja();
