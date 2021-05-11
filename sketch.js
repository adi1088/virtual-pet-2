var  dog,dogImg, happyDog;
var foodS, foodStock;
var database;
var milk, milkImg; 
var addFood, feed, feedDog;
var fedTime, lastFeed;  
var foodObj; 

function preload(){
  
  dogImg = loadImage("images/dogImg.png")	
  happyDog= loadImage("images/dogImg1.png")
  milkImg = loadImage("images/Milk.png")

 }

function setup() {
	createCanvas(900, 600 );
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  foodObj = new Food();
  dog = createSprite(450,450)
  dog.addImage("dogy",dogImg)
  dog.scale = 0.2;
  
  feed=createButton("Feed The Dog");
  feed.position(700, 100)
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(850, 100);
  addFood.mousePressed(addFood);

  
}


function draw() {  
  background(46,139,87)

  foodObj.display();

  // if(keyIsDown(UP_ARROW)){
  //    writeStock(foodS);
  //     //foodS = foodS-1;
  //    dog.addImage("happydog", happyDog)

  // }
fill(255,255,254)
textSize(15);
if(lastFeed>=12){
  text("Last Feed : " + lastFeed%12 + "PM",450, 250)
}else if(lastFeed === 0){
  text("Last Feed : 12 AM ",450, 250);
}
else{
    text("Last Feed :" + lastFeed + "AM", 450,250)
}

fedTime=database.ref('Feed Time');
fedTime.on('value', function(data){
  lastFeed=data.val();
});


  drawSprites();
  //add styles here
  // fill("red")
  // stroke('white')
  // textSize(17)
  // text("NOTE : Press UP_ARROW Key To Feed The Dog Milk",50,50)
  fill("white")
  stroke('black')
  textSize(20)
  text("Food Remaining : " + foodS,360, 100 )
  
  //function to update food and last feed time 
 function feedDog(){
  dog.addImage("dogy", happyDog)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
   Food:foodObj.getFoodStock(),
   fedTime:hour()
  })
 }

 function addFood (){
   foodS++;
   database.ref('/').update({
     Food:foodS
   })   
 }


}


function readStock(data){
   foodS=data.val();
}

function writeStock(x){

  if(x<=0){
   x=0;
  }else{
x=x-1;
  }

  database.ref('/').update({
    Food:x
  })  
}

