import { contractTemplate, formConfig } from './template.js';

document.addEventListener('DOMContentLoaded', () => {
    const formElement = document.getElementById('contractForm');
    const contractContent = document.getElementById('contractContent');
    const printBtn = document.getElementById('printBtn');
    const resetBtn = document.getElementById('resetBtn');

    // 1. Render Contract Template
    contractContent.innerHTML = contractTemplate;

    // 2. Render Form Fields
    formConfig.forEach(field => {
        if (field.type === 'header') {
            const header = document.createElement('div');
            header.className = 'section-header';
            header.textContent = field.label;
            formElement.appendChild(header);
        } else {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';
            if (field.dependsOn) formGroup.className += ' hidden sub-field';
            formGroup.dataset.key = field.key; // For finding it later

            if (field.type === 'checkbox') {
                formGroup.className = 'checkbox-group';
                formGroup.innerHTML = `
                    <input type="checkbox" id="${field.key}" name="${field.key}">
                    <label for="${field.key}">${field.label}</label>
                `;
            } else {
                formGroup.innerHTML = `
                    <label for="${field.key}">${field.label}</label>
                    <input type="${field.type}" id="${field.key}" name="${field.key}" placeholder="${field.placeholder || ''}">
                `;
            }
            formElement.appendChild(formGroup);
        }
    });

    // 3. Bind Events
    const inputs = formElement.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('input', updateContract);
        input.addEventListener('change', updateContract);
    });

    function updateContract(e) {
        const target = e ? e.target : null;

        // Handle Conditional Logic (Show/Hide Fields)
        if (target && target.type === 'checkbox') {
            // Find inputs that depend on this
            const dependents = formConfig.filter(f => f.dependsOn === target.id);
            dependents.forEach(dep => {
                const el = document.querySelector(`.form-group[data-key="${dep.key}"]`);
                if (el) {
                    if (target.checked) el.classList.remove('hidden');
                    else el.classList.add('hidden');
                }
            });

            // Handle Template Sections
            const section = document.querySelector(`.conditional-section[data-condition="${target.id}"]`);
            if (section) {
                if (target.checked) section.classList.add('visible');
                else section.classList.remove('visible');
            }
        }

        // Update Text Logic
        inputs.forEach(input => {
            if (input.type === 'checkbox') return;

            const spans = document.querySelectorAll(`.fill[data-key="${input.id}"]`);
            spans.forEach(span => {
                if (input.value) {
                    span.textContent = input.value;
                    span.classList.remove('empty');

                    // Format Date if needed
                    if (input.type === 'date') {
                        const date = new Date(input.value);
                        span.textContent = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                    }
                    // Format Currency
                    if (input.type === 'number' && input.id.includes('salary')) {
                        span.textContent = Number(input.value).toLocaleString();
                    }

                } else {
                    // Empty state: show nothing but keep the line (handled by CSS .fill)
                    span.innerHTML = '&nbsp;';
                    span.classList.add('empty');
                }
            });
        });
    }

    // Initialize State
    // updateContract(); // Call once to set empty states
    // Force empty states on load
    inputs.forEach(input => {
        const spans = document.querySelectorAll(`.fill[data-key="${input.id}"]`);
        spans.forEach(span => {
            span.innerHTML = '&nbsp;';
            span.classList.add('empty');
        });
    });


    // Print Logic
    printBtn.addEventListener('click', () => {
        alert("Printing is disabled in this demo version.");
    });

    resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm("Start over?")) {
            formElement.reset();
            // Manually trigger updates to reset view
            inputs.forEach(i => {
                if (i.type === 'checkbox') {
                    i.checked = false;
                    // Trigger change event logic manually
                    updateContract({ target: i });
                }
            });
            updateContract();
        }
    });
});
