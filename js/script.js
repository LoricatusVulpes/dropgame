// JavaScript Document
onload=init;
var drop_array = new Array();
//var to name the timers that make drops spawn and move every so often
var spawntimer;
var movetimer;
//create a bucket object, instance of the bucket class below, not on stage yet
var user_bucket = new Bucket(25,400);
function init(){
	//put bucket on stage
	user_bucket.create();
	//when a key is pressed, do a function that responds to keys
	document.onkeydown = function(e){checkKey(e);};
//set interval to do the spawn function every 2 seconds
	spawntimer=setInterval(spawn, 2000);
	//set interval to move the drops (20 times per second)
	movetimer=setInterval(moveAllDrops, 1000/20);	
}

function checkKey(e){
	//set up event again for certain browsers
	e = e || window.event;
	//if right arrow key
	if (e.keyCode == '39'){
		//add to bucket's x, will move it to the right
		user_bucket.x +=15;
		//change buckets style so it moves
		user_bucket.item_on_page.style.left = user_bucket.x + "px";
	}
	//if right arrow key is clicked move to left
	if (e.keyCode == '37'){
		//add to bucket's x, will move it to the right
		user_bucket.x -=15;
		//change buckets style so it moves
		user_bucket.item_on_page.style.left = user_bucket.x + "px";
	}
	
}

function spawn() {
	//make an object based on the Drop Class:
	var anotherdrop = new Drop();
	anotherdrop.create();
	
	drop_array.push(anotherdrop);
}
function moveAllDrops(){
	//for each drop in the array
	for (var i=0; i<drop_array.length; i++){
		var currentdrop = drop_array[i];
		//add to up down position of drop (higher the value = lower on page)
		currentdrop.y += 5;
		//apply it to CSS of the drop on the page 
		currentdrop.item_on_page.style.top = currentdrop.y +"px";
		
		//if the drop is low enough, destroy it
		if (currentdrop.y>500){
			currentdrop.destroy();
		}
		//if the drop touches the bucket, destroy it
		if(collisionCheck(user_bucket,currentdrop)){
			currentdrop.destroy();
		}
	}//close FOR LOOP
	
}//end moveAllDrops
function collisionCheck(big_obj,sm_obj){
	var big_left_edge = big_obj.x;
	var sm_left_edge = sm_obj.x;
	var big_right_edge = big_obj.x + big_obj.width;
	var sm_right_edge = sm_obj.x + sm_obj.width;
	var big_top_edge = big_obj.y;
	var sm_top_edge = sm_obj.y;
	var big_bottom_edge = big_obj.y + big_obj.height;
	var sm_bottom_edge = sm_obj.y + sm_obj.height;
	if(sm_left_edge > big_left_edge){
		if(sm_right_edge < big_right_edge){
			if(sm_top_edge > big_top_edge){
				if(sm_bottom_edge < big_bottom_edge){
	return true;
	
				}
			}
		}
	}
	return false;
}
//let's make a Class (blueprint) for each Drop we generate
function Drop(){
	this.x; //starts empty, will keep track of each Drop's left-right position
	this.y; //starts empty, will keep track of each Drop's up-down position
	this.width = 50;
	this.height = 50;
	this.item_on_page;
	/** function does lots of things when a Drop gets created on the page
	*
	*/
	this.create = function(){
		//make a section element in the HTML, store it into the item-on-page we set up above.
		this.item_on_page = document.createElement("section");
		//store a random x and y position, different for each Drop. I'm using screen width or 500, height of 300:
		this.x = Math.floor(Math.random()*1000);
		this.y = 25;//Math.floor(Math.random()*300);
		//use those x and y coordinates in the CSS to position the Drops:
		this.item_on_page.style.left = this.x + "px";
		this.item_on_page.style.top = this.y + "px";
		//attach the item to our HTML hierarchy, as a child of the body:
		document.getElementsByTagName("body")[0].appendChild(this.item_on_page);
	}
	/** function does lots of things when a Drop is removed from the page
	*
	*/
	this.destroy = function(){
		//create an animated splash GIF
		var newsplash = document.createElement("img");
		newsplash.src = "img/splash-anim.gif?" + Math.random();
		//set its style:absolute, x, y
		newsplash.style.position = "absolute";
		newsplash.style.left = this.x + "px";
		newsplash.style.top = this.y + "px";
		//attach splash onto the page
		document.getElementsByTagName("body")[0].appendChild(newsplash);
		//console.log("dis stuff be workin");
		document.getElementsByTagName("body")[0].removeChild(this.item_on_page);
		//figure out drop's position in array
		var this_drops_index_num = drop_array.indexOf(this);
		//splice it out of the array
		drop_array.splice(this_drops_index_num,1);
		//console.log(drop_array.length);
	}
} //close the Class
function Bucket(x,y){
	this.x = x; //keeps bucket left right position
	this.y = y; //keeps bucket up down position
	this.width = 100;
	this.height = 70;
	this.item_on_page;
	/** function does lots of things when a Drop gets created on the page
	*
	*/
	this.create = function(){
		//make a section element in the HTML, store it into the item-on-page we set up above.
		this.item_on_page = document.createElement("div");
				//use those x and y coordinates in the CSS to position the Drops:
		this.item_on_page.style.left = this.x + "px";
		this.item_on_page.style.top = this.y + "px";
		//attach the item to our HTML hierarchy, as a child of the body:
		document.getElementsByTagName("body")[0].appendChild(this.item_on_page);
	}
	this.destroy = function(){
	
	}
}