var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudimg
var tree1img, tree2img, tree3img, tree4ing, tree5img, tree6img
var PLAY = 1
var END = 0
var gamestate = PLAY
var gameover,gameoverimg
var restart,restartimg

var score = 0;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
 cloudimg = loadImage("cloud.png")
  tree1img = loadImage("obstacle1.png")
  tree2img = loadImage("obstacle2.png")
  tree3img = loadImage("obstacle3.png")
  tree4img = loadImage("obstacle4.png")
  tree5img = loadImage("obstacle5.png")
  tree6img = loadImage("obstacle6.png")
  gameoverimg = loadImage("gameOver.png")
  restartimg = loadImage("restart.png")
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
 
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)

  obstaclesgroup = new Group();
  cloudgroup = new Group();

  trex.setCollider("circle",0,0,40)
  
  gameover = createSprite(300,100)
  gameover.addImage(gameoverimg)
  gameover.scale = 2
  restart = createSprite(300,140)
  restart.addImage(restartimg)
  restart.scale = 0.4
}

function draw() {
  //set background color
  background(180);
  
  text("Score:  "+ score,500,50)
  
  if (gamestate === PLAY){
    ground.velocityX = -4;
    score = score + Math.round(frameCount/60)
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    restart.visible = false
    gameover.visible = false

    spawnClouds()
    obstacles()
    if(obstaclesgroup.isTouching(trex)){
      gamestate = END
    }
  }
  else if(gamestate === END){
 ground.velocityX = 0
 obstaclesgroup.setVelocityXEach(0)
 cloudgroup.setVelocityXEach(0)
 cloudgroup.setLifetimeEach (-1)
 obstaclesgroup.setLifetimeEach (-1)
trex.changeAnimation("collided",trex_collided)
trex.velocityY = 0
restart.visible = true
gameover.visible = true
  }
 
  
  
  
  // jump when the space key is pressed

  
  
  

  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //Spawn Clouds
  
  
  drawSprites();

 
}

//function to spawn the clouds
function spawnClouds(){
if(frameCount%60===0){
  cloud = createSprite(600,Math.round(random(10,100)),40,10)
  cloud.velocityX = -3
  cloud.addImage(cloudimg)
  cloud.scale = 0.8
  cloud.lifetime = 250
  cloudgroup.add(cloud)
  trex.depth = cloud.depth
  trex.depth = trex.depth + 1
}
 // write your code here 
}

function obstacles(){

if(frameCount%50 === 0){
  obstacle = createSprite(600,165,10,10)
  obstacle.velocityX = -4                        
  var ran = Math.round(random(1,6))
  switch(ran){
    case 1: obstacle.addImage(tree1img)
    break
    case 2: obstacle.addImage(tree2img)
    break
    case 3: obstacle.addImage(tree3img)
    break
    case 4: obstacle.addImage(tree4img)
    break
    case 5: obstacle.addImage(tree5img)
    break
    case 6: obstacle.addImage(tree6img)
    break
  }
obstacle.scale = 0.5
obstacle.lifetime = 160
obstaclesgroup.add(obstacle) 
}


}