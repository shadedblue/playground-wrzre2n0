function drawBoid(graphics, r) {
	graphics.lineStyle(2, palette[1], 1);
	graphics.beginFill(palette[2], 1);
	graphics.moveTo(r, 0);
	graphics.lineTo(-r, -r / 2);
	graphics.lineTo(-r, r / 2);
	graphics.lineTo(r, 0);
	graphics.endFill();

	graphics.lineStyle(2, palette[1], 0);

	// eye balls
	graphics.beginFill(0xFFFFFF, 1);
	graphics.drawCircle(2*r/4, -r/3, r/4);
	graphics.drawCircle(2*r/4, r/3, r/4);
	graphics.endFill();

	// eye dots
	graphics.beginFill(0x0, 1);
	graphics.drawCircle(2*r/4 + 1, -r/3, r/16);
	graphics.drawCircle(2*r/4 + 1, r/3, r/16);
	graphics.endFill();
}

/** 
 * A filter for boids that aren't close enough.
 **/
function withinRangeOf(boid) {	
	return function(other) {
		return boid.position.distance(other.position) <= getBoidViewDistance();
	};
}
/**
 * Limit the vector to a certain length.
 */
function limitForce(vector) {
	if (vector.length() > getMaxForce()) {
		vector.normalize().multiplyScalar(getMaxForce());
	}
	return vector;
}

// spawn a bunch
for (var i = 0; i < 50; ++i) {
	boids.push(new Boid(Math.random() * app.screen.width, Math.random() * app.screen.height));
}

