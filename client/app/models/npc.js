var Npc = function(id, name, sprite){
	var _id = id,
		_name = name,
		_sprite = sprite,
		_powers = [];

	return {

		getId : function(){
			return _id;
		},
		
		getName : function(){
			return _name;
		},

		getSprite : function(){
			return _sprite;
		},

		setPowers : function(powers){
			_powers = powers;
			return _powers;
		},

		getPowers : function() {
			return _powers;
		}
	}
}