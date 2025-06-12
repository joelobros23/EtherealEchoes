# Project Plan: EtherealEchoes

**Description:** A social networking website centered around sharing inspiring quotes, personal reflections, and fostering thoughtful discussions. Users can create profiles, share posts (text only), follow other users, and engage in comment threads.


## Development Goals

- [ ] Design and create the database schema (database.sql) with tables for users, posts, followers, and comments.
- [ ] Set up the database connection (api/config.php).
- [ ] Implement user registration functionality (api/register.php, register.html, assets/js/auth.js).
- [ ] Implement user login functionality (api/login.php, index.html, assets/js/auth.js).
- [ ] Implement user logout functionality (api/logout.php, assets/js/auth.js).
- [ ] Build the main homepage (home.html) with a feed of posts from followed users.
- [ ] Implement fetching and displaying posts (api/get_posts.php, assets/js/main.js).
- [ ] Implement creating new posts (api/create_post.php, home.html, assets/js/main.js).
- [ ] Design and implement user profiles (profile.html) to display user information and posts.
- [ ] Implement fetching and displaying user profile data (api/get_user_profile.php, assets/js/profile.js).
- [ ] Implement following and unfollowing users (api/follow_user.php, api/unfollow_user.php, assets/js/profile.js).
- [ ] Display followers and following lists (api/get_followers.php, api/get_following.php, profile.html, assets/js/profile.js).
- [ ] Implement the ability to edit user profile information (api/update_profile.php, edit_profile.html, assets/js/profile.js). Include upload functionality for profile pictures.
- [ ] Implement comment functionality on posts (api/create_comment.php, api/get_comments.php, home.html, assets/js/main.js).
- [ ] Style the website using Tailwind CSS (assets/css/style.css) for a consistent and responsive design.
- [ ] Implement error handling and validation for all forms and API endpoints.
- [ ] Implement security measures to protect user data, including password hashing and input sanitization.
