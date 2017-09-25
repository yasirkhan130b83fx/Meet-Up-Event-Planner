var database = firebase.database().ref();
var events_list = document.getElementById("events-list");

var user_key;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      user_key = user.uid;
      var providerData = user.providerData;
      // console.log(user);
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });
  
  function signout()
  {
    firebase.auth().signOut()
    .then(function() {
      // Sign-out successful.
        location = "../index.html";
    })
    .catch(function(error) {
      // An error happened.
        alert(error);
    });
  }

function create_event_item(id, Event)
{ 
  var jumbotron =
  "<div class=\"jumbotron\" id=\""+ id +"\"><h3 class=\"display-5\">" + Event.name + ".</h3><p class=\"lead\"><strong>Event Description:</strong>  " + Event.description + ".</p><p class=\"lead\"><strong>Event Location:</strong> " + Event.location + ".</p><p class=\"lead\"><strong>Event Starting Date:</strong> " + Event.start_date_time.replace("T"," / ") + "</p><p class=\"lead\"><strong>Event Ending Date:</strong> " + Event.end_date_time.replace("T"," / ") + "</p><p class=\"lead\"><strong>Event Organizer:</strong> " + Event.organizer + ".</p><hr class=\"my-4\"><p class=\"lead\"><button class=\"btn btn-primary\">Going To Event <span class=\"badge badge-info\">" + Event.going_count + "</span></button>&nbsp;<button class=\"btn btn-warning\">Not Going To Event <span class=\"badge badge-info\">" + Event.not_going_count + "</span></button></p></div>";
  return jumbotron;
}

database.child("Events").on("child_added",
  function (snapshot)
  {
    database.child("Users/"+user_key+"/Events Statuses/"+snapshot.key).once("value", 
      function (snapshot1)
      {
        if(snapshot1.hasChild("status"))
        {
          if(snapshot1.val().status == true)
            events_list.innerHTML += create_event_item( snapshot.key, snapshot.val());
        }
      }
    );
  }
);