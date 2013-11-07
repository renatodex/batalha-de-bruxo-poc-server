var FacadeMap = function() {
	var _retrieve_by_id = function(map_id) {
		var _fake_map = {
			map_id : 1,
			width : 100,
			height : 12,
			tile_height : 32,
			tile_width : 32,
			sprite: 'http://localhost/map.png',
			tile_data : [0,0,0,3,0,2,8,19,0,0,25,0,0,0,3,0,2,7,0,0,0,0,0,3,0,2,8,19,0,0,25,0,0,0,3,0,2,7,0,0,0,0,0,3,0,2,8,19,0,0,25,0,0,0,3,0,2,7,0,0,0,0,0,3,0,2,8,19,0,0,25,0,0,0,3,0,2,7,0,0,0,0,0,3,0,2,8,19,0,0,25,0,0,0,3,0,2,7,0,0]
		}

		return new Map(_fake_map['map_id'], _fake_map['width'], _fake_map['height'], _fake_map['tile_height'], _fake_map['tile_width'], _fake_map['sprite'], _fake_map['tile_data']);		
	}
	
	return {
		retrieveById : _retrieve_by_id
	}
}()