function authenticateUser() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var user = authenticateOnServer(username, password);

    if (user) {
        localStorage.setItem('authenticated', true);
        localStorage.setItem('username', user.username);
        localStorage.setItem('role', user.role);
        if (user.role === 'admin') {
            window.location.href = 'inventory.html';
        } else {
            window.location.href = 'user-inventory.html';
        }
    } else {
        document.getElementById('error').innerText = 'Invalid username or password';
    }
}

function authenticateOnServer(username, password) {

    var users = [
        { username: 'admin', password: 'admin', role: 'admin' },
    ];

    var authenticatedUser = users.find(user => user.username === username && user.password === password);
    return authenticatedUser;
}
