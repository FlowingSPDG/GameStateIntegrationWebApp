var dust2offset = [2550,1350];
var dust2size = [4620,4650];

var mirageoffset = [3180,3400];
var miragesize = [5010,5110];

var cacheoffset = [2050,2360];
var cachesize = [5650,5550];

var infernooffset = [2100,1150];
var infernosize = [5000,5000];

var overpassoffset = [4940,3520];
var overpasssize = [5500,5290];

var cbbleoffset = [3820,3080];
var cbblesize = [6100,6150];

var trainoffset = [2470,2430];
var trainsize = [4780,4850];

var nukeoffset = [3330,4250];
var nukesize = [7000,7100];

$( document ).ready(function() {
	
	var socket = io();
	socket.on('update', function(data){
		//console.log(data);
		var updateoffset = performance.now() - lastupdate;
		lastupdate = performance.now();
		var p1 = performance.now();
		var maparray = data.map.name.split("/");
		var map = maparray.slice(-1)[0];
		
		// Return if no player data is send
		/*
		if(data.allplayers == null)
			return;
		*/
		
		// Clear map
		$('#map').empty();
		
		//Add map image
		$('#map').append('<img class="img-responsive" src="/public/maps/' + map + '.jpg">')
		
		// Clear player stats
		$('#players_ct').empty();
		$('#players_t').empty();
		
		// Clear game info
		$('#gameinfo').empty();
		var phase_min = Math.floor(data.phase_countdowns.phase_ends_in / 60 )
		var phase_sec = get_phase_sec(data.phase_countdowns.phase_ends_in);
		function get_phase_sec(sec){
			switch(true)
			{
				default:
					return sec;
					break;
				case sec >= 120:
					return parseInt(sec - 120);
					break;
				case sec >= 60:
					return parseInt(sec - 60);
					break;
			}
		}
			
			
		$('#gameinfo').append('<span class="info">' + map + ' - ' + data.map.mode + '</span><br><span class="info">Round ' + (data.map.round + 1) + '/30</span><br><span id="score">' + data.map.team_ct.score + ' : ' + data.map.team_t.score + '</span><br><span id="time">' + phase_min + " : " + phase_sec + '</span><br><span class="info">' + data.phase_countdowns.phase + '</span><br>');
		
		
		// Iterate through each player
		jQuery.each(data.allplayers, function(key, player){
			
			// Add player to scoreboard
			addPlayerInfo(player);
			
			// Add player to map
			addPlayerPosition(player, map);
			
		});
		
		jQuery.each(data.grenades, function(key, grenade){
			// Add grenades to map(WIP)
			console.log("AddGrenadePosition triggered");
			console.log(grenade);
			addGrenadePosition(grenade, map);
		});
		
		//addBombPosition(data.bomb, data.mapname);
		var p2 = performance.now();
		console.log('Time since last update: ' + updateoffset + ' ms.');
		console.log('Update took: ' + (p2 - p1) + ' ms.');
	});
});

var lastupdate = 0;

function addBombPosition(bomb, mapname){
	// Add new position and name to map if alive
	//if(player.state.health > 0){
		// Get correct offsets
		console.log(bomb);
		var offset;
		var size;
		switch(mapname){
			case "de_mirage":
				offset = mirageoffset;
				size = miragesize;
				break;
			case "de_cache":
				offset = cacheoffset;
				size = cachesize;
				break;
			case "de_inferno":
				offset = infernooffset;
				size = infernosize;
				break;
			case "de_overpass":
				offset = overpassoffset;
				size = overpasssize;
				break;
			case "de_cbble":
				offset = cbbleoffset;
				size = cbblesize;
				break;
			case "de_train":
				offset = trainoffset;
				size = trainsize;
				break;
			case "de_nuke":
				offset = nukeoffset;
				size = nukesize;
				break;
			default:
				offset = dust2offset;
				size = dust2size;
					  }
		
		// Get position and calculate percentage
		var positions = bomb.position.split(',');
		var x = parseFloat(positions[0]);
		var y = parseFloat(positions[1]);
		var z = parseFloat(positions[2]);
		x = x + offset[0];
		y = y + offset[1];
		var xp = (x/size[0])*100;
		var yp = (1 - (y/size[1]))*100;
	
		$('#map').append('<img class="bombpos" style="left:' + xp + '%;top:' + yp + '%" src="/public/csgo_icons/weapon_c4.svg">');
		//$('#map').append('<span class="grenadeposname" style="left:' + xp + '%;top:calc(' + yp + '% + 15px)">' + grenade_type + '</span>');
	//}
}

