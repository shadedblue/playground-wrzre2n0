Boid.prototype.alignment = function (boids) {
	var sum = new Victor(0, 0);

	// For every nearby boid, sum their velocity	
	for (var i = 0, l = boids.length; i < l; ++i) {
		var other = boids[i];
		sum.add(other.velocity);
	}

	// If the sum of all flockmate's velocities isn't nul
	if (!sum.isZero()) {
		// We want our desired velocity to be of the length of our desired speed
		var desired = sum.normalize().multiplyScalar(getDesiredSpeed());

		// We then calculate the steering force needed to get to that desired velocity
		return this.steer(desired);
	}

	return sum;
};

Boid.prototype.cohesion = function (boids) {
	var average = new Victor(0, 0);

	// Get the average position of all nearby boids.
	for (var i = 0, l = boids.length; i < l; ++i) {
		var other = boids[i];
		average.add(other.position);
	}

	if (boids.length > 0) {
		// The average is the the sum of vectors divided by the number of flockmates
		var destination = average.divideScalar(boids.length);
		
		// We calculate the vector from this boid to the destination point
		var desired = destination.subtract(this.position);
		
		// We want our desired velocity to be of the length of our desired speed, or zero.
		if (desired.length() > 0) {
			desired.normalize().multiplyScalar(weights.desiredSpeed);
		}
		
		// We then calculate the steering force needed to get to that desired velocity
		return this.steer(desired);
	}
	return average;
};

/** 
 * The boid must react to the environment
 **/
Boid.prototype.decision = function (environment) {
	// Select only the neighbouring boids
	var boids = environment.boids.filter(withinRangeOf(this));

	// Perform flocking
	this.flock(boids);
};

/** 
 * Calculate the acceleration of the boid
 * using the 3 rules of flocking
 **/
Boid.prototype.flock = function (boids) {
	// Calculate flocking forces
	var sep = this.separation(boids);
	var ali = this.alignment(boids);
	var coh = this.cohesion(boids);

    // Apply weights to forces	
	sep.multiplyScalar(getWeights().separation);
	ali.multiplyScalar(getWeights().alignment);
	coh.multiplyScalar(getWeights().cohesion);

	// Calculate acceleration
	this.acceleration.add(sep).add(ali).add(coh);
	limitForce(this.acceleration);
};

Boid.prototype.separation = function (boids) {
	// Choose a distance at which boids start avoiding each other
	var desiredSeparation = getBoidViewDistance() / 2;

	var desired = new Victor(0, 0);

	// For every flockmate, check if it's too close
	for (var i = 0, l = boids.length; i < l; ++i) {
		var other = boids[i];
		var dist = this.position.distance(other.position);
		if (dist < desiredSeparation && dist > 0) {
			// Calculate vector pointing away from the flockmate, weighted by distance
			var diff = this.position.clone().subtract(other.position).normalize().divideScalar(dist);
			desired.add(diff);
		}
	}
	
	// If the boid had flockmates to separate from
	if (desired.length() > 0) {
		// We set the average vector to the length of our desired speed
		desired.normalize().multiplyScalar(getDesiredSpeed());

		// We then calculate the steering force needed to get to that desired velocity
		return this.steer(desired);
	}

	return desired;
};