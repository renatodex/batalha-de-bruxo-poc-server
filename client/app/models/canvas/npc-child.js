var Action = Backbone.Model.extend({
    defaults: {
        callback: function(){}
    }
});

var Queue = Backbone.Collection.extend({
     model: Action,
     process: function() {
       if(this.at(0) == undefined) return;
       this.at(0).get('callback')();
       this.remove(this.at(0));
     }
 })
 
var CanvasNpcChild = function(npc_instance) {	
	
	var _npc_instance;
	var _sprite;
	var _spritesheet;
	var _tween;
	var _hp_bar;
	var _direction;
  
  var _queue = new Queue();
	
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
		
		_init_tick();
		
		var hp_atual = _npc_instance.getHp();
		var hp_max = _npc_instance.getNpc().getMaxHp();
		_hp_bar = new HpBar(hp_atual, hp_max);
		
		return _sprite;
	}
	
	var DURATION=80;

  var _init_tick = function() {
    _sprite.addEventListener('tick', function() {
      _queue.process();
    });
  }

	// Como mover o NPC no Mapa?
	// 1) quando o player clicar no mapa, o canvas tem que saber como traduzir essa coordenada para um Vertice do Grid - OK
	// 2) após obter o array [x,y] do ponto, o evento deve saber o ponto [x-inicial,y-inicial] e o [x-final,y-final], - OK
	// 3) com isso, uma lib de PathFinding deve saber retornar um Array [x,y] de pontos para onde o herói deve ser movido. - OK	
	// 4) para cada um dos pontos do PathFinding, o evento deve saber como converte-los para X,Y reais e executar uma ação de Tween.

	var _walk_path = function(actual_array, destination_array) {
	  //App.Tween.removeAllTweens();
	  //App.Tween.removeTweens(_instance)
	  
		var path = new Pathfinding(15,15)
		var movements = path.calculateMove(actual_array, destination_array);

		var previous, direction;
		var destiny_x;
		var destiny_y;
		
		_instance = new App.Tween.get(_sprite, {override:true});
      
		_.each(movements, function(next, k) {	
			destiny_x = next[0]*32;
			destiny_y = next[1]*32;
		
			_move(_instance, destiny_x,destiny_y,150, function() {
				previous = movements[k-1] || actual_array;
				direction = _whichDirection(previous, next)
			
			  _hp_bar.update((next[0]*32)-_hp_bar.getWidth()/4, (next[1]*32)-15);
				
				_sprite.gotoAndPlay(['move_', direction].join(''))
				if(next[0] == destination_array[0] && next[1] == destination_array[1]) {
					_sprite.gotoAndPlay(['stand_',direction].join(''));
					_direction = direction;
				}
			})		
		})
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
		
		_queue.add(new Action({callback:function(){				
  		instance.to({ 'y' : target_y, 'x' : target_x}, 80).call(function() {
  		  _npc_instance.setNpcTileX(parseInt(target_x / 32));
    		_npc_instance.setNpcTileY(parseInt(target_y / 32));
  			_callback();
  		});
    }}))
	}	
	
	var _receive_damage = function(damage_value) {
	  var max_hp = _npc_instance.getNpc().getMaxHp();
	  var actual_hp = _npc_instance.getHp();
	  
	  _npc_instance.setHp(actual_hp-damage_value)
	  
	  if(!_hp_bar.hit(damage_value)) {
	    App.getStage().removeChild(_sprite);
	    _hp_bar.remove();
	    //TODO: REMOVER DO DISPLAY LIST
    }
	}
	
	var _unload = function() {
	  App.getStage().removeChild(_sprite);
	  _hp_bar.remove();
	}
	
	_init(npc_instance);
	
	return {
		move:_move,
		getSprite:function() {
			return _sprite;
		},
		walkPath:_walk_path,
		receiveDamage:_receive_damage,
		unload:_unload,
		getDirection:function() {
		  return _direction;
		}
	}
}