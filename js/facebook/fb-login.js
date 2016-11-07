var loginFlag = false;

window.fbAsyncInit = function() {
    FB.init({
        appId: '1149628631794010',
        cookie: true, // enable cookies to allow the server to access 
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
    });

    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        loginFlag = true;
        loggedIn();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        console.log('Error: not_authorized');
        $('#auth-status').html('Error: Please login to the app');
        $('.login-btn').html('<button class="btn btn-default btn-block" onclick="checkLoginState()">Login with Facebook</button>');
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        console.log('Error: not_logged_facebook');
        $('#auth-status').html('Error: Please log into Facebook before using this app');
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
	console.log('Logging in...');
	$('#auth-status').html('Authenticating...');
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

// See statusChangeCallback() for when this call is made.
function loggedIn() {
    FB.api('/me', function(response) {
        console.log(response);
        $('.player-name').html(response.name);
        hideOverlay();
    });
}

function hideOverlay() {
	$('#lobby-wrapper').css({'display': 'inherit'});
	$('#overlay-wrapper').css({'display': 'none'});
}

