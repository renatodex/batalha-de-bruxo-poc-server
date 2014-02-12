var shape;
var maxhp = 100;
var hpbar_width = 64;
var hp = 100;

function drawHp() {
var pixels = hp*hpbar_width/maxhp;

shape = new createjs.Shape();
shape.graphics.beginFill('#ff0000');
shape.graphics.drawRect(0,0,pixels,10);
App.getStage().addChild(shape);
}

function removeHp() {
App.getStage().removeChild(shape);
}

function hit(damage) {
    hp -= damage;
    removeHp();
    drawHp();
}

//new App.Tween(shape).to({x:96},150).call();

//hp=100
//drawHp(100);
//hit(10)
//removeHp();



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
		_hp -= damage;
	  _update(_x, _y);
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
		getShape:function() {
			return _shape;
		},
		getWidth:function() {
		  return _hpbar_width;
		}
	}
}