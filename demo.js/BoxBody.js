/**
 *
 * @class BoxBody
 * @constractor
 */
BOXES.BoxBody = Class.create();
BOXES.BoxBody.prototype = Object.extend(new CANNON.Body, {
	initialize : function(obj) {
		CANNON.Body.call(this, obj);
		
		this.fixedRotation = false;

		this.angularDamping = 0.4;

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
		
		/**
		 * 別Body所持.
		 * @property catching
		 * @type {BoxBody}
		 *
		 */
		this.catching = null;

		//衝突時のイベント処理
		this.addEventListener("collide", function(e) {
			for (var i = 0; i < this.collideActions.length; i++) {
				//実行
				this.collideActions[i](e);
			}
		});

	},
	/**
	 * 指定サイズのボックスShapeを設定.
	 * @method setScale
	 * @param {Object} x
	 * @param {Object} y
	 * @param {Object} z
	 */
	setScale : function(x, y, z) {
		/**
		 * サイズを保持.
		 * @property scale
		 * @type {CANNON.Vec3}
		 */
		this.scale = new CANNON.Vec3(x, y, z);

		var shape = new CANNON.Box(this.scale);
		this.addShape(shape);
	},
	/**
	 * 等価比較.
	 * @method equals
	 * @param {Object} body
	 */
	equals : function(body) {
		this.id == body.id ? true : false;
	},
	/**
	 * 衝突時の処理追加.
	 * @method addCollideAction
	 * @param {function} func
	 */
	addCollideAction : function(func) {
		this.collideActions.push(func);
	},
	/**
	 * 衝突した方向を取得する.
	 * @method getCollideDirection
	 * @param {BoxBody} body 衝突相手
	 * @return {Object} 軸と方向
	 */
	getCollideDirection : function(body) {
		//自身
		var target = this;
		//衝突方向を調べる
		var d = [];
		d['x'] = target.position.x - body.position.x;
		d['y'] = target.position.y - body.position.y;
		d['z'] = target.position.z - body.position.z;
		var v = [];
		v['x'] = target.velocity.x - body.velocity.x;
		v['y'] = target.velocity.y - body.velocity.y;
		v['z'] = target.velocity.z - body.velocity.z;

		var min = 100;
		var axis = -1;
		var ls = [];
		if (v['x'] != 0) {
			ls['x'] = d['x'] / v['x'];
		}
		if (v['y'] != 0) {
			ls['y'] = d['y'] / v['y'];
		}
		if (v['z'] != 0) {
			ls['z'] = d['z'] / v['z'];
		}
		var axis = null;
		for (var i in ls) {
			if (ls[i] < min) {
				min = ls[i];
				axis = i;
			}
		}
		if (axis) {
			if (v[axis] > 0) {
				dir = 1;
			} else {
				dir = -1;
			}
			return {
				"axis" : axis,
				"direction" : dir
			};
		}
		return null;
	},
	/**
	 * 地面との接触判定.
	 * @method isLanding
	 * @return {boolean}
	 */
	isLanding : function() {
		if (!this.collidingBody) {
			return false;
		}
		var body = this.collidingBody;
		var dx1 = this.position.x + this.scale.x - (body.position.x - body.scale.x);
		var dx2 = this.position.x - this.scale.x - (body.position.x + body.scale.x);
		var dy1 = this.position.y + this.scale.y - (body.position.y - body.scale.y);
		var dy2 = this.position.y - this.scale.y - (body.position.y + body.scale.y);
		var dz1 = this.position.z + this.scale.z - (body.position.z - body.scale.z);
		var dz2 = this.position.z - this.scale.z - (body.position.z + body.scale.z);
		if (dx1 >= 0 && dx2 <= 0 && dy1 >= 0 && dy2 <= 0 && dz1 >= 0 && dz2 <= 0) {
			return true;
		}
		return false;
	},
	/**
	 *指定方向に速度を加算する.
	 * @method applyVelocity
	 * @param {CANNON.Vec3} vec
	 */
	applyVelocity : function(vec) {
		//速度加算
		this.velocity = this.velocity.vadd(vec);

		//進行方向を更新
		var x = vec.x;
		var y = vec.y;
		var z = vec.z;
		x = x != 0 ? x / Math.abs(x) : 0;
		y = y != 0 ? y / Math.abs(y) : 0;
		z = z != 0 ? z / Math.abs(z) : 0;
		if(x==0 && z==0){
			return ;
		}
		this.vector.set(x, y, z);
	},
	/**
	 * 加算用ベクトルに加算させる.
	 * @method pushVelocity
	 * @param {CANNON.Vec3} vec
	 * 
	 */
	pushVelocity : function(vec) {
		this.addVelocity = this.addVelocity.vadd(vec);
	},
	setAngularVelocity : function(){
		var value = 5 / this.mass;
		this.angularVelocity.set(this.vector.x*value, 0, this.vector.z*value);
	},
	distance : function(body){
		var x = Math.pow(this.position.x - body.positon.x, 2);
		var y = Math.pow(this.position.y - body.positon.y, 2);
		var z = Math.pow(this.position.z - body.positon.z, 2);
		return Math.sqrt(x+y+z);
	},
	targetVector : function(body){
		var dis = this.distance(body);
		if(dis==0){
			return new CANNON.Vec3(0, 0, 0);
		}
		var x = body.position.x - this.position.x;
		var y = body.position.y - this.position.y;
		var z = body.position.z - this.position.z;
		return new CANNON.Vec3(x/dis, y/dis, z/dis);
	}
});
