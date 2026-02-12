export const contractTemplate = `
<div class="contract-header">
    <h1>EMPLOYMENT AGREEMENT</h1>
    <p>This Employment Agreement (the "Agreement") is made effective as of <span class="fill" data-key="startDate">{{startDate}}</span>, by and between:</p>
</div>

<div class="parties">
    <div class="party">
        <strong>EMPLOYER:</strong><br>
        TechNova Solutions Inc.<br>
        123 Innovation Drive<br>
        San Francisco, CA 94105
    </div>
    <div class="party">
        <strong>EMPLOYEE:</strong><br>
        <span class="fill" data-key="candidateName">{{candidateName}}</span><br>
        <span class="fill" data-key="candidateAddress">{{candidateAddress}}</span>
    </div>
</div>

<div class="contract-body">
    <h3>1. POSITION AND DUTIES</h3>
    <p>The Employer agrees to employ the Employee as a <strong><span class="fill" data-key="jobTitle">{{jobTitle}}</span></strong>. The Employee agrees to perform the duties of this position and such other duties as may be assigned by the Employer.</p>

    <h3>2. COMPENSATION</h3>
    <p><strong>Base Salary:</strong> The Employee shall be paid a base salary of <strong>$<span class="fill" data-key="salary">{{salary}}</span></strong> per year, payable in accordance with the Employer's standard payroll schedule.</p>
    
    <div id="bonus-section" class="conditional-section" data-condition="hasBonus">
        <p><strong>Performance Bonus:</strong> The Employee is eligible for an annual performance bonus of up to <strong><span class="fill" data-key="bonusAmount">{{bonusAmount}}</span></strong>, subject to the achievement of performance metrics defined by the Employer.</p>
    </div>

    <h3>3. WORK LOCATION</h3>
    <p>The Employee's primary work location shall be the Employer's offices in San Francisco, CA.</p>

    <h3>4. AT-WILL EMPLOYMENT</h3>
    <p>The Employee's employment with the Employer is "at-will." This means that either the Employee or the Employer may terminate the employment relationship at any time, with or without cause and with or without notice.</p>

    <h3>5. GOVERNING LAW</h3>
    <p>This Agreement shall be governed by and construed in accordance with the laws of the State of California.</p>
</div>

<div class="signatures">
    <div class="sig-block">
        <div class="line"></div>
        <p>Employer Signature</p>
        <p>Date: _______________</p>
    </div>
    <div class="sig-block">
        <div class="line"></div>
        <p>Employee Signature</p>
        <p>Date: _______________</p>
    </div>
</div>
`;

export const formConfig = [
    { type: 'header', label: 'Candidate Details' },
    { key: 'candidateName', label: 'Full Name', type: 'text', placeholder: 'Jane Doe' },
    { key: 'candidateAddress', label: 'Address', type: 'text', placeholder: '123 Maple St, Springfield' },

    { type: 'header', label: 'Role & Compensation' },
    { key: 'jobTitle', label: 'Job Title', type: 'text', placeholder: 'Senior Product Designer' },
    { key: 'startDate', label: 'Start Date', type: 'date' },
    { key: 'salary', label: 'Annual Salary', type: 'number', placeholder: '120,000' },

    { type: 'header', label: 'Clauses' },
    { key: 'hasBonus', label: 'Include Annual Bonus?', type: 'checkbox' },
    { key: 'bonusAmount', label: 'Bonus Amount / %', type: 'text', placeholder: '10% of Base', dependsOn: 'hasBonus' }
];
