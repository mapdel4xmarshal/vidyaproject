  var facebookID, firstname, lastname, email;
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {// Logged into your app and Facebook.    
        getUserProfile(response.authResponse.userID);       
    } else if (response.status === 'not_authorized') {// The person is logged into Facebook, but not your app.
        $("#error").html('<div class="alert alert-danger">' +
                 '<a href="#" id="error_dismiss" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
                 '<span class=""><strong>Login Error!'+
                 '</strong>please login to the app</span></div>');
                $("#error").css("z-index", '9999');
     
    } else {// The person is not logged into Facebook
        $("#error").html('<div class="alert alert-danger">' +
                 '<a href="#" id="error_dismiss" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
                 '<span class=""><strong>Login Error!'+
                 '</strong>please login to facebook</span></div>');
                $("#error").css("z-index", '9999');
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
    appId      : '625289774300587',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5'
  });

 /* FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });*/

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
{ //return('connected');
    FB.login(function(response) {      
        checkLoginState();
    },{scope: 'email,public_profile'});
}

function doLogout()
{
    FB.logout(function(response) { 
    	location.reload();
    });
}

function getUserProfile(uid)
{
  FB.api("/"+uid, function(response) 
    {
        if (response && !response.error) 
        {
             $("#welcome").html('<div class="alert alert-success">' +
                 '<a href="#" id="error_dismiss" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
                 '<span class=""><strong>Welcome!  '+
                 '</strong>' + response.name + '</span></div>');
                $("#welcome").css("z-index", '9999');
            doLoadQuestions();
            facebookID = uid;
            var names = response.name.split(" ");
            firstname = names[0];
            lastname = names[1];
        }
    });  
} 