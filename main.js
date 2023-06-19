
document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("modal");
  const likeButtons = document.getElementsByClassName("like-glyph");

  // Hide the error modal when the page loads
  errorModal.classList.add("hidden");

  // Mimic server call when a user clicks on an empty heart
  Array.from(likeButtons).forEach((button) => {
    button.addEventListener("click", () => {
      mimicServerCall()
        .then(() => {
          // Handle successful response
          button.classList.add("activated-heart");
          button.classList.remove("like-glyph");
        })
        .catch(() => {
          // Handle error response
          errorModal.classList.remove("hidden");
          const errorMessage = document.getElementById("modal-message");
          errorMessage.textContent = "Server Error";

          // Hide the error modal after 3 seconds
          setTimeout(() => {
            errorModal.classList.add("hidden");
          }, 3000);
        });
    });
  });

  // Change the heart back to empty when a user clicks on a full heart
  Array.from(likeButtons).forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("activated-heart");
      button.classList.toggle("like-glyph");
    });
  });
});




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
