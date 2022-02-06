var homeMain = document.getElementById("Home");
var gameMain = document.getElementById("Game");
var leaderboardMain = document.getElementById("Leaderboard");
var matchHistoryMain = document.getElementById("Match History");
var gameOptionsMain = document.getElementById("Game Options");
var chatMain = document.getElementById("Chat");
var friendsMain = document.getElementById("Friends");

homeClick();

function disable_all_main() {
	homeMain.style.display = "none";
	gameMain.style.display = "none";
	leaderboardMain.style.display = "none";
	matchHistoryMain.style.display = "none";
	gameOptionsMain.style.display = "none";
	chatMain.style.display = "none";
	friendsMain.style.display = "none";
}

function homeClick(evt) {
	disable_all_main();
	homeMain.style.removeProperty("display");
}

function gameClick(evt) {
	disable_all_main();
	gameMain.style.removeProperty("display");
}

function leaderboardClick(evt) {
	disable_all_main();
	leaderboardMain.style.removeProperty("display");
}

function matchHistoryClick(evt) {
	disable_all_main();
	matchHistoryMain.style.removeProperty("display");
}

function gameOptionsClick(evt) {
	disable_all_main();
	gameOptionsMain.style.removeProperty("display");
}

function chatClick(evt) {
	disable_all_main();
	chatMain.style.removeProperty("display");
}

function friendsClick(evt) {
	disable_all_main();
	friendsMain.style.removeProperty("display");
}

