var HpBar = function(hp, maxhp) {
	var _shape;
	var _hp = 0;
	var _maxhp = 0;
	var _hpbar_width = 64;
	var _x = 0;
	var _y = 0;
	
	var _init = function(hp, maxhp) {		
		_hp = hp;
		_maxhp = maxhp;
	}
	
	var _remove = function() {
		App.getStage().removeChild(_shape);
	}
	
	var _draw = function(x, y) {
		var pixels = _hp*_hpbar_width/_maxhp;		
		_shape = new createjs.Shape();
		_shape.graphics.beginFill('#ff0000');
		_shape.graphics.drawRect(x,y,pixels,10);		
		App.getStage().addChild(_shape);
	}
	
	var _hit = function(damage) {
		if(_hp-damage > 0){
		  _hp -= damage;
		  _update(_x, _y);
		  return true;
	  } else {
	    return false;
	  }
	}
	
	var _update = function(x, y) {
	    _x = x;
	    _y = y;
	  	_remove();
  		_draw(_x, _y);
	}
	
	_init(hp, maxhp);
	
	return {
		hit:_hit,
		update:_update,
		remove:_remove,
		getShape:function() {
			return _shape;
		},
		getWidth:function() {
		  return _hpbar_width;
		}
	}
}