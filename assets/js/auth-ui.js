/* ==========================================================================
   PetsMart Auth UI helpers
   Updates the navbar login/logout control on every page and wires up
   password show/hide toggles. Include after auth.js.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', async function () {
  if (!window.PMAuth) return;
  await PMAuth.ready;

  // Password show/hide toggles (used on login/register/admin)
  document.querySelectorAll('.toggle-password').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      const isPw = input.type === 'password';
      input.type = isPw ? 'text' : 'password';
      btn.innerHTML = isPw
        ? '<i class="fas fa-eye-slash" aria-hidden="true"></i>'
        : '<i class="fas fa-eye" aria-hidden="true"></i>';
    });
  });

  // Update navbar auth link to reflect session state
  const navAuthLink = document.getElementById('navAuthLink');
  if (navAuthLink) {
    const session = PMAuth.getSession();
    if (session) {
      const label = session.role === 'admin' ? session.name.split(' ')[0] : 'My Account';
      navAuthLink.innerHTML = `<i class="fas fa-user-circle" aria-hidden="true"></i> ${label}`;
      navAuthLink.href = session.role === 'admin' ? 'admin.html' : 'my-orders.html?view=account';
      navAuthLink.setAttribute('title', `Logged in as ${session.name} (${session.email})`);

      if (session.role !== 'admin') {
        if (!document.getElementById('navOrdersLink')) {
          const ordersLink = document.createElement('a');
          ordersLink.id = 'navOrdersLink';
          ordersLink.href = 'my-orders.html?view=orders';
          ordersLink.className = 'btn-pet btn-pet-outline btn-pet-sm me-2';
          ordersLink.innerHTML = '<i class="fas fa-box" aria-hidden="true"></i> My Orders';
          navAuthLink.insertAdjacentElement('beforebegin', ordersLink);
        }
      }

      // Add a logout button next to it if not already present
      if (!document.getElementById('navLogoutBtn')) {
        const logoutBtn = document.createElement('button');
        logoutBtn.type = 'button';
        logoutBtn.id = 'navLogoutBtn';
        logoutBtn.className = 'btn-pet btn-pet-outline btn-pet-sm ms-2';
        logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt" aria-hidden="true"></i>';
        logoutBtn.setAttribute('aria-label', 'Log out');
        logoutBtn.addEventListener('click', function () {
          PMAuth.logout();
          window.location.href = 'login.html';
        });
        navAuthLink.insertAdjacentElement('afterend', logoutBtn);
      }
    }
  }
});
