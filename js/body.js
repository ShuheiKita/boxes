BOXES.Body = Class.create();
BOXES.Body.prototype = Object.extend(new CANNON.Body, {
	initialize : function(obj) {
		CANNON.Body.call(this, obj);

		//回転しない
		this.fixedRotation = true;

		/**
		 * 衝突時実行する処理リスト.
		 * @property collideActions
		 * @type {Array<function>}
		 */
		this.collideActions = [];

		/**
		 * 最後に接触したBody.
		 * @property collideBody
		 * @type {BoxBody}
		 */
		this.collideBody = null;

		/**
		 * 進行方向ベクトル.
		 * @property vector
		 * @type {CANNON.Vec3}
		 */
		this.vector = new CANNON.Vec3(1, 0, 1);

		/**
		 * 移動時の加算速度.
		 * @property addVelocity
		 * @type {CANNON.Vec3}
		 */
		this.addVelocity = new CANNON.Vec3(0, 0, 0);

		//衝突時のイベント処理
		this.addEventListener("collide", function(e) {
			for (var i = 0; i < this.collideActions.length; i++) {
				//実行
				this.collideActions[i](e);
			}
		});
	},
	/**
	 * 箱体を追加.
	 * @method addBox
	 * @param {CANNON.Vec3} scale
	 * @param {CANNON.Vec3} position
	 */
	addBox : function(scale, position) {
		if (!scale) {
			scale = new CANNON.Vec3(1, 1, 1);
		}
		if (!position) {
			position = new CANNON.Vec3(0, 0, 0);
		}
		var box = new CANNON.Box(scale);
		this.addShape(box, position);
	},
	/**
	 * 対象との距離（中心）を取得.
	 * @method distance
	 * @param {BOXES.Body} body
	 */
	distance : function(body) {
		var x = Math.pow(this.position.x - body.positon.x, 2);
		var y = Math.pow(this.position.y - body.positon.y, 2);
		var z = Math.pow(this.position.z - body.positon.z, 2);
		return Math.sqrt(x + y + z);
	},
});
