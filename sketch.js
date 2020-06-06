var trex_running,groundImage,trex_collided;

var trex;

var die,jump,checkPoint;

var ground,invisibleGround;

var cloudImage, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6

var gameOverImage,restartImage,gameOver,restart;

var grav = 0.5;

var cloudGroup,obstacleGroup

var gameState = "play";

var timer = 0;

var score = 0;

localStorage["highScore"] = 0;

function preload() {
 trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
 trex_collided = loadImage("trex_collided.png");
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
  checkPoint = loadSound("checkPoint.mp3");
}
function setup() {
  createCanvas(600,200);
  
  console.log(random(1,6));
  
  trex = createSprite(50,180,20,20);
  trex.addAnimation ("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(30,180,600,20);
  ground.addImage(groundImage);
  ground.velocityX  = -5
  
  invisibleGround = createSprite(300,190,600,10);
  invisibleGround.visible = false;
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
  
  gameOver = createSprite(300,100,20,20)
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  
  restart = createSprite(300,150,20,20)
  restart.addImage(restartImage);
  restart.scale = 0.8
  restart.visible = false;
}

function draw() {
  
  
  background(400);
   
  text(score,500,75);
  text("High Score: " + localStorage["highScore"],450,50);
  
  if(gameState == "play"){
  
    grav = 0.5;
    
    timer = timer + 1;
    
    score = Math.round(timer/4);
    
    
  ground.velocityX  = -5
    
   gameOver.visible = false;
   restart.visible = false;
    
    
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
  if(keyDown("space")&&trex.y > 160){
     trex.velocityY = -11;
    jump.play();
  }
  if(score%100 == 0 && score > 0){
    checkPoint.play();
  }
  trex.velocityY = trex.velocityY + grav;
  
  if(World.frameCount%60 == 0){
  spawnClouds();
  }
  
  if(World.frameCount%Math.round(50,85) == 0) {
   spawnObstacles(); 
  }
    if(trex.isTouching(obstacleGroup)){
       gameState = "end";
      die.play();
    }
  }
  if(gameState == "end"){
    var speed = 50;
    grav = 0;
    gameOver.visible = true;
    restart.visible = true;
    cloudGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(speed);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(speed);
    ground.velocityX = 0;
    trex.velocityY = 0;
    speed = speed + 50;
    if(score > localStorage["highScore"]){
      localStorage["highScore"] = score;
    }
      trex.changeAnimation("collided",trex_collided);
    if(mousePressedOver(restart)){
      score = 0;
      timer = 0;
      gameState = "play";
      cloudGroup.destroyEach();
      obstacleGroup.destroyEach();
      trex.changeAnimation("running",trex_running);
    }
  }
  trex.collide(invisibleGround);
  drawSprites();
}
function spawnClouds() {
  var cloud = createSprite(620,random(100,50),20,20);
  cloud.addImage(cloudImage);
  cloud.velocityX = -3;
  cloud.depth = trex.depth;
  trex.depth = trex.depth + 1;
  cloud.lifetime = 220;
  gameOver.depth = cloud.depth + 1;
  restart.depth = cloud.depth + 1;
  cloudGroup.add(cloud);
}

function spawnObstacles() {
  var obstacle = createSprite(620,170,20,20);
  //console.log(obstacle + random(1,6));
  //obstacle.addImage(obstacle + random(1,6));
  switch(Math.round(random(1,6))){
    case 1: obstacle.addImage(obstacle1);
    break;
    case 2: obstacle.addImage(obstacle2);
    break;
    case 3: obstacle.addImage(obstacle3);
    break;
    case 4: obstacle.addImage(obstacle4);
    break;
    case 5: obstacle.addImage(obstacle5);
    break;
    case 6: obstacle.addImage(obstacle6);
    break;
    default: 
    break;
  }
  obstacle.scale = 0.5;
  obstacle.velocityX = -5;
  obstacle.lifetime  = 135; 
  gameOver.depth = obstacle.depth + 1;
  restart.depth = obstacle.depth + 1;
  obstacleGroup.add(obstacle);
}