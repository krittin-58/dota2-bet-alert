var changeBadge = function(data) {
	var matchObj = JSON.parse(data.target.responseText);
	var str_num = matchObj.matches.length + '';
	chrome.browserAction.setBadgeText({text:str_num});
}

chrome.tabs.onActivated.addListener( function (tabId, changeInfo, tab) {
	var req = new XMLHttpRequest();
	req.open("GET", 'http://www.ripexz.com/dota2betalert/get_json.php', true);
	req.onload = changeBadge.bind(this);
	req.send(null);
});