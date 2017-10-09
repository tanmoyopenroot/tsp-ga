function Vector(x, y) {
	if (x && y) {
		this.x = x;
		this.y = y;
	}
	else {
		this.x = 0;
		this.y = 0;
	}
}

Vector.prototype.setX = function(x) {
	this.x = x;
};

Vector.prototype.setY = function(y) {
	this.y = y;
};

Vector.prototype.setXY = function(x, y) {
	this.x = x || this.x;
	this.y = y || this.y;
};

Vector.prototype.getX = function() {
	return this.x;
};

Vector.prototype.getY = function() {
	return this.y;
};

Vector.prototype.getLength = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.setAngle = function(angle) {
	var length = this.getLength();
	this.x = Math.cos(angle) * length;
	this.y = Math.sin(angle) * length;
};

Vector.prototype.getAngle = function() {
	return Math.atan2(this.y, this.x);
};

Vector.prototype.setLength = function(length) {
	var angle = this.getAngle();
	this.x = Math.cos(angle) * length;
	this.y = Math.sin(angle) * length;	
};

Vector.prototype.add = function(vector) {
	return new Vector(this.x + vector.getX(), this.y + vector.getY());
};

Vector.prototype.sub = function(vector) {
	return new Vector(this.x - vector.getX(), this.y - vector.getY());
};

Vector.prototype.mul = function(scalar) {
	return new Vector(this.x * scalar, this.y * scalar);
};

Vector.prototype.div = function(scalar) {
	return new Vector(this.x / scalar, this.y / scalar);
};

Vector.prototype.addTo = function(vector) {
	this.x += vector.getX(); 
	this.y += vector.getY();
};

Vector.prototype.subFrom = function(vector) {
	this.x -= vector.getX(); 
	this.y -= vector.getY();
};

Vector.prototype.mulBy = function(scalar) {
	this.x *= scalar; 
	this.y *= scalar;
};

Vector.prototype.divBy = function(scalar) {
	this.x /= scalar; 
	this.y /= scalar;
};

Vector.prototype.normalize = function() {
	var length = this.getLength();
	if(!length)
		return;
	this.divBy(length);
};

Vector.prototype.limitTo = function (scalar) {
  this.normalize();
  this.mulBy(Math.min(this.getLength(), scalar));
};

Vector.prototype.map = function(inLower, inUpper, outLower, outUpper) {
	var length = this.getLength();
	// return ((length - inLower) * ((outUpper - outLower) / (inUpper - inLower))) + outLower;
	return ((length-inLower)/(inUpper-inLower))*(outUpper-outLower)+outLower;
};

Vector.prototype.angleBetween = function(vector) {
	var vectorDot = (this.getX() * vector.getX()) + (this.getY() * vector.getY());
	return (vectorDot/(this.getLength() * vector.getLength()));
};

Vector.prototype.dot = function(vector) {
	return (this.getX() * vector.getX() + this.getY() * vector.getY());
};

Vector.prototype.copy = function() {
	return new Vector(this.x, this.y);
};

Vector.prototype.dist = function(vector) {
	return Math.sqrt( Math.pow((this.getX() - vector.getX()), 2) + Math.pow((this.getY() - vector.getY()), 2));
};

Vector.prototype.randomVector = function(from, to) {
	return new Vector(Math.floor(Math.random() *  (to - from + 1)) + from, Math.floor(Math.random() *  (to - from + 1)) + from);
};