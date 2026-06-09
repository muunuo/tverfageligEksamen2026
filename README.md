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

Later made into a actual database with Maria.db.

### 🧑‍💻 User (bruker)

Stores information about users.

| Column      | Type    | Description     |
|-------------|---------|-----------------|
| bruker_id   | INTEGER | Primary key, autoincrement |
| brukernavn  | TEXT    | must be uniqe   |
| passord     | TEXT    | cannot be null  |
| kallenavn   | TEXT    | cannot be null  |
| beskrivelse | TEXT    | -               |
| bilde       | BLOB    | -               |

### 🧑‍💻 Show (serie)

Stores information about shows.

| Column       | Type    | Description     |
|--------------|---------|-----------------|
| serie_id     | INTEGER | Primary key, autoincrement|
| navn         | TEXT    | -               |
| beskrivelse  | TEXT    | -               |
| utgivelses_arr| INTEGER| -               |
| andmeldelse  | INTEGER | -               |  
| bilde        | BLOB    | -               |

### 🧑‍💻 Recommendations (anbefaling)

Stores information about what shows have been recommended to what users.

| Column        | Type       | Description     |
|---------------|---------   |-----------------|
| anbefaling_id | INTEGER    | Primary key,autoincrement|
| kommentar     | TEXT       | -               |
| er_godtatt    | INTEGER    | NULL            |
| serie_id      | INTEGER    | FOREIGN KEY     |
| mottaker_id   | TEXT       | FOREIGN KEY     |
| sender_id     | INTEGER    | FOREIGN KEY     |

showID connects to show idS
senderID connects to user id
reciverID connects to user id

### 🧑‍💻 showStatus (serieStatus)

Shows the "status" of a show. Either "to watch", "have watched", "watching".

| Column     | Type    | Description     |
|------------|---------|-----------------|
| status_id  | INTEGER | Primary key,autoincrement|
| status     | INTEGER | -               |
| bruker_id  | INTEGER | FOREIGN KEY     |
| serie_id   | INTEGER | FOREIGN KEY     |

idS connects to show idS
idB connects to user id

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

| Question     | Context    | Answer from Claud     |
|------------|---------|-----------------|
|Should i translate database names|  | Yes |
| Is there a naming scheme i can use to make database names more clear | afreid of not knowing whats a function and whats from the db | yes. db_name or NAME |
|  |  |  |
|    |  |  |

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

### To Be Implemented 🚧

- ⬜ User is asigned a role when account is created
- ◽If assigning admin or support password is requierd??
    - ◽ if no role assigned, automaticly become 'General'
    - ◽Let admin assign roles to other users 
- ⬜ Admin users can access all other accounts info
- ⬜ User can register a help ticket 
- ⬜ People with sertin roles can see tickets 
- ⬜ Ticket 
    - ◽ Let user see ticket
    - ◽ let user edit ticket   
    - ◽ let user delete ticket 
- ⬜ Make a overview where suport can see all tickets
- ⬜ Let support asign tickets to self
- ⬜ Let admin asign tickets to self and support
- ⬜ Allow tickets to be cloesd 
- ⬜ Let users delete account
- ⬜ 
   #### Important ⚠️
- ⬜ 
- ⬜ 
  - ◽ 

   #### Fix 🛠
- ⚠️

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