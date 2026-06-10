const logoutButton = document.getElementById('logoutButton');
//when logout button is used, user is sent to startpage
logoutButton.addEventListener('click', async () => { 
    const response = await fetch('/api/logout_', { //the button beind pressed gets sent to app.js
        method: 'POST'
    });
    if (response.ok) {
        window.location.href = '/'; //send user to startpage
    }
    else {
        alert('Somthing went wrong. Please try again later');
    }
});


//  Show users personal data on "my page"
async function getUserData_() {
    const response = await fetch('/api/myPage_'); //waits for respons from api/myPage_
    if (!response.ok) { //! = not
        alert('Can not get user data');
        return;
    }

    
        const data = await response.json(); //data is the response from /api/myPage_
        const userDataDiv_ = document.getElementById('userData_'); //could also use create...

        userDataDiv_.innerHTML = `
            <p>ID: ${data.user_.userId_}</p>
            <p>Firstname: ${data.user_.firstname_}</p>
            <p>Lastname: ${data.user_.lastname_}</p>
            <p>Password: ${data.user_.password_}</p>
            <p>Role: ${data.user_.role_}</p>
        `; //whats going to go inside the div 

        // Show other sections based on roles
        if (data.user_.role_ === '1') {
            getAdminData_();
        } else if (data.user_.role_ === '3') {
            getSupportData();
        
        } else {
            // alert('Can not get user data');
            //alert happens to every normal user. So now nothing happens
        }
        //shows tickets if user has right role
    if (data.user_.role_ === '1' || data.user_.role_ === '3') {
            getTicketData();
        } 
}

// Admin: get info about all users
async function getAdminData_() {
    const response = await fetch('/api/admin/users_'); //waits for respons from api/admin/users_
    if (response.ok) {
        const data = await response.json();
        const adminSection_ = document.getElementById('adminSection_'); //gets the sections made in html
        const adminData_ = document.getElementById('adminData_');
        adminSection_.style.display = 'block'; //displays the section if user is admin
        
        //map can apply a transform function to every element
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

// Support: get firt- and lastname of all users
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
        // alert('Could not get support-data');
    }
}

// Ticket: gets all tickets 
async function getTicketData() {
    const response = await fetch('/api/ticket/users_');
    if (!response.ok) {
        alert('Could not get ticket-data');
        return;
    } 

            const data = await response.json();
        const ticketSection_ = document.getElementById('ticketSection_');
        const ticketData_ = document.getElementById('ticketData_');
        ticketSection_.style.display = 'block';

        const rows = data.users.map(d => `
            <tr>
                <td>${d.db_ticket_id}</td>
                <td>${d.db_title}</td>
                <td>${d.db_description}</td>
                <td>${d.db_importance}</td>
                <td><button class="deleteTicketBtn" data-id="${d.db_ticket_id}">Delete</button></td>
            </tr>
        `).join('');
        ticketData_.innerHTML = `
            <table border="1">
                <thead>
                    <tr><th>ID</th><th>Title</th><th>Description</th><th>Importance</th><th>Delete</th></tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;
// Attach listeners to each delete button
document.querySelectorAll('.deleteTicketBtn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        const id = btn.dataset.id;
        if (!confirm('Delete ticket ' + id + '?')) return;
        const res = await fetch('/api/deleteTicket_/' + encodeURIComponent(id), {
            method: 'DELETE'
        });
        if (res.ok) {
            // refresh ticket list after successful delete
            getTicketData();
        } else {
            const text = await res.text();
            alert('Failed to delete ticket: ' + (text || res.status));
        }
    });
});

}

// User Ticket: gets all tickets belonging to user
async function getUserTicketData_() {
    const response = await fetch('/api/userTicket/users_');
    if (!response.ok) {
        alert('Could not get ticket-data');
        return;
    } 

            const data = await response.json();
        const userTicketSection_ = document.getElementById('userTicketSection_');
        const userTicketData_ = document.getElementById('userTicketData_');
        userTicketSection_.style.display = 'block';

        const tRows_ = data.ticket.map(d => `
            <tr>
                <td>${d.db_ticket_id}</td>
                <td>${d.db_title}</td>
                <td>${d.db_description}</td>
                <td>${d.db_importance}</td>
                <td><button class="deleteTicketBtn" data-id="${d.db_ticket_id}">Delete</button></td>
            </tr>
        `).join('');
        userTicketData_.innerHTML = `
            <table border="1">
                <thead>
                    <tr><th>ID</th><th>Title</th><th>Description</th><th>Importance</th><th>Delete</th></tr>
                </thead>
                <tbody>${tRows_}</tbody>
            </table>
        `;
// Attach listeners to each delete button
document.querySelectorAll('.deleteTicketBtn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        const id = btn.dataset.id;
        if (!confirm('Delete ticket ' + id + '?')) return;
        const res = await fetch('/api/deleteTicket_/' + encodeURIComponent(id), {
            method: 'DELETE'
        });
        if (res.ok) {
            // refresh ticket list after successful delete
            getTicketData();
        } else {
            const text = await res.text();
            alert('Failed to delete ticket: ' + (text || res.status));
        }
    });
});
}

getUserData_();
getUserTicketData_()