/*
    use: https://api.twitch.tv/kraken/users/freecodecamp?client_id=epbr8ttvcdj3ox68n97j6q4u20jqyd
    to figure out if the user is online
    if "stream" === null, then it means the user is offline
    otherwise, "stream" will contain information about the livestream like what games
    they're playing or how many viewers there are
    channel.status will give us the title of the stream
    channel.game will give current game being played
    https://api.twitch.tv/kraken/channels/freecodecamp/follows?client_id=epbr8ttvcdj3ox68n97j6q4u20jqyd will give us a list of people who user "freecodecamp" is following

    use: https://api.twitch.tv/kraken/users/freecodecamp?client_id=epbr8ttvcdj3ox68n97j6q4u20jqyd
    to get image of icon for users who are offline, the image wont be show up in /streams/:stream link
    if user is offline.
    "logo" will give us the icon whether user is online of offline
    
    
    UPDATE:
    twtich api client key is epbr8ttvcdj3ox68n97j6q4u20jqyd
    this client key can be used with updated twitch api
 */

$(document).ready(function () {

    var urlStream = "https://api.twitch.tv/kraken/users/freecodecamp?client_id=epbr8ttvcdj3ox68n97j6q4u20jqyd";
    var urlLogo = "https://api.twitch.tv/kraken/users/freecodecamp?client_id=epbr8ttvcdj3ox68n97j6q4u20jqyd";
    var urlFollows = "https://api.twitch.tv/kraken/channels/freecodecamp/follows?client_id=epbr8ttvcdj3ox68n97j6q4u20jqyd";




});

