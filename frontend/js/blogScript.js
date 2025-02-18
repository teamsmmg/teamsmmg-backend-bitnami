document.addEventListener('DOMContentLoaded', () => {
  const blogContainer = document.getElementById('blog-container');

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
                  <button class="read-more" data-id="${blog._id}">Read More</button>
                  <p>Published on: ${new Date(blog.publishDate).toDateString()}</p>
                  <p>Author: <a href="${blog.author.profileLink}" target="_blank">${blog.author.name}</a></p>
              `;

              // "Read More" बटन पर क्लिक इवेंट जोड़ें
              blogCard.querySelector('.read-more').addEventListener('click', (event) => {
                  const blogId = event.target.getAttribute('data-id');
                  localStorage.setItem('selectedBlogId', blogId);  // ID को localStorage में सेव करें
                  window.location.href = "individualblog.html";  // अगले पेज पर भेजें
              });

              blogContainer.appendChild(blogCard);
          });
      })
      .catch(error => console.error('Error fetching blogs:', error));
});
