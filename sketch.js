//Ma'am if you are reading this I have a problem in the jump section of the code
var monkey, monkey_running
var bananaImage, bananaGroup
var ground
var obstacleImage, obstacleGroup
var score
var playground,playgroundImage
function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  playgroundImage = loadImage("jungle.jpg")
}



function setup() {

  createCanvas(windowWidth, windowHeight);

  monkey = createSprite(50, height - 100, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.14

  //monkey.debug = true

  ground = createSprite(300, height - 80, 10000, 10);
  ground.visible = false;
  //ground.debug = true
  
  playground = createSprite(width/2,height/2,width,height)
  playground.addImage (playgroundImage)

  score = 0

  obstacleGroup = createGroup();
  bananaGroup = createGroup();


}


function draw() {
  background("black");
  //score = score + 1

  stroke("white")
  textSize(17.5)
  fill("white")
  text("Score: " + score, width - 200, height - 200);

  ground.velocityX = -4

  if (ground.x < width / 2) {
    ground.x = ground.width / 2;
  }

  monkey.collide(ground);
  monkey.velocityY = monkey.velocityY + 0.8

  if (keyDown("space") && monkey.y > height - 100) {
    monkey.velocityY = -14
  }

  //console.log(ground.x)
  if (monkey.isTouching(bananaGroup)) {
    score = score + 2
    bananaGroup.destroyEach()
  }

  if (monkey.isTouching(obstacleGroup)) {
    score = score - 2
    obstacleGroup.destroyEach()
    monkey.scale = 0.14
  }

  switch (score) {

    case 10:
      monkey.scale = 0.16
      break;
    case 20:
      monkey.scale = 0.18
      break;
    case 30:
      monkey.scale = 0.20
      break;
    case 40:
      monkey.scale = 0.22
      break;
    default:
      break
  }
  console.log(monkey.y/*height-47*/)
  spawnBanana();

  spawnObstacles();

  drawSprites();
}

function spawnBanana() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(width, height - 140, 40, 10);
    banana.y = Math.round(random(height - 200, height - 140));
    banana.addImage(bananaImage);
    banana.scale = 0.14;
    banana.velocityX = -4;

    //assign lifetime to the variable
    banana.lifetime = width / 4;

    //adjust the depth
    monkey.depth = banana.depth;
    monkey.depth = banana.depth + 1;

    bananaGroup.add(banana);


  }
}

function spawnObstacles() {

  if (frameCount % 300 === 0) {
    var obstacle = createSprite(width, height - 90, 40, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.14;
    obstacle.velocityX = -4;
    
    obstacle.lifetime = width / 4;

    obstacleGroup.add(obstacle);


  }
}