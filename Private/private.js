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


//  Show personal data on "my page"
async function getUserData_() {
    const response = await fetch('/api/myPage_');
    if (response.ok) {
        const data = await response.json();
        const userDataDiv_ = document.getElementById('userData_');
        userDataDiv_.innerHTML = `
            <p>ID: ${data.user_.userId_}</p>
            <p>Firstname: ${data.user_.firstname_}</p>
            <p>Lastname: ${data.user_.lastname_}</p>
            <p>Password: ${data.user_.password_}</p>
            <p>Role: ${data.user_.role_}</p>
        `;

        // Vis ekstra seksjoner basert på rolle
        if (data.user_.role_ === '1') {
            getAdminData_();
        } else if (data.user_.role_ === '3') {
            getSupportData();
        }
    } else {
        alert('Can not get user data');
    }
}

// Admin: henter all informasjon om alle brukere
async function getAdminData_() {
    const response = await fetch('/api/admin/users');
    if (response.ok) {
        const data = await response.json();
        const adminSection_ = document.getElementById('adminSection_');
        const adminData_ = document.getElementById('adminData_');
        adminSection_.style.display = 'block';
        
        const rows_ = data.users_.map(d => `
            <tr>
                <td>${d.db_user_id}</td>
                <td>${d.db_firstname}</td>
                <td>${d.db_lastname}</td>
                <td>${d.db_password}</td>
                <td>${d.db_role}</td>
            </tr>
        `).join('');

        adminData_.innerHTML = `
            <table border="1">
                <thead>
                    <tr><th>ID</th><th>Firstname</th><th>Lastname</th><th>Password</th><th>Role</th></tr>
                </thead>
                <tbody>${rows_}</tbody>
            </table>
        `;
    } else {
        alert('Could not get admin data');
    }
}

// Support: henter kun fornavn og etternavn for alle brukere
async function getSupportData() {
    const response = await fetch('/api/support/users_');
    if (response.ok) {
        const data = await response.json();
        const supportSection_ = document.getElementById('supportSection_');
        const supportData_ = document.getElementById('supportData_');
        supportSection_.style.display = 'block';

        const rows_ = data.users_.map(b => `
            <tr>
                <td>${b.db_firstname}</td>
                <td>${b.db_lastname}</td>
            </tr>
        `).join('');

        supportData_.innerHTML = `
            <table border="1">
                <thead>
                    <tr><th>Firstname</th><th>Lastname</th></tr>
                </thead>
                <tbody>${rows_}</tbody>
            </table>
        `;
    } else {
        alert('Could not get support-data');
    }
}

getUserData_();