function addGrenadePosition(grenade, mapname){
	// Add new position and name to map if alive
	//if(player.state.health > 0){
		// Get correct offsets
		console.log(grenade);
		var offset;
		var size;
		switch(mapname){
			case "de_mirage":
				offset = mirageoffset;
				size = miragesize;
				break;
			case "de_cache":
				offset = cacheoffset;
				size = cachesize;
				break;
			case "de_inferno":
				offset = infernooffset;
				size = infernosize;
				break;
			case "de_overpass":
				offset = overpassoffset;
				size = overpasssize;
				break;
			case "de_cbble":
				offset = cbbleoffset;
				size = cbblesize;
				break;
			case "de_train":
				offset = trainoffset;
				size = trainsize;
				break;
			case "de_nuke":
				offset = nukeoffset;
				size = nukesize;
				break;
			default:
				offset = dust2offset;
				size = dust2size;
		}
		
		// Get position and calculate percentage
		if(grenade.type != "inferno"){
			var positions = grenade.position.split(',');
			var x = parseFloat(positions[0]);
			var y = parseFloat(positions[1]);
			var z = parseFloat(positions[2]);
			x = x + offset[0];
			y = y + offset[1];
			var xp = (x/size[0])*100;
			var yp = (1 - (y/size[1]))*100;
		}
		else {
			var positions = ["0","0","0"];
			var x = parseFloat(positions[0]);
			var y = parseFloat(positions[1]);
			var z = parseFloat(positions[2]);
			x = x + offset[0];
			y = y + offset[1];
			var xp = (x/size[0])*100;
			var yp = (1 - (y/size[1]))*100;
		}

		switch(grenade.type){
			default:
				console.log("Unknown grenade data");
				var grenade_img = "";
				var grenade_type = "";
				break;
			
			case "smoke":
				//console.log("SMOKE");
				var grenade_img = "weapon_smokegrenade.svg";
				var grenade_type = "smoke";
				break;
			case "flashbang":
				//console.log("FB");
				var grenade_img = "weapon_flashbang.svg";
				var grenade_type = "flash";
				break;
			case "inferno":
				//console.log("incendiary || molotov");
				var grenade_img = "weapon_incgrenade.svg";
				var grenade_type = "inferno";
		}

		$('#map').append('<img class="grenadepos" style="left:' + xp + '%;top:' + yp + '%" src="/public/csgo_icons/' + grenade_img + '">');
		//$('#map').append('<span class="grenadeposname" style="left:' + xp + '%;top:calc(' + yp + '% + 15px)">' + grenade_type + '</span>');
	//}
}

function addPlayerPosition(player, mapname){
	// Add new position and name to map if alive
	if(player.state.health > 0){
		// Get correct offsets
		var offset;
		var size;
		switch(mapname){
			case "de_mirage":
				offset = mirageoffset;
				size = miragesize;
				break;
			case "de_cache":
				offset = cacheoffset;
				size = cachesize;
				break;
			case "de_inferno":
				offset = infernooffset;
				size = infernosize;
				break;
			case "de_overpass":
				offset = overpassoffset;
				size = overpasssize;
				break;
			case "de_cbble":
				offset = cbbleoffset;
				size = cbblesize;
				break;
			case "de_train":
				offset = trainoffset;
				size = trainsize;
				break;
			case "de_nuke":
				offset = nukeoffset;
				size = nukesize;
				break;
			default:
				offset = dust2offset;
				size = dust2size;
					  }
		
		// Get position and calculate percentage
		var positions = player.position.split(',');
		var x = parseFloat(positions[0]);
		var y = parseFloat(positions[1]);
		var z = parseFloat(positions[2]); // WIP for de_nuke layerd radar
		x = x + offset[0];
		y = y + offset[1];
		var xp = (x/size[0])*100;
		var yp = (1 - (y/size[1]))*100;

		$('#map').append('<img class="playerpos" style="left:' + xp + '%;top:' + yp + '%" src="/public/' + player.team + '.png">');
		$('#map').append('<span class="playerposname" style="left:' + xp + '%;top:calc(' + yp + '% + 15px)">' + player.name + '</span>');
	}
}

