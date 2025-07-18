const API_URL = 'http://localhost:5000/api/contacts';

const form = document.getElementById('contact-form');
const list = document.getElementById('contact-list');

async function loadContacts() {
  const res = await fetch(API_URL);
  const contacts = await res.json();

  list.innerHTML = '';
  contacts.forEach(contact => {
    const div = document.createElement('div');
    div.className = 'contact';
    div.innerHTML = `
      <p><strong>${contact.name}</strong><br>${contact.phone}<br>${contact.email}</p>
      <button onclick="deleteContact(${contact.id})">Delete</button>
    `;
    list.appendChild(div);
  });
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const name = form.name.value;
  const phone = form.phone.value;
  const email = form.email.value;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, email })
  });

  form.reset();
  loadContacts();
});

async function deleteContact(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadContacts();
}

loadContacts();
