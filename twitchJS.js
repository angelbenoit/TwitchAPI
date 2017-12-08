//this link gives us the list of people who freecodecamp is following
var urlFollows = "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels?client_id=epbr8ttvcdj3ox68n97j6q4u20jqyd";

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


//===========================================================================================//
/*
These following methods will fill the userNames, userIcons, linkArray and userStatus arrays
We use the getFollowsInfo() method to get the usernames and links to the icons of the users whom freecodecamp is following
in that same mathod, we will call the getFollowsStatusURL() method, which will get the streamURL of each user in the userNames array
That method will call getFollowingsStatus() method which will give us the array that will tell us whether user is online or offline
 */

function getFollowsInfo() {

    $.ajax({
        url: urlFollows,
        dataType: 'json',
        success: function (result) {
            for (var i = 0; i < result.follows.length; i++) {
                followingsObjectArray[i] = result.follows[i];
                userNames[i] = followingsObjectArray[i].channel.display_name;
                userIcons[i] = followingsObjectArray[i].channel.logo;
            }
            getFollowsStatusURL(userNames);
        }
    });
}


//this function gets the array of urls to each followings with their status, whether offline or online
function getFollowsStatusURL(nameList) {

    var link1 = "https://api.twitch.tv/kraken/streams/";
    var link2 = "?client_id=epbr8ttvcdj3ox68n97j6q4u20jqyd";

    for (var j = 0; j < nameList.length; j++) {
        var url = link1 + nameList[j] + link2;

        $.ajax({
            url: url,
            dataType: 'json',
            success: function (data) {
                if (data.stream === null || data.stream === undefined) {
                    console.log(data.stream);
                    userStatus.push("OFFLINE");
                }
                else {
                    userStatus.push(data.stream);
                }
            }
        });
    }
}


function placeInfo(name, status, icon) {

    $("#userInfo").append(
        "<div class='row userInfoBackground'>" +
        "<span class='col-xs-4 userName'>" +
        name +
        "</span>" +
        "<span class='col-xs-4 title'>" +
        status +
        "</span>" +
        "<span class='col-xs-4'>" +
        "<img class='image' src='" + icon + "'>" +
        "</span>" +
        "</div>"
    );
}

//=================================================================================
//buttons section

$("#all").on("click", function () {
    getAll();
});

$("#online").click(function () {
    getOnline();
});

$("#offline").click(function () {
    getOffline();
});

function getAll() {
    $("#userInfo").empty();
    for (var i = 0; i < userStatus.length; i++) {
        placeInfo(userNames[i], userStatus[i], userIcons[i]);
    }
}

function getOnline() {
    $("#userInfo").empty();
    for (var i = 0; i < userStatus.length; i++) {
        if (userStatus[i] !== "OFFLINE") {
            placeInfo(userNames[i], userStatus[i], userIcons[i]);
        }
    }
}

function getOffline() {
    $("#userInfo").empty();
    for (var i = 0; i < userStatus.length; i++) {
        if (userStatus[i] === "OFFLINE") {
            placeInfo(userNames[i], "OFFLINE", userIcons[i]);
        }
    }
}

//===================================================================================================================
var freeCodeCampSTATUS;

function getFreeCodeCamp() {
    var name = "";
    var pic = "";
    var link = "https://api.twitch.tv/kraken/users/freecodecamp?client_id=epbr8ttvcdj3ox68n97j6q4u20jqyd";

    getFreeCodeCampStatus();
    $.getJSON(link, function (result) {

        name = result.display_name;
        pic = result.logo;
        $("#userInfo2").append(
            "<div class='row userInfoBackground'>" +
            "<span class='col-xs-4 userName'>" +
            name +
            "</span>" +
            "<span class='col-xs-4 title'>" +
            freeCodeCampSTATUS +
            "</span>" +
            "<span class='col-xs-4'>" +
            "<img class='image' src='" + pic + "'>" +
            "</span>" +
            "</div>"
        );
    });


}

function getFreeCodeCampStatus() {
    var urlStream = "https://api.twitch.tv/kraken/streams/freecodecamp?client_id=epbr8ttvcdj3ox68n97j6q4u20jqyd";
    $.ajax({
        url: urlStream,
        dataType: 'json',
        success: function (data) {
            if(data.stream === null){
                freeCodeCampSTATUS = "OFFLINE";
                console.log("freecodecamp status is offline");
            }
            else{
                freeCodeCampSTATUS = data.stream;
            }
        }
    });
}


getFollowsInfo();
getFreeCodeCamp();
