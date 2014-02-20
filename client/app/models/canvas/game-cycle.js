var CanvasGameCycle = function() {
  	
	var _init = function() {
	  setInterval(_ticker, 1000)
	}
	
	var _ticker = function() {
    socket.emit('accept-connection', npc_child.getAccountEmail());
	}
	
	_init();
	
	return {
	}
}