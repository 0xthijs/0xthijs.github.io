// ONA Visualizer - App Logic

// 1. Mock Data Generator
// HRBP Strategy: We need data that tells a story about silos, risk, and hybrid work.

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
    // Engineering Cluster - The "Engine Room"
    { id: "1", name: "Sarah Jenkins", role: "Senior Engineer (Critical)", dept: "eng", risk: "high", tenure: 3.2, workmode: "remote" },
    { id: "4", name: "Tom Baker", role: "Junior Dev", dept: "eng", risk: "low", tenure: 0.4, workmode: "office" }, // New Hire
    { id: "7", name: "James Wilson", role: "Tech Lead", dept: "eng", risk: "medium", tenure: 4.0, workmode: "hybrid" },
    { id: "9", name: "Robert Taylor", role: "DevOps", dept: "eng", risk: "low", tenure: 1.5, workmode: "remote" },

    // Sales Cluster - The "Revenue Drivers"
    { id: "2", name: "Mike Chen", role: "VP Sales", dept: "sales", risk: "low", tenure: 5.0, workmode: "hybrid" },
    { id: "5", name: "David Miller", role: "Sales Lead", dept: "sales", risk: "high", tenure: 4.5, workmode: "office" },
    { id: "11", name: "Paul Thomas", role: "Sales Rep", dept: "sales", risk: "low", tenure: 1.0, workmode: "office" },
    { id: "12", name: "Karen Brown", role: "Sales Rep", dept: "sales", risk: "high", tenure: 2.8, workmode: "hybrid" },

    // Product Cluster - The "Bridge"
    { id: "3", name: "Jessica Wu", role: "Product Owner", dept: "product", risk: "medium", tenure: 2.1, workmode: "remote" },
    { id: "8", name: "Linda Martinez", role: "Product Manager", dept: "product", risk: "high", tenure: 2.5, workmode: "hybrid" },

    // HR Cluster - The "Support"
    { id: "6", name: "Emily Davis", role: "HR BP", dept: "hr", risk: "low", tenure: 6.0, workmode: "office" },
    { id: "10", name: "Susan White", role: "Recruiter", dept: "hr", risk: "medium", tenure: 1.2, workmode: "hybrid" }
];

const links = [
    // Strong internal Eng ties
    { source: "1", target: "7", value: 5 }, // Sarah - James
    { source: "1", target: "4", value: 3 }, // Sarah - Tom
    { source: "7", target: "9", value: 4 }, // James - Robert
    { source: "1", target: "9", value: 3 }, // Sarah - Robert

    // Product Bridging Eng and Sales
    { source: "3", target: "1", value: 4 }, // Jessica (Prod) - Sarah (Eng)
    { source: "3", target: "7", value: 3 }, // Jessica (Prod) - James (Eng)
    { source: "3", target: "8", value: 5 }, // Jessica (Prod) - Linda (Prod)
    { source: "8", target: "2", value: 4 }, // Linda (Prod) - Mike (VP Sales)
    { source: "3", target: "2", value: 2 }, // Jessica (Prod) - Mike (VP Sales)

    // Sales Cluster
    { source: "2", target: "5", value: 5 }, // Mike - David
    { source: "5", target: "11", value: 3 },
    { source: "5", target: "12", value: 3 },
    { source: "12", target: "2", value: 2 },

    // HR Connections (Sparse but specific)
    { source: "6", target: "2", value: 2 }, // Emily (HR) - Mike (VP Sales)
    { source: "6", target: "10", value: 5 }, // Internal HR
    { source: "10", target: "4", value: 1 }, // Recruiter - New Hire (Tom) - Weak link!
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
    node.attr("stroke-width", 3); // Reset
    d3.select(event.currentTarget).attr("stroke-width", 5); // Highlight
    updateSidebar(d);
});

// 4. View Modes & Filters (The Strategic Lens)

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
    // Transition styles based on mode
    node.transition().duration(500)
        .attr("fill", d => {
            // Fill is usually white, but in specialized modes we might want full color blobs?
            // Let's keep fill white and use stroke for cleaner look, OR use fill for emphasis.
            // Decision: Use Stroke for data, Fill White for cleanliness, UNLESS 'Influence' mode.
            if (mode === 'influence') return calculateCentralityRaw(d) > 3 ? '#ffeaa7' : 'white';
            return 'white';
        })
        .attr("r", d => {
            if (mode === 'influence') return 20 + (calculateCentralityRaw(d) * 3); // Size by influence
            return 20; // Standard size
        })
        .attr("stroke", d => {
            if (mode === 'dept') return getDeptColor(d.dept);
            if (mode === 'risk') return getRiskColor(d.risk);
            if (mode === 'workmode') return getWorkModeColor(d.workmode);
            if (mode === 'tenure') return getTenureColor(d.tenure);
            if (mode === 'influence') return '#b2bec3'; // Grey stroke when sizing matters more
            return '#b2bec3';
        });

    updateLegend(mode);
}

// 5. Helpers & Color Scales

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
    if (years < 0.5) return '#d63031'; // RED alert for New Hires (need attention)
    if (years < 2) return '#74b9ff';
    return '#6c5ce7'; // Senior
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('');
}

function calculateCentralityRaw(d) {
    // Simple degree centrality
    return links.filter(l => l.source.id === d.id || l.target.id === d.id).length;
}

function calculateCentrality(d) {
    const score = calculateCentralityRaw(d);
    if (score > 4) return "Very High (Hub)";
    if (score > 2) return "Medium";
    return "Low (Peripheral)";
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

    // Location
    document.getElementById('p-location').textContent = workModes[data.workmode].label;

    // Risk
    const riskEl = document.getElementById('p-risk');
    riskEl.textContent = data.risk.toUpperCase();
    riskEl.className = `risk-badge ${data.risk}`;

    document.getElementById('p-centrality').textContent = calculateCentrality(data);
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
        // Handle special case for influence where color might be fill or stroke
        const bgStyle = mode === 'influence' && item.color === '#ffffff' ? 'border: 1px solid #ccc; background: white;' : `background: ${item.color}`;

        div.innerHTML = `<div class="legend-dot" style="${bgStyle}"></div><span>${item.label}</span>`;
        legend.appendChild(div);
    });
}

// Initial Render
updateLegend('dept');
