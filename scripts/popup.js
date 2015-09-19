function initIFrame() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  },

  function (tabs) {
      var expiry = new Date(parseInt(localStorage.expiryTime));
      var now = new Date();
      if (localStorage.accessToken && now < expiry) {
        $('#frame').show();
        alert("The localstorage access token and now is < expiry");
      } else {
        $('#frame').hide();
        loginfacebook(initIFrame);
      }
  });
}

document.addEventListener('DOMContentLoaded', function () {
    initIFrame();
});
