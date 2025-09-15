import React, { useEffect, useState } from 'react';

// Simple admin check (replace with real auth in production)
const ADMIN_PASSWORD = 'admin123'; // Change this to your own password

function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [auth, setAuth] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (auth) {
      fetch('/admin/contacts', {
        headers: {
          'Authorization': `Bearer ${ADMIN_PASSWORD}`,
        },
      })
        .then(res => {
          if (!res.ok) throw new Error('Unauthorized');
          return res.json();
        })
        .then(data => setContacts(data))
        .catch(() => setError('Unauthorized'));
    }
  }, [auth]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      setAuth(true);
      setError('');
    } else {
      setError('Incorrect password.');
    }
  };

  if (!auth) {
    return (
      <div style={{maxWidth: 400, margin: '4rem auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.10)', color: '#000'}}>
        <h2 style={{color:'#000'}}>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input type="password" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter admin password" style={{width: '100%', padding: 8, marginBottom: 12}} />
          <button type="submit" style={{padding: '8px 18px'}}>Login</button>
        </form>
        {error && <div style={{color: 'red'}}>{error}</div>}
      </div>
    );
  }

  return (
    <div style={{maxWidth: 800, margin: '2rem auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.10)', color: '#000'}}>
      <h2 style={{color:'#000'}}>Contact Submissions</h2>
      {contacts.length === 0 ? (
        <div>No submissions yet.</div>
      ) : (
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr>
              <th style={{borderBottom: '1px solid #ccc', padding: 8}}>Name</th>
              <th style={{borderBottom: '1px solid #ccc', padding: 8}}>Email</th>
              <th style={{borderBottom: '1px solid #ccc', padding: 8}}>Message</th>
              <th style={{borderBottom: '1px solid #ccc', padding: 8}}>Date</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c, i) => (
              <tr key={i}>
                <td style={{borderBottom: '1px solid #eee', padding: 8}}>{c.name}</td>
                <td style={{borderBottom: '1px solid #eee', padding: 8}}>{c.email}</td>
                <td style={{borderBottom: '1px solid #eee', padding: 8}}>{c.message}</td>
                <td style={{borderBottom: '1px solid #eee', padding: 8}}>{new Date(c.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminContacts;
