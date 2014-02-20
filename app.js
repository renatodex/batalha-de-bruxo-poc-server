/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var _ = require('backbone/node_modules/underscore');
var Backbone = require('backbone');
//var ws = require('websocket.io')
//  , server = ws.listen(4000)
var BISON = require('bison')
var app = express();



//var io = require('socket.io').listen(4000);
var port = 3000//process.env.PORT || 3000;
var server = app.listen(port, function() {
	console.log("Express server listening on port %d", port)
});
var io = require('socket.io').listen(server);


// all environments
app.engine('html', require('ejs').renderFile);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'client/public'));
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'client')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// ============================================================
var Account = Backbone.Model.extend({
	defaults : {
		name : '',
		email : '',
		password : '',
		connection_accepted: '',
		
		acceptConnection : function() {
		  this.connection_accepted = true;
		}
	}
});

var Accounts = new Backbone.Collection([], {
  model: Account
});

Accounts.add({
    name: 'Renato',
    email: 'renatodex@gmail.com',
    password: '101010'
})
Accounts.add({
    name: 'Pipo',
    email: 'pipo',
    password: '202020'
})
Accounts.add({
    name: 'Zeca',
    email: 'zeca@zeca.com',
    password: '101010'
})

Accounts.add({
	name: 'Julia',
	email: 'julia',
	password: 'renato21'
})

var Npc = Backbone.Model.extend({
	defaults : {
		id : '',
		name : '',
		sprite : '' 
	}
})

var NpcChild = Backbone.Model.extend({
	defaults : {
		account_email : '',
		npc_id : 0,
		npc_tile_x : 0,
		npc_tile_y : 0,
		frame_width: 0,
		frame_height : 0,
		npc_sprite_x : 0,
		npc_sprite_y : 0,
		game_id : false,
		npc : {}
	}
})

var NpcChilds = new Backbone.Collection([], {
	model: NpcChild
});
// ============================================================

/* Collection de Armazenamento dos npcs da sala  */
var NpcGameSession = Backbone.Collection.extend ({
  model: NpcChild,
  limit: 2,
  state: 'connection',
  
  addNpc: function(npc){
    if(this.isRoomReady()){
      this.add(npc);
      return true;
    }else{
      return false;
    }
  },
  isRoomReady: function() {
    if(this.length < this.limit){
      return true;
    }else{
      return false;
    }    
  },
  verifyConnection: function() {
    var result = true;
    var self = this;
    console.log(this.models);
    console.log('----------------')
    _.each(this.models, function(v, k) {
        if(v.get('connection_accepted') == false || self.isRoomReady()) {
          result = false
        }
    });
    
    return result;
  }
});

var room = new NpcGameSession([]);

//=============================================================
app.get('/', routes.index);

var multplayer = [];

io.sockets.on('connection', function (socket) {

	socket.on('retrieve-players', function(email){
		var request_player = NpcChilds.findWhere({account_email: email})
		var filtered_childs = NpcChilds.filter(function(x) {
		    return x.get('account_email') != email;
		})
		var other_players = [];
		_.each(filtered_childs, function(v,k) {
		    other_players.push(v.toJSON());
		});
	
		console.log('RETRIEVE PLAYERS......for', email)
		socket.emit('update-players', other_players);
		socket.broadcast.emit('player-connected', request_player.toJSON())
	});
	
	socket.on('disconnect-player', function(email) {
		if(email) {
			console.log('Tried to Disconnect!', email);
			var account_npc = NpcChilds.findWhere({account_email:email});
			console.log('ACCOUNT FOUND', account_npc);
			NpcChilds.remove(account_npc);
			console.log('TOTAL PLAYERS', NpcChilds.length);
			socket.broadcast.emit('player-disconnected', email)
		}
	})
	
  socket.on('cast-hadouken', function(email) {
	socket.broadcast.emit('cast-hadouken', email);
  })
	
  socket.on('update-position', function(email, x, y) {
	console.log('UPDATE POSITION...', email, x, y);
	socket.broadcast.emit('update-position', email, x, y);
  })

  socket.on('npc-child-create', function (data) {
  	NpcChilds.add(data);
		console.log('ADDING NEW PLAYER', NpcChilds.toJSON());
		//socket.broadcast.emit('npc-child-create', data);
		// quando o npc for criado, precisa haver um broadcast para avisar a todos os clients que entrou um novo npc
		// nesse caso, ao invés de passarmos apenas o npc criado, passamos NpcChilds.toJSON() excluíndo o ixi..vai ferrar
		console.log('TOTAL PLAYERS', NpcChilds.length);
  });



  socket.on('login', function(email, password) {
	  var resultAcc = Accounts.findWhere({
  		email : email,
  		password : password
  	})
	
  	if(room.addNpc(resultAcc)){
  	  if (resultAcc == undefined) {
  		  socket.emit('error', 'Login ou senha incorretos!');
  	  } else {
  	    var result = NpcChilds.findWhere({account_email : email}) || false;
  		  socket.emit('logon', result)
  	  }
  	}else{
  	  socket.emit('error', 'A Sala ja esta lotada! SE FUDE!! HA-HA!');
  	}
  })
  
  socket.on('accept-connection', function(email) {
	  var resultAcc = Accounts.findWhere({
  		email : email
  	})
  	
  	if(resultAcc != undefined) {
  	  resultAcc.set('connection_accepted', true);
  	  if(room.verifyConnection()) {
  	    room.state = 'waiting'
    	}
    	socket.emit('update-game-state', room.state)
  	}
  })

  socket.on('accept-waiting', function() {
    
  })
  
  socket.on('accept-battle', function() {
    
  })
});



//server.listen(3000);

/*http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});*/
