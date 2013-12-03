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
		_tween = new App.Tween(_sprite);
		
		return _sprite;
	};

	var _walk_path = function(actual_array) {
		var path = new Pathfinding(15, 15);
		var destination_array = actual_array;

		destination_array[0] += _duration;

		var movements = path.calculateMove(actual_array, destination_array);
	};

	var _move = function(instance, target_x, target_y, duration, callback) {
		var _duration = duration || 150;
		var _callback = callback || function(){};
		
		_npc_instance.setNpcTileX(parseInt(target_x / 32));
		_npc_instance.setNpcTileY(parseInt(target_y / 32));				
		
		instance.to({ 'y' : target_y, 'x' : target_x}, duration).call(function() {
			_callback();
		});
	}
	
	_init();
	
	return {
		init:_init,
		getSprite:function() {
			return _sprite;
		}
	}
}