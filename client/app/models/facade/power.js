var FacadePower = function() {
	_retrieve_by_npc_id = function(npc_id) {
		var _fake_powers = [
			{
				id: 1,
				name: 'Bola de Gelo',
				sprite: 'http://localhost:3000/fireball.png',
				npc_id: 10,
				damage_formula: '{atk}+1'
			},{
				id: 2,
				name: 'Bola de Gelo Torada',
				sprite: 'http://localhost:3000/boladegelo.png',
				npc_id: 10,
				damage_formula: '{atk}+2'
			}			
		]
		
		var power;
		var powers = [];
		_.each(_fake_powers, function(value, key) {
			power = new Power(_fake_powers[key]['id'], _fake_powers[key]['name'], _fake_powers[key]['sprite'], _fake_powers[key]['npc_id'], _fake_powers[key]['damage_formula'])
			powers.push(power);
		})
		
		return powers;
	}
	
	return {
		retrieveByNpcId:_retrieve_by_npc_id
	}
}()