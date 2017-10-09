function Tours(no_cities) {
    this.cities = new Array(no_cities);
    this.distance_covered  = 0;
}

Tours.prototype.add = function(cities) {
    this.cities = cities; 
}

Tours.prototype.shuffle = function() {
    let counter = this.cities.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;

        let temp_city = this.cities[index];
        // console.log(index);
        this.cities[index] = this.cities[counter];
        this.cities[counter] = temp_city;
    }
    console.log(this.cities);
}

Tours.prototype.distance = function() {
    let dist_covered = 0, dist = 0;
    for (let i = 0; i < this.cities.length - 1; i++) {
        dist = this.cities[i].from(this.cities[i + 1].position);
        dist_covered += dist;
    }

    // console.log(dist_covered);
    return dist_covered;
}

Tours.prototype.fitness = function() {
    let dist = this.distance();
    this.distance_covered = dist;
    return 1 / dist;
}

Tours.prototype.contains = function(city, start_pos, end_pos) {
    let flag = true;
    for (let i = 0; i < this.cities.length; i++) {
        // console.log(this.cities[i].position.x)
        if (i < start_pos || i > end_pos)
            if (this.cities[i].position.x == city.position.x && this.cities[i].position.y == city.position.y) {  
                flag = false;
                break;
            } 
    }

    return flag;
}

Tours.prototype.crossover = function(other_tour) {
    let new_tour = new Tours(other_tour.cities.length),
    start_pos = Math.floor(Math.random() * this.cities.length),
    end_pos = Math.floor(Math.random() * this.cities.length),
    tour_counter = 0,
    new_cities = [];

    new_tour.add(this.cities);

    if (start_pos > end_pos) {
        let temp = start_pos;
        start_pos = end_pos;
        end_pos = temp;
    }

    // console.log("Start Pos : " + start_pos + " End Pos : " + end_pos);

    for (let i = 0; i < this.cities.length; i++) {      
        if (!this.contains(other_tour.cities[i], start_pos, end_pos)) {
            // console.log("Adding " + other_tour.cities[i].position);
            new_cities.push(other_tour.cities[i]);
        }
    }

    for (let i = start_pos; i <= end_pos; i++)
        new_cities.push(this.cities[i]);

    // console.log(new_cities);

    new_tour.add(new_cities);

    return new_tour;
}

Tours.prototype.swap = function(i, rand_index) {
    let temp = this.cities[i];
    this.cities[i] = this.cities[rand_index];
    this.cities[rand_index] = temp;
}

Tours.prototype.mutate = function(mutation_rate) {
    let rand_index = 0;
    
    for (let i = 0; i < this.cities.length; i++) {
        if (Math.random() < mutation_rate) {
            rand_index = Math.floor(Math.random() * this.cities.length);
            this.swap(i, rand_index);
        }
    }
}

Tours.prototype.displayTour = function() {
    let tour_cities = "|";
    for (let i = 0; i < this.cities.length; i++)
        tour_cities += this.cities[i].position.x + ", " + this.cities[i].position.y + "|";

    console.log(tour_cities);
}

Tours.prototype.show = function() {
    for (let i = 0; i < this.cities.length; i++) {
        fill(127);
        stroke(200);
        strokeWeight(2);
        ellipse(this.cities[i].position.x, this.cities[i].position.y, 10, 10);     
    }  
}