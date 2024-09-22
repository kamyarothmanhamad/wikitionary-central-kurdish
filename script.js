document.addEventListener('DOMContentLoaded', function() {
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById('content');
            data.entries.forEach(entry => {
                const entryDiv = document.createElement('div');
                entryDiv.className = 'entry';
                entryDiv.innerHTML = `
                    <p class="word">${entry.word}</p>
                    <p class="definition">${entry.definition}</p>
                    <p class="example">نموونە: ${entry.example}</p>
                `;
                contentDiv.appendChild(entryDiv);
            });
        })
        .catch(error => console.error('Error loading content:', error));
});
