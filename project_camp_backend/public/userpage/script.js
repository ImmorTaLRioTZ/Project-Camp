document.addEventListener("DOMContentLoaded", async() => {
    const user = document.getElementById("user-profile");

    const response = await fetch("http://localhost:4000/api/v1/auth/current-user", {
            method: "POST",
            credentials: "include"
        });
        const data = await response.json();
    if(response.ok) {
        console.log("Successfully loaded");
        user.innerHTML = `<div>User name: ${data.data.username}</div>
        <div>User email: ${data.data.email}</div>
        <div>To verify your mail: See your mailbox to verify it</div>`
        console.log(data);
    }
    else {
        console.log("Error");
    }
})