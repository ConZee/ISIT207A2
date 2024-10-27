const observer = new IntersectionObserver(entries => {
  // Loop over the entries
  entries.forEach(entry => {
      if (entry.isIntersecting) { // If the element is visible
          entry.target.classList.add('animateScrollUp'); // Add the animation class
          observer.unobserve(entry.target); // Stops observing to preserve memory
      }
  });
});

document.querySelectorAll('.animateOnScroll').forEach(element => {
  observer.observe(element);
});

function dropDownNav() {
  const modalNavContainer = document.getElementById("modalNavContainer");
  if (modalNavContainer.style.display == "") {
      modalNavContainer.style.display = "flex";
  } else {
      modalNavContainer.style.display = "";
  }
}

// Scroll functions
function scrollToFleet() {
  const fleetSection = document.getElementById('fleet');
  if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Login popup; Closes form when user clicks outside of it.
window.onclick = function closeModal(event) {
  if (event.target == document.getElementById("loginPopup")) {
      document.getElementById("loginPopup").style.display = "none";
  }
}

// Login credentials and catching
document.getElementById("loginBtn").addEventListener("click", (e) => {
  const loginForm = document.getElementById("loginContent");
  const username = loginForm.username.value;
  const password = loginForm.password.value;
  if (username === "user" && password === "user123") { // Username and password
      alert("Welcome "+ username + ", you have successfully logged in.");
      document.cookie = "username=" + username + "; path=/"; // Sets path to be default, allows deleting of this cookie from any pages
      document.getElementById("loginPopup").style.display = "none";
      location.reload();
  } else {
      e.preventDefault();
      document.getElementById("invalidLogin").style.display = "block";
  }
})

// Remember me function for login
const rememberCB = document.getElementById("rememberMeCB"),
    rUsername = document.getElementById("usernameField");
if (localStorage.checkbox && localStorage.checkbox !== "") {
  rememberCB.setAttribute("checked", "checked");
  rUsername.value = localStorage.username;
} else {
  rememberCB.removeAttribute("checked");
  rUsername.value = "";
}

function rememberMe() {
  if (rememberCB.checked && rUsername.value !== "") {
    localStorage.username = rUsername.value;
    localStorage.checkbox = rememberCB.value;
  } else {
    localStorage.username = "";
    localStorage.checkbox = "";
  }
}

// Login cookie checker for each page to enable logout button
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkLogin() {
  let loggedUserCookie = getCookie("username");
  if (loggedUserCookie != "") {
      document.getElementById("navLoginBtn").value = "Logout";
  }
}

// Logout button
function loginLogoutTxt() {
  const loginLogoutBtn = document.getElementById("navLoginBtn").value;
  if (loginLogoutBtn === "Logout") {
      if (confirm("Are you sure you want to logout?")) {
          document.cookie = "username=; Max-Age=0; path=/"; // Standardizes deletion of cookie from path=/
          
          const url = new URL(window.location.href);
          url.searchParams.delete("username"); // Remove username parameter
          url.searchParams.delete("password"); // Remove password parameter (if present)
          history.replaceState(null, '', url); // Update the URL without reloading
          location.reload();
      }
  } else {
      document.getElementById("loginPopup").style.display="block";
  }
}

// Min date for pickup date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
 dd = '0' + dd;
}

if (mm < 10) {
 mm = '0' + mm;
}
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("pickUpDate").setAttribute("min", today);

// Sets min return date to be 1 day after pickup date
document.getElementById("pickUpDate").addEventListener("change", (e) => {
  var pickUpDate = new Date(document.getElementById("pickUpDate").value);
  pickUpDate.setDate(pickUpDate.getDate() + 1)

  var dd = pickUpDate.getDate();
  var mm = pickUpDate.getMonth() + 1;
  var yyyy = pickUpDate.getFullYear();
  if (dd < 10) {
      dd = '0' + dd;
  }
  if (mm < 10) {
      mm = '0' + mm;
  }
  minRental = yyyy + '-' + mm + '-' + dd;
  document.getElementById("returnDate").setAttribute("min", minRental);
})

// Rental form prefilling
function navigateToRentForm() {
  const pickUpDate = document.getElementById('pickUpDate').value;
  const returnDate = document.getElementById('returnDate').value;
  location.href = `html/rentForm.html?pickUpDate=${pickUpDate}&returnDate=${returnDate}`;
}

function prefillForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const pickUpDate = urlParams.get('pickUpDate');
  const returnDate = urlParams.get('returnDate');

  if (pickUpDate) {
      document.getElementById('pickUpDate').value = pickUpDate;
  }
  if (returnDate) {
      document.getElementById('returnDate').value = returnDate;
  }
}

function reserve() {
  const pickUpDate = document.getElementById('pickUpDateInput').value; // Adjust to actual input IDs
  const returnDate = document.getElementById('returnDateInput').value; // Adjust to actual input IDs
  window.location.href = `html/rentForm.html?pickUpDate=${pickUpDate}&returnDate=${returnDate}`;
}

function redirectToRentForm(carName) {
  const url = `html/rentForm.html?car=${carName}`;
  window.location.href = url;
}

function prefillCarSelection() {
  const urlParams = new URLSearchParams(window.location.search);
  const car = urlParams.get('car');

  if (car) {
      const select = document.getElementById('carSelection');
      select.value = car; 
  }
}

function validateAndProceed() {
  // Assuming you have form fields with these IDs
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const pickUpDate = document.getElementById("pickUpDate").value;
  const returnDate = document.getElementById("returnDate").value;
  const pickUpTime = document.getElementById("pickUpTime").value;
  const returnTime = document.getElementById("returnTime").value;
  
  // Check if the required fields are filled
  if (!name || !email || !phone || !pickUpDate || !returnDate || !pickUpTime || !returnTime) {
      alert("Please fill out all required fields.");
      return; // Stop the function if validation fails
  }

  // If all fields are filled, proceed to success page
  location.href = 'success.html';
}

// Countdown begins on page load for success.html
function redirectCountDown() {
  var timeleft = 10;
  var downloadTimer = setInterval(function(){
      if(timeleft < 0){
          clearInterval(downloadTimer);
          window.location.href = "../index.html";
      } else {
          document.getElementById("redirectCD").innerHTML = timeleft;
      }
      timeleft -= 1;
  }, 1000);
}

// Rental form prefill loading
window.onload = function() {
  checkLogin();
  prefillCarSelection();
  prefillForm();
};