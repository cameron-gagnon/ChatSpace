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
/*    var streamRow = document.createElement('div');
    streamRow.class = 'stream-row';
    
    // create stream-row content holder 
    var streamRowInner = document.createElement('div');
    streamRowInner.class = 'stream-row-content';
    var oneLine = document.createElement('div');
    oneLine.class = 'one-line';
    // title on line one number of chats on line two.
    var lineTitle = document.createTextNode(title); 
    oneLine.appendChild(lineTitle);
    var twoLine = document.createElement('div');
    twoLine.class = 'one-line secondary';
    
// var twoTitle = document.createTextNode(...); 
// TODO GET NUMBER OF CHATS IN THIS ID/GROUP! INSERT INTO LINE 2 OF 
// STREAM CONTENT*/
    alert("inserting elts");
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
});
