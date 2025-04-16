const errorMessage = document.querySelector(".err-msg");

const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("c-password");

passwordInput.addEventListener("input", function() {
    const password = passwordInput.value;
    const capitalLetterPattern = /[A-Z]/;
    const numberPattern = /\d/;
    const lengthPattern = /.{8,}/;

    capitalLetterPattern.test(password) ? document.getElementById("capital").classList.add("valid") : document.getElementById("capital").classList.remove("valid");
    numberPattern.test(password) ? document.getElementById("number").classList.add("valid") : document.getElementById("number").classList.remove("valid");
    lengthPattern.test(password) ? document.getElementById("length").classList.add("valid") : document.getElementById("length").classList.remove("valid");
})

confirmPasswordInput.addEventListener("input", function() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    password === confirmPassword ? document.getElementById("c-password-group").classList.remove('active') : document.getElementById("c-password-group").classList.add('active');
})

passwordInput.addEventListener('focusin', function() {
    document.getElementById("password-group").classList.add('active');
})

passwordInput.addEventListener('focusout', function() {
    document.getElementById("password-group").classList.remove('active');
})

confirmPasswordInput.addEventListener('focusin', function() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    password === confirmPassword ? document.getElementById("c-password-group").classList.remove('active') : document.getElementById("c-password-group").classList.add('active');
})

confirmPasswordInput.addEventListener('focusout', function() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    password === confirmPassword ? document.getElementById("c-password-group").classList.remove('active') : document.getElementById("c-password-group").classList.add('active');
})

document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    errorMessage.innerHTML = ""; 

    const usernamePattern = /^[a-zA-Z0-9]{3,}$/; 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("c-password").value;

    const refinedEmail = email.trim();
    const refinedUsername = username.trim();
    const refinedPassword = password.trim();
    const refinedConfirmPassword = confirmPassword.trim();

    if(!passwordPattern.test(refinedPassword)) {
        if(document.getElementById("capital").classList.contains("valid") === false) {
            errorMessage.innerHTML = "Password must contain at least one uppercase letter!";
            return;
        }else if(document.getElementById("number").classList.contains("valid") === false) {
            errorMessage.innerHTML = "Password must contain at least one number!";
            return;
        }else if(document.getElementById("length").classList.contains("valid") === false) {
            errorMessage.innerHTML = "Password must be at least 8 characters long!";
            return;
        }
    }

    if(refinedPassword !== refinedConfirmPassword) {
        errorMessage.innerHTML = "Passwords do not match!";
        return;
    }

    if(!usernamePattern.test(refinedUsername)) {
        errorMessage.innerHTML = "Username must be at least 3 characters long and contain only letters and numbers!";
        return;
    }

    if(!emailPattern.test(refinedEmail)) {
        alert(refinedEmail)
        alert(emailPattern.test(refinedEmail))
        errorMessage.innerHTML = "Invalid email format!";
        return;
    }

    try {
        const response = await fetch("https://musicworld-fo5v.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                refinedUsername,
                refinedEmail,
                refinedPassword 
            }),
        });

        const data = await response.json();
        if (data.message === "User registered successfully") {
            alert("Signup successful! Redirecting to login...");
            window.location.href = "login.html";
        } else {
            if(data.error === 11000) {
                errorMessage.innerHTML = "Email already exists!";
            }
        }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
});