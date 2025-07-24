const API_URL = 'http://localhost:5000/api/contacts';

const form = document.getElementById('contact-form');
const list = document.getElementById('contact-list');

let currentlyOpen = null; // Moved outside so it persists between cards

async function loadContacts() {
  const res = await fetch(API_URL);
  const contacts = await res.json();

  list.innerHTML = '';
  contacts.forEach(contact => {
    const card = document.createElement('div');
    card.className = 'contact';

    const name = document.createElement('h3');
    name.textContent = contact.name;
    card.appendChild(name);

    const details = document.createElement('div');
    details.className = 'contact-details';
    details.style.display = 'none';

    const phone = document.createElement('p');
    phone.textContent = `Phone: ${contact.phone}`;
    const email = document.createElement('p');
    email.textContent = `Email: ${contact.email}`;
    details.appendChild(phone);
    details.appendChild(email);

    // WhatsApp button
    const whatsappBtn = document.createElement('button');
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappBtn.title = "whatsapp";
    whatsappBtn.onclick = (e) => {
      e.stopPropagation();
      let phoneNumber = contact.phone.replace(/\D/g, '');
      if (phoneNumber.startsWith('0')) {
        phoneNumber = '92' + phoneNumber.slice(1);
      }
      window.open(`https://wa.me/${phoneNumber}`, '_blank');
    };

    // Email button
    const messageBtn = document.createElement('button');
    messageBtn.innerHTML = '<i class="fas fa-envelope"></i>';
    messageBtn.title = "Email";
    messageBtn.onclick = (e) => {
      e.stopPropagation();
      window.location.href = `mailto:${contact.email}`;
    };

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    delBtn.title = "Delete";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteContact(contact.id);
    };

    details.appendChild(whatsappBtn);
    details.appendChild(messageBtn);
    details.appendChild(delBtn);
    card.appendChild(details);

    // Toggle logic
    card.addEventListener('click', () => {
      if (currentlyOpen && currentlyOpen !== details) {
        currentlyOpen.style.display = 'none';
      }

      if (details.style.display === 'none') {
        details.style.display = 'block';
        currentlyOpen = details;
      } else {
        details.style.display = 'none';
        currentlyOpen = null;
      }
    });

    list.appendChild(card);
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
