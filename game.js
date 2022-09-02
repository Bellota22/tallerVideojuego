const canvas = document.querySelector('#game')
const game=canvas.getContext('2d')

window.addEventListener('load',startGame)

function startGame(){
    let canvasSize= window.innerHeight*0.75;
    
    canvas.setAttribute('width',canvasSize)
    canvas.setAttribute('height',canvasSize)
  
    let elementSize= canvasSize/10
    game.font= elementSize+ 'px Verdana'
    
    for(let i=0; i<10; i++){
        game.fillText(emojis['X'],elementSize*i,elementSize )

    }



    //Se encarga de pintar el canvas, recibe
    //dos argumentos de posicion inicial y dos de posicion final
//     game.fillRect(50,10,100,100) ;
    
//     //un borrador cuadrado
//     game.clearRect(0,0,50,50)


//     //Para darle estilo a las letras
//     //ponerlas antes del fillText
//     game.font= '25px Verdana'
//     game.fillStyle= 'purple'
//     game.textAlign= 'left'
//     game.fillText('Hola!',100,130)
 }