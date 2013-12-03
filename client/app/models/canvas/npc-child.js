var CanvasNpcChild = function(npc_instance) {	
	
	var _npc_instance;
	var _sprite;
	var _spritesheet;
	var _tween;
	
	var _init = function(npc_instance) {
		_npc_instance = npc_instance;
		
		var npc_frame_width = npc_instance.getFrameWidth();
		var npc_frame_height = npc_instance.getFrameHeight();		
		
		var npc_sprite = App.getLoader().getResult(npc_instance.getNpc().getSprite());	

		_spritesheet = new App.SpriteSheet({
		     images: [$(npc_sprite).attr('src')],
             frames: {"regX": 0, "height": npc_frame_height, "count": 16, "regY": 0, "width": npc_frame_width},
			 animations: {
				move_down : {
					frames: [0,1,2,3]
			  	},
				move_left : {
					frames: [4,5,6,7]
			  	},
				move_right : {
					frames: [8,9,10,11]
			  	},
				move_up : {
					frames: [12,13,14,15]
			  	},					
				stand_down : {
					frames: [0]
			  	},
			
				stand_right : {
					frames: [8]
				},
				
				stand_left : {
					frames : [4]
				},
				
				stand_up : {
					frames : [12]
				}
			 }
		 });

		_sprite = new App.Sprite(_spritesheet);
		_tween = new App.Tween.get(_sprite)
		
		return _sprite;
	}
	
	var DURATION=80;

	// Como mover o NPC no Mapa?
	// 1) quando o player clicar no mapa, o canvas tem que saber como traduzir essa coordenada para um Vertice do Grid - OK
	// 2) após obter o array [x,y] do ponto, o evento deve saber o ponto [x-inicial,y-inicial] e o [x-final,y-final], - OK
	// 3) com isso, uma lib de PathFinding deve saber retornar um Array [x,y] de pontos para onde o herói deve ser movido. - OK	
	// 4) para cada um dos pontos do PathFinding, o evento deve saber como converte-los para X,Y reais e executar uma ação de Tween.

	var _walk_path = function(actual_array, destination_array) {
		var path = new Pathfinding(15,15)
		var movements = path.calculateMove(actual_array, destination_array);

		var previous, direction;
		var destiny_x;
		var destiny_y;
		var instance = new App.Tween.get(_sprite);

		_.each(movements, function(next, k) {			
			destiny_x = next[0]*32;
			destiny_y = next[1]*32;
			_move(instance, destiny_x,destiny_y,150, function() {
				previous = movements[k-1] || actual_array;
				direction = _whichDirection(previous, next)
				
				_sprite.gotoAndPlay(['move_', direction].join(''))
				if(next[0] == destination_array[0] && next[1] == destination_array[1]) {
					_sprite.gotoAndPlay(['stand_',direction].join(''));
				}					
				//console.log('movement -> ', previous, next)
			})		
		})
		
		console.log('animacao setada', npc_instance.getNpcTileX(), npc_instance.getNpcTileY())		
	}
	
	var _whichDirection = function(previous, next) {
		var direction;
		if(previous[0] < next[0]) {
			direction = 'right';	
		}
		if(previous[0] > next[0]) {
			direction = 'left';
		}
		if(previous[1] < next[1]) {		
			direction = 'down'
		}
		if(previous[1] > next[1]) {	
			direction = 'up';
		}
		
		return direction;		
	}

	var _move = function(instance, target_x, target_y, duration, callback) {
		var _duration = duration || 150;
		var _callback = callback || function(){};
		
		_npc_instance.setNpcTileX(parseInt(target_x / 32));
		_npc_instance.setNpcTileY(parseInt(target_y / 32));				
		
		instance.to({ 'y' : target_y, 'x' : target_x}, duration).call(function() {
			_callback();
		});
	}
	
	_init(npc_instance);
	
	return {
		move:_move,
		getSprite:function() {
			return _sprite;
		},
		walkPath:_walk_path
	}
}