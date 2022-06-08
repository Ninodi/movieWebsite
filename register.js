var users = new Database("users");

function registerUser() {
  let username = document.getElementById("repeat_password").value;
  let password = document.getElementById("password").value;
  let repeatPassword = document.getElementById("repeat_password").value;

  if (
    checkUsername(username) &&
    checkPassword(password, repeatPassword)
  ) {
    var user = users.create({
      username: document.getElementById("repeat_password").value,
      password: document.getElementById("password").value
    });
    
  } else {
    return `
         ${username} ვერ დარეგისტრირდა
        `;
  }
}

function strongPassword(password) {
  var strongPassword= new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.{8,})");
  return password.match(strongPassword);
}

function checkUsername(name) {
  var user = users.get("username", name);
  if (typeof user === "undefined") {
    return true;
  } else {
    return false;
  }
}

function checkPassword(originalPassword, repeatPassword) {
  return (
    originalPassword === repeatPassword && strongPassword(originalPassword)
  );
}

