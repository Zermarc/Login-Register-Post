function handlePost() {
    const topic = document.getElementById('postTopic').value;
    const content = document.getElementById('postContent').value;
    
    if (topic && content) {
        const postsDiv = document.getElementById('posts');
        const postElement = document.createElement('div');
        postElement.innerHTML = `
            <div style="background: white; margin: 1rem 0; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3>${topic}</h3>
                <p>${content}</p>
            </div>
        `;
        postsDiv.prepend(postElement);
        
        document.getElementById('postTopic').value = '';
        document.getElementById('postContent').value = '';
    }
}