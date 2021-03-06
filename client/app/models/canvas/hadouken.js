var CanvasHadouken = function(x, y) {
	
	var _spritesheet;
	var _sprite;
	var _tween;
	var _duration = 3;
	var _damage = 30;
	
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
		_sprite.x = x*32;
		_sprite.y = y*32;
		
		_sprite.addEventListener('tick', function() {
			_.each(display_list, function(npc, k) {
				var _x = parseInt(npc.getCanvas().getSprite().x/32);
				var _y = parseInt(npc.getCanvas().getSprite().y/32)+1;
				
				if(parseInt(_sprite.x/32) == _x && parseInt(_sprite.y/32) == _y) {
					ControllerDamage.apply(npc.getCanvas(), _damage);
					App.getStage().removeChild(_sprite);
				}
			});			
		})	
		
		return _sprite;
	};

	var _cast = function(direction) {
		var path = new Pathfinding(15, 15);
		
		var actual_array = [];
		actual_array[0] = parseInt(_sprite.x/32);
		actual_array[1] = parseInt(_sprite.y/32);
		
		// O Tween precisa ser gerado depois que o Objeto está printado na Tela pro createJS ter uma referencia pra mover
		// Se o Tween instanciar antes disso, é como se voce estivesse movendo um objeto invisivel na tela
		
		var tween = new App.Tween(_sprite);
		
		var destination_array = actual_array;
		
		if(direction == "up") {
		  destination_array[1] -= _duration;
		} else if(direction == "down") {
		  destination_array[1] += _duration;
		} else if(direction == "left") {
		  destination_array[0] -= _duration;
		} else {
		  destination_array[0] += _duration;
		}
		
		//destination_array[0] += _duration;

    try {
		  var movements = path.calculateMove(actual_array, destination_array);
		  App.getSound().play('hadouken');
		  _.each(movements, function(v, k) {
  			_move(tween, v[0]*32, v[1]*32, 200, function() {

  				console.log('ANDOU..', v);

  				var last = _.last(movements);

  				if(last == v){
  					App.getStage().removeChild(_sprite);
  				}

  			});
  		})
	  } catch(e) {
	    console.log('NÃO CONSEGUIU SOLTAR O HADOUKEN..');
	    App.getStage().removeChild(_sprite);
	  }
	};

	var _move = function(instance, target_x, target_y, duration, callback) {
		var _duration = duration || 150;
		var _callback = callback || function(){};
		
		instance.to({ 'y' : target_y, 'x' : target_x}, duration).call(function() {
			_callback();
		});
	}
	
	_init(x,y);
	
	return {
		move:_move,
		init:_init,
		getSprite:function() {
			return _sprite;
		},
		getTween:function() {
			return _tween;
		},
		cast:_cast
	}
}