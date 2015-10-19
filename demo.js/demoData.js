var worldData = {
	//マテリアル名
	materials: ["m1", "m2"],
	//接触マテリアル情報
	contactMaterials: [{
		m1: "m1",
		m2: "m2",
		param: {
			friction: 0.1,
			restitution: 0.6,
			contactEquationStiffness: 1e8,
			contactEquationRelaxation: 3,
			frictionEquationStiffness: 1e8,
			frictionEquationRegularizationTime: 3
		}
	}, {
			m1: "m1",
			m2: "m1",
			param: {
				friction: 0.6,
				restitution: 0.6,
				contactEquationStiffness: 1e8,
				contactEquationRelaxation: 3,
				frictionEquationStiffness: 1e8,
				frictionEquationRegularizationTime: 3
			}
		}],
	bodies: [{
		pos: {
			x: 0,
			y: 0,
			z: 0
		},
		shapes: [{
			scale: {
				x: 0.5,
				y: 0.5,
				z: 0.5
			},
			pos: {
				x: 0,
				y: 0,
				z: 0
			}
		}],
		mass: 0,
		material: "m1"
	}]

};
