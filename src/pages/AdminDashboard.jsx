import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/client';

function AdminDashboard() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');

  const [volunteers, setVolunteers] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('All');

  const [volunteerLoading, setVolunteerLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Statistics
  const [totalEvents, setTotalEvents] = useState(0);

  // Search
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch volunteer records and event information
  async function fetchVolunteers() {

    setVolunteerLoading(true);
    setErrorMessage('');

    const { data: volunteerData, error: volunteerError } = await supabase
      .from('volunteers')
      .select('*')
      .order('created_at', { ascending: false });

    if (volunteerError) {
      setErrorMessage(volunteerError.message);
      setVolunteerLoading(false);
      return;
    }

    const { data: eventData, error: eventError } = await supabase
      .from('events')
      .select('id, title');

    if (eventError) {
      setErrorMessage(eventError.message);
      setVolunteerLoading(false);
      return;
    }

    setTotalEvents(eventData.length);

    const updatedVolunteers = volunteerData.map((volunteer) => {

      const event = eventData.find(
        (event) => event.id === volunteer.event_id
      );

      return {
        ...volunteer,
        eventTitle: event ? event.title : 'Event not found'
      };

    });

    setVolunteers(updatedVolunteers);
    setVolunteerLoading(false);
  }

  // Check admin access
  const checkAdmin = useCallback(async () => {

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      navigate('/admin-login');
      return;
    }

    const { data: adminRecord, error: adminError } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (adminError || !adminRecord) {
      await supabase.auth.signOut();
      navigate('/admin-login');
      return;
    }

    setAdminEmail(user.email);

    await fetchVolunteers();

    setLoading(false);

  }, [navigate]);

  useEffect(() => {
    checkAdmin();
  }, [checkAdmin]);

  // Logout
  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/admin-login');
  }

  // Search volunteers
  const filteredVolunteers = volunteers.filter((volunteer) => {

    const search = searchTerm.toLowerCase();

    return (
      volunteer.name?.toLowerCase().includes(search) ||
      volunteer.email?.toLowerCase().includes(search) ||
      volunteer.phone?.toLowerCase().includes(search) ||
      volunteer.eventTitle?.toLowerCase().includes(search)
    );

  });

  // Filter volunteers by selected event
const eventFilteredVolunteers = filteredVolunteers.filter((volunteer) => {
  if (selectedEvent === 'All') return true;

  return volunteer.eventTitle === selectedEvent;
});

  // Export volunteers to CSV
  function exportVolunteers() {

    if (volunteers.length === 0) {
      alert('No volunteer records available to export.');
      return;
    }

    const headers = ['Name', 'Email', 'Phone', 'Event Name'];

    const rows = volunteers.map((volunteer) => [
      volunteer.name,
      volunteer.email,
      volunteer.phone || 'Not provided',
      volunteer.eventTitle
    ]);

    const csvContent = [
        headers,
        ...rows
    ].map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = 'greenleaf-volunteers.csv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  if (loading) {
    return <h2>Checking Admin Access...</h2>;
  }

  return (

    <div className="admin-dashboard">

      <h1>GreenLeaf Admin Dashboard 🌿</h1>

      <p>Welcome, {adminEmail}</p>

      <button onClick={handleLogout}>
        Logout
      </button>

      {/* Statistics */}

      <div className="admin-stats">

        <div className="stat-card">
          <h3>Total Volunteers</h3>
          <p>{volunteers.length}</p>
        </div>

        <div className="stat-card">
          <h3>Total Events</h3>
          <p>{totalEvents}</p>
        </div>

        <div className="stat-card">
          <h3>Total Registrations</h3>
          <p>{volunteers.length}</p>
        </div>

      </div>

      <h2>Volunteer Overview</h2>

      {/* Search */}

      <input
        type="text"
        placeholder="Search volunteers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="volunteer-search"
      />

      <select
  value={selectedEvent}
  onChange={(e) => setSelectedEvent(e.target.value)}
  className="volunteer-search"
>
  <option value="All">All Events</option>

  {[...new Set(volunteers.map((v) => v.eventTitle))]
    .filter(Boolean)
    .map((event) => (
      <option key={event} value={event}>
        {event}
      </option>
    ))}
</select>

      {/* Export */}

      <button
        className='export-csv-btn'
        onClick={exportVolunteers}
        disabled={volunteerLoading || !!errorMessage}
      >
        Export Volunteers CSV
      </button>

      {volunteerLoading ? (

        <p>Loading volunteers...</p>

      ) : errorMessage ? (

        <p>{errorMessage}</p>

      ) : volunteers.length === 0 ? (

        <p>No volunteers registered yet.</p>

      ) : filteredVolunteers.length === 0 ? (

        <p>No matching volunteers found.</p>

      ) : (

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Event Name</th>
            </tr>
          </thead>

          <tbody>

            {eventFilteredVolunteers.map((volunteer) => (

              <tr key={volunteer.id}>
                <td>{volunteer.name}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.phone || 'Not provided'}</td>
                <td>{volunteer.eventTitle}</td>
              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );
}

export default AdminDashboard;