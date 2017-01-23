'use strict';
var turnArray = ['north', 'east', 'south', 'west', 'north']

function Robot() {

}

Robot.prototype.orient = function(direction) {
  if (direction == "north" || direction == "east" || direction == "west" || direction == "south") {
    this.bearing = direction
  } else {
    throw new MyBad("Invalid Robot Bearing")
  }
}

Robot.prototype.turnRight = function() {
  var newDirection = turnArray.indexOf(this.bearing) + 1
  this.bearing = turnArray[newDirection]
}

Robot.prototype.turnLeft = function() {
  var newDirection = turnArray.indexOf(this.bearing, 1) - 1
  this.bearing = turnArray[newDirection]
}

Robot.prototype.at = function(x, y) {
  this.coordinates = [x, y]
}

Robot.prototype.advance = function() {
  if (this.bearing == "north") {
    this.coordinates[1] ++
  } else if (this.bearing == "south") {
    this.coordinates[1] --
  } else if (this.bearing == "east") {
    this.coordinates[0] ++
  } else if (this.bearing == "west") {
    this.coordinates[0] --
  }
}

Robot.prototype.instructions = function(string) {
  var characters = string.split("")
  var instructions = characters.map(weLoveHelpers)
  return instructions
}

//   robot.place({x: -2, y: 1, direction: "east"});

// robot.evaluate("RLAALAL");

Robot.prototype.place = function(object) {
  this.coordinates = [ object.x, object.y ]
  this.bearing = object.direction
}

Robot.prototype.evaluate = function(string) {
  var directions = this.instructions(string)
  directions.forEach( moveRobot, this  )
}

function moveRobot(direction){
  this[direction]()
}

function weLoveHelpers(character){
  switch(character) {
    case "R":
      return 'turnRight'
    case "A":
      return 'advance'
    case "L":
      return 'turnLeft'
  }
}







function MyBad(message) {
  this.name = "Error"
  this.message = message
}

MyBad.prototype = Object.create(Error.prototype);
MyBad.prototype.constructor = MyBad;
