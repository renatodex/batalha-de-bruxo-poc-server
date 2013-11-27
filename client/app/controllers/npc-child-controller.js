var ControllerNpcChild = function(){
	
	
	var _render = function(npc_instance, x, y){
		var _x = x || _.random(0,15);
		var _y = y || _.random(0,15);
		
		FacadeNpcChild.isValidMove(npc_instance, function(valid){
			if(valid){
				npc_instance.setNpcTileX(x);
				npc_instance.setNpcTileY(y);

				App.getStage().addChild(npc_instance.getCanvas().getSprite());	
				
				npc_instance.getCanvas().walkPath([0,0],[_x, _y]);
			}else{
				return false;
			}
		});
	},

	_move_down = function(npc, x, y){
		FacadeNpcChild.isValidMove(npc, function(valid){
			if(valid){
				
				//CanvasNpcChild.move(npc, x, y);
			}else{
				return false;
			}
		});
	}
	return{
		render : _render,
		moveDown: _move_down 
	}
}();