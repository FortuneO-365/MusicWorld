document.getElementById('signupForm').addEventListener('submit', async (e)=>{
  e.preventDefault();

  const refinedEmail = document.getElementById('email').value.trim();
  const refinedPassword = document.getElementById('password').value.trim();
  const errMsg = document.querySelector('.err-msg')

  switch (''){
    case refinedEmail:
        errMsg.innerHTML = 'E-mail field can\'t be empty'
        break;
    case refinedPassword:
        errMsg.innerHTML = 'Password field can\'t be empty'
        break;
  }

  try{
    const response = await fetch('https://musicworld-fo5v.onrender.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            refinedEmail,
            refinedPassword
        })
    })

    const data = await response.json();

    if(data.message === 'Login successful'){
        localStorage.setItem('user', JSON.stringify(data.user))
        window.location.href = '../index.html';
    }else{
        errMsg.innerHTML = 'Incorrect Credntials'
    }

  }catch(error){
    console.error("Signup error:", error);
    alert("Something went wrong. Please try again.");
  }
})