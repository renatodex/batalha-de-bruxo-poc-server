var Npc = function(id, name, sprite, max_hp){
	var _id = id,
		_name = name,
		_sprite = sprite,
		_max_hp = max_hp,
		_powers = [];

	return {

		getId : function(){
			return _id;
		},
		
		getName : function(){
			return _name;
		},

		getMaxHp : function() {
			return _max_hp;
		},
		
		setMaxHp  : function(value) {
			_max_hp = value;
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
		},

		toServer: function() {
			return {
				id : _id,
				name : _name,
				sprite : _sprite,
				max_hp : _max_hp
			}

		}

	}
}