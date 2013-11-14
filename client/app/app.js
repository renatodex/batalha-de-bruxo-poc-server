var App = function() {
	var _loader;
	var _stage;
	
	var _init = function(canvas_id, callback) {
		_callback = callback || function() {};
		_stage = new createjs.Stage(canvas_id);

		// grab canvas width and height for later calculations:
		w = _stage.canvas.width;
		h = _stage.canvas.height;

		/*manifest = [
			{src:"assets/runningGrant.png", id:"grant"},
			{src:"assets/sky.png", id:"sky"},
			{src:"assets/ground.png", id:"ground"},
			{src:"assets/parallaxHill1.png", id:"hill"},
			{src:"assets/parallaxHill2.png", id:"hill2"}
		];*/

		_loader = new createjs.LoadQueue(false);
		_loader.addEventListener("complete", callback);
		_loader.loadManifest([{id:"hero", src:"../app/assets/images/hero_sprite.png"}]);
		_loader.load();
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
		update : function() {
			_stage.update();
		},
		SpriteSheet : createjs.SpriteSheet,
		Sprite : createjs.Sprite,
		Tween : createjs.Tween
	}
}();


App.init('alcides', function() {
	var game = FacadeGame.createGame([_.random(0,99999),2,3,4], 40);
	npc_child = game.getTeamA()[0];
	
	ControllerNpcChild.render(npc_child)
	
	App.getTicker().setFPS(80)
	App.getTicker().on('tick', function(e) {
		App.update();
	})
});

App.getStage().canvas.addEventListener('click', function(e) {
	var _destination = [e.layerX, e.layerY]
	var _actual = [npc_child.getNpcTileX(), npc_child.getNpcTileY()]
	var _grid = [parseInt(_destination[0] / 32), parseInt(_destination[1] / 32)-1];	

	npc_child.getCanvas().walkPath(_actual,_grid);
})


  var socket = io.connect('http://192.168.0.11:3000');

 socket.on('connect', function () {
 	socket.emit('retrive-players');
    socket.emit('npc-child-create', npc_child.toServer());
  });

 socket.on('retrive-players', function(data){
 		var new_npc = FacadeNpcChild.createNpcInstance(_.random(0,10000));
		ControllerNpcChild.render(new_npc, data.npc_tile_x, data.npc_tile_y);
 });

 socket.on('npc-child-create', function(data) {
		var new_npc = FacadeNpcChild.createNpcInstance(_.random(0,10000));
		ControllerNpcChild.render(new_npc, data.npc_tile_x, data.npc_tile_y)
 });


