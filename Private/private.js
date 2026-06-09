const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', async () => {
    const response = await fetch('/api/logout', {
        method: 'POST'
    });
    if (response.ok) {
        window.location.href = '/';
    }
    else {
        alert('Noe gikk galt ved utlogging');
    }
});