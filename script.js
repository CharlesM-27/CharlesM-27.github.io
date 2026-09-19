'use strict';

const projects = [
  {
    title: 'Fedora Homelab Server',
    description: 'Built a Fedora-based homelab for server file sharing and Linux network administration practice.',
    tags: ['Linux', 'Homelab', 'Servers'],
    image: 'images/fedora-homelab-server.png',
    year: 2024
  },
  {
    title: 'DNS Filtering Deployment',
    description: 'Attempted deployment of Pi-hole and AdGuard for DNS filtering in a home network.',
    tags: ['Networking', 'Security', 'DNS'],
    image: 'images/dns-filtering-deployment.png',
    year: 2024
  },
  {
    title: 'Local Network Monitoring',
    description: 'Explored Linux networking tools to monitor and troubleshoot a local area network.',
    tags: ['Networking', 'Linux', 'Monitoring'],
    image: 'images/local-network-monitoring.png',
    year: 2024
  },
  {
    title: 'Router and Firewall Lab',
    description: 'Configured a virtual router and firewall to practice port forwarding and network security rules.',
    tags: ['Networking', 'Security', 'Firewall'],
    image: 'images/router-firewall-lab.png',
    year: 2024
  }
];

// this takes data in
function filterProjects(list, query, tag) {
  const cleanQuery = query.trim().toLowerCase();

  // empty search
  return list.filter(function (project) {
    const matchesQuery = cleanQuery === '' || project.title.toLowerCase().includes(cleanQuery);
    const matchesTag = tag === 'All' || project.tags.includes(tag);
    return matchesQuery && matchesTag;
  });
}

// Draws the pagr
function renderProjects(list) {
  const container = document.querySelector('#project-gallery');
  const countLabel = document.querySelector('#project-count');

  if (!container || !countLabel) {
    return;
  }

  if (list.length === 0) {
    container.innerHTML = '';
    countLabel.textContent = 'No projects match your search. Try a different word or category.';
    return;
  }

  // lets buuild the string first
  let html = '';
  for (const project of list) {
    html += `
      <li class="project">
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p class="tag-line">${project.tags.join(' &middot; ')}</p>
      </li>
    `;
  }

  container.innerHTML = html;
  countLabel.textContent = `Showing ${list.length} of ${projects.length} projects.`;
}

// Builds the category dropdown 
function populateTagFilter() {
  const select = document.querySelector('#tag-filter');
  if (!select) {
    return;
  }

  const uniqueTags = [];
  for (const project of projects) {
    for (const tag of project.tags) {
      if (!uniqueTags.includes(tag)) {
        uniqueTags.push(tag);
      }
    }
  }

  for (const tag of uniqueTags) {
    const option = document.createElement('option');
    option.value = tag;
    option.textContent = tag;
    select.appendChild(option);
  }
}

// re-derives the list then redraws it
function handleFilterChange() {
  const searchInput = document.querySelector('#project-search');
  const tagSelect = document.querySelector('#tag-filter');

  const query = searchInput ? searchInput.value : '';
  const tag = tagSelect ? tagSelect.value : 'All';

  const filtered = filterProjects(projects, query, tag);
  renderProjects(filtered);
}

document.addEventListener('DOMContentLoaded', function () {
  populateTagFilter();
  renderProjects(projects);

  const searchInput = document.querySelector('#project-search');
  const tagSelect = document.querySelector('#tag-filter');

  if (searchInput) {
    searchInput.addEventListener('input', handleFilterChange);
  }
  if (tagSelect) {
    tagSelect.addEventListener('change', handleFilterChange);
  }
});
