var CanvasHadouken = function(x, y) {
	
	var _spritesheet;
	var _sprite;
	var _tween;
	var _duration = 4;
	
	var _init = function(x, y) {
		_spritesheet = new App.SpriteSheet({
		     images: ['../app/assets/images/hadouken.png'],
             frames: {"regX": 0, "height": 32, "count": 2, "regY": 0, "width": 32},
			 animations: {
				move : {
					frames: [0,1]
			  	}
			 }
		 });
		
		_sprite = new App.Sprite(_spritesheet);
		
		return _sprite;
	};

	var _walk_path = function(actual_array) {
		var path = new Pathfinding(15, 15);
		
		// O Tween precisa ser gerado depois que o Objeto está printado na Tela pro createJS ter uma referencia pra mover
		// Se o Tween instanciar antes disso, é como se voce estivesse movendo um objeto invisivel na tela
		
		var tween = new App.Tween(_sprite);
		
		var destination_array = actual_array;
		destination_array[0] += _duration;

		var movements = path.calculateMove(actual_array, destination_array);
		
		_.each(movements, function(v, k) {
			_move(tween, v[0]*32, v[1]*32, 600, function() {
				console.log('ANDOU..', v)
			})
		})
	};

	var _move = function(instance, target_x, target_y, duration, callback) {
		var _duration = duration || 150;
		var _callback = callback || function(){};
		
		instance.to({ 'y' : target_y, 'x' : target_x}, duration).call(function() {
			_callback();
		});
	}
	
	_init();
	
	return {
		move:_move,
		init:_init,
		getSprite:function() {
			return _sprite;
		},
		getTween:function() {
			return _tween;
		},
		walk_path:_walk_path
	}
}