function initIFrame() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  },

  function (tabs) {
      var expiry = new Date(parseInt(localStorage.expiryTime));
      var now = new Date();
      if (localStorage.accessToken && now < expiry) {
        alert("The localstorage access token and now is < expiry");
      } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', "https://facebook.com/groups/?category=membership", true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
                initHTML(xmlhttp);
            }
        }
      }
  });
}

function parseHTML(html){
    // captures the group ID from facebook
    var reid = new RegExp('(?:group_browse_)[0-9]*', 'gi');
    // captures the title of the fb group
    var retitle = new RegExp('class="groupsRecommendedTitle"[^>]*>[ ]*([^<]*)', 'gi');
    var mid, mtitle, ids=[], titles=[], num=0;    
    // loop through all matches until all matches are found as indicated by
    // a false m 
    do {
        // get the id of the groups
        mid = reid.exec(html);

        if (mid){
            // for every group, get the title in an equivalent way
            mtitle = retitle.exec(html);
            // strip off the beginning of group_browse_[0-9]
            mid = String(mid).slice(13);
            // get the title from the title regex
            mtitle = mtitle[1];
            // debug stuff
            console.log(mid, mtitle); 
            // update ids and titles parallely 
            ids.push(mid);
            titles.push(mtitle);
        }

    } while (mid);

    return [ids, titles];
}

function populatePopup(id, title){
   
// var twoTitle = document.createTextNode(...); 
// TODO GET NUMBER OF CHATS IN THIS ID/GROUP! INSERT INTO LINE 2 OF 
// STREAM CONTENT
    $('<div class="stream-row"><div class="one-line"><div class="one-line secondary">'+title+'</div></div></div>').appendTo('#messaging-content-left');
}

function initHTML(xmlhttp){
    var html = xmlhttp.response;
    var data = parseHTML(html); 
    var ids = data[0];
    var titles = data[1];
    var x;

    for (x in ids){
        populatePopup(ids[x], titles[x]);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initIFrame();
    var input = document.getElementById('push-input');
    input.onkeydown = function (e){
        if (e.keyCode == 13 && !e.shiftKey){
            var val = $('#push-input').val();
            sendMessage(val); 
            alert("enter");
        }
    }

$('#push-send-icon').click(function(){
    var val = $('#push-input').val();
    sendMessage(val);
});

$('#profile').click(function() {
// FADY INSERT YOUR CODE THAT WILL GO TO THE PROFILE PAGE HERE 

});

$('#faq').click(function() {
// FADY INSERT YOUR CODE THAT WILL GO TO THE FAQ PAGE HERE 

});

$('help').click(function() {
// FADY INSERT YOUR CODE THAT WILL GO TO THE HELP PAGE HERE 

});



var myDataRef = new Firebase('https://anxoxebe2vm.firebaseio-demo.com/');

function sendMessage(val) {
    var name = "cameron";
    var message = val || "";
    myDataRef.child('Chat 3').push({name: name, message: message});
}

function updateProfile() {
  var name = "cameron";
  var bio = $('#bioInput').val() || "";
  var insta = $('#instaInput').val() || "";
  var linkedin = $('#linkedinInput').val() || "";
  var github = $('#githubInput').val() || "";

  myDataRef.child('Users').child(name).set({name: name, bio: bio, instaLink: insta,linkedin: linkedin, github: github});
}

function getProfile(name, cb) {
  myDataRef.child('Users').child(name).once("value", cb);
}

  <!-- Chat Room -->

myDataRef.child('Chat 3').on('child_added', function(snapshot) {
  var message = snapshot.val();
  getProfile(message.name, function (profileSnapshot) {
      console.log(profileSnapshot.val());
      displayChatMessage(message.name, message.message, profileSnapshot.val());
  })
});

/*function displayChatMessage(name, text, profile) {
  $('<div>').text(text).prepend($('<em/>').addClass('class1').html('<h3 class="space-between-top">(<b class="linkedin">linkeidn</b>: ' + profile.linkedin + ') <b> '+name+': <p class="space-between">')).appendTo($('#messagesDiv'));
  $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};*/



}); // DON'T DELETE THIS SET OF BRACKETS/PARENTHESIS
