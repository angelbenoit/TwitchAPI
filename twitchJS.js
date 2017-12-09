//this link gives us the list of people who freecodecamp is following
var urlFollows = "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels?client_id=epbr8ttvcdj3ox68n97j6q4u20jqyd";

//this array will hold the json objects of the users freecodecamp is following
//it will hold information like display name and logo link
var followingsObjectArray = [];
//this array will get the display names from the followingsObjectArray
var userNames = [];
//this array will get the icon links from the followingsObjectArray
var userIcons = [];
//this array will get us the title of their stream if they're online,
//if offline, we display "offline"
var userStatus = [];
//links to user's twitch
var userLink = [];


//===========================================================================================//
/*
    This method will get the objects from the json link to the users whom "freecodecamp" is following
    We will fill the arrays using the objects we will get
    After that, we will use the userNames array to get their status from using getFollowsStatusURL method
 */

$(document).ready(function () {

function getFollowsInfo() {

    $.ajax({
        url: urlFollows,
        dataType: 'json',
        success: function (result) {
            for (var i = 0; i < result.follows.length; i++) {
                followingsObjectArray[i] = result.follows[i];
                userNames[i] = followingsObjectArray[i].channel.display_name;
                userIcons[i] = followingsObjectArray[i].channel.logo;
                userLink[i] = followingsObjectArray[i].channel.url;
            }
            getFollowsStatusURL(userNames);
        }
    });
}

/*
    In this method, we enter the name array and we will be able to get their status, online or offline
    if the result gives us "null", then the user is offline, otherwise we will get the title of the stream
    we will fill the userStatus array in this method
 */
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
                    userStatus.push(data.stream.channel.status);
                }
            }
        });

    }

}

/*
    In this method, we display our data onto our html by using jQuery
 */
function placeInfo(name, status, icon, link) {

    $("#userInfo").append(
        "<div class='row userInfoBackground'>" +
        "<span class='col-xs-4 userName'>" +
        "<a href='" + link + "' target='_blank' class='hrefText'>" +
        name +
        "</a>" +
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
    $("#userInfo").empty();
    getAll();
});

$("#online").click(function () {
    getOnline();
});

$("#offline").click(function () {
    getOffline();
});

function getAll() {
    for (var i = 0; i < userStatus.length; i++) {
        placeInfo(userNames[i], userStatus[i], userIcons[i], userLink[i]);
    }
}

function getOnline() {
    $("#userInfo").empty();
    for (var i = 0; i < userStatus.length; i++) {
        if (userStatus[i] !== "OFFLINE") {
            placeInfo(userNames[i], userStatus[i], userIcons[i], userLink[i]);
        }
    }
}

function getOffline() {
    $("#userInfo").empty();
    for (var i = 0; i < userStatus.length; i++) {
        if (userStatus[i] === "OFFLINE") {
            placeInfo(userNames[i], "OFFLINE", userIcons[i], userLink[i]);
        }
    }
}

//===================================================================================================================
/*
    In the getFreeCodeCamp method, we will get the link to freecodecamp's logo
    Additionally, we will get the display name
    We call getFreeCodeCampStatus method and we will display their status
 */
var freeCodeCampSTATUS;

function getFreeCodeCamp() {
    var name = "";
    var pic = "";
    var link = "https://api.twitch.tv/kraken/users/freecodecamp?client_id=epbr8ttvcdj3ox68n97j6q4u20jqyd";
    getFreeCodeCampStatus();
    $.ajax({
        url: link,
        dataType: 'json',
        success: function (result) {
            name = result.display_name;
            pic = result.logo;
            $("#freeCodeCampSection").append(
                "<div class='row'>" +
                "<span class='col-xs-6' id='freecodecamp'>" +
                freeCodeCampSTATUS +
                "</span>" +
                "<span class='col-xs-6'>" +
                "<img class='image' src='" + pic + "'>" +
                "</span>" +
                "</div>"
            );
        }
    });
}

function getFreeCodeCampStatus() {
    var urlStream = "https://api.twitch.tv/kraken/streams/freecodecamp?client_id=epbr8ttvcdj3ox68n97j6q4u20jqyd";
    $.ajax({
        url: urlStream,
        dataType: 'json',
        success: function (data) {
            if(data.stream === null){
                freeCodeCampSTATUS = "Freecodecamp is currently offline";
                console.log("freecodecamp status is offline");
            }
            else{
                freeCodeCampSTATUS = "Freecodecamp is currently online";
            }
        }
    });
}

//method calls
getFollowsInfo();
getFreeCodeCamp();


});