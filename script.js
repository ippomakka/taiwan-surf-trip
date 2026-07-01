const form = document.querySelector('#matchForm');
const statusEl = document.querySelector('#formStatus');

function encodeBody(data) {
  return [
    'New Taiwan Surf Trip custom quote request',
    '',
    `Australian base: ${data.get('city')}`,
    `Timing: ${data.get('timing')}`,
    `Surf level: ${data.get('level')}`,
    `Matched with: ${data.get('lookingFor')}`,
    `Trip length: ${data.get('length')}`,
    `Email: ${data.get('email')}`,
    '',
    'What would make this trip feel easy?',
    data.get('noBrainer') || '(not answered)',
    '',
    'Sent from the Taiwan Surf Trip quote form.'
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
  const subject = `Taiwan surf custom quote request from ${email}`;
  const body = encodeBody(data);
  const recipient = 'hello@taiwansurftrip.com';
  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  try {
    localStorage.setItem('taiwanSurfTrip:lastQuoteRequest', JSON.stringify(Object.fromEntries(data.entries())));
  } catch (_) {
    // Non-critical: some browsers block localStorage in private mode.
  }

  statusEl.textContent = 'Opening your email app with the quote request pre-filled...';
  window.location.href = mailto;
});
