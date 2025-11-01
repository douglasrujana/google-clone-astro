const VITE_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function handleLogin() {
  const redirectUri = `${window.location.origin}/auth/callback.html`;
  const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${VITE_GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  window.location.href = authUrl;
}

function handleLogout() {
    localStorage.removeItem('user');
    updateUI();
}

function updateUI() {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginButton = document.getElementById('login-button');
    const userMenu = document.getElementById('user-menu');

    if (user) {
        // User is logged in
        loginButton.style.display = 'none';
        userMenu.style.display = 'flex';

        document.getElementById('user-avatar').src = user.avatar;
        document.getElementById('user-name').textContent = user.name;
        document.getElementById('user-email').textContent = user.email;
        
        const logoutButton = document.getElementById('logout-button');
        // Remove old listener to prevent duplicates, then add the new one
        logoutButton.replaceWith(logoutButton.cloneNode(true));
        document.getElementById('logout-button').addEventListener('click', handleLogout);

    } else {
        // User is logged out
        loginButton.style.display = 'block';
        userMenu.style.display = 'none';
    }
}

function initAuth() {
  const loginButton = document.getElementById('login-button');
  if (loginButton) {
    loginButton.addEventListener('click', handleLogin);
  }
  // Check login status on every page load
  updateUI();
}

export { initAuth };