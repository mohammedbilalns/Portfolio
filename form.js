document.getElementById("form").addEventListener("submit", function (e) {

// get the values from the form   
  let name = document.getElementById("fullname").value.trim();
  let email = document.getElementById("email").value.trim();
  let subject = document.getElementById("subject").value.trim();
  let message = document.getElementById("message").value.trim();

  // Clear previous error messages
  document.getElementById("nameError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("subjectError").innerText = "";
  document.getElementById("messageError").innerText = "";

  let isValid = true;

  // check name is empty
  if (name === "") {
    document.getElementById("nameError").innerText = "Name is required.";
    isValid = false;
  }

  // check email pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    document.getElementById("emailError").innerText = "Email is required.";
    isValid = false;
  } else if (!emailPattern.test(email)) {
    document.getElementById("emailError").innerText = "Invalid email format.";
    isValid = false;
  }

  // check subject is empty
  if (subject === "") {
    document.getElementById("subjectError").innerText = "Subject is required.";
    isValid = false;
  }
  // check message is empty
  if (message === "") {
    document.getElementById("messageError").innerText = "Message is required.";
    isValid = false;
  }

  if (isValid) {
    e.preventDefault();
    // Prevent the default form submission
    document.getElementById("feedback").textContent = "Submitting..";
    document.getElementById("feedback").style.display = "block";
    document.getElementById("submit-button").disabled = true;
    // Collect the form data
    var formData = new FormData(this);
    var keyValuePairs = [];
    for (var pair of formData.entries()) {
      keyValuePairs.push(pair[0] + "=" + pair[1]);
    }
    var formDataString = keyValuePairs.join("&");
    // Send a POST request to  Google Apps Script
    fetch(
      "https://script.google.com/macros/s/AKfycbzF8oBHy7IoBUemkb0jPQ8ZreWL5-GKqw713Q69k_mHpltMI-rkMV9y7JOVt8Fr2NJw/exec",
      {
        redirect: "follow",
        method: "POST",
        body: formDataString,
        headers: { "Content-Type": "text/plain;charset=utf-8" },
      }
    )
      .then(function (response) {
        // Check if the request was successful
        if (response) {
          console.log(response)
          return response; 
        } else {
          throw new Error("Failed to submit the form.");
        }
      })
      .then(function (data) {
        // Display a success message
        document.getElementById("feedback").textContent =
          "Data submitted successfully!";
        document.getElementById("feedback").style.display = "block";
        document.getElementById("feedback").style.backgroundColor = "green";
        document.getElementById("feedback").style.color = "beige";
        document.getElementById("submit-button").disabled = false;
        document.getElementById("form").reset();
        setTimeout(function () {
          document.getElementById("feedback").textContent = "";
          document.getElementById("feedback").style.display = "none";
        }, 2600);
      })
      .catch(function (error) {
        console.error(error);
        document.getElementById("feedback").textContent =
          "An error occurred while submitting the form.";
        document.getElementById("feedback").style.display = "block";
      });
  } else {
    e.preventDefault();
 
  }
});

