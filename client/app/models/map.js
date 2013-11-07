var Map = function(map_id, width, height, tile_height, tile_width, sprite, tile_data ){
	var _map_id = map_id
		_width = width,
		_height = height,
		_tile_height = tile_height,
		_tile_width = tile_width,
		_sprite = sprite,
		_tile_data = tile_data;

	_tiles_per_line = _width / _tile_width;
	
	_getTileY = function(tile_pos) {
		return parseInt((tile_pos)/_tiles_per_line) * _tile_width;
	};
	_getTileX = function(tile_pos) {
		return ((tile_pos) % _tiles_per_line) * _tile_width;
	};

	return{
		getTileX : function(tile_pos){
			return _getTileX(tile_pos);
		},
		getTileY : function(tile_pos){
			return _getTileY(tile_pos);
		},
		getSpriteData : function() {
			return _tile_data;
		}
	}
}