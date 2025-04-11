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

        postElement.innerHTML = `
            <div style="background: white; margin: 1rem 0; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative;">
                <div style="position: absolute; top: 1rem; right: 1rem; display: flex; align-items: center; gap: 1rem;">
                    <span style="color: #666; font-size: 0.9rem;">
                        <i class="far fa-clock" style="margin-right: 0.5rem;"></i>${timestamp}
                    </span>
                    <i class="fas fa-trash delete-post" style="
                        cursor: pointer;
                        color: #888;
                        transition: color 0.3s ease;
                        font-size: 1.1rem;
                    "></i>
                </div>
                <h3 style="
                    margin-right: 200px; 
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-bottom: 1rem;
                    color: #333;
                    font-size: 1.4rem;
                ">${topic}</h3>
                <hr style="
                    border: none;
                    height: 1px;
                    background: linear-gradient(to right, #e0e0e0, #f5f5f5);
                    margin: 1rem 0;
                ">
                <p style="
                    white-space: pre-wrap;
                    color: #555;
                    line-height: 1.6;
                ">${content}</p>
            </div>
        `;
        
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

