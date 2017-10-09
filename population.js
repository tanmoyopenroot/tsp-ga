function Population(size, mutation_rate, elitism, tournament_size) {
    this.size = size;
    this.mutation_rate = mutation_rate;
    this.elitism = elitism;
    this.tournament_size = tournament_size;
    this.tours = [];
    this.best_fitness_value = 0;
    this.best_tour_index = 0
}

Population.prototype.acceptanceProbability = function(fitness_diff, temp) {
    return Math.exp(fitness_diff / temp);
}

Population.prototype.init = function(cities, temp, rate) {
    // console.log("Initial Population Of Size " + this.size);

    let current_tour = new Tours(cities.length), 
        current_tour_fitness = 0,
        new_tour,
        new_tour_fitness = 0,
        fitness_diff = 0
        temperature = temp,
        cooling_rate = rate;

    current_tour.add(shuffle(cities));
    this.tours.push(current_tour);

    while (this.tours.length < this.size) {
        new_tour = new Tours(cities.length);
        new_tour.add(shuffle(cities));

        current_tour_fitness = current_tour.fitness();
        new_tour_fitness = new_tour.fitness();

        if (new_tour_fitness > current_tour_fitness) {
            this.tours.push(new_tour)
            current_tour = new_tour;
        }
        else {
            fitness_diff = current_tour_fitness - new_tour_fitness;
            // console.log(fitness_diff + " -- " + temperature);
            if (this.acceptanceProbability(fitness_diff, temperature) > Math.random())
                this.tours.push(new_tour);
        }

        temperature *= 1 - cooling_rate;
    }

    // for (let i = 0; i < this.size; i++) {
        // this.tours[i] = new Tours(cities.length);
        // this.tours[i].add(shuffle(cities));
        // this.tours[i].shuffle()
        // console.log(this.tours[i].cities);
    // }

    console.log("Tour Sizez : " + this.tours.length);
}

Population.prototype.fittest = function() {
    let fittest_tour = this.tours[0], 
        fittest_value = this.tours[0].fitness(),
        fit_value = 0;

    this.best_tour_index = 0;

    for (let i = 1; i < this.tours.length; i++) {
        fit_value = this.tours[i].fitness();
        if (fit_value > fittest_value) {
            fittest_value = fit_value;
            fittest_tour = this.tours[i];
            this.best_tour_index = i;
        }
    }

    this.best_fitness_value = fittest_value;
}

Population.prototype.tournamentSelection = function() {
    let tour_tournament_index = [], 
        rand_index;

    while (tour_tournament_index.length < this.tournament_size) {
        rand_index = Math.floor(Math.random() * this.size);
        if (!tour_tournament_index.includes(rand_index))
            tour_tournament_index.push(rand_index);
    }

    // console.log("Tournament Population Index");
    // console.log(tour_tournament_index);

    let fittest_tour = this.tours[tour_tournament_index[0]], 
        fittest_value = this.tours[tour_tournament_index[0]].fitness(),
        fit_value = 0;

    // console.log("Initial Fittest Value");
    // console.log(fittest_value);

    // console.log("Tournament Population Fitness");    
    for (let i = 1; i < tour_tournament_index.length; i++) {
        fit_value = this.tours[tour_tournament_index[i]].fitness();
        // console.log(fit_value);
        if (fit_value > fittest_value) {
            fittest_value = fit_value;
            fittest_tour = this.tours[tour_tournament_index[i]];
        }
    }

    // console.log("Tournament Fittest Value : " + fittest_value);
    return fittest_tour;

}


Population.prototype.evolve = function() {
    let tour_parent_1, 
        tour_parent_2,
        tour_child, 
        new_tours = [], 
        elitism_offset = 0;

    if (this.elitism) {
        this.fittest();
        new_tours.push(this.tours[this.best_tour_index]);
        elitism_offset = 1;
    }

    // console.log("Tournament");
    
    for (let i = elitism_offset; i < this.size; i++) {
        tour_parent_1 = this.tournamentSelection();

        tour_parent_2 = this.tournamentSelection(); 

        // tour_parent_1.displayTour();
        // tour_parent_2.displayTour();

        tour_child = tour_parent_1.crossover(tour_parent_2);

        // console.log("Child Tour"); 
        // tour_child.displayTour()

        tour_child.mutate(this.mutation_rate);

        new_tours.push(tour_child)
    }

    this.tours = new_tours;

    // console.log("New Tours");
}

Population.prototype.displayBest = function() {
    let best_tour_cities = "|";

    best_tour_cities += this.tours[this.best_tour_index].cities[0].position.x + ", " + this.tours[this.best_tour_index].cities[0].position.y + "|";

    this.tours[this.best_tour_index].show();

    for (let i = 1; i < this.tours[this.best_tour_index].cities.length; i++) {
        best_tour_cities += this.tours[this.best_tour_index].cities[i].position.x + ", " + this.tours[this.best_tour_index].cities[i].position.y + "|";
        stroke(200);
        strokeWeight(2);
        line(
            this.tours[this.best_tour_index].cities[i-1].position.x,
            this.tours[this.best_tour_index].cities[i-1].position.y,
            this.tours[this.best_tour_index].cities[i].position.x,
            this.tours[this.best_tour_index].cities[i].position.y,
        )
    }

    return best_tour_cities;
}

Population.prototype.displayPOP = function() {
    let pop_tour_cities = "";

    for (let i = 0; i < this.tours.length; i++) {
        pop_tour_cities = "|"
        for (let j = 0; j < this.tours[i].cities.length; j++) {
            pop_tour_cities += this.tours[i].cities[j].position.x + ", " + this.tours[i].cities[j].position.y + "|";
        }
        console.log(pop_tour_cities);
    }
    // console.clear()
}
