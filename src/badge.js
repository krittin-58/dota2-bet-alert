function saveData(data) {
	var matchObj = JSON.parse(data.target.responseText),
		countStr = matchObj.matches.length + '';
	chrome.browserAction.setBadgeText({text: countStr});

	matchObj.valid = true;
	chrome.storage.local.set({'dota2matches': matchObj});
}
function getMatchData() {
	var req = new XMLHttpRequest();
	req.open("GET", 'http://eyeur.com/dota2/get_json.php', true);
	req.onload = saveData.bind(this);
	req.send(null);
}

function addAlarm() {
	chrome.alarms.get("dota2betalert", function(alarm){
		if (typeof alarm == "undefined") {
			chrome.alarms.create("dota2betalert", {
				when: Date.now(),
				periodInMinutes: 5.0
			});
		}
	});
}
chrome.alarms.onAlarm.addListener(function(alarm) {
	if (alarm.name == "dota2betalert") {
		getMatchData();
	}
});
chrome.runtime.onStartup.addListener(function() {
	addAlarm();
});
chrome.runtime.onInstalled.addListener(function() {
	addAlarm();
});