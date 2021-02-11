var gameState = "FORM";
var bg, backgroundImg;
var form, instructions;
var human, human_walking;
var coin, coinImg;

  // Loading Images & Animations
  function preload(){
    human_walking = loadAnimation("../images/walking/man_walking1.png",
     //"../images/walking/man_walking2.png",
      //"../images/walking/man_walking3.png",
       //"../images/walking/man_walking4.gif",
        "../images/walking/man_walking5.gif",
         //"../images/walking/man_walking6.png",
           "../images/walking/man_walking7.png");
           //"../images/walking/man_walking8.png");

    coinImg = loadImage("../images/coin.png");

    getBackgroundImg();
  }

function setup() {
  createCanvas(displayWidth,displayHeight);
 
    form = new Form();
    instructions = new Instructions();

    human = createSprite(displayWidth / 4, displayHeight - 200,100,100);
    human.addAnimation("walking", human_walking);
    human.visible = false;

}

function draw() {
  if(backgroundImg)
  background(backgroundImg);

  localStorage.setItem("name", document.getElementById("play").value); 

  if(gameState === "PLAY"){
    textSize(30);
    fill("black");
    stroke("black");
    strokeWeight(2);
    text("Player Name: " + localStorage.getItem("name"), 100,100);

  if(bg.x < 0){    
    bg.x = bg.displayWidth / 2;
  }
    

    human.visible = true;

    spawnCoins();
    
  }

  if(gameState === "INSTRUCTIONS"){
    instructions.display();
  }
  else if(gameState === "FORM"){
    form.display();
  }

  drawSprites();
}

async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/America/Chicago");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);

  if(hour >= 06 && hour <= 19){
    bg = "images/background/daytime.PNG";
  }
  else{ 
    bg = "images/background/nighttime.PNG";
    form.title.style("color", "white");
    form.label.style("color", "white");
    form.input.style("background-color", "#999");
    form.input.style("color", "black");
  }

  backgroundImg = loadImage(bg);
}

function spawnCoins(){
  if(frameCount % random(60,90) === 0){
    coin = createSprite(100,200,100,100);
    coin.addImage(coinImg);
    coin.scale = 0.3;
    coin.velocityX = -8;
  }
}