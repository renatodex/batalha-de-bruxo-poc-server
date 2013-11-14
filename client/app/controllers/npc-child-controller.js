var ControllerNpcChild = function(){
	
	
	var _render = function(npc_child, x, y){
		var _x = x || _.random(0,15);
		var _y = y || _.random(0,15);
		
		FacadeNpcChild.isValidMove(npc_child, function(valid){
			if(valid){
				npc_child.setNpcTileX(x);
				npc_child.setNpcTileY(y);

				App.getStage().addChild(npc_child.getCanvas().getSprite());	
				
				npc_child.getCanvas().walkPath([0,0],[_x, _y]);
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