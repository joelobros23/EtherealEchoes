document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');

    const fetchPosts = async () => {
        try {
            const response = await fetch('api/get_posts.php');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            if (data.success) {
                displayPosts(data.posts);
            } else {
                console.error('Error fetching posts:', data.message);
                postsContainer.innerHTML = `<p class="error-message">Error: ${data.message}</p>`;
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            postsContainer.innerHTML = '<p class="error-message">Failed to load posts. Please try again later.</p>';
        }
    };

    const displayPosts = (posts) => {
        postsContainer.innerHTML = ''; // Clear existing posts

        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');

            // Create elements for post content
            const usernameElement = document.createElement('h3');
            usernameElement.textContent = post.username; // Assuming the API returns username

             // Add profile picture
            const profilePictureElement = document.createElement('img');
            profilePictureElement.src = 'uploads/' + post.profile_picture;
            profilePictureElement.alt = `${post.username}'s Profile Picture`;
            profilePictureElement.classList.add('profile-picture-small');

            const contentElement = document.createElement('p');
            contentElement.textContent = post.content;

            const timestampElement = document.createElement('p');
            timestampElement.classList.add('timestamp');
            timestampElement.textContent = formatDate(post.created_at); // Function to format timestamp

            // Append elements to the post div
            postDiv.appendChild(profilePictureElement);
            postDiv.appendChild(usernameElement);
            postDiv.appendChild(contentElement);
            postDiv.appendChild(timestampElement);


            // Add comment section (basic structure)
            const commentSection = document.createElement('div');
            commentSection.classList.add('comment-section');
            commentSection.innerHTML = '<h4>Comments</h4> <div class="comments-container" id="comments-container-' + post.id + '"></div>'; // Placeholder for comments

            postDiv.appendChild(commentSection);

            //Append comment form

            const commentForm = document.createElement('form');
            commentForm.classList.add('comment-form');
            commentForm.innerHTML = `<input type="text" name="comment" placeholder="Add a comment..." required>
                                    <button type="submit">Post</button>`;

            commentForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const commentInput = commentForm.querySelector('input[name="comment"]');
                const commentText = commentInput.value.trim();
                if (commentText) {
                    try {
                        const response = await fetch('api/create_comment.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                postId: post.id,
                                content: commentText
                            })
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }

                        const data = await response.json();

                        if (data.success) {
                            // Refresh comments or add the new comment to the UI
                            loadComments(post.id);
                            commentInput.value = ''; // Clear the input
                        } else {
                            console.error('Error creating comment:', data.message);
                            alert('Error creating comment: ' + data.message);
                        }


                    } catch (error) {
                         console.error('Error creating comment:', error);
                         alert('Failed to create comment. Please try again later.');
                    }


                }


            });

            postDiv.appendChild(commentForm);


            loadComments(post.id);


            postsContainer.appendChild(postDiv);
        });
    };

    const loadComments = async (postId) => {
        try {
            const response = await fetch(`api/get_comments.php?post_id=${postId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            if (data.success) {
                displayComments(postId, data.comments);
            } else {
                console.error('Error fetching comments:', data.message);
                // Optionally display an error message in the comment section
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
            // Optionally display an error message in the comment section
        }

    };


    const displayComments = (postId, comments) => {
        const commentsContainer = document.getElementById(`comments-container-${postId}`);
        commentsContainer.innerHTML = ''; // Clear existing comments

        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `<p><strong>${comment.username}:</strong> ${comment.content} <span class="timestamp">${formatDate(comment.created_at)}</span></p>`; // Assuming the API returns username for comments
            commentsContainer.appendChild(commentDiv);
        });
    };


    // Helper function to format timestamp (example)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString(undefined, options);
    };


    // Initial load of posts
    fetchPosts();
});