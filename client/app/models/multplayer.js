var Multplayer = function(){
	var multplayer = [],
		_createPlayer = function(npc_child){
			multplayer.push(npc_child);

			return multplayer;
		},
		_destroyPlayer = function(npc_child){
			
			multplayer = _.reject(multplayer , function(num){
				return num == npc_child.getNpcId();
			});

			return multplayer;
		};
	return{
		createPlayer : _createPlayer ,
		destroyPlayer : _destroyPlayer 
}