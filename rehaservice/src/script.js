document.addEventListener('DOMContentLoaded', () => {
  const serviceForm = document.querySelector('#service-form');
  if (!serviceForm) return;

  serviceForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(serviceForm);
    const getValue = (name) => String(formData.get(name) || '').trim() || '-';
    const company = getValue('company');
    const person = getValue('person');
    const manufacturer = getValue('manufacturer');
    const serial = getValue('serial');
    const serviceDate = getValue('serviceDate');
    const contact = getValue('contact');
    const problem = getValue('problem');

    const subject = `Zgłoszenie serwisowe - ${company}`;
    const body = [
      'Dzień dobry,',
      '',
      'proszę o kontakt w sprawie zgłoszenia serwisowego.',
      '',
      `Firma: ${company}`,
      `Osoba zgłaszająca: ${person}`,
      `Kontakt: ${contact}`,
      `Producent: ${manufacturer}`,
      `Numer seryjny: ${serial}`,
      `Preferowana data serwisu: ${serviceDate}`,
      '',
      'Opis problemu:',
      problem,
      '',
      'Pozdrawiam',
    ].join('\n');

    window.location.href = `mailto:service@rehaservice.pl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
