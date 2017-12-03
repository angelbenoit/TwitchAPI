/*
    use: https://wind-bow.gomix.me/twitch-api/streams/:stream
    to figure out if the user is online
    if "stream" === null, then it means the user is offline
    otherwise, "stream" will contain information about the livestream like what games
    they're playing or how many viewers there are
    channel.status will give us the title of the stream
    channel.game will give current game being played
    https://wind-bow.glitch.me/twitch-api/channels/freecodecamp/follows will give us a list of people who user "freecodecamp" is following

    use: https://wind-bow.gomix.me/twitch-api/users/:user
    to get image of icon for users who are offline, the image wont be show up in /streams/:stream link
    if user is offline.
    "logo" will give us the icon whether user is online of offline
 */

$(document).ready(function () {

    var urlStream = "https://wind-bow.gomix.me/twitch-api/streams/";
    var urlLogo = "https://wind-bow.gomix.me/twitch-api/users/";

    



});

