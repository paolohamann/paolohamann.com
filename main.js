function go(page) {
  // hide all views
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + page).classList.add('active');
  window.scrollTo(0, 0);
  if (page === 'cv') alignCvLabels();
  // reset mobile state
  document.getElementById('work-left')  && document.getElementById('work-left').classList.remove('project-open');
  document.getElementById('work-right') && document.getElementById('work-right').classList.remove('project-open');
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

function loadProject(title, meta, desc, imgs, video) {
  document.getElementById('proj-title').textContent = title;
  document.getElementById('proj-meta').textContent  = meta;
  document.getElementById('proj-desc').textContent  = desc;
  const container = document.getElementById('proj-images');
  container.innerHTML = '';
  // embed video if present
  if (video) {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'max-width:640px;width:100%;aspect-ratio:16/9;margin-bottom:0;';
    const iframe = document.createElement('iframe');
    iframe.src = video;
    iframe.style.cssText = 'width:100%;height:100%;border:none;';
    iframe.allowFullscreen = true;
    iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups');
    wrapper.appendChild(iframe);
    container.appendChild(wrapper);
  }
  imgs.split(',').filter(f => f.trim()).forEach(filename => {
    const el = document.createElement('img');
    el.src = 'images/' + filename.trim();
    el.alt = title;
    container.appendChild(el);
  });
  // scroll right panel to top
  document.getElementById('work-right').scrollTop = 0;
}

function mobileBack() {
  document.getElementById('work-left').classList.remove('project-open');
  document.getElementById('work-right').classList.remove('project-open');
  window.scrollTo(0, 0);
}

document.querySelectorAll('.proj').forEach(el => {
  el.addEventListener('click', function() {
    document.querySelectorAll('.proj').forEach(p => p.classList.remove('active'));
    this.classList.add('active');
    loadProject(this.dataset.title, this.dataset.meta, this.dataset.desc, this.dataset.imgs, this.dataset.video || '');
    // mobile: show right panel
    document.getElementById('work-left').classList.add('project-open');
    document.getElementById('work-right').classList.add('project-open');
  });
});

// load first project on init
const first = document.querySelector('.proj.active');
if (first) {
  loadProject(first.dataset.title, first.dataset.meta, first.dataset.desc, first.dataset.imgs, first.dataset.video || '');
}

// set landing as default active view
document.getElementById('view-landing').classList.add('active');
