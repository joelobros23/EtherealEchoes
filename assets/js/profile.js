document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    if (userId) {
        fetchUserProfile(userId);
    } else {
        // If no user ID is provided in the URL, redirect to home or show an error
        window.location.href = 'home.html'; // Or display an error message
    }

    async function fetchUserProfile(userId) {
        try {
            const response = await fetch(`api/get_user_profile.php?id=${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.success) {
                displayUserProfile(data.user);
            } else {
                console.error('Error fetching profile:', data.message);
                // Display an error message on the page
                document.getElementById('profile-container').innerHTML = `<p class="error-message">Error: ${data.message}</p>`;
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            // Display a generic error message on the page
            document.getElementById('profile-container').innerHTML = `<p class="error-message">Failed to load profile.</p>`;
        }
    }

    function displayUserProfile(user) {
        const profileContainer = document.getElementById('profile-container');
        profileContainer.innerHTML = `
            <div class="profile-header">
                <img src="uploads/${user.profile_picture}" alt="Profile Picture" class="profile-picture">
                <h1>${user.username}</h1>
            </div>
            <div class="profile-details">
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Bio:</strong> ${user.bio || 'No bio provided.'}</p>
                <p><strong>Joined:</strong> ${new Date(user.created_at).toLocaleDateString()}</p>
            </div>
        `;

        // Add Edit Profile button if the logged-in user is viewing their own profile
        const loggedInUserId = localStorage.getItem('user_id');
        if (loggedInUserId && parseInt(loggedInUserId) === parseInt(userId)) {
            const editButton = document.createElement('a');
            editButton.href = 'edit_profile.html';
            editButton.textContent = 'Edit Profile';
            editButton.classList.add('button');
            profileContainer.appendChild(editButton);
        } else {
            //Implement Follow/Unfollow button for other users profiles.
            const followButton = document.createElement('button');
            followButton.id = 'follow-button';
            followButton.classList.add('button');
            profileContainer.appendChild(followButton);

            const updateFollowButton = async () => {
                try {
                    const response = await fetch(`api/get_following.php?follower_id=${loggedInUserId}`);
                    const data = await response.json();

                    if (data.success) {
                        const isFollowing = data.following.some(following => parseInt(following.following_id) === parseInt(userId));
                        followButton.textContent = isFollowing ? 'Unfollow' : 'Follow';
                        followButton.dataset.following = isFollowing;
                    }
                    else {
                        console.error("Couldn't retrieve following list.");
                        followButton.textContent = 'Follow';
                        followButton.dataset.following = false;
                    }
                }
                catch (error) {
                    console.error("Error checking follow status:", error);
                    followButton.textContent = 'Follow';
                    followButton.dataset.following = false;
                }
            }

            updateFollowButton();

            followButton.addEventListener('click', async () => {
                const isFollowing = followButton.dataset.following === 'true';
                const apiEndpoint = isFollowing ? 'api/unfollow_user.php' : 'api/follow_user.php';

                try {
                    const response = await fetch(apiEndpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            follower_id: loggedInUserId,
                            following_id: userId
                        })
                    });

                    const data = await response.json();

                    if (data.success) {
                        //Toggle the button text and update dataset
                        const newFollowingState = !isFollowing;
                        followButton.textContent = newFollowingState ? 'Unfollow' : 'Follow';
                        followButton.dataset.following = newFollowingState;
                    }
                    else {
                        console.error(`Failed to ${isFollowing ? 'unfollow' : 'follow'} user:`, data.message);
                    }
                }
                catch (error) {
                    console.error(`Error ${isFollowing ? 'unfollowing' : 'following'} user:`, error);
                }
            });
        }


    }
});