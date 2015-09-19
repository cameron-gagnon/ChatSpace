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

//        loginfacebook(initIFrame);
      }
  });
}

function parseHTML(html){
    var re = new RegExp("(?:group_browse_)[0-9]*", "g");
    var m, matches=[], num=0;    
    // loop through all matches until all matches are found as indicated by
    // a false m 
    do {
        m = re.exec(html);

        if (m){
            num = num + 1;
            m = String(m).slice(13);
            console.log(m); 
            matches.push(m);
        }

    } while (m);

    console.log(matches); 

    return matches;
}

function initHTML(xmlhttp){
    var html = xmlhttp.response;
    var groupIDs = parseHTML(html); 
    var x;
    for (x in groupIDs){
        openID(groupIDs[x]);
    }
}

function openID(id){
    window.open('http://facebook.com/groups/' + id);
}

document.addEventListener('DOMContentLoaded', function () {
    initIFrame();
});
