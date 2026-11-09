GreenLeaf Community Garden Volunteer Portal

Overview

GreenLeaf Community Garden Volunteer Portal is a React-based web application designed to connect people with community gardening activities.

The portal allows users to explore upcoming garden events and register as volunteers. Supabase is used as the backend database to store and retrieve event and volunteer information.

Features

- Responsive homepage with GreenLeaf branding.
- Home, Events, and Volunteer navigation.
- Dynamic events fetched directly from Supabase.
- Volunteer registration form.
- Event selection dropdown populated from Supabase.
- Form validation using React useState.
- Volunteer information stored in Supabase.
- Confirmation message after successful registration.
- Supabase authentication support.
- Responsive design for mobile screens.

Technologies Used

- React.js
- HTML5
- CSS3
- JavaScript
- React Router
- Supabase
- PostgreSQL
- GitHub
- Netlify

Task 2: Dynamic Events Page Using Supabase

The static events list was replaced with a dynamic Events page that retrieves event records directly from the Supabase database.

Implementation

1. Created an Events component using React.
2. Initialized the Supabase client using environment variables.
3. Used the Supabase JavaScript client to retrieve event records.
4. Stored retrieved events in React state using useState.
5. Used useEffect to fetch events when the component loads.
6. Displayed event titles, dates, descriptions, and locations.
7. Implemented loading and error states.
8. Added a Try Again button if fetching events fails.
9. Removed the old hard-coded events JSON file.

Supabase Endpoint

Project URL:

https://fonkootdsjrdykzuxxpd.supabase.co

Database table: "events"

Data retrieval query:

const { data, error } = await supabase
  .from("events")
  .select("*")
  .order("date", { ascending: true });

The Events page automatically displays records stored in the Supabase "events" table.

Database Structure

The project uses two database tables:

1. Events

Stores:

- Event ID
- Event title
- Event date
- Description
- Location

2. Volunteers

Stores:

- Volunteer ID
- Name
- Email
- Phone
- Selected event

The database schema is available in "schema.sql".

Supabase Configuration

1. Create a Supabase project.
2. Get your Supabase Project URL and Publishable Key.
3. Create a ".env.local" file in the project root.
4. Add the following environment variables:

REACT_APP_SUPABASE_URL=your_supabase_url

REACT_APP_SUPABASE_ANON_KEY=your_supabase_publishable_key

5. Save the file.
6. Restart the React development server.

Security Note: Never upload ".env.local" or Supabase secret/service-role keys to GitHub.

Local Setup

Follow these steps to run the project locally:

1. Install Node.js.
2. Clone this repository.
3. Open the project folder in VS Code.
4. Open the terminal.
5. Install dependencies:

npm install

6. Configure your ".env.local" file with Supabase credentials.
7. Start the development server:

npm start

8. Open the local URL displayed in your terminal.

Project Screenshot

Upcoming Garden Events

Add your Events page screenshot here.

Save the screenshot inside your project in a folder named "screenshots", using the filename "events-page.png".

Then add this Markdown:

![GreenLeaf Events Page](public/screenshots/events-page.png)

Deployment

The project is deployed using Netlify.

GitHub is connected to Netlify for automatic deployment whenever new changes are pushed to the repository.

Live Link

https://guileless-starlight-28451c.netlify.app

Developer

Haider Naeem

Software Engineering Student