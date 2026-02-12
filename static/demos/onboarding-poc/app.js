const tasks = [
    { id: 1, text: "Set up your email signature" },
    { id: 2, text: "Join the #general Slack channel" },
    { id: 3, text: "Read the Employee Handbook" },
    { id: 4, text: "Introduction with your manager" },
    { id: 5, text: "Configure your development environment" },
    { id: 6, text: "Submit your first PR" }
];

document.addEventListener('DOMContentLoaded', () => {
    const checklist = document.getElementById('checklist');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const resetBtn = document.getElementById('resetBtn');

    // Load state from local storage or initialize
    let completedTasks = JSON.parse(localStorage.getItem('onboardingCompletedTasks')) || [];

    // Render tasks
    function renderTasks() {
        checklist.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `checklist-item ${completedTasks.includes(task.id) ? 'completed' : ''}`;
            li.onclick = (e) => toggleTask(task.id, e);

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = completedTasks.includes(task.id);
            // Prevent double toggling when clicking checkbox directly
            checkbox.onclick = (e) => e.stopPropagation();
            checkbox.onchange = () => toggleTask(task.id);

            const span = document.createElement('span');
            span.textContent = task.text;

            li.appendChild(checkbox);
            li.appendChild(span);
            checklist.appendChild(li);
        });
        updateProgress();
    }

    function toggleTask(id) {
        if (completedTasks.includes(id)) {
            completedTasks = completedTasks.filter(taskId => taskId !== id);
        } else {
            completedTasks.push(id);
        }
        saveState();
        renderTasks();
        checkCompletion();
    }

    function updateProgress() {
        const progress = Math.round((completedTasks.length / tasks.length) * 100);
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}% Complete`;
    }

    function saveState() {
        localStorage.setItem('onboardingCompletedTasks', JSON.stringify(completedTasks));
    }

    function checkCompletion() {
        if (completedTasks.length === tasks.length) {
            triggerConfetti();
        }
    }

    resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset your progress?')) {
            completedTasks = [];
            saveState();
            renderTasks();
        }
    });

    renderTasks();
});

// Simple Confetti Function
function triggerConfetti() {
    const colors = ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6'];
    const container = document.getElementById('confetti-container');

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(confetti);

        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}
