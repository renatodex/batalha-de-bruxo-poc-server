var Power = function(id, name, sprite, npc_id, damage_formula){
	var _id = id,
		_name = name,
		_sprite = sprite,
		_type = "bolhufas",
		_npc_id = npc_id,
		_damage_formula = damage_formula,
		_cast_delay = 1,
		_next_cast_delay = 1,
		_total_life = 1,
		_cast_range = 5, 
		_effect_range = 1;

	return{
		getId : function(){
			return _id;
		},
		getName : function(){
			return _name;
		},
		getSprite : function(){
			return _sprite;
		},
		getType : function(){
			return _type;
		},
		getNpcId : function(){
			return _npc_id;
		},
		getCastDelay : function(){
			return _cast_delay;
		},
		getNextCast : function(){
			return _next_cast;
		},
		getTotalLife : function(){
			return _total_life;
		},
		getCastRange : function(){
			return _cast_range;
		},
		getEffectRange : function(){
			return _effect_range;
		},
		getDamageFormula : function(){
			return _damage_formula;
		}
	}
}