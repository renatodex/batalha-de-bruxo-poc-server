var FacadeNpcChild = function() {	
	var _create_npc_instance = function(npc_id) {
		var _fake_instance = {
			hp : 100,
			npc_tile_x : 12,
			npc_tile_y : 24,
			npc_frame_width: 64,
			npc_frame_height: 63,
			attackable : true,
			game_id : 682398432
		}

		var npc_child = new NpcChild(_fake_instance['hp'], _fake_instance['npc_tile_x'], _fake_instance['npc_tile_y'], _fake_instance['attackable'], _fake_instance['game_id']);
		npc_child.setFrameWidth(_fake_instance['npc_frame_width']);
		npc_child.setFrameHeight(_fake_instance['npc_frame_height']);
		
		var npc = FacadeNpc.retrieveById(npc_id);
		npc_child.setNpc(npc);
		
		var canvas = new CanvasNpcChild(npc_child);
		npc_child.setCanvas(canvas);
		
		return npc_child;
	}
	
	var _isValidMove = function(npc, callback) {
		var cb = callback || function(){};
		cb(true);
	}
	
	return {
		createNpcInstance:_create_npc_instance,
		isValidMove:_isValidMove
	}
}();