/* Portfolio demo. Replace the sample profile details and rotate demo credentials before deployment. */
const $ = (selector) => document.querySelector(selector);
const STORAGE_KEY = 'portfolio_messages_v1';
const themeToggle = $('#themeToggle');
const savedTheme = localStorage.getItem('portfolio_theme');
if (savedTheme === 'dark') document.body.classList.add('dark');
function updateThemeIcon(){ themeToggle.textContent = document.body.classList.contains('dark') ? '☀' : '☾'; }
updateThemeIcon();
themeToggle.addEventListener('click', () => { document.body.classList.toggle('dark'); const theme = document.body.classList.contains('dark') ? 'dark' : 'light'; localStorage.setItem('portfolio_theme', theme); updateThemeIcon(); });
$('#year').textContent = new Date().getFullYear();
function getMessages(){ try { const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); return Array.isArray(value) ? value : []; } catch { return []; } }
function showStatus(el, message, isError=false){ el.textContent = message; el.style.color = isError ? '#d94b58' : 'var(--accent)'; }
$('#contactForm').addEventListener('submit', async (event) => {
  event.preventDefault(); const form = event.currentTarget; const data = Object.fromEntries(new FormData(form).entries());
  const message = { id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())), ...data, timestamp: new Date().toISOString() };
  const status = $('#formStatus');
  // When Apps Script is configured, submit to the Sheet endpoint. The endpoint URL is configured below.
  if (APPS_SCRIPT_URL) {
    try { await fetch(APPS_SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(message) }); showStatus(status, 'Thanks! Your message has been submitted.'); form.reset(); return; }
    catch (error) { console.error(error); showStatus(status, 'Could not reach the online service. Saving in this browser instead.'); }
  }
  const messages = getMessages(); messages.unshift(message); localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); showStatus(status, 'Thanks! Message saved in this browser.'); form.reset();
});
// Paste your deployed Apps Script web-app URL here to enable Sheet submission.
const APPS_SCRIPT_URL = '';
// Demo-only client-side gate: not secure authentication. Use a server-side identity provider for real private data.
const DEMO_USERNAME = 'admin';
const DEMO_PASSWORD = 'Portfolio@123';
$('#loginForm').addEventListener('submit', (event) => { event.preventDefault(); const user = $('#adminUser').value.trim(); const pass = $('#adminPass').value; if (user === DEMO_USERNAME && pass === DEMO_PASSWORD) { sessionStorage.setItem('portfolio_admin_demo', 'yes'); showAdmin(); showStatus($('#loginStatus'), 'Signed in.'); } else showStatus($('#loginStatus'), 'Incorrect username or password.', true); });
function showAdmin(){ $('#loginPanel').classList.add('hidden'); $('#responsesPanel').classList.remove('hidden'); renderMessages(); }
function hideAdmin(){ $('#responsesPanel').classList.add('hidden'); $('#loginPanel').classList.remove('hidden'); sessionStorage.removeItem('portfolio_admin_demo'); $('#adminPass').value=''; }
function renderMessages(){ const list = $('#responseList'); const messages = getMessages(); list.replaceChildren(); if (!messages.length) { $('#responseStatus').textContent = 'No browser-stored messages yet.'; return; } $('#responseStatus').textContent = `${messages.length} message(s) stored in this browser.`; for (const item of messages) { const article = document.createElement('article'); article.className='response-card'; const heading = document.createElement('h4'); heading.textContent = item.name || 'No name'; const email = document.createElement('p'); email.textContent = item.email || ''; const subject = document.createElement('p'); subject.textContent = item.subject || ''; const body = document.createElement('p'); body.textContent = item.message || ''; const time = document.createElement('time'); const date = new Date(item.timestamp); time.dateTime = item.timestamp || ''; time.textContent = Number.isNaN(date.getTime()) ? 'Time unavailable' : date.toLocaleString(); article.append(heading,email,subject,body,time); list.append(article); } }
$('#logoutBtn').addEventListener('click', hideAdmin);
if (sessionStorage.getItem('portfolio_admin_demo') === 'yes') showAdmin();
