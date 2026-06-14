function go(page) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + page).classList.add('active');
  window.scrollTo(0, 0);
  if (page === 'cv') alignCvLabels();
  const layout = document.querySelector('.layout');
  if (layout) layout.classList.remove('project-open');
}

function alignCvLabels() {
  requestAnimationFrame(() => {
    const sidebar  = document.getElementById('cv-sidebar');
    const divider  = document.getElementById('cv-div');
    const eduLabel = document.getElementById('label-edu');
    if (!divider || !sidebar) return;
    const divTop  = divider.getBoundingClientRect().top;
    const sideTop = sidebar.getBoundingClientRect().top;
    eduLabel.style.marginTop = (divTop - sideTop - 2) + 'px';
    eduLabel.textContent = 'Education';
  });
}

function loadProject(key, title, meta, desc, imgs) {
  document.getElementById('proj-title').textContent = title;
  document.getElementById('proj-meta').textContent  = meta;
  document.getElementById('proj-desc').textContent  = desc;
  const container = document.getElementById('proj-images');
  container.innerHTML = '';
  imgs.split(',').forEach(filename => {
    const el = document.createElement('img');
    el.src = 'images/' + filename.trim();
    el.alt = title;
    container.appendChild(el);
  });
}

function mobileBack() {
  const layout = document.querySelector('.layout');
  if (layout) layout.classList.remove('project-open');
  window.scrollTo(0, 0);
}

document.querySelectorAll('.proj').forEach(el => {
  el.addEventListener('click', function() {
    document.querySelectorAll('.proj').forEach(p => p.classList.remove('active'));
    this.classList.add('active');
    loadProject(
      this.dataset.key,
      this.dataset.title,
      this.dataset.meta,
      this.dataset.desc,
      this.dataset.imgs
    );
    const layout = document.querySelector('.layout');
    if (layout) layout.classList.add('project-open');
    window.scrollTo(0, 0);
  });
});

const first = document.querySelector('.proj.active');
if (first) {
  loadProject(first.dataset.key, first.dataset.title, first.dataset.meta, first.dataset.desc, first.dataset.imgs);
}
