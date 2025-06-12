document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logout-button');

    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();

            fetch('/api/logout.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Logout failed.');
                }
            })
            .then(data => {
                if (data.success) {
                    // Redirect to index.html after successful logout
                    window.location.href = '/index.html';
                } else {
                    alert('Logout failed: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Logout failed. Please try again.');
            });
        });
    }
});