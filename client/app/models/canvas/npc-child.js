var CanvasNpcChild = function(npc_child) {	
	
	var _npc_child;
	var _sprite;
	var _spritesheet;
	
	var _init = function(npc_child) {
		_npc_child = npc_child;
		
		var npc_frame_width = npc_child.getFrameWidth();
		var npc_frame_height = npc_child.getFrameHeight();		
		
		var npc_sprite = App.getLoader().getResult(npc_child.getNpc().getSprite());	

		_spritesheet = new App.SpriteSheet({
		     images: [$(npc_sprite).attr('src')],
             frames: {"regX": 1, "height": npc_frame_height, "count": 16, "regY": 0, "width": npc_frame_width},
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
		
		/* _sprite.addEventListener("tick", handleTick);
		    function handleTick(evtObj) {
		         // do some work here, then update the stage, passing through the event object:
		        console.log(_sprite.y)
		    }	*/	
		
		return _sprite;
	}
	
	var DURATION=80;

	var _walk_down = function() {
		var actual_y = _sprite.y;
		var actual_x = _sprite.x;
		
		_sprite.gotoAndPlay('move_down');
		_move(actual_x, actual_y + 32, DURATION, function() {
			_sprite.gotoAndStop('stand_down');
		});
	}
	
	// quando o player clicar no mapa, o canvas tem que saber como traduzir essa coordenada para um Vertice do Grid
	
	// após obter o array [x,y] do ponto, o evento deve saber o ponto [x-inicial,y-inicial] e o [x-final,y-final],
	// com isso, uma lib de PathFinding deve saber retornar um Array [x,y] de pontos para onde o herói deve ser movido.
	
	// para cada um dos pontos do PathFinding, o evento deve saber como converte-los para X,Y reais e executar uma ação de Tween.
	
	var _walk_up = function() {
		var actual_y = _sprite.y;
		var actual_x = _sprite.x;
		
		_sprite.gotoAndPlay('move_up');
		_move(actual_x, actual_y - 32, DURATION, function() {
			_sprite.gotoAndStop('stand_up');
		});
	}	
	
	var _walk_left = function() {
		var actual_y = _sprite.y;
		var actual_x = _sprite.x;
		
		_sprite.gotoAndPlay('move_left');
		_move(actual_x - 32, actual_y, DURATION, function() {
			_sprite.gotoAndStop('stand_left');
		});
	}
	
	var _walk_right = function() {
		var actual_y = _sprite.y;
		var actual_x = _sprite.x;
		
		_sprite.gotoAndPlay('move_right');
		_move(actual_x + 32, actual_y, DURATION, function() {
			_sprite.gotoAndStop('stand_right');
		});
	}	

	var _move = function(target_x, target_y, duration, callback) {
		var _duration = duration || 1000;
		var _callback = callback || function(){};
		
		_npc_child.setNpcTileX(target_x);
		_npc_child.setNpcTileY(target_y);		
		
		new App.Tween.get(_sprite).to({ 'y' : target_y, 'x' : target_x}, duration).call(function() {
			_callback();
		});
	}
	
	var _move_tick = function() {
		
	}
	
	_init(npc_child);
	
	return {
		move:_move,
		walkDown:_walk_down,
		walkRight:_walk_right,
		walkLeft:_walk_left,
		walkUp:_walk_up,
		getSprite:function() {
			return _sprite;
		}
	}
}