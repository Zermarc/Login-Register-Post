function createPostHTML(topic, content, timestamp) {
    return `
        <div class="post-container">
            <div class="post-header">
                <span class="post-timestamp">
                    <i class="far fa-clock"></i>${timestamp}
                </span>
                <i class="fas fa-trash delete-post"></i>
            </div>
            <h3 class="post-title">${topic}</h3>
            <hr class="post-divider">
            <p class="post-content">${content}</p>
        </div>
    `;
}

function handlePost() {
    const topic = document.getElementById('postTopic').value;
    const content = document.getElementById('postContent').value;
    
    if (topic && content) {
        const postsDiv = document.getElementById('posts');
        const postElement = document.createElement('div');
        
        const now = new Date();
        const timestamp = now.toLocaleString('th-TH', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        postElement.innerHTML = createPostHTML(topic, content, timestamp);
        
        // Add click event listener for delete button
        const deleteBtn = postElement.querySelector('.delete-post');
        deleteBtn.addEventListener('mouseover', () => {
            deleteBtn.style.color = '#ff4444';
        });
        deleteBtn.addEventListener('mouseout', () => {
            deleteBtn.style.color = '#888';
        });
        deleteBtn.addEventListener('click', () => {
            postElement.remove();
        });

        postsDiv.prepend(postElement);  
        
        // Clear inputs
        document.getElementById('postTopic').value = '';
        document.getElementById('postContent').value = '';
        document.querySelector('.char-counter').textContent = '0/35';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const topicInput = document.getElementById('postTopic');
    const charCounter = document.querySelector('.char-counter');

    topicInput.addEventListener('input', () => {
        const currentLength = topicInput.value.length;
        charCounter.textContent = `${currentLength}/35`;
    });
});

