  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {// Logged into your app and Facebook. 
      
        
    } else if (response.status === 'not_authorized') {// The person is logged into Facebook, but not your app.
      
     
    } else {// The person is not logged into Facebook
      
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
        return response.status;
    });      
  }


window.fbAsyncInit = function() {
  FB.init({
    appId      : '1738124523124365',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5'
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  
function doLogin()
{ return('connected');
    FB.login(function(response) {      
        return(checkLoginState());
    },{scope: 'email,public_profile'});
}

function doLogout()
{
    FB.logout(function(response) { 
    
    });
}