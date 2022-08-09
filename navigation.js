const links = document.querySelectorAll('.nav-link');

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const id = link.getAttribute('href').slice('1');

    const currentSection = document.getElementById(id);
    const blockElement = document.querySelector('.block');
    blockElement.classList.remove('block');
    blockElement.classList.add('none');
    currentSection.classList.remove('none');
    currentSection.classList.add('block');
  });
});

function startTime() {
  // eslint-disable-next-line no-undef
  const { DateTime } = luxon;
  const time = DateTime.now().setZone('Africa/Lagos');
  const now = time.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);

  document.getElementById('time').innerHTML = now;
  setTimeout(startTime, 1000);
}

startTime();
