const canvas = document.querySelector('#game')
const game=canvas.getContext('2d')
const up= document.querySelector('.up')
const down= document.querySelector('.down')
const left= document.querySelector('.left')
const right= document.querySelector('.right')

window.addEventListener('load',canvasResize)
window.addEventListener('resize', canvasResize)
const playerPos={
    x:undefined,
    y:undefined
}
 function canvasResize(){

    if(window.innerHeight > window.innerWidth){
        canvasSize= window.innerWidth*0.7
    }else{
        canvasSize= window.innerHeight*0.7

    }

    canvas.setAttribute('width',canvasSize)
    canvas.setAttribute('height',canvasSize)

    elementSize= canvasSize/10
  startGame()
 }

 function startGame(){
    game.font= elementSize+ 'px Verdana'
    game.textAlign='end'    
     
    const mapRows=maps[0].trim().split('\n')
    const mapRowCols=mapRows.map(row=> row.trim().split(''))

    //forEach recorre cada elemento de nuestro array y nosotros le damos una función
    mapRowCols.forEach((row, rowI) => {
        row.forEach((col,colI)=>{
            //De este modo recorremos todos los elemntos del mapa de emojis
            emoji= emojis[col]
            //Le asignamos posicion a los emojis
            posX=elementSize*(colI+1)
            posY=elementSize*(rowI+1)
            //y lo llenamos
            if(playerPos.x ===undefined && col=='O'){
                playerPos.x= posX
                playerPos.y= posY
              
            }
  
            game.fillText(emoji,posX,posY)

            game.fillText(emojis['PLAYER'],playerPos.x,playerPos.y)
        })

   
        
    });


    // for(let row=1; row<=10; row++){
    //     for(let col=1; col<=10;col++){

    //         game.fillText(emojis[mapRowCols[row-1][col-1]],elementSize*col+15 ,elementSize*row
    //         -10)
    //    }
    //     }
  

     
    }
 window.addEventListener('keydown',moveByKeys)
 up.addEventListener('click',moveUp)
 down.addEventListener('click',moveDown)
 left.addEventListener('click',moveLeft)
 right.addEventListener('click',moveRight)

 function lose(){
    if(playerPos=== playerPos.x){
        console.log('perdiste pz');
    }
 }
function moveByKeys(event){
    if(event.code== "ArrowUp") moveUp();
    else if(event.code== "ArrowDown") moveDown();
    else if(event.code== "ArrowLeft") moveLeft();
    else if(event.code== "ArrowRight") moveRight();

}
 function moveUp(){


    playerPos.y-=elementSize
    game.fillText(emojis['PLAYER'],playerPos.x,playerPos.y)
  
    if(playerPos.y== 7.105427357601002e-14){
        console.warn('Nopuedes salir del mapa')
        game.fillText(emojis['PLAYER'],playerPos.x,playerPos.y)

    }
    canvasResize()

    console.log(playerPos);
 }
 function moveLeft(){
    playerPos.x-=elementSize
    game.fillText(emojis['PLAYER'],playerPos.x,playerPos.y)
    if(playerPos.x==0){
        console.warn('Nopuedes salir del mapa')
        game.fillText(emojis['PLAYER'],playerPos.x,playerPos.y)

    }
    
    canvasResize()
    console.log(playerPos);


}
 function moveRight(){
    playerPos.x+=elementSize
    game.fillText(emojis['PLAYER'],playerPos.x,playerPos.y)
    if(playerPos.x==617.54){
        console.warn('Nopuedes salir del mapa')

    }
    
    canvasResize()
    console.log(playerPos);

 }
 function moveDown(){
    playerPos.y+=elementSize
    game.fillText(emojis['PLAYER'],playerPos.x,playerPos.y)
    if(playerPos.y==617.54){
        console.warn('Nopuedes salir del mapa')
        newPlayerPosY=playerPos.y+elementSize
        game.fillText(emojis['PLAYER'],playerPos.x,newPlayerPosY)

    }
    canvasResize()
    console.log(playerPos);

 }

