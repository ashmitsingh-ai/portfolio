import { useState } from 'react';
export default function ContactForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', email: '', role: '' });
  function update(event) { setForm({ ...form, [event.target.name]: event.target.value }); }
  function submit(event) { event.preventDefault(); onAdd({ ...form, id: crypto.randomUUID() }); setForm({ name: '', email: '', role: '' }); }
  return <form className="contact-form" onSubmit={submit}><h2>Create a contact</h2><label>Name<input name="name" value={form.name} onChange={update} required maxLength="80" placeholder="Taylor Smith" /></label><label>Email<input name="email" type="email" value={form.email} onChange={update} required placeholder="taylor@example.com" /></label><label>Role / company<input name="role" value={form.role} onChange={update} maxLength="100" placeholder="Designer at Studio" /></label><button type="submit">＋ Add contact</button></form>;
}
