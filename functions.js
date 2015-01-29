//Functions.js: misc functions for various templates to use


// Return an array with ranges
Paginate = function(total, results){
	var range = [];
    var pages = Math.ceil(total/results);

    for(var i = 0; i<pages; i++){
      range[i] = {range_lower: ((results*i)+1), range_upper : (results *(i+1))}
    }

    return range;
};

Verbs = function(){
	var words = [
	"trounced",
	"smote",
	"clowned upon",
	"hornswoggled",
	"bladesed upon",
	"squirted",
	"embarassed",
	"destroyed",
	"beat",
	"beat down",
	"drubbed",
	"smashed",
	"licked",
	"lambasted",
	"thrashed",
	"shellacked",
	"smeared",
	"whipped",
	"blasted",
	"battered",
	"mangled",
	"socked",
	"slammed",
	"tallywhacked",
	"bashed",
	"KOd",
	"whomped",
	"wiped out",
	"put away",
	"took down",
	"wallopped",
	"hosed",
	"clobbered",
	"dominated",
	"delivered a beating upon",
	"smote",
	"destroyed",
	"crushed",
	"crunked",
	"corked",
	"spanked",
	"folded",
	"dunked",
	"groin-kicked",
	"pantsed",
	"throttled",
	"took the piss out of",
	"killed",
	"disemboweled",
	"defenestrated",
	"defecated upon",
	"pooped on",
	"popped",
	"schmeared",
	"booted",
	"bashed",
	"berserked",
	"squashed",
	"took down",
	"squished",
	"beat",
	"pummeled",
	"hurt the feelings of ",
	"devastated",
	"depressed",
	"hurt",
	"emotionally crippled",
	"punched the mug of",
	"cold cocked",
	"sucker punched",
	"clobbered",
	"ko’d",
	"jabbed",
	"hospitalized",
	"put out to pasture",
	"pasteurized",
	"shook",
	"neutralized",
	"spayed and/or neutered",
	"shellacked",
	"terminated",
	"tore to shreds",
	"ripped a new one",
	"shredded",
	"corralled ",
	"cro-barred",
	"housed",
	"roundhouse kicked",
	"hosed",
	"cracked",
	"smacked",
	"smoked",
	"beheaded",
	"vanquished",
	"annihilated",
	"crushed",
	"eliminated",
	"got biblical on",
	"tyrranized ",
	"brought great vengeance upon",
	"poisoned ",
	"reigned supreme against",
	"subdued",
	"put to sleep",
	"red wedding’d",
	"crapped all over",
	"thwacked",
	"thumped",
	"drubbed",
	"pucked",
	"punked",
	"bullied",
	"checked",
	"rocked",
	"cross-checked",
	"deked",
	"dropped",
	"dusted",
	"froze",
	"gooned",
	"grinded",
	"hacked",
	"stuck",
	"spiked",
	"iced",
	"lit up",
	"bum-rushed",
	"peppered",
	"assaulted",
	"powered past",
	"crunked",
	"stopped",
	"roughed up",
	"shafted",
	"shutdown",
	"slashed",
	"speared",
	"slapped",
	"sniped",
	"bulldozed",
	"tagged",
	"vaulted past",
	"zamboni’d",
	"cleaned the clock of",
	"face-punched",
	"stuck it to",];
	return words[Math.floor(Math.random()*words.length)];
};

//Find streaks
updatePlayerStreak = function(player_id){
	var player_data = Players.find({_id:player_id}).fetch();
	var games = Games.find({$or: [{p1_id:player_id}, {p2_id:player_id}]}, {sort: {game_no:-1}, limit: 1}).fetch();
	var current_streak = player_data[0].current_streak;

	if(games[0].game_winner == player_id){
		console.log('won last game!');
		if(current_streak>0){
			console.log("adding one to the winning streak");
			current_streak++;
		} else {
			console.log("snapped a losing streak");
			current_streak = 1;
		}
	} else {
		console.log('lost last game!');
		if(current_streak>0){
			console.log("broke the winning streak!");
			current_streak = 0;
		} else {
			console.log("adding one to the losing streak");
			current_streak--;
		}
	}

	if(current_streak > player_data[0].win_streak_record){
		Players.update({_id:player_id}, {$set: {win_streak_record: current_streak}});
		console.log("New record winning streak!");
	}

	if(current_streak < player_data[0].loss_streak_record){
		Players.update({_id:player_id}, {$set: {loss_streak_record: current_streak}});
		console.log("New record losing streak!");
	}

	Players.update({_id:player_id}, {$set: {current_streak: current_streak}});
};
