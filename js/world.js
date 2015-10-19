/**
 * BOXES用の物理世界クラス （CANNONのWorldを継承）.
 * @class World
 */
BOXES.World = Class.create();
BOXES.World.prototype = Object.extend(CANNON.World, {
	initialize : function() {
		CANNON.World.call(this);
	},
	/**
	 * 接触マテリアル情報の追加.
	 * @method setContactMaterial
	 * @param {String} name1
	 * @param {String} name2
	 * @param {Object} param
	 */
	setContactMaterial : function(name1, name2, param) {
		var m1 = this.getMaterial(name1);
		var m2 = this.getMaterial(name2);
		if (m1 && m2) {
			var cm = new CANNON.ContactMaterial(m1, m2, param);
			this.addContactMaterial(cm);
		}
	},
	/**
	 * 名前列からマテリアル列を設定.
	 * @method setMaterials
	 * @param {Array<String} names
	 */
	setMaterials : function(names) {
		for (var i = 0; i < names.length; i++) {
			this.addMaterial(new CANNON.Material(names[i]));
		}
	},
	/**
	 * 接触マテリアルの情報列から接触マテリアルを全て登録する.
	 * @method setContactMaterials
	 * @param {Object} array
	 */
	setContactMaterials : function(array) {
		for (var i = 0; i < array.length; i++) {
			this.setContactMaterial(array.m1, array.m2, array.param);
		}
	},
	/**
	 * 名称から登録済みマテリアルを取得.
	 * @method getMaterial
	 * @param {String} name
	 * @return {CANNON.Material}
	 */
	getMaterial : function(name) {
		for (var i = 0; i < this.materials.length; i++) {
			if (name == this.materials[i].name) {
				return this.materials[i];
			}
		}
		return null;
	},
});
