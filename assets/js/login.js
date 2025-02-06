const accountPatient = [
    { 
    username: "patient@gmail.com",
    password: "123123" 
    },
    { username: "patient@gmail.com", password: "123123" },
    { username: "patient@gmail.com", password: "123123" },
    { username: "patient@gmail.com", password: "123123" },
    { username: "patient@gmail.com", password: "123123" },
    { username: "patient@gmail.com", password: "123123" },
];
const accountStaff = [
    { nip: "001", password: "123123" },
]
const accountAdmin = [
    { nip: "000", password: "123123" },
]

function loginPatient(e) {
    e.preventDefault(); // Prevent form submission from refreshing the page

    let username = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Check if the entered username and password match any account
    const user = accountPatient.find(
        (account) => account.username === username && account.password === password
    );

    if (user) {
        alert("Login successful!");
        window.location.href = "index.hbs";
    } else {
        alert("Invalid username or password. Please try again.");
    }
}

function loginStaff(e) {
    e.preventDefault(); // Prevent form submission from refreshing the page

    let nip = document.getElementById("nip").value;
    let password = document.getElementById("password").value;

    // Check if the entered username and password match any account
    const user = accountStaff.find(
        (account) => account.nip === nip && account.password === password
    );

    if (user) {
        alert("Login successful!");
        window.location.href = "index.hbs";
    } else {
        alert("Invalid NIP or password. Please try again.");
    }
}

function loginAdmin(e) {
    e.preventDefault(); // Prevent form submission from refreshing the page

    let nip = document.getElementById("nip").value;
    let password = document.getElementById("password").value;

    // Check if the entered username and password match any account
    const user = accountAdmin.find(
        (account) => account.nip === nip && account.password === password
    );

    if (user) {
        alert("Login successful!");
        window.location.href = "index.hbs";
    } else {
        alert("Invalid nip or password. Please try again.");
    }
}

