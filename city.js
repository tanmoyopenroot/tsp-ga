function City(x, y) {
    // this.id = id;
    // this.position = new Vector(x, y);
    this.position = createVector(x, y);
}

City.prototype.from = function(other_position) {
    let dist = this.position.dist(other_position);
    return dist;
}