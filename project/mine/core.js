

/** 
 * A filter for boids that aren't close enough.
 **/
function withinRangeOf(boid) {	
	return function(other) {
		return boid.position.distance(other.position) <= getBoidViewDistance();
	};
}