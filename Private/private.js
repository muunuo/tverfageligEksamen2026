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
    if (!response.ok) {
        alert('Can not get user data');
        return;
    }

    
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
        
        } else {
            alert('Can not get user data');
        }

    if (data.user_.role_ === '1' || data.user_.role_ === '3') {
            getTicketData();
        } 
}

// Admin: henter all informasjon om alle brukere
async function getAdminData_() {
    const response = await fetch('/api/admin/users_');
    if (response.ok) {
        const data = await response.json();
        const adminSection_ = document.getElementById('adminSection_');
        const adminData_ = document.getElementById('adminData_');
        adminSection_.style.display = 'block';
        
        const rows_ = data.users_.map(d => `
            <tr>
                <td>${d.db_user_id}</td>
                <td>${d.db_username}</td>
                <td>${d.db_firstname}</td>
                <td>${d.db_lastname}</td>
                <td>${d.db_role_id}</td>
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

async function getSupportData() {
    const response = await fetch('/api/support/users_');
    if (response.ok) {
        const data = await response.json();
        const supportSection_ = document.getElementById('supportSection_');
        const supportData_ = document.getElementById('supportData_');
        supportSection_.style.display = 'block';

        const rows_ = data.users_.map(d => `
            <tr>
                <td>${d.db_firstname}</td>
                <td>${d.db_lastname}</td>
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

// Support: henter kun fornavn og etternavn for alle brukere
async function getTicketData() {
    const response = await fetch('/api/ticket/users_');
    if (response.ok) {
        const data = await response.json();
        const ticketSection_ = document.getElementById('ticketSection_');
        const ticketData_ = document.getElementById('ticketData_');
        ticketSection_.style.display = 'block';

        const rows = data.users.map(d => `
            <tr>
                <td>${d.db_title}</td>
                <td>${d.db_description}</td>
                <td>${d.db_importance}</td>
            </tr>
        `).join('');
        ticketData_.innerHTML = `
            <table border="1">
                <thead>
                    <tr><th>Title</th><th>Description</th><th>Importance</th></tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;
    } else {
        alert('Could not get ticket-data');
    }
}

getUserData_();