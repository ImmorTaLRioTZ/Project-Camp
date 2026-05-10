document.addEventListener("DOMContentLoaded", () => {
    const email = document.querySelector('input[type="email"]')
    const password = document.querySelector('input[type="password"]');
    const username = document.querySelector('input[type="text"]');
    const submit_button = document.getElementById('submit-button');
    
    submit_button.addEventListener("click", async ()=> {
        const request = {
            "email": email.value,
            "password": password.value,
            "username": username.value
        }

        const response = await fetch("http://localhost:4000/api/v1/auth/login", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

    const data = await response.json();
    console.log(data);
    if(response.ok) {
        console.log("Success");
        window.location.href = "./userpage.html"
    }
    });
})