var population,
	pop_size = 100,
	gen_cout = 0,
	max_gen = 1000;

function getCities() {
	// Create and add our cities
	let cities = [];
	cities.push(new City(60, 200));
	cities.push(new City(180, 200));
	cities.push(new City(80, 180));
	cities.push(new City(140, 180));
	cities.push(new City(20, 160));
	cities.push(new City(100, 160));
	cities.push(new City(200, 160));
	cities.push(new City(140, 140));
	cities.push(new City(40, 120));
	cities.push(new City(100, 120));
	cities.push(new City(180, 100));
	cities.push(new City(60, 80));
	cities.push(new City(120, 80));
	cities.push(new City(180, 60));
	cities.push(new City(20, 40));
	cities.push(new City(100, 40));
	cities.push(new City(200, 40));
	cities.push(new City(20, 20));
	cities.push(new City(60, 20));
	cities.push(new City(160, 20));
	return cities;
}

function display() {
	gen_disp.html("Generation : " + gen_cout + " / " + max_gen);
	best_fitness_disp.html("Best Fitness : " + population.best_fitness_value);
	best_tour_disp.html("Best Tour : " + population.displayBest());
	best_tour_dist_disp.html("Best Tour Distance : " + population.tours[population.best_tour_index].distance_covered);
	// population.displayPOP();
}

function setup() {
	createCanvas(400, 220);
	let cities = getCities(),  
		mutation_rate = 0.03, 
		elitism = true, 
		tournment_size = 10;
	population = new Population(pop_size, mutation_rate, elitism, tournment_size);
	population.init(cities);

	title_disp = createP("Travelling Sales Person");
	pop_size_disp = createP("Population Size : " + pop_size);
	mutation_disp = createP("Mutation Rate : " + mutation_rate);
	tournament_disp = createP("Tournament Size : " + tournment_size);
	gen_disp = createP();	
	best_fitness_disp = createP();
	best_tour_disp = createP();
	best_tour_dist_disp = createP();
}

function draw() {
	background(0);
	display();
	population.evolve();
	gen_cout++;
	if (gen_cout > max_gen)
		noLoop();
}