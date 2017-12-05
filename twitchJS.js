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
    //this linkArray will get us the link to each user's page
    var linkArray = [];
    //this array will get us the title of their stream if they're online,
    //if offline, we display "offline"
    var userStatus = [];


    //===========================================================================================//
    /*
    These following methods will fill the userNames, userIcons, linkArray and userStatus arrays
    We use the getFollowsInfo() method to get the usernames and links to the icons of the users whom freecodecamp is following
    in that same mathod, we will call the getFollowsStatusURL() method, which will get the streamURL of each user in the userNames array
    That method will call getFollowingsStatus() method which will give us the array that will tell us whether user is online or offline
     */

    function getFollowsInfo() {
        $.getJSON(urlFollows, function (result) {
            //console.log(result + "test");
            //console.log(result.follows[1].user + "test");

            for (var i = 0; i < result.follows.length; i++) {
                followingsObjectArray[i] = result.follows[i].user;
                userNames[i] = followingsObjectArray[i].display_name;
                userIcons[i] = followingsObjectArray[i].logo;
                //console.log(userNames[i] + " " + userIcons[i]);
            }
            getFollowsStatusURL(userNames);
            placeInfo();
        });

    }


    //this function gets the array of urls to each followings with their status, whether offline or online
    function getFollowsStatusURL(nameList) {
        //create array of links for each user that freecodecamp is following
        //then get the json to using streams url in order to get whether they're online or offline
        //then get the title of the stream if they're online
        var link1 = "https://api.twitch.tv/kraken/streams/";
        var link2 = "?client_id=epbr8ttvcdj3ox68n97j6q4u20jqyd";


        for (var i = 0; i < nameList.length; i++) {
            linkArray[i] = link1 + nameList[i] + link2;
        }

        getFollowingsStatus(linkArray);

    }

    //this function will give us the array of info determining if the user is online or offline, and if online, get their title
    function getFollowingsStatus(statusLinkArray) {
        for (var i = 0; i < statusLinkArray.length; i++) {

            $.getJSON(statusLinkArray[i], function (result) {
                //console.log(result.stream);
                userStatus.push(result.stream);
            })

        }
    }

    //ends here
    //===================================================================================================================


    function getFreeCodeCampStatus() {
        $.getJSON(urlStream, function (result) {
            var status = result.stream;

            if (status === null) {
                //console.log("gs");
            }
            else {
                //console.log(status);
            }

        })
    }

    getFollowsInfo();
    console.log(linkArray);
    console.log(userStatus);

    function placeInfo() {

        for(var i = 0; i < userNames.length; i++){

            $("#userInfo").append(
                "<div class='row userInfoBackground'>"+
                "<span class='col-md-4 userName'>"+
                userNames[i]+
                "</span>"+
                "<span class='col-md-4 title'>"+
                userStatus[i]+
                "</span>"+
                "<span class='col-md-4'>"+
                "<img class='image' src='" + userIcons[i] + "'>"+
                "</span>"+
                "</div>"
            );
        }
    }




});

