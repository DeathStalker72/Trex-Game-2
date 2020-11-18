var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var playState;
var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameOverImage,gameOver,restart,restartImage;
var score;
var jump,die,checkpoint;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  checkpoint = loadSound("checkPoint.mp3");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,50);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  gameOver=createSprite(300,50);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.2;
  gameOver.visible=false;

  restart=createSprite(300,120);
  restart.addImage(restartImage);
  restart.scale=0.7;
  restart.visible=false;
    
  
  obstaclesGroup = new Group();
  
  cloudsGroup = new Group();
  
  score = 0;
  
  playState="play";
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  if(playState==="play"){
   score = score + Math.round(frameCount/60);  
   
    if(keyDown("space")&& trex.y >= 160) {
    trex.velocityY = -17;
    jump.play();
    } 
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  if(trex.isTouching(obstaclesGroup)){
     playState="end";
    die.play();
     }
    
  if(score%300===0 && score!==0){
     checkpoint.play();
       }
    
    ground.velocityX = -(4+score/300);
  //spawn the clouds
  spawnClouds();
  
  //spawn obstacles on the ground
  spawnObstacles();
  }   
  
  if(playState==="end"){
     trex.setVelocity(0,0);
    trex.changeAnimation("collided");
    obstaclesGroup.setVelocityEach(0,0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setVelocityEach(0,0);
    cloudsGroup.setLifetimeEach(-1);
    ground.setVelocity(0,0);
    gameOver.visible=true;
    restart.visible=true;
  }
  
  if(mousePressedOver(restart)){
    playState="play";
    gameOver.visible=false;
    restart.visible=false;
    trex.changeAnimation("running");
    obstaclesGroup.destroyEach();
    score=0;
    cloudsGroup.destroyEach();
     }
  
  trex.collide(invisibleGround);
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -(4+score/300);

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
        obstacle.scale=0.5
              break;
      case 2: obstacle.addImage(obstacle2);
        obstacle.scale=0.5
              break;
      case 3: obstacle.addImage(obstacle3);
        obstacle.scale=0.5
              break;
      case 4: obstacle.addImage(obstacle4);
        obstacle.scale=0.5
              break;
      case 5: obstacle.addImage(obstacle5);
        obstacle.scale=0.5
              break;
      case 6: obstacle.addImage(obstacle6);
        obstacle.scale=0.3
              break;
      default: break;
    }
   obstaclesGroup.add(obstacle);
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
  
}