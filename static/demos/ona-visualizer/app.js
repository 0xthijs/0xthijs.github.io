// ONA Visualizer - App Logic

// 1. Mock Data Generator
// HRBP Strategy: We need data that tells a story about silos, risk, and hybrid work.
// Updated: Localized for Netherlands context.

const departments = [
    { id: 'eng', name: 'Engineering', color: '#74b9ff' },
    { id: 'sales', name: 'Sales', color: '#ff7675' },
    { id: 'product', name: 'Product', color: '#ffeaa7' },
    { id: 'hr', name: 'HR', color: '#55efc4' }
];

const workModes = {
    'office': { label: 'In-Office', color: '#00b894' },
    'hybrid': { label: 'Hybrid', color: '#fdcb6e' },
    'remote': { label: 'Remote', color: '#6c5ce7' }
};

const nodes = [
    // Engineering Cluster
    { id: "1", name: "Sanne de Vries", role: "Senior Engineer (Critical)", dept: "eng", risk: "high", retention_score: 8.5, tenure: 3.2, workmode: "remote" },
    { id: "4", name: "Thijs Meijer", role: "Junior Dev", dept: "eng", risk: "low", retention_score: 2.1, tenure: 0.4, workmode: "office" },
    { id: "7", name: "Jan de Jong", role: "Tech Lead", dept: "eng", risk: "medium", retention_score: 5.4, tenure: 4.0, workmode: "hybrid" },
    { id: "9", name: "Ruben Mulder", role: "DevOps", dept: "eng", risk: "low", retention_score: 1.8, tenure: 1.5, workmode: "remote" },

    // Sales Cluster
    { id: "2", name: "Mark Jansen", role: "VP Sales", dept: "sales", risk: "low", retention_score: 1.5, tenure: 5.0, workmode: "hybrid" },
    { id: "5", name: "Daan Visser", role: "Sales Lead", dept: "sales", risk: "high", retention_score: 9.2, tenure: 4.5, workmode: "office" },
    { id: "11", name: "Pieter Groot", role: "Sales Rep", dept: "sales", risk: "low", retention_score: 3.0, tenure: 1.0, workmode: "office" },
    { id: "12", name: "Karin Vos", role: "Sales Rep", dept: "sales", risk: "high", retention_score: 7.8, tenure: 2.8, workmode: "hybrid" },

    // Product Cluster
    { id: "3", name: "Lotte Bakker", role: "Product Owner", dept: "product", risk: "medium", retention_score: 6.5, tenure: 2.1, workmode: "remote" },
    { id: "8", name: "Lisa van Dijk", role: "Product Manager", dept: "product", risk: "high", retention_score: 8.9, tenure: 2.5, workmode: "hybrid" },

    // HR Cluster
    { id: "6", name: "Emma Smit", role: "HR BP", dept: "hr", risk: "low", retention_score: 1.2, tenure: 6.0, workmode: "office" },
    { id: "10", name: "Sophie Bos", role: "Recruiter", dept: "hr", risk: "medium", retention_score: 4.5, tenure: 1.2, workmode: "hybrid" },
    { id: "16", name: "Tess Hoogland", role: "L&D Specialist", dept: "hr", risk: "low", retention_score: 2.2, tenure: 2.5, workmode: "office" },

    // New Additions
    { id: "13", name: "Bram de Boer", role: "Frontend Dev", dept: "eng", risk: "low", retention_score: 1.9, tenure: 0.8, workmode: "office" },
    { id: "14", name: "Eva Gerritse", role: "Account Exec", dept: "sales", risk: "high", retention_score: 8.1, tenure: 3.5, workmode: "remote" },
    { id: "15", name: "Lars van der Berg", role: "UX Designer", dept: "product", risk: "low", retention_score: 2.5, tenure: 1.5, workmode: "hybrid" },
    { id: "17", name: "Niels Visser", role: "Data Scientist", dept: "eng", risk: "medium", retention_score: 5.8, tenure: 1.0, workmode: "remote" }
];


