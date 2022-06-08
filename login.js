function getValue(query) {
	return document.querySelector(query).value;
  }
  
  var users = new Database("users");
  
  function login() {
	var user = users.get("username", getValue("input#username"));
	if (typeof user === "undefined") {
	  document.getElementById("error_message").innerHTML =
		"მომხმარებელი არ არსებობს";
	} else {
	  if (user.password === getValue("input#password")) {
		localStorage.setItem("status", "loggedin");
		window.location = "./index.html";
	  } else {
		console.log("wrong password");
		document.getElementById("error_message").innerHTML = "პაროლი არასწორია";
	  }
	}
  }
  