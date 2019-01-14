<script src="https://www.gstatic.com/firebasejs/5.7.3/firebase.js"></script>

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAYLZyMMVqAGId2oBUmoTWinz__9oTm3RQ",
    authDomain: "traintime-b609e.firebaseapp.com",
    databaseURL: "https://traintime-b609e.firebaseio.com",
    projectId: "traintime-b609e",
    storageBucket: "traintime-b609e.appspot.com",
    messagingSenderId: "978048435894"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#Submit").click(function (event) {
    event.preventDefault();

     var   name = $("#TrainName").val().trim();
     var   Destination = $("#Destination").val().trim();
     var   trainTime = $("#TrainTime").val().trim();
     var   Frequency = $("#Frequency").val().trim();
       // "NextArrival": firebase.database.ServerValue.TIMESTAMP,
       // "Frequency": parseInt($("#Frequency").val().trim())


var TrainArrival = {
    name: name,
    Destination: Destination,
    trainTime: trainTime,
    Frequency: Frequency,
};

database.ref().push(TrainArrival)

    $("#trainName").val("");
    $("#Destination").val("");
    $("#TrainTime").val("");
    $("#Frequency").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    var name = childSnapshot.val().name;
    var Destination = childSnapshot.val().Destination;
    var Frequency = childSnapshot.val().Frequency;
    var Train = moment(childSnapshot.val().Train, 'HH:mm').format('X');
    var difference = moment().diff(moment.unix(Train), "minutes")
    var timeLeft = moment().diff(moment.unix(Train), 'minutes') % Frequency
    var min = moment(Frequency - timeLeft, 'mm').format('mm')
    var nextTrain = moment().add(min, 'm').format('hh:mm A')

    $("#Output1> tbody").append("<tr><td>" + name + "</td><td>" + Destination + "</td><td>" +
    Frequency + "</td><td>" +nextTrain + "</td><td>" + min + "</td></tr>");
  });