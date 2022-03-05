var x;
var y;
var time;
var weight;
var gravity = 1;
var mass = 0.1;
var speed;
var wind;
var pointx;
var pointy;
var xacc;
var x_final_velocity;
var friction;
var stop_wind = 'START';
var radius = 20;
var red;
var green;
var blue;

class entity {
  constructor() {
    this.x = Math.floor((Math.random() * (width - ((radius / 2) + 10))) + 1);
  	this.y = Math.floor((Math.random() * height / 9) + 1);
    this.time = 0;
    this.weight;
    this.speed;
    this.wind = 0;
    this.pointx;
    this.pointy;
    this.xacc = 0;
    this.x_final_velocity = 0;
    this.friction = 0.001;
    this.red = Math.floor((Math.random() * 255) + 1);
    this.green = Math.floor((Math.random() * 255) + 1);
    this.blue = Math.floor((Math.random() * 255) + 1);
  }

    gravity_physics() {
    	this.time++;
    	this.weight = gravity * mass;
      this.speed = this.weight * this.time;
    	this.y += this.speed;
    }

    wind_physics() {
    	if (stop_wind != 'STOP') {
    		this.pointx = random(width);
    		this.pointy = random(height);
    		if (this.pointx > this.pointy) {
    			this.wind += 0.001;
    		} else {
    			this.wind -= 0.001;
    		}
    	} else {
    		this.wind = 0;
    	}
    	this.x_final_velocity += this.wind;
    	this.x += this.x_final_velocity;
    }

    friction_physics() {
    	if (this.y > ((height - (radius / 2)) - 1.5)) {
    	    if (this.x_final_velocity < 0) {
    	      this.x_final_velocity += this.friction;
    	    }
    	    if (this.x_final_velocity > 0) {
    	      this.x_final_velocity -= this.friction;
    	    }
    	}
    }

    // collision_physics() {
    //
    // }

    edge() {
    	if (this.y > (height - ((radius / 2) + 1))) {
    		    this.time = this.time * -1;
    		    this.speed = this.weight * this.time;
    		    this.time -= this.speed;
    		    this.y += this.speed;
    	}

    	if (this.x > (width - (radius / 2))) {
    		this.x_final_velocity *= -1;
    	}

    	if (this.x <(radius / 2)) {
    		this.x_final_velocity *= -1;
    	}
    }

    display() {
      stroke(this.red, this.green, this.blue, (255 / 1.5));
    	fill(this.red, this.green, this.blue,(255 / 1.2));
    	ellipse(this.x, this.y, radius, radius);
    }

    new_entity_mouse() {
      this.x = mouseX;
      this.y = mouseY;
    }
}
var no_of_entity = 1;
let new_entity = [];

function setup() {
	createCanvas(500, 500);
  for (var i = 0; i < no_of_entity; i++) {
    new_entity[i] = new entity();
  }
}

function draw() {
  background(240);
  for (var i = 0; i < no_of_entity; i++) {
    new_entity[i].gravity_physics();
    new_entity[i].wind_physics();
    new_entity[i].friction_physics();
		// new_entity[i].collision_physics();
    new_entity[i].edge();
    new_entity[i].display();
  }
  if (mouseIsPressed) {
    no_of_entity++;
    new_entity[no_of_entity - 1] = new entity();
    new_entity[no_of_entity - 1].new_entity_mouse();print(no_of_entity);
  }
}

function stop_wind_value() {
    stop_wind = document.getElementById('stop_wind_value_value').value;
}

function massvalue() {
    mass = document.getElementById('mass_value').value;
}

function gravityvalue() {
    gravity = document.getElementById('gravity_value').value;
}

function sizevalue() {
    radius = document.getElementById('size_value').value;
}
