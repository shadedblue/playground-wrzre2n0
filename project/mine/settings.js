function getWeights() {
	//TODO !
	// Recommended values: 4/8, 3/8, 1/8
	return {
		separation: 4/8, 
		alignment: 3/8,
		cohesion: 1/8,
	};
}

function getBoidViewDistance() {
	//TODO !
	// Recommended value: 50
	return 50;
}

function getMaxForce() {
	return 0.05;
}

function getDesiredSpeed() {
	return 6;
}