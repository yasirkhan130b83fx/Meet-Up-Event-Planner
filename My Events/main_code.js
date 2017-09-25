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

//   var created_by;
//   database.child("Users/" + user_key + "/name").once('value',
//   function (abc)
//     {
//       console.log("Users/" + user_key + "/name");
//       console.log(abc);
//       console.log(abc.val());
//     }
//   )
//   .catch(
//     function(error) 
//     {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         alert(errorMessage);
//         // ...
//     }
// );
  

  // var Event =
  // {
  //   name: event_name.value.toLowerCase(),
  //   description: event_description.value.toLowerCase(),
  //   location: event_location.value.toLowerCase(),
  //   start_date_time: event_start_datetime.value,
  //   end_date_time: event_end_datetime.value,
  //   organizer: event_organizer.value.toLowerCase(),
  //   user_uid: user_key,
  //   going_count: 0,
  //   not_going_count: 0
  // };

  // function create_event_item(Event)
  // {
  //   var jumbotron = document.createElement("div");
  //   jumbotron.className = "jumbotron";
  //   var event_name = document.createElement("h3");
  //   event_name.className = "lead";
  //   var event_name_txt = document.createTextNode(Event.name);
  //   var event_description = document.createElement("p");
  //   event_description.className = "lead";
  //   var event_description_txt = document.createTextNode(Event.description);
  //   var event_location = document.createElement("p");
  //   event_location.className = "lead";
  //   var event_location_txt = document.createTextNode(Event.location);
  //   var event_start_date_time = document.createElement("p");
  //   event_start_date_time.className = "lead";
  //   var event_start_date_time_txt = document.createTextNode(Event.start_date_time);
  //   var event_end_date_time = document.createElement("p");
  //   event_end_date_time.className = "lead";
  //   var event_end_date_time_txt = document.createTextNode(Event.end_date_time);
  //   var event_organizer = document.createElement("p");
  //   event_organizer.className = "lead";
  //   var hr = document.createElement("hr");
  //   hr.className = "my-4";
  //   var event_organizer_txt = document.createTextNode(Event.organizer);
  //   var event_statuses = document.createElement("p");
  //   event_statuses.className = "lead";
  //   var going_btn = document.createElement("button");
  //   going_btn.className = "btn btn-primary";
  //   var going_btn_txt =document.createTextNode("Going To Event");
  //   var going_btn_badge = document.createElement("span");
  //   going_btn_badge.className = "badge badge-info";

  //   var not_going_btn = document.createElement("button");
  //   not_going_btn.className = "btn btn-warning";
  //   var not_going_btn_txt =document.createTextNode("Not Going To Event");
  //   var not_going_btn_badge = document.createElement("span");
  //   not_going_btn_badge.className = "badge badge-info";

  //   event_name.appendChild(event_name_txt);
  //   event_name.innerHTML = "<strong> ponka</strong> tatti";
  //   event_location.appendChild(event_location_txt);
  //   event_description.appendChild(event_description_txt);
  //   event_start_date_time.appendChild(event_start_date_time_txt);
  //   event_end_date_time.appendChild(event_end_date_time_txt);
  //   event_organizer.appendChild(event_organizer_txt);

  //   going_btn_badge.appendChild(document.createTextNode(Event.going_count));
  //   going_btn.appendChild(going_btn_txt);
  //   going_btn.appendChild(going_btn_badge);

  //   not_going_btn_badge.appendChild(document.createTextNode(Event.not_going_count));
  //   not_going_btn.appendChild(not_going_btn_txt);
  //   not_going_btn.appendChild(not_going_btn_badge);

  //   jumbotron.appendChild(event_name);
  //   jumbotron.appendChild(event_description);
  //   jumbotron.appendChild(event_location);
  //   jumbotron.appendChild(event_start_date_time);
  //   jumbotron.appendChild(event_end_date_time);
  //   jumbotron.appendChild(event_organizer);
  //   jumbotron.appendChild(hr);
  //   jumbotron.appendChild(going_btn);
  //   jumbotron.appendChild(not_going_btn);

  //   return jumbotron;
  // }

function strTOToggleCase(input)
{
  input = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();

  for (var i = 0; i < input.length; i++)
  {
      if(input.charAt(i) === " ")
      {
          input = input.slice(0, i + 1) + input.charAt(i + 1).toUpperCase() + input.slice(i + 2);
      }
      else if(input.charAt(i) === " " && input.charAt(i + 1)=== " ")
      {
          input = input.slice(0, i + 2) + input.charAt(i + 2).toUpperCase() + input.slice(i + 3);
      }
      else if(input.charAt(i) === " " && input.charAt(i + 1) === " " && input.charAt(i + 2) === " ")
      {
          input = input.slice(0, i + 3) + input.charAt(i + 3).toUpperCase() + input.slice(i + 4);
      }
  }
  return input;
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
    if(snapshot.val().user_uid == user_key)
    {
      events_list.innerHTML += create_event_item( snapshot.key, snapshot.val());
    }
  }
);