function loginfacebook(callback) {
  chrome.tabs.create({
    'url': "https://www.facebook.com/dialog/oauth?"
         + "client_id=908225099215087&"
         + "redirect_uri=https://www.facebook.com/connect/login_success.html&"
         + "scope=publish_actions&" + "response_type=token",
  },
  function(popupWindow) {
    chrome.tabs.query({
         active : true
    },
    function(tabs) {
      tabid = tabs[0].id;
      chrome.tabs.onUpdated.addListener(function(tabid, tab) {
          var token = extractToken(tab.url);
          localStorage.accessToken = token;
  
          var expires_in = extractExpiry(tab.url);
          var currentDate = new Date();
          var expiryTime = currentDate.getTime() + 1000 * (expires_in - 300);
          localStorage.expiryTime = expiryTime;
  
          chrome.windows.remove(popupWindow.id);
          callback();
          FB.api(
            '/user_id/groups',
            'GET',
            {},
            function(response) {
                console.log(response);// Insert your code here
          });

      });
    });
  });
}


//(function(d, s, id){
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) {return;}
//   js = d.createElement(s); js.id = id;
//   js.src = "//connect.facebook.net/en_US/sdk.js";
//   fjs.parentNode.insertBefore(js, fjs);
//}(document, 'script', 'facebook-jssdk'));
//
//window.fbAsyncInit = function() {
//  alert("SDF:JKL");
//  FB.init({
//    appId      : '908225099215087',
//    xfbml      : true,
//    version    : 'v2.4'
//  });
//    alert("HELKSFLJ");
//};
//
//FB.getLoginStatus(function(response) {
//  if (response.status === 'connected') {
//    console.log('Logged in.');
//  }
//  else {
//    FB.login();
//  }
//});
