document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle for all pages
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        // Initialize dark mode 
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
        
        // Toggle functionality
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
    }

     // AJAX Blog Loading
     if (document.querySelector('#loadBlogs')) {
        document.getElementById('loadBlogs').addEventListener('click', function() {
            fetch('blog-content.json')
                .then(response => response.json())
                .then(data => {
                    const blogContainer = document.getElementById('blogContainer');
                    blogContainer.innerHTML = ''; // Clear existing content
                    
                    data.articles.forEach(article => {
                        const articleEl = document.createElement('article');
                        articleEl.innerHTML = `
                            <h2>${article.title}</h2>
                            <p>${article.content}</p>
                            <strong>Referensi:</strong>
                            <a href="${article.reference}" target="_blank">${article.reference}</a>
                        `;
                        blogContainer.appendChild(articleEl);
                    });
                })
                .catch(error => console.error('Error loading blog:', error));
        });
    }

     // Gallery Image Preloading with AJAX
     if (document.querySelector('.gallery')) {
        // Preload images
        const imageUrls = [
            'images/lion.jpg',
            'images/elephant.jpg',
            'images/wolf.jpg',
            'images/eagle.jpg',
            'images/penguin.jpg'
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });

        const images = document.querySelectorAll('.gallery img');
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const closeBtn = document.querySelector('.close');
        
        images.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.src;
                modalImg.alt = this.alt;
            });
        });
        
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

     // AJAX Contact Form Submission
     const contactForm = document.getElementById('contactForm');
     if (contactForm) {
         contactForm.addEventListener('submit', function(e) {
             e.preventDefault();
             const name = document.getElementById('name').value;
             const email = document.getElementById('email').value;
             const message = document.getElementById('message').value;
             
             if (!name || !email || !message) {
                 alert('Please fill in all fields');
                 return;
             }
             
             alert(`Thank you, ${name}! Your message has been received.`);
             contactForm.reset();
         });
     }
 });