const links = [
    // Strong internal Eng ties
    { source: "1", target: "7", value: 5 }, // Sanne - Jan
    { source: "1", target: "4", value: 3 }, // Sanne - Thijs
    { source: "7", target: "9", value: 4 }, // Jan - Ruben
    { source: "1", target: "9", value: 3 }, // Sanne - Ruben
    { source: "13", target: "4", value: 4 }, // Bram - Thijs (Junior Pair)
    { source: "13", target: "1", value: 2 }, // Bram - Sanne
    { source: "17", target: "1", value: 3 }, // Niels - Sanne
    { source: "17", target: "7", value: 3 }, // Niels - Jan

    // Product Bridging Eng and Sales
    { source: "3", target: "1", value: 4 }, // Lotte - Sanne
    { source: "3", target: "7", value: 3 }, // Lotte - Jan
    { source: "3", target: "8", value: 5 }, // Lotte - Lisa
    { source: "8", target: "2", value: 4 }, // Lisa - Mark
    { source: "3", target: "2", value: 2 }, // Lotte - Mark
    { source: "15", target: "3", value: 5 }, // Lars - Lotte (UX - PO)
    { source: "15", target: "8", value: 4 }, // Lars - Lisa
    { source: "15", target: "13", value: 3 }, // Lars (UX) - Bram (Frontend) -> Cross-dept link!

    // Sales Cluster
    { source: "2", target: "5", value: 5 }, // Mark - Daan
    { source: "5", target: "11", value: 3 },
    { source: "5", target: "12", value: 3 },
    { source: "12", target: "2", value: 2 },
    { source: "14", target: "2", value: 3 }, // Eva - Mark
    { source: "14", target: "12", value: 4 }, // Eva - Karin

    // HR Connections
    { source: "6", target: "2", value: 2 }, // Emma - Mark
    { source: "6", target: "10", value: 5 }, // Internal HR
    { source: "10", target: "4", value: 1 }, // Recruiter - New Hire (Thijs)
    { source: "16", target: "6", value: 4 }, // Tess - Emma
    { source: "16", target: "15", value: 2 }, // Tess (L&D) - Lars (UX) -> Training
];

// 2. D3 Visualization Setup
const container = document.getElementById('graph');
const width = container.clientWidth;
const height = container.clientHeight;

const svg = d3.select("#graph").append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.zoom().on("zoom", (event) => {
        g.attr("transform", event.transform);
    }));

const g = svg.append("g");

// Simulation setup
const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-400))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide().radius(35));

// Draw Links
const link = g.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("stroke", "#dfe6e9")
    .attr("stroke-width", d => Math.sqrt(d.value) * 1.5);

// Draw Nodes
const node = g.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("r", 20) // Base radius
    .attr("fill", "white")
    .attr("stroke-width", 3)
    .attr("stroke", d => getDeptColor(d.dept)) // Default to Dept color
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

// Add Text Labels (Initials)
const labels = g.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodes)
    .enter().append("text")
    .text(d => getInitials(d.name))
    .attr("x", 0)
    .attr("y", 4)
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .attr("font-family", "Inter")
    .attr("fill", "#2d3436")
    .style("pointer-events", "none");

// 3. Interaction Logic

// Update Positions
simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    labels
        .attr("x", d => d.x)
        .attr("y", d => d.y + 4);
});

// Drag Functions
function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

// Click Handling
node.on("click", (event, d) => {
    selectNode(d, event.currentTarget);
});

function selectNode(d, element) {
    // Reset all styling
    node.attr("stroke-width", 3);

    // Highlight selected
    if (element) {
        d3.select(element).attr("stroke-width", 5);
    } else {
        // Find node element by ID if not clicked directly
        node.filter(n => n.id === d.id).attr("stroke-width", 5);
    }

    updateSidebar(d);
}


// 4. View Modes & Filters

const toggles = document.querySelectorAll('.toggle-btn');
toggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
        toggles.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const mode = e.target.dataset.mode;
        updateViewMode(mode);
    });
});

function updateViewMode(mode) {
    node.transition().duration(500)
        .attr("fill", d => {
            if (mode === 'influence') return calculateCentralityRaw(d) > 3 ? '#ffeaa7' : 'white';
            return 'white';
        })
        .attr("r", d => {
            if (mode === 'influence') return 20 + (calculateCentralityRaw(d) * 3);
            return 20;
        })
        .attr("stroke", d => {
            if (mode === 'dept') return getDeptColor(d.dept);
            if (mode === 'risk') return getRiskColor(d.risk);
            if (mode === 'workmode') return getWorkModeColor(d.workmode);
            if (mode === 'tenure') return getTenureColor(d.tenure);
            if (mode === 'influence') return '#b2bec3';
            return '#b2bec3';
        });

    updateLegend(mode);
}

// 5. Search Features
const searchInput = document.getElementById('search');
const datalist = document.getElementById('employee-list');

// Populate datalist
nodes.forEach(n => {
    const option = document.createElement('option');
    option.value = n.name;
    datalist.appendChild(option);
});

// Search Event Listener
searchInput.addEventListener('input', (e) => {
    const val = e.target.value;
    const found = nodes.find(n => n.name.toLowerCase() === val.toLowerCase());

    if (found) {
        selectNode(found);

        // Optional: Center camera on node (simple implementation)
        // simulation.alpha(1).restart(); // Shake to show?
    }
});


// 6. Helpers & Color Scales

function getDeptColor(deptId) {
    const dept = departments.find(d => d.id === deptId);
    return dept ? dept.color : '#b2bec3';
}

