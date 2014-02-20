var App = function() {
	var _loader;
	var _stage;
	
	var _init = function(canvas_id, callback) {
		_callback = callback || function() {};
		_stage = new createjs.Stage(canvas_id);

		// grab canvas width and height for later calculations:
		w = _stage.canvas.width;
		h = _stage.canvas.height;
		
		var manifest = [
		  {id:"hero", src:"../app/assets/images/hero_sprite.png"},
		  {id:"hadouken", src: "../app/assets/sounds/hadouken.mp3", type:createjs.LoadQueue.SOUND}
		]

		_loader = new createjs.LoadQueue(false);
		_loader.addEventListener("complete", callback);
		_loader.loadManifest(manifest);
		_loader.load();
		
		_sound = createjs.Sound;
    _sound.alternateExtensions = ["mp3"];
    _sound.addEventListener("fileload", createjs.proxy(_callback, this));
    _sound.registerManifest(manifest)
    
	}
	
	return {
		init : _init,
		getLoader : function() {
			return _loader;
		},
		getStage : function() {
			return _stage;
		},
		getTicker : function() {
			return createjs.Ticker;
		},
		getSound  : function() {
		  return createjs.Sound;
		},
		update : function() {
			_stage.update();
		},
		SpriteSheet : createjs.SpriteSheet,
		Sprite : createjs.Sprite,
		Tween : createjs.Tween
	}
}();


App.init('alcides', function() {
	App.getTicker().setFPS(80)
	App.getTicker().on('tick', function(e) {
		App.update();
	})
});

var socket = io.connect('http://localhost:3000');

$('body').bind('mousemove', function(e) {
	//console.log(e.clientX, e.clientY);
	//console.log('global=', App.getStage().globalToLocal(e.clientX, e.clientY));
})

/*
 socket.on('connect', function () {

 	socket.emit('retrive-players');
    socket.emit('npc-child-create', npc_child.toServer());
  });

 socket.on('retrive-players', function(data){
 		_.each(data, function(v, k){
	 		if(v.npc_id != npc_child.getNpcId){
		 		var new_npc = FacadeNpcChild.createNpcInstance(v.npc_id);
				ControllerNpcChild.render(new_npc, data.npc_tile_x, data.npc_tile_y);
			}
		});
 });

 socket.on('npc-child-create', function(data) {
		var new_npc = FacadeNpcChild.createNpcInstance(_.random(0,10000));
		ControllerNpcChild.render(new_npc, data.npc_tile_x, data.npc_tile_y);
 });*/

socket.on('error', function(message) {
	alert(message);
})
var display_list = [];

socket.on('logon', function(npc_data) {
	$('.login').fadeOut();
	console.log('Vamos ver o data...', npc_data)
	
	if(npc_data) {
		// caso não coberto
	} else {	
	  var game_cycle = new CanvasGameCycle();
	  
		console.log('FIRST TIME ON')	
		window.npc_child = FacadeNpcChild.createNpcInstance(_.random(0,99999));
		npc_child.setAccountEmail($('.email').val());		
		ControllerNpcChild.render(npc_child);
		display_list.push(npc_child);
		socket.emit('npc-child-create', npc_child.toServer())
		
		App.getStage().canvas.addEventListener('click', function(e) {
			var _destination = [parseInt(e.layerX/32), parseInt(e.layerY/32) -1]
			var _actual = [npc_child.getNpcTileX(), npc_child.getNpcTileY()]
			console.log('atual',_actual);

			npc_child.getCanvas().walkPath(_actual,_destination);
			
			socket.emit('update-position', npc_child.getAccountEmail(), _destination[0], _destination[1]);
		})
				
		socket.emit('retrieve-players', npc_child.getAccountEmail());
		
		
		socket.on('update-position', function(email, x, y) {
			_.each(display_list, function(v,k) {
				if(v.getAccountEmail() == email) {
					var _actual = [v.getNpcTileX(), v.getNpcTileY()]
					var _destination = [x, y];
					v.getCanvas().walkPath(_actual, _destination);
				}
			})		
		});
		
		socket.on('update-players', function(npc_childs){
		 	_.each(npc_childs, function(v, k){
			 		if(v.npc_id != npc_child.getNpcId){
				 		var new_npc = FacadeNpcChild.createNpcInstance(v.npc_id);
						new_npc.setAccountEmail(v.account_email);
						display_list.push(new_npc);
						ControllerNpcChild.render(new_npc, v.npc_tile_x, v.npc_tile_y);
					}
			});
		});

		socket.on('player-connected', function(npc_instance) {
			var new_npc = FacadeNpcChild.createNpcInstance(npc_instance.npc_id);
			new_npc.setAccountEmail(npc_instance.account_email);
			display_list.push(new_npc);
			ControllerNpcChild.render(new_npc, npc_instance.npc_tile_x, npc_instance.npc_tile_y);
		});

		socket.on('player-disconnected', function(email) {
			console.log('JOGADOR DESCONECTOU', email);
			console.log(display_list);
			_.each(display_list, function(v,k) {
				if(v.getAccountEmail() == email) {
				  v.getCanvas().unload();
				}
			})
		});		
	}
})

function castHadouken(x, y, direction) {
  if(direction == "down") {
    y += 2;
  }
  
  if(direction == "left") {
    y += 1;
    x -= 1;
  }
  
  if(direction == "right") {
    y += 1;
    x += 1;
  }
  
	var golpe = new CanvasHadouken(x, y);
	App.getStage().addChild(golpe.getSprite());
	golpe.cast(npc_child.getCanvas().getDirection());	
}

socket.on('cast-hadouken', function(email) {
	_.each(display_list, function(v,k) {
		if(v.getAccountEmail() == email) {
			castHadouken(v.getNpcTileX(), v.getNpcTileY(), v.getCanvas().getDirection());
		}
	})	
});

$('.login-button').bind('click', function(e) {
	e.preventDefault();
	var email = $('.email').first().val();
	var password = $('.password').val();
	socket.emit('login', email, password);
})

$( window ).unload(function() {
	var email = npc_child.getAccountEmail() || false;
	socket.emit('disconnect-player', email);
});

$('body').bind('keydown', function(e) {
	if(e.keyCode == 32) {
		castHadouken(npc_child.getNpcTileX(), npc_child.getNpcTileY(), npc_child.getCanvas().getDirection());
		socket.emit('cast-hadouken', $('.email').val());
	}
})

socket.on('update-game-state', function(state) {
  $('#the-game-state').removeClass();
  $('#the-game-state').addClass(state);
  $('#gameStats').text(state);
  // executar estado recebido do servidor
})
