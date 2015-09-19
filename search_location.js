var myDataRef = new Firebase('https://anxoxebe2vm.firebaseio-demo.com/');
var targetLoc = "London";
myDataRef.orderByChild("Location").equalTo(targetLoc).on("child_added", function(snapshot) {
  console.log(snapshot.key());
});

