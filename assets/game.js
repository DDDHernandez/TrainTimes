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

$("#submit").click(function (event) {
    event.preventDefault();
    database.ref().push({
        "name": $("#TrainName").val().trim(),
        "Destination": $("#Destination").val().trim(),
        "TrainTime": $("#FirstTrainTime").val().trim(),
        "NextTrain": firebase.database.ServerValue.TIMESTAMP,
        "Frequency": parseInt($("#Frequency").val().trim())
    });
});

database.ref()
.orderByChild("TrainTime").limitToLast(100)
.on("child_added", function (snapshot) {
    var Frequency = childSnapshot.val().Frequency;
    var difference = moment().diff(moment.unix(firstTrain), "minutes")
    var timeLeft = moment().diff(moment.unix(firstTrain), 'minutes') % Frequency
    var TrainTime = moment(childSnapshot.val().firstTrain, 'HH:mm').format('X');
    var min = moment(Frequency - timeLeft, 'mm').format('mm')
    var NextTrain = moment().add(min, 'm').format('hh:mm A')
    var TrainTime = moment(snapshot.val().TrainTime);
    var added = moment(snapshot.val().NextTrain);
    var datdiff = moment(added).diff(TrainTime);
    console.log(moment(datdiff).format("MM"));
    B = $("<thead>");
    D = $("<tr>");
    $("#output1").append(B);
    $(B).append(D);
    $(D).append("<td>" + snapshot.val().name);
    $(D).append("<td>" + snapshot.val().Destination);
    $(D).append("<td>" + snapshot.val().Frequency);
    $(D).append("<td>" + snapshot.val().NextTrain);
    $(D).append("<td>" + snapshot.val().min);
  //  $(D).append("<button class='btn btn-danger deleteEmp' id='" + snapshot.val().dateAdded + "'>Delete")
    $("#" + snapshot.val().dateAdded).click(function () {
        var test = database.collection().doc().delete();
    })
});
