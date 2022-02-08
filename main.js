const url = `http://localhost:4050`;
//book finder middle section
const submitBtn = document.getElementById("submit-search");
const bookSearch = document.getElementById("book-search");
const searchResults = document.getElementById("search-results");
const addButtons = document.getElementById("add-buttons");
//toReadList left section
const bulletList = document.getElementById("bullet-list");
//favoritesList right section
const bulletListTwo = document.getElementById("bullet-list-Two");


const headers = {
  "Content-Type": 'application/json',
  "Authorization": '47442_cf87f0112c6a356118ce4387002e92f8'
}

function getBook() {
  while (searchResults.firstChild || addButtons.firstChild) {
    searchResults.removeChild(searchResults.firstChild);
    addButtons.removeChild(addButtons.firstChild);
}

  axios.get(`https://api2.isbndb.com/book/${bookSearch.value}`, {headers: headers})
  .then(function(res) {
    //add a border to search elements
    searchResults.style.border = "10px solid black";
    //create a new book box element and append it to search results element and add the bookTitle to bookBox
    let bookBox = document.createElement("book-box");
    searchResults.append(bookBox);
    let bookTitle = res.data.book.title;
    bookBox.append(document.createTextNode(bookTitle));
    //add the picture to a new box called cover which splits with book box
    const img = document.createElement("img");
    img.setAttribute("id", "cover");
    img.src = res.data.book.image;
    searchResults.append(img);
    //create two buttons and append them to the addButtons element
    let addToReadList = document.createElement("button");
    let addToFavoritesList = document.createElement("button");
    addButtons.append(addToReadList);
    addButtons.append(addToFavoritesList);
    //name the buttons and give them each ids
    addToReadList.innerHTML = "Add to your to read list";
    addToReadList.setAttribute("id", "add-left-button");
    addToFavoritesList.innerHTML = "Add to your favorites list";
    addToFavoritesList.setAttribute("id", "add-right-button");

    //create a function handler for add to read list
    function addToReadListHandler() {
      //create a new list element and append it to to the parent list element
      let individualTitle = document.createElement("li");
      //add the current book title to the to read list
      individualTitle.append(document.createTextNode(bookTitle));
      bulletList.append(individualTitle);
      //add a remove x button
      //create a new button element
      let removeFromToReadListBtn = document.createElement("button");
      removeFromToReadListBtn.innerHTML = "X";
      removeFromToReadListBtn.setAttribute("class", "remove-buttons");
      bulletList.append(removeFromToReadListBtn);
      //handle the event listener for the remove button
      removeFromToReadListBtn.addEventListener('click', function() {
        bulletList.removeChild(individualTitle);
        bulletList.removeChild(removeFromToReadListBtn);
      })
    }
    addToReadList.addEventListener('click', addToReadListHandler);

    //create a function handler for add to favorites list
    function addToFavoritesListHandler() {
      //create a new list element and append it to to the parent list element
      let individualTitle = document.createElement("li");
      //add the current book title to the favorites list
      individualTitle.append(document.createTextNode(bookTitle));
      bulletListTwo.append(individualTitle);
        //add a remove x button
        //create a new button element
        let removeFromFavoritesBtn = document.createElement("button");
        removeFromFavoritesBtn.innerHTML = "X";
        removeFromFavoritesBtn.setAttribute("class", "remove-buttons");
        bulletListTwo.append(removeFromFavoritesBtn);
        //handle the event listener for the remove button
        removeFromFavoritesBtn.addEventListener('click', function() {
        bulletListTwo.removeChild(individualTitle);
        bulletListTwo.removeChild(removeFromFavoritesBtn);
      })
    }
    addToFavoritesList.addEventListener('click', addToFavoritesListHandler);
  })
  .catch(function(error) {
    console.log(error);
  })
};

submitBtn.addEventListener('click', getBook);



//Register button and register form
const registerBtn = document.getElementById("register-btn");
const registerForm = document.getElementById("register-form");

function registerBtnHandler() {
  if (logInForm.classList.contains("showTwo")) {
    logInForm.classList.remove("showTwo");
  }

  registerForm.classList.toggle("show");
}

//add event listener
registerBtn.addEventListener('click', registerBtnHandler);



//log in button and log in form
const logInBtn = document.getElementById("log-in-btn");
const logInForm = document.getElementById("log-in-form");

function logInButtonHandler() {
  if (registerForm.classList.contains("show")) {
    registerForm.classList.remove("show");
  }

  logInForm.classList.toggle("showTwo");
}

//add event listener
logInBtn.addEventListener('click', logInButtonHandler);



//register functionality
const registerSubmitBtn = document.getElementById("register-submit-btn");
const registerUsernameValue = document.getElementById("register-username-input");
const registerPasswordValue = document.getElementById("register-password-input");

function handleRegisterSubmitButton() {
  //if the username or password is too long run an alert
  if ((registerUsernameValue.value.length || registerPasswordValue.value.length) > 20) {
    alert("Your username or password is invalid. Must be between 5 and 20 characters");
    registerUsernameValue.value = '';
    registerPasswordValue.value = '';
    return;
  }
  //if the username or password is too short run an alert
  else if ((registerUsernameValue.value.length || registerPasswordValue.value.length) < 5) {
    alert("Your username or password is invalid. Must be between 5 and 20 characters");
    registerUsernameValue.value = '';
    registerPasswordValue.value = '';
    return;
  }
  //create an object to pass into the server
  let valuesObj = {
    username: registerUsernameValue.value,
    password: registerPasswordValue.value
  };
  //otherwise post the values to the username array
  axios.post(url + "/register/users", valuesObj)
  .then(function(res) {
    //console.log(res.data);
    alert("User registered successfully, proceed to log in!");
    registerUsernameValue.value = '';
    registerPasswordValue.value = '';
  })

}

registerSubmitBtn.addEventListener('click', handleRegisterSubmitButton);



//Log in functionality
const userSection = document.getElementById("user-functionality");
const logInSubmitBtn = document.getElementById("log-in-submit-btn");
const logInUsernameInput = document.getElementById("log-in-username-input");
const logInPasswordInput = document.getElementById("log-in-password-input");

function handleLogInSubmitButton() {
  let valuesObjLogIn = {
    username: logInUsernameInput.value,
    password: logInPasswordInput.value
  };
  //if the username is present in the usernames array
  axios.post(url + "/logIn/users", valuesObjLogIn)
  .then(function(res) {
    if (res.data === "User Not Found") {
      alert(res.data);
      logInUsernameInput.value = '';
      logInPasswordInput.value = '';
    } else if (res.data === "User Found") {
      //create a variable for the found user name
      const user = logInUsernameInput.value;
      //delete all of the elements in H1 and create a new element
      while (userSection.firstChild) {
        userSection.removeChild(userSection.firstChild);
      }
      //create a new element and append it to userSection
      let signedInMessage = document.createElement("p");
      userSection.append(signedInMessage);
      signedInMessage.innerHTML = "Welcome back " + user;
      //create a new br element and append it to Signed in message
      let breakLine = document.createElement("br");
      signedInMessage.append(breakLine);
      //create a new button element and append it to userSection
      let signOutBtn = document.createElement("button");
      signOutBtn.setAttribute("id", "sign-out-btn");
      signOutBtn.innerHTML = "Sign Out";
      signedInMessage.append(signOutBtn);
      //create an event listener for the signout button
      signOutBtn.addEventListener('click', function() {
        location.reload();
        alert("Successfully Signed Out");
      })
    }
  });
}

logInSubmitBtn.addEventListener('click', handleLogInSubmitButton);