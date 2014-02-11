var FacadeNpc = function() {
	_retrieve_by_id = function(npc_id) {
		var _fake_npc = {
			id : npc_id,
			name : 'Dalgun Samanad',
			sprite : 'hero',
			level : 1,  //nao usado
			max_hp : 100
		}
		
		var npc = new Npc(_fake_npc['id'], _fake_npc['name'], _fake_npc['sprite'], _fake_npc['max_hp'])
		var npc_powers = FacadePower.retrieveByNpcId(npc_id);
		npc.setPowers(npc_powers);
		
		return npc;
	}
	
	return {
		retrieveById:_retrieve_by_id
	}	
}()