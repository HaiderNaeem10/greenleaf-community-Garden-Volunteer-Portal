# GreenLeaf Community Garden Volunteer Portal

verview

GreenLeaf Community Garden Volunteer Portal is a React-based web application designed to connect people with community gardening activities.

The portal allows users to explore community garden events and register as volunteers. Supabase is used as the backend database to store events and volunteer information.

Features

* Responsive homepage with GreenLeaf branding.
* Home, Events, and Volunteer navigation.
* Dynamic events fetched from Supabase.
* Volunteer registration form.
* Event selection dropdown fetched from Supabase.
* Form validation using React useState.
* Volunteer information stored in Supabase database.
* Confirmation message after successful registration.
* Email and password authentication enabled in Supabase.
* Responsive design for mobile screens.

Technologies Used

* React.js
* HTML5
* CSS3
* JavaScript
* React Router
* Supabase
* PostgreSQL
* GitHub
* Netlify

Database Structure

The project uses two database tables:

1. Events: Stores event information such as title, date, description, and location.
2. Volunteers: Stores volunteer information such as name, email, phone, and selected event.

The database schema is available in the schema.sql file.

Supabase Configuration

1. Create a Supabase project.
2. Get your Supabase Project URL and Publishable Key.
3. Create a .env.local file in the project root.
4. Add the following variables:

REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_publishable_key

5. Save the file and restart the React development server.

Note: Never upload .env.local or secret keys to GitHub.

Local Setup

Follow these steps to run the project locally:

1. Install Node.js.
2. Clone this repository.
3. Open the project folder in VS Code.
4. Open the terminal.
5. Run:
    npm install
6. Configure your .env.local file with Supabase credentials.
7. Start the development server:
    npm start
8. Open http://localhost:3000 in your browser.

Deployment

The project is deployed using Netlify.

GitHub is connected to Netlify for automatic deployment whenever new changes are pushed to the repository.

Live Link

https://guileless-starlight-28451c.netlify.app

Developer

Haider Naeem

Software Engineering Student