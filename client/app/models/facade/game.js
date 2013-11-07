var FacadeGame = function() {	
	_create_game = function(npcs_id_list, map_id) {	
		var _fake_game = {
			id : 5239532,
			map_id : 4329
		}
		
		var npcs = [];
		_.each(npcs_id_list, function(v, k) {
			npcs.push(FacadeNpcChild.createNpcInstance(v))
		})
		
		var game = new Game(_fake_game['id'])
		var map = FacadeMap.retrieveById(_fake_game['map_id']);
		game.setMap(map);
		game.setup(npcs)

		return game;		
	}
	
	return {
		createGame : _create_game
	}
}()