/**
 * BOXESのデモ用クラス CANNONjsをラップ.
 * @class BOXES.Demo
 */
BOXES.Demo = Class.create();
BOXES.Demo.prototype = Object.extend(new CANNON.Demo, {
	initialize : function() {
		//CANNON.Demo.call(this);
		//this.demo = new CANNON.Demo();
	},
	/**
	 * デモシーンの追加.
	 * @method setScene
	 * @param {String} name
	 * @param {Object} param
	 */
	setScene : function(name, param) {
		var self = this;
		this.addScene(name, function() {
			//マテリアル設定
			self.setMaterials(param.materials);
			self.setContactMaterials(param.contactMaterials);

			//地形ブロック設定
			var bodies = param.bodies
			for (var i = 0; i < bodies.length; i++) {
				var data = bodies[i];
				var body = new BOXES.Body({
					mass : data.mass,
					material : self.getMaterial(data.material)
				});
				//箱体
				for(var j=0; j<data.shapes.length; j++){
					var scale = data.shapes[j].scale;
					var pos = data.shapes[j].pos;
					body.addBox(new CANNON.Vec3(scale.x, scale.y, scale.z), new CANNON.Vec3(pos.x, pos.y, pos.z));
				}
				body.position.set(data.pos.x, data.pos.y, data.pos.z);
				body.updateMassProperties();
				self.world.addBody(body);
				self.addVisual(body);
			}
		});
		console.log("set "+name);
	},
	setMaterials : function(names) {
		for (var i = 0; i < names.length; i++) {
			this.world.addMaterial(new CANNON.Material(names[i]));
		}
	},
	getMaterial : function(name) {
		for (var i = 0; i < this.world.materials.length; i++) {
			if (name == this.world.materials[i].name) {
				return this.world.materials[i];
			}
		}
		return null;
	},
	setContactMaterials : function(array) {
		for (var i = 0; i < array.length; i++) {
			this.setContactMaterial(array.m1, array.m2, array.param);
		}
	},
	setContactMaterial : function(name1, name2, param) {
		var m1 = this.getMaterial(name1);
		var m2 = this.getMaterial(name2);
		if (m1 && m2) {
			var cm = new CANNON.ContactMaterial(m1, m2, param);
			this.world.addContactMaterial(cm);
		}
	}
});

