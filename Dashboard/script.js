let lineChart = null;
let pieChart = null;
let db = null;

async function start() {
    try {
        const res = await fetch('data.json');
        if (!res.ok) {
            throw new Error(`Could not load dashboard data: ${res.status}`);
        }
        db = await res.json();
        refresh('youtube');
    } catch (error) {
        const grid = document.querySelector('.dashboard-grid');
        if (grid) {
            grid.innerHTML = `<div class="card table-container"><h3>Unable to load dashboard data</h3><p>${error.message}</p></div>`;
        }
        console.error(error);
    }
}

function refresh(platform) {
    if (!db || !db[platform]) return;
    const data = db[platform];
    
    // Stats & Table update
    document.getElementById('followers').innerText = data.summary.followers;
    document.getElementById('views').innerText = data.summary.views;
    document.getElementById('engagement').innerText = data.summary.engagement;
    document.getElementById('ctr').innerText = data.summary.ctr;
    document.getElementById('post-table-body').innerHTML = data.topPosts.map(p => 
        `<tr><td>${p.title}</td><td>${p.metric}</td><td style="color:var(--accent)">${p.status}</td></tr>`
    ).join('');

    renderLineChart(data.chart);
    renderPieChart(data.pie);
}

function renderLineChart(c) {
    const ctx = document.getElementById('lineChart').getContext('2d');
    if (lineChart) lineChart.destroy();
    lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: c.labels,
            datasets: [{ data: c.data, borderColor: c.color, backgroundColor: c.color + '22', fill: true, tension: 0.4 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });
}

function renderPieChart(p) {
    const ctx = document.getElementById('pieChart').getContext('2d');
    if (pieChart) pieChart.destroy();
    pieChart = new Chart(ctx, {
        type: 'doughnut', // Doughnut looks more modern than a standard pie
        data: {
            labels: p.labels,
            datasets: [{ data: p.data, backgroundColor: p.colors, borderWidth: 0 }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false, 
            plugins: { legend: { position: 'bottom', labels: { color: '#888' } } } 
        }
    });
}

document.getElementById('platform-select').addEventListener('change', (e) => refresh(e.target.value));
document.getElementById('theme-btn').addEventListener('click', () => {
    const t = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
});

start();
