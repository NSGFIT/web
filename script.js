function showTime() {
	document.getElementById('currentTime').innerHTML = new Date().toUTCString();
}
showTime();
setInterval(function () {
	showTime();
}, 1000);

const HEADERS = ["Name", "Email", "Phone", "SessionType", "PreferredTime", "Timestamp", "NewColumn"];
