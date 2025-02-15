document.addEventListener('DOMContentLoaded', () => {
    const blogContainer = document.getElementById('blog-container');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-blog-details');
    const closeModalBtn = document.getElementById('close-modal');
  
    // Fetch all blogs
    fetch('https://bharatagrawal.shop:3000/api/blogs')
      .then(response => response.json())
      .then(blogs => {
        blogs.forEach(blog => {
          const blogCard = document.createElement('div');
          blogCard.classList.add('blog-card');
  
          blogCard.innerHTML = `
            <img src="${blog.thumbnail}" alt="Thumbnail">
            <h2 class="blog-title">${blog.title}</h2>
            <p class="blog-description">${blog.description.substring(0, 100)}...</p>
            <a href="#" class="read-more" data-id="${blog._id}">Read More</a>
            <p>Published on: ${new Date(blog.publishDate).toDateString()}</p>
            <p>Author: <a href="${blog.author.profileLink}" target="_blank">${blog.author.name}</a></p>
          `;
          blogContainer.appendChild(blogCard);
        });
  
        // Add event listener for "Read More"
        document.querySelectorAll('.read-more').forEach(button => {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            const blogId = e.target.getAttribute('data-id');
            openBlogDetailsModal(blogId);
          });
        });
      })
      .catch(error => console.error('Error fetching blogs:', error));
  
    // Function to fetch and display blog details in modal
    const openBlogDetailsModal = (id) => {
        fetch(`https://bharatagrawal.shop:3000/api/blogs/${id}`)
          .then(response => response.json())
          .then(blog => {
            modalContent.innerHTML = `
              <div class="modal-blog-details">
                <h2 class="modal-title">${blog.title}</h2>
                <img src="${blog.thumbnail}" alt="Thumbnail" class="modal-thumbnail">
                <p class="modal-description">${blog.description}</p>
                <p class="modal-author"><strong>Author:</strong> <a href="${blog.author.profileLink}" target="_blank" class="author-link">${blog.author.name}</a></p>
                <p class="modal-publish-date"><strong>Published on:</strong> ${new Date(blog.publishDate).toDateString()}</p>
              </div>
            `;
            modal.style.display = 'block';
          })
          .catch(error => console.error('Error fetching blog details:', error));
      };
      
  
    // Close modal when user clicks "X"
    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Close modal if user clicks outside the modal
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
  