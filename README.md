# Eksam
This is a project created as part of my last eksam in High school whitch covers the subjects of IT-development, Operations and user support. 

Last updated 09.06.2026 (european calader)
# Rec-Watch 📺

***Rec-Watch*** is made to allow friend groups to recommend, and recive recommendations from eatch other, as well as letting users track what shows they have, want to, and are watching themself. 

- [Development Status](#development-status)
- [Design Process 🎨](#design-process-🎨)
- [Kode](#kode)
- [Features💡](#features-💡)
- [Technology](#technology)
- [Project Structure](#project-structure)
- [Contributors](#contributors)
- [Sources](#Sources)

## Standerds
I use a underscore _ after verible name in Javascript. This is because it makes it easier to find veribles when using the search feature as seraching "user" gets me all the time "user" is used, but user_ gets me only the verible "user". 

When it comes to the database i mostly use norwigan. But translations will be found under the Database section.

## Development Status 
The projects development will only be happening for 3 days. Do to this it will likely not be updated often. But for the time being it is in pre-development.

**Current Progress:**
- Core functionality: 0% ✅
- Security features: 0% 🔒
- UI/UX polish: 0% 🎨

## Design and Planing 🎨 
There wont be mutch of a consius design for the following website, but i do have a basic plan starting with a database:

### Database
The database is a close copy of the original database used in rec-watch 1.0 with only a few small changes that include:
- Changes to names for ease of use and less confusion. Making understanding from a glance easy.
- Changed it so username (brukernavn)has the UNIQUE variable insted insted of nickname (kallenavn) who now has the NOT NULL variable.
- Added anbefaling.er_godkjent to help track if the recommondation should be moved to the watch list or not.  

Planing started on paiper, before being made into a proper model using draw.io.

![databasen laget i draw.io. Viser 4 tabeller som forklares videre under](bilder_md/draw_io_database.png)

### db_role

| Column     | Type    | Description     |
|------------|---------|-----------------|
| db_role_id  | INTEGER | Primary key,autoincrement|
| db_name     | TEXT | -               |

### 🧑‍💻 db_user 

Stores information about users.

| Column      | Type    | Description     |
|-------------|---------|-----------------|
| db_user_id   | INTEGER | Primary key, autoincrement |
| db_username  | TEXT    | must be uniqe   |
| db_password     | TEXT    | cannot be null  |
| db_firstname   | TEXT    | cannot be null  |
| db_lastname | TEXT    | cannot be null         |
| db_email | TEXT    | (not used)         |
| db_rolle_id       |   INTEGER    | FOREIGN KEY |

db_rolle_id connects to db_role, db_role_id

### helpticket

Stores information about the helpdesk tickets sent by users.

| Column       | Type    | Description     |
|--------------|---------|-----------------|
| db_ticket_id     | INTEGER | Primary key, autoincrement|
| db_title         | TEXT    | required           |
| db_discription  | TEXT    | required               |
| db_date| INTEGER| (not used)              |
| db_importance  | TEXT | -               |  
| db_user_id    | INTEGER    | FOREIGN KEY |

db_user_id connects to db_user, db_user_id

### Plan 
The rest of the plan is based of a few other reposetorys. Mainly the following:
* muunuo/serie which is a show tracker where users can recommend shows to other users.
* muunuo/prove_eksamen_002 which is the practice eksam and is a basic website for a school system where users have different access based on their roles.
* hausnes/webutvikling/tree/main/eksempel/nodejs/middleware-sessions-barebones which is the same as the one over, but this one is made by my teatcher insted of me.

## Usage

## Kode 

This time I am coding with Maria.db.

## AI Use

I mainly use two forms of AI. The built-in Copilot that i use mostly for coding related questions where having a full overview of the code is important. And Claude AI which i use for other question and to help me problemsolv. This is to avoid using up my tokens on either one.

The questions asked:

| Question     | Context    | Answer     |
|------------|---------|-----------------|
|Should i translate database names|  | Yes |
| Is there a naming scheme i can use to make database names more clear | afreid of not knowing whats a function and whats from the db | yes. db_name or NAME |
| Needed help getting the role system up and working | A lot of back and forth, but got there in the end. | Helped |
| Asked Claud for some CSS do to time crunch   |  | Clause made CSS |
| Got some help with figuring out why some different code snippets didnt work | always from copilot| Helped |

## Features💡
### Implemented ✅
- ✅ User can create account
- ✅ Users password gets bcrypted 
- ✅ Only one user can have a certin username
- ✅ User can log into existing account
- ✅ Make a form for registering help tickets
    - ✅ Basic info like title and info
    - ❌ Date
    - ✅ Importance  
    - ✅ connect to user who submits them through the session
- ✅ Roles can be assignd by user 
- ✅ Log out works 
- ✅ User can see own info
- ✅ Admin users can access all other accounts info
- ✅ User can register a help ticket 
- ✅ Make a overview where suport can see all tickets
- ✅ People with sertin roles can see tickets 

### To Be Implemented 🚧

- ⬜ User is asigned a role when account is created
    - ◽If assigning admin or support password is requierd??
    - ◽ if no role assigned, automaticly become 'General'
    - ◽Let admin assign roles to other users 
- ⬜ Ticket 
    - ◽ Let user see ticket
    - ◽ let user edit ticket   
    - ◽ let user delete ticket 
- ⬜ Let support asign tickets to self
- ⬜ Let admin asign tickets to self and support
- ⬜ Allow tickets to be cloesd 
- ⬜ Let users delete account

#### Might be wrong
This section will have changes made in verible names, and other thing like that that can cause the code to malfunction.

- ⚠️ Private went from smal p to big P
- ⚠️ Public went from smal p to big P
- ⚠️ Database names are now in english and have db_ in front of them
- ⚠️ Is code Maria.db complient?
- ⚠️ Changed away from nickname and over to first- and lastname 
- ⚠️

### Future Ideas 💡
These are things that I can't impliment for the time being do to either my current skillsett or just lack of time.
* 

## Technology

- **Backend:** Node.js, Express.js
- **Database:** Maria.db
- **Frontend:** HTML, CSS, JavaScript

## Project Structure
To be redone
```
Tverfagelig_Eksamen /

app.js      # Main server file
public/     # Container holding static files (CSS, images, JS) (to be added)
private/  # Container holding files that will be protected
README.md   # This file containing info on the website and development
package.json # Dependencies(to be added)
```
# Sources

### Information

### Code snippets
Hausnes, Jo Bjørnar (2026) "webutvikling" https://github.com/hausnes/webutvikling/tree/main gotten March 2026 




INSERT INTO bruker (brukernavn, passord, fornavn, etternavn, epost, rolle_id)
VALUES ('admin_username', '$2b$10$V.otr4duBhoEX7oN9eVjveuIgKgOxb7cQQ4aRZxNGO334NS7/QkLC', 'Admin', 'User', 'admin@example.com', 1);