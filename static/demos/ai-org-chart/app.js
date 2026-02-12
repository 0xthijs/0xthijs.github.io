document.addEventListener('DOMContentLoaded', () => {
    // State
    let agents = [];
    let teamStructure = {
        root: null
        // Future: children: [] for tree structure
    };

    // Elements
    const humanPool = document.getElementById('human-pool');
    const aiPool = document.getElementById('ai-pool');
    const orgChart = document.getElementById('orgChart');
    const rootSlot = document.querySelector('.root-slot');

    // Metrics Elements
    const totalCostEl = document.getElementById('totalCost');
    const costSavingsEl = document.getElementById('costSavings');
    const velocityEl = document.getElementById('velocity');
    const aiRatioBar = document.getElementById('aiRatioBar');
    const aiRatioText = document.getElementById('aiRatioText');
    const insightText = document.getElementById('insightText');

    // Load Data
    fetch('agents.json')
        .then(response => response.json())
        .then(data => {
            agents = data;
            renderPools();
        });

    // Render Sidebar Pools
    function renderPools() {
        agents.forEach(agent => {
            const el = createDraggableElement(agent);
            if (agent.type === 'human') {
                humanPool.appendChild(el);
            } else {
                aiPool.appendChild(el);
            }
        });
    }

    function createDraggableElement(agent) {
        const div = document.createElement('div');
        div.className = `draggable-role ${agent.type}`;
        div.draggable = true;
        div.dataset.id = agent.id;
        div.innerHTML = `
            <div class="role-icon">${agent.icon}</div>
            <div class="role-info">
                <h4>${agent.role}</h4>
                <p>$${agent.cost}/mo • ${agent.efficiency}x</p>
            </div>
        `;

        div.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', agent.id); // Identifying string
            e.dataTransfer.effectAllowed = 'copy';
            div.classList.add('dragging');
        });

        div.addEventListener('dragend', () => {
            div.classList.remove('dragging');
        });

        return div;
    }

    // Drag & Drop Handling for Slots
    // Currently only one root slot for simplicity in PoC
    setupSlot(rootSlot);

    function setupSlot(slot) {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault(); // Necessary to allow dropping
            slot.classList.add('drag-over');
        });

        slot.addEventListener('dragleave', () => {
            slot.classList.remove('drag-over');
        });

        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            slot.classList.remove('drag-over');
            const agentId = e.dataTransfer.getData('text/plain');
            const agent = agents.find(a => a.id === agentId);

            if (agent) {
                placeAgentInSlot(slot, agent);
            }
        });
    }

    function placeAgentInSlot(slot, agent) {
        // Clear slot
        slot.innerHTML = '';
        slot.classList.add('has-item');

        // Update State
        teamStructure.root = agent;

        // Render Card in Slot
        const node = document.createElement('div');
        node.className = `org-node ${agent.type}`;
        node.innerHTML = `
            <div class="role-icon">${agent.icon}</div>
            <h3>${agent.role}</h3>
            <p>${agent.description}</p>
            <button class="remove-btn" title="Remove">✖</button>
        `;

        // Remove Logic
        node.querySelector('.remove-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            resetSlot(slot);
        });

        slot.appendChild(node);

        // Trigger Child Slots (Simple Tree Expansion)
        // For PoC, adding two child slots automatically when root is filled
        if (slot.dataset.slotId === 'root' && !document.getElementById('level-2')) {
            createNextLevel();
        }

        updateMetrics();
    }

    function resetSlot(slot) {
        slot.innerHTML = '<div class="placeholder">Drop Here</div>';
        slot.classList.remove('has-item');
        if (slot.dataset.slotId === 'root') {
            teamStructure.root = null;
            // Remove children for simplicity
            const level2 = document.getElementById('level-2');
            if (level2) level2.remove();

            // Reset array of other members? 
            // For PoC logic: we will just recalculate based on DOM or a simple list
        }
        updateMetrics();
    }

    function createNextLevel() {
        const levelContainer = document.createElement('div');
        levelContainer.id = 'level-2';
        levelContainer.style.display = 'flex';
        levelContainer.style.gap = '2rem';
        levelContainer.style.marginTop = '2rem';
        levelContainer.style.position = 'relative';

        // Create 3 slots for team members
        for (let i = 1; i <= 3; i++) {
            const slot = document.createElement('div');
            slot.className = 'node-slot';
            slot.dataset.slotId = `member-${i}`;
            slot.innerHTML = '<div class="placeholder">Drop Member</div>';
            setupSlot(slot);
            levelContainer.appendChild(slot);
        }

        // Draw lines? (Visual CSS enhancement)

        orgChart.appendChild(levelContainer);
    }

    // Metrics Logic
    function updateMetrics() {
        // Scan DOM for current agents (hacky but robust for drag-drop without deep state mgmt)
        const nodes = document.querySelectorAll('.org-node');
        let totalCost = 0;
        let totalEfficiency = 0;
        let aiCount = 0;
        let humanCount = 0;

        nodes.forEach(node => {
            const isAI = node.classList.contains('ai');
            // Find agent data by matching some text or attribute (better to store ID in DOM)
            // Using a simple approximation for PoC
            const roleName = node.querySelector('h3').innerText;
            const agent = agents.find(a => a.role === roleName);

            if (agent) {
                totalCost += agent.cost;
                totalEfficiency += agent.efficiency;
                if (agent.type === 'ai') aiCount++;
                else humanCount++;
            }
        });

        const totalMembers = aiCount + humanCount;

        // Display
        totalCostEl.textContent = `$${totalCost.toLocaleString()}`;

        // Calculate Velocity (Avg Efficiency)
        const avgVelocity = totalMembers > 0 ? (totalEfficiency / totalMembers).toFixed(1) : 0;
        velocityEl.textContent = `${avgVelocity}x`;

        // Calculate AI Ratio
        const ratio = totalMembers > 0 ? Math.round((aiCount / totalMembers) * 100) : 0;
        aiRatioBar.style.width = `${ratio}%`;
        aiRatioText.textContent = `${ratio}% AI Co-pilots`;

        // Generate Insight
        generateInsight(ratio, totalCost, humanCount);
    }

    function generateInsight(ratio, cost, humans) {
        if (humans === 0 && ratio === 0) {
            insightText.textContent = "Start by adding a Human Leader to set the vision.";
            return;
        }
        if (humans === 0 && ratio > 0) {
            insightText.textContent = "⚠️ Warning: Autonomous AI swarm detected without human oversight. High risk.";
            insightText.style.color = "red";
            return;
        }
        if (ratio > 50) {
            insightText.textContent = "🚀 High Velocity Team. Ensure the Human Manager focuses on 'unblocking' agents.";
            insightText.style.color = "green";
        } else {
            insightText.textContent = "⚖️ Balanced Team. Consider adding an AI Specialist to reduce cost.";
            insightText.style.color = "#b45309";
        }
    }

    // Export Logic
    const exportBtn = document.getElementById('exportBtn');
    const modal = document.getElementById('exportModal');
    const closeBtn = document.querySelector('.close-modal');
    const exportArea = document.getElementById('exportArea');
    const copyBtn = document.getElementById('copyBtn');

    exportBtn.addEventListener('click', () => {
        // Generate JSON
        const exportData = {
            projectName: "Hybrid Team Alpha",
            generated: new Date().toISOString(),
            metrics: {
                monthlyCost: totalCostEl.textContent,
                velocity: velocityEl.textContent
            },
            structure: []
        };

        document.querySelectorAll('.node-slot.has-item').forEach(slot => {
            const role = slot.querySelector('h3').innerText;
            exportData.structure.push({
                position: slot.dataset.slotId,
                role: role
            });
        });

        exportArea.value = JSON.stringify(exportData, null, 2);
        modal.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close on outside click
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.classList.add('hidden');
        }
    }

    // Reset Logic
    document.getElementById('resetBtn').addEventListener('click', () => {
        if (confirm("Clear board?")) {
            resetSlot(rootSlot);
        }
    });

    // Copy
    copyBtn.addEventListener('click', () => {
        exportArea.select();
        document.execCommand('copy');
        copyBtn.textContent = "Copied!";
        setTimeout(() => copyBtn.textContent = "Copy to Clipboard", 2000);
    });

});
