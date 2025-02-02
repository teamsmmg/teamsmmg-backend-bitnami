document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token'); // Assume token is stored after login
    if (!token) return window.location.href = '/frontend/login.html'; // Redirect if not logged in
  
    // Ensure user can't go back to login after successful login
    history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', () => {
      history.pushState(null, null, window.location.href);
    });
  
    try {
      const response = await fetch('http://localhost:3000/api/dashboard', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        alert('Failed to load dashboard data');
        return window.location.href = '/frontend/login.html';
      }
  
      const data = await response.json();
  
      // Populate dashboard data dynamically
      document.getElementById('user-name').textContent = data.name;
      document.getElementById('user-email').textContent = data.email;
      document.getElementById('projects-done').textContent = `Projects Done: ${data.totalProjectsDone}`;
      document.getElementById('user-image').src = data.image;
  
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      alert('An error occurred. Please log in again.');
      window.location.href = '/frontend/login.html';
    }
  });
  