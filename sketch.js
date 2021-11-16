var mario;
var marioImg;
var coins;
var coinsimg;
var fire;
var fireImg;
var blocks;
var blocksImg;
var bgImg;
var back_ground;
var ground;
var invisibleground;
var obstacle;
var obstacleImg;
var coin;
var coinImg;
var Play=1;
var End=0;
var GameState=1;
var DeadMario;
var Score=0;
var RestartImg;
var Restart;
var GameOver;
var GameOverImg;

function preload(){
bgImg=loadImage("pictures/bg.png");
ground=loadImage("pictures/ground2.png")
marioImg=loadAnimation("pictures/mario00.png","pictures/mario01.png","pictures/mario02.png","pictures/mario03.png")
obstacleImg=loadAnimation("pictures/obstacle1.png","pictures/obstacle2.png","pictures/obstacle3.png","pictures/obstacle4.png");
coinImg=loadAnimation("pictures/coin1.png","pictures/coin2.png","pictures/coin3.png","pictures/coin4.png","pictures/coin5.png");
DeadMario=loadAnimation("pictures/collided.png");
RestartImg=loadImage("pictures/restart.png");
GameOverImg=loadImage("pictures/gameover.png");
}


function setup(){
  createCanvas (1500,800);
  
  back_ground=createSprite(500,738);
  back_ground.scale=1.7
  back_ground.addImage(ground);
  back_ground.velocityX=-5;
  
  GameOver=createSprite(750,400,20,20);
  GameOver.addImage("GameOverImg",GameOverImg);
  GameOver.visible=false;
  
  Restart=createSprite(750,500,20,20);
  Restart.addImage("RestartImg",RestartImg);
  Restart.visible=false

  mario=createSprite( 50,641,20,20);
  mario.scale=2.5
  mario.addAnimation("marioImg",marioImg);
  mario.addAnimation("DeadMario",DeadMario);
  invisibleground=createSprite(500,742,1850,138);
  invisibleground.visible=false;

  ObstacleGroup=new Group();
  CoinGroup=new Group();
}


function draw(){
  background(bgImg);

  if(GameState===Play){
    if (back_ground.x<500){
      back_ground.x=back_ground.width/2
    }
    
    if (keyDown("space")&&(mario.y>450)){
      mario.velocityY=-15
    }
    mario.velocityY=mario.velocityY+0.8

    obstacles();
    coins();
    for(var i=0;i<CoinGroup.length;i++){
      if (mario.isTouching(CoinGroup.get(i))){
        CoinGroup.get(i).remove()
        Score=Score+1
      }
    }
    
    if(mario.isTouching(ObstacleGroup)){
      GameState=End;
    }


  } else if(GameState===End){
    ObstacleGroup.setVelocityXEach(0)
    CoinGroup.destroyEach();
    mario.changeAnimation("DeadMario",DeadMario);
    back_ground.velocityX=0;
    Restart.visible=true;
    GameOver.visible=true;

    if(mousePressedOver(Restart)){
      restart();
    }
  }
  mario.collide(invisibleground)
  drawSprites()
  textSize(20);
  fill("white");
  text("Score:"+Score, 1400,100);
}


function obstacles(){
if(frameCount%200===0){
var obstacle=createSprite(1500,635,30,30);
obstacle.addAnimation("obstacleImg",obstacleImg);
obstacle.velocityX=-5
obstacle.scale=1.5
ObstacleGroup.add(obstacle)
}
}

function coins(){
  if(frameCount%100===0) {
    var coin=createSprite(1500,random(200,500),20,20);
    coin.addAnimation("coinImg",coinImg);
    coin.velocityX=-5
    coin.scale=0.5
    CoinGroup.add(coin)
    }
}

function restart(){
  GameState=1;
  ObstacleGroup.destroyEach();
  back_ground.velocityX=5
}


