var d2betalert = {

	reqUrl: 'http://eyeur.com/dota2/get_json.php',

	getData: function() {
		chrome.storage.local.get('dota2matches', function(matchObj){
			if (matchObj.valid) {

			}
			else {
				this.getDataViaAjax();
			}
		});
	},

	getDataViaAjax: function() {
		var req = new XMLHttpRequest();
		req.open("GET", this.reqUrl, true);
		req.onload = this.renderMatches.bind(this);
		req.send(null);
	},

	renderMatches: function(data) {
		var matchObj;
		if (data.valid) {
			matchObj = data;
		}
		else {
			matchObj = JSON.parse(data.target.responseText);
		}

		if (matchObj.matches && matchObj.matches.length > 0) {
			for (var i = 0; i < matchObj.matches.length; i++) {
				var p = document.createElement('p');
				p.id = matchObj.matches[i].id + '';
				p.innerHTML = '<span class="t1">'+matchObj.matches[i].team1+'</span><span class="vs">vs</span><span class="t2">'+matchObj.matches[i].team2+'</span>';
				document.getElementById('match_list').appendChild(p);
			}
			var str_num = i + '';
			this.applyBindings();
		}
		else {
			var p = document.createElement('p');
			p.innerHTML = 'No active matches found.';
			document.getElementById('match_list').appendChild(p);
			var str_num ='0';
		}
		chrome.browserAction.setBadgeText({text:str_num});
	},

	applyBindings: function() {
		var links = document.getElementsByTagName("p");
		for (var i = 0; i < links.length; i++) {
			(function () {
				var ln = links[i];
				var location = 'http://dota2lounge.com/match?m=' + ln.id;
				ln.onclick = function () {
					chrome.tabs.create({active: true, url: location});
				};
			})();
		}
	}
};

document.addEventListener('DOMContentLoaded', function () {
	d2betalert.getData();
});