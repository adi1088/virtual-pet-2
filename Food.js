class Food{
    constructor(){
        foodStock = 20
        lastFeed = 0
    }

getFoodStock(){
    var foodStockRef = database.ref('foodStock')
    foodStockRef.on("value",(data)=>{
        foodStock = data.val();
    })
}

updateFoodStock(stock){
    database.ref('/').update({
     foodStock: stock
    });
}





display(){
    var x=80, y = 100;

imageMode(CENTER);
image(milkImg,250,150,70,70);

if(foodStock!=0){
   for(var i=0;i<foodStock;i++){
      if(i%10==0){
         x= 80;
         y = y+50;
      }   
   }
}
  
// milk.addImage('milk', milkImg)
   if(mousePressedOver('Add Food')){
       milkImg++;
       foodS.update();
   }else{
       milk = foodS

   }
}



}