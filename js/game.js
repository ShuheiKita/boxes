window.onload = function() {
	console.log(worldData);
	var demo = new BOXES.Demo();
	var world = demo.getWorld();
	world.gravity.set(0, -30, 0);
	world.broadphase = new CANNON.NaiveBroadphase();
	world.solver.iterations = 10;

	world.defaultContactMaterial.contactEquationStiffness = 1e8;
	world.defaultContactMaterial.contactEquationRelaxation = 10;
	
	demo.setScene("test1", worldData);
	demo.setScene("test2", worldData);
	demo.start();

}
