document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) return window.location.href = '/frontend/login.html';

  // Prevent navigating back to login
  history.pushState(null, null, window.location.href);
  window.addEventListener('popstate', () => {
    history.pushState(null, null, window.location.href);
  });

  try {
    const response = await fetch('https://bharatagrawal.shop:3000/api/dashboard', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to load dashboard data:', response.statusText);
      alert('Failed to load dashboard data, please try again.');
      return window.location.href = '/frontend/login.html';
    }

    const data = await response.json();

    document.getElementById('user-name').textContent = data.name;
    document.getElementById('user-email').textContent = data.email;
    document.getElementById('user-role').textContent = data.roleInTeam;
    const imageUrl = data.profilePhoto;

    // Get the image element by its ID and set the src attribute
    const imageElement = document.getElementById('user-image');
    if (imageUrl) {
      imageElement.src = imageUrl;
    } else {
      imageElement.src = 'default-profile-photo.jpg'; // Default image
    }

    document.getElementById('user-skills').textContent = data.skills.join(', ');

    // Render projects dynamically
    const projectsContainer = document.getElementById('projects-container');
    data.projects.forEach(project => {
      const projectElement = document.createElement('div');
      projectElement.classList.add('project');
      projectElement.innerHTML = `
        <div class="card project-card">
                    <div class="card-body">
                     <img src="${project.image}" alt="Project Image">
                        <h3 class="card-title">${project.heading}</h3>
                      
                         <a href="${project.link}" class="card-text" target="_blank">View Project</a>
                        <p class="card-text">Description: ${project.description}</p>
                       
                    </div>
                </div>
      `;
      projectsContainer.appendChild(projectElement);
    });

    // Render attendance
    const attendanceList = document.getElementById('attendance-list');
    data.attendance.forEach(date => {
      const listItem = document.createElement('li');
      listItem.textContent = date;
      attendanceList.appendChild(listItem);
    });

    // Render leave requests
    const leaveRequestsList = document.getElementById('leave-requests-list');
    data.leaveRequests.forEach(request => {
      const listItem = document.createElement('li');
      listItem.textContent = `${request.date} - ${request.reason}`;
      leaveRequestsList.appendChild(listItem);
    });

    // Render project guidelines
    const projectGuidelinesList = document.getElementById('project-guidelines-list');
    data.projectGuidelines.forEach(guide => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${guide.projectName}</strong> - ${guide.yourWork} (Deadline: ${guide.deadline})<br>
        Required Links: ${guide.requiredLinks.map(link => `<a href="${link}" target="_blank">${link}</a>`).join(', ')}
      `;
      projectGuidelinesList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    alert('An error occurred. Please log in again.');
    window.location.href = '/frontend/login.html';
  }
});