function getRiskColor(risk) {
    if (risk === 'high') return '#ff7675'; // Red (Danger)
    if (risk === 'medium') return '#fdcb6e'; // Orange/Yellow
    return '#55efc4'; // Green (Safe)
}

function getWorkModeColor(mode) {
    return workModes[mode] ? workModes[mode].color : '#b2bec3';
}

function getTenureColor(years) {
    if (years < 0.5) return '#d63031'; // RED alert for New Hires
    if (years < 2) return '#74b9ff';
    return '#6c5ce7'; // Senior
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('');
}

function calculateCentralityRaw(d) {
    return links.filter(l => l.source.id === d.id || l.target.id === d.id).length;
}

function calculateNetworkStrength(d) {
    const connections = links.filter(l => l.source.id === d.id || l.target.id === d.id).length;
    // Normalize: 6 connections = 10/10 strength
    let score = (connections / 6) * 10;
    if (score > 10) score = 10;
    return score.toFixed(1);
}

function updateSidebar(data) {
    const panel = document.getElementById('details-panel');
    const empty = document.getElementById('empty-state');

    panel.classList.remove('hidden');
    empty.style.display = 'none';

    document.getElementById('p-name').textContent = data.name;
    document.getElementById('p-role').textContent = data.role;
    document.getElementById('p-avatar').textContent = getInitials(data.name);

    // Dept
    const dept = departments.find(d => d.id === data.dept);
    document.getElementById('p-dept').textContent = dept ? dept.name : data.dept;

    // Tenure (Matched to ID p-tenure, replaced p-location)
    document.getElementById('p-tenure').textContent = data.tenure + " Years";

    // Risk Score (1-10)
    const riskEl = document.getElementById('p-risk');
    let rScore = data.retention_score;
    // Fallback if score is missing from node data
    if (!rScore) {
        if (data.risk === 'high') rScore = (7.5 + Math.random() * 2).toFixed(1);
        else if (data.risk === 'medium') rScore = (4.5 + Math.random() * 2).toFixed(1);
        else rScore = (1.5 + Math.random() * 2).toFixed(1);
        data.retention_score = rScore;
    }
    riskEl.textContent = rScore + " / 10";
    riskEl.className = `risk-badge ${data.risk}`;

    // Network Strength (1-10)
    const netStrength = calculateNetworkStrength(data);
    document.getElementById('p-centrality').textContent = netStrength + " / 10";

    // Boundary Spanning
    const spanningScore = calculateBoundarySpanning(data);
    document.getElementById('p-spanning').textContent = spanningScore;
}

function calculateBoundarySpanning(d) {
    const myLinks = links.filter(l => l.source.id === d.id || l.target.id === d.id);
    if (myLinks.length === 0) return "0%";

    const crossDeptLinks = myLinks.filter(l => {
        const neighbor = l.source.id === d.id ? l.target : l.source;
        return neighbor.dept !== d.dept;
    });

    const percentage = Math.round((crossDeptLinks.length / myLinks.length) * 100);
    return percentage + "%";
}

function updateLegend(mode) {
    const legend = document.getElementById('legend');
    legend.innerHTML = '';

    let title = '';
    let items = [];

    if (mode === 'dept') {
        title = "Department";
        items = departments.map(d => ({ label: d.name, color: d.color }));
    } else if (mode === 'risk') {
        title = "Retention Risk";
        items = [
            { label: 'High Risk (Action Needed)', color: '#ff7675' },
            { label: 'Medium Risk', color: '#fdcb6e' },
            { label: 'Safe', color: '#55efc4' }
        ];
    } else if (mode === 'workmode') {
        title = "Work Mode";
        items = Object.values(workModes);
    } else if (mode === 'tenure') {
        title = "Onboarding Status";
        items = [
            { label: 'New Hire (< 6mo)', color: '#d63031' },
            { label: 'Junior (6mo - 2yr)', color: '#74b9ff' },
            { label: 'Tenured (2yr+)', color: '#6c5ce7' }
        ];
    } else if (mode === 'influence') {
        title = "Network Influence";
        items = [
            { label: 'Central Hub (Large Node)', color: '#ffeaa7' },
            { label: 'Contributor', color: '#ffffff' }
        ];
    }

    if (title) {
        const h4 = document.createElement('h4');
        h4.textContent = title;
        legend.appendChild(h4);
    }

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'legend-item';
        const bgStyle = mode === 'influence' && item.color === '#ffffff' ? 'border: 1px solid #ccc; background: white;' : `background: ${item.color}`;
        div.innerHTML = `<div class="legend-dot" style="${bgStyle}"></div><span>${item.label}</span>`;
        legend.appendChild(div);
    });
}

// Initial Render
updateLegend('dept');