function addPlayerInfo(player){
	var pistol = '';
	var knife = '';
	var grenade = '';
	var rifle = '';
	var c4 = '';
	var taser = '';
	var defuser = '';
	var armor = '';
	var killcount = '';
	
	jQuery.each(player.weapons, function(key, weapon){
		switch(weapon.type){
		case "Pistol":
			pistol = '/public/csgo_icons/' + weapon.name + '.svg';
			break;
		case "Knife":
			knife = '/public/csgo_icons/' + weapon.name + '.svg';
			break;
		case "Grenade":
			if(player.team == 'T'){
				grenade += '<img class="middle-left_t" src="/public/csgo_icons/' + weapon.name + '.svg">';
				if(weapon.ammo_reserve > 1)
					grenade += '<img class="middle-left_t" src="/public/csgo_icons/' + weapon.name + '.svg">';
			}
			else{
				grenade += '<img class="middle-right_ct" src="/public/csgo_icons/' + weapon.name + '.svg">';
				if(weapon.ammo_reserve > 1)
					grenade += '<img class="middle-right_ct" src="/public/csgo_icons/' + weapon.name + '.svg">';
			}
			break;
		case "C4":
			c4 = '<img class="middle-right_t" src="/public/csgo_icons/weapon_c4.svg">';
			break;
		case undefined:
			taser = '<img class="middle-right_ct" src="/public/csgo_icons/weapon_taser.svg">';
			break;
		default:
			rifle = '/public/csgo_icons/' + weapon.name + '.svg';
						  }
	});
	
	if(player.state.defusekit)
		defuser = '/public/csgo_icons/item_defuser.svg';
	
//	if(player.state.round_kills > 0 && player.team == 'T')
//		killcount = '<span class="killcount_t">x' + player.state.round_kills + '</span><img class="killimage_t" src="/public/csgo_icons/skull.png">';
//	else if(player.state.round_kills > 0)
//		killcount = '<span class="killcount_ct">' + player.state.round_kills + 'x</span><img class="killimage_ct" src="/public/csgo_icons/skull.png">';
// THIS IS THE COMMENTS
// view player.match_stats.kills insted of player.state.round_kills
	if(player.match_stats.kills > 0 && player.team == 'T')
		killcount = '<span class="killcount_t">' + 'K : ' + player.match_stats.kills + ' // ' + 'D : ' + player.match_stats.deaths + ' // ' + 'A : ' + player.match_stats.assists + '</span>';
	else if(player.match_stats.kills > 0)
		killcount = '<span class="killcount_ct">' + 'K : ' + player.match_stats.kills + ' // ' + 'D : ' + player.match_stats.deaths + ' // ' + 'A : ' + player.match_stats.assists + '</span>';
/*
	//THIS IS DEATH COUNTS
	if(player.match_stats.deaths > 0 && player.team == 'T')
		deathcount = '<span class="deathcount_t">' + 'D : ' + player.match_stats.deaths + '</span>';
	else if(player.match_stats.deaths > 0)
		deathcount = '<span class="deathcount_ct">' + 'D : ' + player.match_stats.deaths + '</span>';
	
//THIS IS ASSISTS COUNTS

	if(player.match_stats.assists > 0 && player.team == 'T')
		assistcount = '<span class="assistcount_t">' + 'A : ' + player.match_stats.assists + '</span>';
	else if(player.match_stats.assists > 0)
		assistcount = '<span class="a_ct">' + 'A : ' + player.match_stats.assists + '</span>';
//
//	
*/
	
	if(!rifle){
		rifle = pistol;
		pistol = '';
	} else if (player.team == 'T'){
		pistol = '<img class="middle-left_t" src="' + pistol + '">';
	} else {
		pistol = '<img class="middle-right_ct" src="' + pistol + '">';
	}
	
	if(player.state.armor > 0 && player.state.helmet){
		if(player.team == 'T')
			armor = '<img class="middle-right_t" src="/public/csgo_icons/item_assaultsuit.svg">';
		else
			armor = '<img class="middle-left_ct" src="/public/csgo_icons/item_assaultsuit.svg">';
	}
	else if(player.state.armor > 0){
		if(player.team == 'T')
			armor = '<img class="middle-right_t" src="/public/csgo_icons/item_kevlar.svg">';
		else
			armor = '<img class="middle-left_ct" src="/public/csgo_icons/item_kevlar.svg">';
	}
	
	if(player.team == 'T'){
		$('#players_t').append('<div class="playercontainer"><div class="player_t_right"><div class="health_t"><div style="width:'+player.state.health+'%;" class="healthpercentage_t"></div>' + killcount + '<span class="playername_t">'+player.name+'</span><span class="healthtxt_t">'+player.state.health+'</span></div><div class="inventory"><span class="helper"></span>' + armor + c4 + pistol + grenade + '</div></div><div class="player_t_left"><img class="weapon3_t" src="' + rifle + '"><span class="money_t">' + player.state.money + ' $</span></div></div>');
	} else {
		$('#players_ct').append('<div class="playercontainer"><div class="player_ct_left"><div class="health_ct"><div style="width:'+player.state.health+'%;" class="healthpercentage_ct"></div><span class="healthtxt_ct">'+player.state.health+'</span><span class="playername_ct">'+player.name+'</span>' + killcount + '</div><div class="inventory"><span class="helper"></span>' + armor + '<img class="middle-left_ct" src="' + defuser + '">' + pistol + taser + grenade + '</div></div><div class="player_ct_right"><img class="weapon3_ct" src="'+ rifle +'"><span class="money_ct">' + player.state.money + ' $</span></div></div>');
	}
}