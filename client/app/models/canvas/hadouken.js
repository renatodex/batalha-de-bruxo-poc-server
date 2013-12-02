var CanvasHadouken = function(x, y) {
	
	var _spritesheet;
	var _sprite;
	var _tween;
	
	var _init = function(x, y) {
		_spritesheet = new App.SpriteSheet({
		     images: ['../app/assets/images/hadouken.png'],
             frames: {"regX": 0, "height": 32, "count": 2, "regY": 0, "width": 32},
			 animations: {
				move : {
					frames: [0,1]
			  	}
			 }
		 });
		
		_sprite = new App.Sprite(_spritesheet);
		_tween = new App.Tween(_sprite);
		
		return _sprite;
	}
	
	_init();
	
	return {
		init:_init,
		getSprite:function() {
			return _sprite;
		}
	}
}