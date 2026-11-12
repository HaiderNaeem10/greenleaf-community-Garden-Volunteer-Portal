import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/client';

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {

    e.preventDefault();

    setMessage('');
    setLoading(true);

    // Step 1: Verify email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setMessage('Invalid email or password.');
      setLoading(false);
      return;
    }

    // Step 2: Check whether user is an authorized admin
    const { data: adminRecord, error: adminError } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', data.user.id)
      .maybeSingle();

    // Step 3: Reject users who are not admins
    if (adminError || !adminRecord) {

      await supabase.auth.signOut();

      setMessage('Access denied! You are not an authorized admin.');

      setLoading(false);
      return;
    }

    // Step 4: Allow authorized admin
    setLoading(false);

    navigate('/admin-dashboard');

  }

  return (
    <div className="admin-login">

      <h2>Admin Login</h2>

      <p>GreenLeaf Community Garden</p>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

      </form>

      {message && <p>{message}</p>}

    </div>
  );
}

export default AdminLogin;