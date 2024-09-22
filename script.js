document.addEventListener('DOMContentLoaded', function() {
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            document.querySelector('#about p').textContent = data.about;
            document.querySelector('#importance p').textContent = data.importance;
            document.querySelector('#contribute p').textContent = data.contribute;

            const templatesSection = document.getElementById('templates');
            data.templates.forEach((template, index) => {
                const templateDiv = templatesSection.querySelectorAll('.template')[index];
                templateDiv.querySelector('pre code').textContent = template.content;
                templateDiv.querySelector('.example').textContent = template.example;
            });
        })
        .catch(error => console.error('Error loading content:', error));
});
