document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.querySelector('.language-switcher select');
    let currentLanguage = 'ckb'; // Default language

    function loadContent(lang) {
        fetch(`content_${lang}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                document.querySelector('#about p').textContent = data.about;
                document.querySelector('#importance p').textContent = data.importance;
                document.querySelector('#contribute p').textContent = data.contribute;

                const templatesSection = document.getElementById('templates');
                data.templates.forEach((template, index) => {
                    const templateArticle = templatesSection.querySelectorAll('.template')[index];
                    if (templateArticle) {
                        templateArticle.querySelector('pre code').textContent = template.content;
                        templateArticle.querySelector('.example').innerHTML = template.example;
                    }
                });

                // Update the page title and meta description
                document.title = data.pageTitle;
                document.querySelector('meta[name="description"]').setAttribute('content', data.metaDescription);
            })
            .catch(error => {
                console.error('Error loading content:', error);
                // Display an error message to the user
                document.body.innerHTML += `<div class="error-message">Error loading content. Please try again later.</div>`;
            });
    }

    // Initial content load
    loadContent(currentLanguage);

    // Language switcher functionality
    languageSelector.addEventListener('change', function() {
        currentLanguage = this.value;
        loadContent(currentLanguage);
        document.documentElement.lang = currentLanguage;
        document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    });
});
