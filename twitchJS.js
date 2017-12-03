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

    //this stream link will tell us if freecodecamp is online
    var urlStream = "https://api.twitch.tv/kraken/streams/freecodecamp?client_id=epbr8ttvcdj3ox68n97j6q4u20jqyd";
    //this link will give us the icon for freecodecamp
    var urlLogo = "https://api.twitch.tv/kraken/users/freecodecamp?client_id=epbr8ttvcdj3ox68n97j6q4u20jqyd";
    //this link gives us the list of people who freecodecamp is following
    var urlFollows = "https://api.twitch.tv/kraken/channels/freecodecamp/follows?client_id=epbr8ttvcdj3ox68n97j6q4u20jqyd";

    //this array will hold the json object of the users freecodecamp is following
    //it will hold information like display name and logo link
    var followingsObjectArray = [];

    //this array will get the display names from the followingsObjectArray
    var userNames = [];
    //this array will get the icon links from the followingsObjectArray
    var userIcons = [];
    //this array will get us the title of their stream if they're online,
    //if offline, we display "offline"
    var userStatus = [];

    var linkArray = [];





    function getFollowsInfo() {
        $.getJSON(urlFollows, function (result) {
            //console.log(result + "test");
            //console.log(result.follows[1].user + "test");

            for(var i = 0; i < result.follows.length; i++){
                followingsObjectArray[i] = result.follows[i].user;
                userNames[i] = followingsObjectArray[i].display_name;
                userIcons[i] = followingsObjectArray[i].logo;
                //console.log(userNames[i] + " " + userIcons[i]);
            }
        });
    }

    function getFollowsStatus() {
        //create array of links for each user that freecodecamp is following
        //then get the json to using streams url in order to get whether they're online or offline
        //then get the title of the stream if they're online
        var link1 = "https://api.twitch.tv/kraken/streams/";
        var link2 = "?client_id=epbr8ttvcdj3ox68n97j6q4u20jqyd";


        for(var i = 0; i < userNames.length; i++){
            linkArray[i] = link1 + userNames[i] + link2;
        }

    }






    function getFreeCodeCampStatus() {
        $.getJSON(urlStream, function (result) {
            var status = result.stream;

            if(status === null){
                //console.log("gs");
            }
            else{
                //console.log(status);
            }

        })
    }

    getFollowsInfo();
    getFollowsStatus();
    console.log(linkArray);

});

