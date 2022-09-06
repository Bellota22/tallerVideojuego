const canvas = document.querySelector('#game')
const game=canvas.getContext('2d')
const up= document.querySelector('.up')
const down= document.querySelector('.down')
const left= document.querySelector('.left')
const right= document.querySelector('.right')
const cora= document.querySelector('.cora')
const time= document.querySelector('.time')
const record= document.querySelector('.record')
const result= document.querySelector('.result')

window.addEventListener('load',canvasResize)
window.addEventListener('resize', canvasResize)
const playerPos={
    x:undefined,
    y:undefined
}
const giftPos={
    x:undefined,
    y:undefined

}
let lives=3
let enemyPos=[]
let level=0
let timeStart
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
    enemyPos=[]
    const map= maps[level]

    if(!map){
        finishGame()
        return;
    }

    if(!timeStart){
        timeStart= Date.now()
        timeInterval= setInterval(showTime,100)
    }
    
    
    const mapRows=map.trim().split('\n')
    const mapRowCols=mapRows.map(row=> row.trim().split(''))


    heart()
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
              
            }else if(col=='I'){
                giftPos.x=posX
                giftPos.y=posY
            }else if(col=='X'){
                enemyPos.push({
                    x:posX,
                    y:posY
                })
               
       
            }
  
            game.fillText(emoji,posX,posY)

        })

      
        
    });

    move()
    // for(let row=1; row<=10; row++){
    //     for(let col=1; col<=10;col++){

    //         game.fillText(emojis[mapRowCols[row-1][col-1]],elementSize*col+15 ,elementSize*row
    //         -10)
    //    }
    //     }
  

     
    }

    function move(){
        const giftColisionX= playerPos.x.toFixed(3)== giftPos.x.toFixed(3)
        const giftColisionY= playerPos.y.toFixed(3)== giftPos.y.toFixed(3)
        const giftColision= giftColisionX && giftColisionY
        if(giftColision){
            lvlUp();
            console.log('Pasaste de nivel!')
        }
        game.fillText(emojis['PLAYER'],playerPos.x,playerPos.y)

        const enemyCollision= enemyPos.find(enemy=> {
            const enemyCollisionX=enemy.x.toFixed(3)==playerPos.x.toFixed(3)
            const enemyCollisionY=enemy.y.toFixed(3)==playerPos.y.toFixed(3)
            return enemyCollisionX && enemyCollisionY
        })
        if(enemyCollision){
            failed()
        }
        
    }
    
    function failed(){
        console.log(lives);
        lives--;
        if(lives <=0){
            level=0
            lives=3
            timeStart= undefined
        }
        playerPos.x= undefined
        playerPos.y= undefined
        startGame()
    }

    function heart(){
        //Array es un proto, y crea un arreglo de acuerdo al parametro
        //que le metamos, en este caso un arreglo de3 porque son 3 vidas
        //y lo llenamos con el método fill
        const arrayHeart=Array(lives).fill(emojis['HEART'])
        console.log(arrayHeart);
        //Esto es para quitar las comas que hay entre elemento
        cora.innerHTML= arrayHeart.join(' ')

        //Solución más limpia
        //cora.innerHTML= emojis['HEART'].repeat(lives)
    }
    function showTime(){
        time.innerHTML= Date.now()-timeStart
    }
    function lvlUp(){
        level++;
        startGame()
    }
    function finishGame(){
        //detiene el proceso, se le asigna una variable que tiene el timer
        clearInterval(timeInterval)
        console.log('finishhh')

        const resultTime= localStorage.getItem('result_time')
        const playerTime= Date.now()- timeStart

        if(resultTime){
            if(resultTime >= playerTime){
                localStorage.setItem('result_time',playerTime)
                result.innerHTML="Superaste el record!"
            }else{
                result.innerHTML="Mejor suerte a la próxima!"
                
            }
            
        }else{
            localStorage.setItem('result_time',playerTime)
            result.innerHTML="Primera vez aquí eh"
        }
        console.log({resultTime,playerTime})
        
    }
 window.addEventListener('keydown',moveByKeys)
 up.addEventListener('click',moveUp)
 down.addEventListener('click',moveDown)
 left.addEventListener('click',moveLeft)
 right.addEventListener('click',moveRight)


function moveByKeys(event){
    if(event.code== "ArrowUp") moveUp();
    else if(event.code== "ArrowDown") moveDown();
    else if(event.code== "ArrowLeft") moveLeft();
    else if(event.code== "ArrowRight") moveRight();

}
 function moveUp(){
  
    if((playerPos.y- elementSize) < elementSize){
        console.warn('Nopuedes salir del mapa')

    }else{
        playerPos.y-=elementSize

    }
    canvasResize()

    console.log(playerPos);
 }
 function moveLeft(){
    if(playerPos.x-elementSize <elementSize){
        console.warn('Nopuedes salir del mapa')
    }else{
        playerPos.x -=elementSize
    }
    
    canvasResize()
    console.log(playerPos);


}
 function moveRight(){
    
    if(playerPos.x+elementSize > canvasSize){
        console.warn('Nopuedes salir del mapa')

    }else{
        playerPos.x+=elementSize
    }
    
    canvasResize()
    console.log(playerPos);

 }
 function moveDown(){
    
    if(playerPos.y+elementSize > canvasSize){
        console.warn('Nopuedes salir del mapa')
    }else{
        playerPos.y+=elementSize
    }
    canvasResize()
    console.log(playerPos);

 }

