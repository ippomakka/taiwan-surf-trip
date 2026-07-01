const form = document.querySelector('#matchForm');
const statusEl = document.querySelector('#formStatus');

function encodeBody(data) {
  return [
    'New Taiwan Surf Trip match request',
    '',
    `Australian base: ${data.get('city')}`,
    `Timing: ${data.get('timing')}`,
    `Surf level: ${data.get('level')}`,
    `Looking for: ${data.get('lookingFor')}`,
    `Trip length: ${data.get('length')}`,
    `Email: ${data.get('email')}`,
    '',
    'What would make this a no-brainer?',
    data.get('noBrainer') || '(not answered)',
    '',
    'Sent from the Taiwan Surf Trip validation site.'
  ].join('\n');
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  statusEl.classList.remove('error');

  if (!form.checkValidity()) {
    statusEl.textContent = 'Fill out the required fields first.';
    statusEl.classList.add('error');
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const email = data.get('email');
  const subject = `Taiwan surf match request from ${email}`;
  const body = encodeBody(data);
  const recipient = 'hello@taiwansurftrip.com';
  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  try {
    localStorage.setItem('taiwanSurfTrip:lastMatchRequest', JSON.stringify(Object.fromEntries(data.entries())));
  } catch (_) {
    // Non-critical: some browsers block localStorage in private mode.
  }

  statusEl.textContent = 'Opening your email app with the request pre-filled...';
  window.location.href = mailto;
});
