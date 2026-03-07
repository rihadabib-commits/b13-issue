// Button select
const signupBtn = document.getElementById("singup-btn");

signupBtn.addEventListener("click", function() {
    // Input 
    const username = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

    // Check username/password
    if(username === "admin" && password === "admin123") {
        // onno page e redirect
       
        window.location.href = "dashboard.html"; // ei page tui create korbi
        //   tik hola alert
        alert("sing up success");
    } else {
        // vul hole alert
        alert(" incorrect Username or Password ");
    }
});