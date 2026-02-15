// Supabase Integration
import { supabase } from './supabase.js';

// Generate unique numeric session ID for this session (timestamp-based)
const sessionId = Date.now() + Math.floor(Math.random() * 1000);




// Survey Data
const surveyData = [
    {
        id: 'intro',
        type: 'intro',
        title: "Survey: Career Building & Job Search with AI",
        description: "Help us understand your career goals and how AI tools can better support your job search journey. (Takes ~2 minutes)",
        buttonText: "Start Survey"
    },
    {
        id: 'identity_choice',
        type: 'radio',
        question: "How would you like to submit your response?",
        options: [
            "Anonymously",
            "With my Name & Email"
        ]
    },
    {
        id: 'contact_details',
        type: 'contact', // Custom type for Name/Email
        question: "Please provide your details",
        subtitle: "We will only use this to contact you regarding your response.",
        fields: [
            { id: 'name', label: 'Full Name', placeholder: 'John Doe' },
            { id: 'email', label: 'Email Address', placeholder: 'john@example.com', inputType: 'email' }
        ]
    },
    {
        id: 'q1',
        type: 'radio',
        question: "What is your current status?",
        options: [
            "Final year student (actively looking for jobs/internships)",
            "Recent graduate (0-2 years experience)",
            "Working professional (looking to switch)",
            "Fresher (graduated but not yet employed)"
        ]
    },
    {
        id: 'q2',
        type: 'checkbox',
        question: "What are the biggest challenges you face while searching for jobs/internships?",
        subtitle: "Select all that apply",
        options: [
            "Finding relevant job openings across multiple platforms",
            "Getting rejected by Applicant Tracking Systems (ATS)",
            "Not receiving feedback or responses from recruiters",
            "Difficulty in customizing resume for each job",
            "Lack of direct contact with hiring managers",
            "Unclear about required skills for specific roles",
            "Interview preparation and practice"
        ]
    },
    {
        id: 'q3',
        type: 'radio',
        question: "How satisfied are you with your college's campus placement process?",
        options: [
            "Very Satisfied",
            "Satisfied",
            "Neutral",
            "Dissatisfied",
            "Very Dissatisfied / No campus placements available"
        ]
    },
    {
        id: 'q4',
        type: 'matrix',
        question: "How useful would each of these AI features be to you?",
        subtitle: "Rate each feature",
        rows: [
            "AI scoring your profile against job requirements",
            "Personalized CV improvement suggestions",
            "Direct contact details of hiring managers/founders",
            "AI-generated interview prep with Q&A and flashcards",
            "Job recommendations based on your skills"
        ],
        columns: ["Very Useful", "Useful", "Neutral", "Not Useful"]
    },
    {
        id: 'q5',
        type: 'radio',
        question: "Would you trust an AI tool to analyze your resume and suggest improvements?",
        options: [
            "Yes, completely",
            "Yes, but I'd verify suggestions myself",
            "Maybe, depends on accuracy",
            "No, I prefer human feedback",
            "No, I have privacy concerns"
        ]
    },
    {
        id: 'q6',
        type: 'checkbox',
        question: "What would make you switch to an AI-powered platform?",
        subtitle: "Select top 2",
        maxSelect: 2,
        options: [
            "Faster job matching",
            "Higher response rate from employers",
            "Better interview preparation tools",
            "Transparent feedback on why I'm not shortlisted",
            "Direct access to decision-makers",
            "Free to use"
        ]
    },
    {
        id: 'q7',
        type: 'radio-other',
        question: "Your field of education:",
        options: [
            "Commerce/Management",
            "Engineering/Technology",
            "Arts/Humanities",
            "Science"
        ]
    },
    {
        id: 'outro',
        type: 'outro',
        title: "Thank you!",
        description: "Your responses have been recorded. We appreciate your contribution to this research."
    }
];

// State
let currentStep = 0;
let answers = {};

// DOM Elements
const container = document.getElementById('question-container');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

// Initialize
function init() {
    // CRITICAL: Check if running on localhost
    if (window.location.protocol === 'file:') {
        alert("STOP! You are running this file directly.\n\nPlease use the link I provided: http://localhost:5174/survey-form.html\n\nThe secure connection WILL NOT WORK via file://");
        document.body.innerHTML = "<div style='padding:50px;text-align:center;color:red;font-size:24px;font-weight:bold'>ERROR: You are opening the file directly.<br><br>Please use the Local Server Link provided in the chat.</div>";
        return;
    }
    renderStep();
    updateNavigation();

    if (nextBtn) nextBtn.addEventListener('click', handleNext);
    if (prevBtn) prevBtn.addEventListener('click', handlePrev);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && surveyData[currentStep].type !== 'checkbox' && !e.shiftKey) {
            if (isValid()) handleNext();
        }
    });

    // Make functions globally available for inline onclick handlers in HTML
    window.selectOption = selectOption;
    window.selectOther = selectOther;
    window.updateOther = updateOther;
    window.selectMatrix = selectMatrix;
    window.updateContact = updateContact;
}

// Render Current Step
function renderStep() {
    container.classList.remove('fade-in');
    container.classList.add('fade-out');

    const delay = container.innerHTML.trim() === '' ? 50 : 300;

    setTimeout(() => {
        const step = surveyData[currentStep];
        if (!step) {
            console.error("Step not found:", currentStep);
            container.innerHTML = "<div class='text-red-500'>Error loading survey step. Please refresh.</div>";
            container.classList.remove('fade-out');
            container.classList.add('fade-in');
            return;
        }

        let html = '';

        if (step.type === 'intro' || step.type === 'outro') {
            html = `
                <div class="text-center">
                    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">${step.title}</h1>
                    <p class="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">${step.description}</p>
                </div>
            `;
        }
        else if (step.type === 'radio' || step.type === 'checkbox' || step.type === 'radio-other') {
            html = `
                <div class="mb-4 text-cyan-600 font-semibold text-sm uppercase tracking-wide">Question ${getQuestionNumber()}</div>
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">${step.question}</h2>
                ${step.subtitle ? `<p class="text-gray-500 text-lg mb-8 italic">${step.subtitle}</p>` : '<div class="mb-8"></div>'}
                
                <div class="space-y-3 max-w-xl">
                    ${step.options.map((opt, idx) => `
                        <div class="option-card border border-gray-200 rounded-lg p-4 flex items-center ${isSelected(step.id, opt) ? 'selected' : ''}" onclick="selectOption('${step.id}', '${opt.replace(/'/g, "\\'")}', '${step.type}')" data-value="${opt}">
                            <div class="option-key border-gray-300 bg-white text-xs font-bold uppercase">${String.fromCharCode(65 + idx)}</div>
                            <span class="text-lg text-gray-700 font-medium">${opt}</span>
                        </div>
                    `).join('')}
                    
                    ${step.type === 'radio-other' ? `
                        <div class="option-card border border-gray-200 rounded-lg p-4 flex items-center ${answers[step.id] && !step.options.includes(answers[step.id]) ? 'selected' : ''}" onclick="selectOther('${step.id}')">
                            <div class="option-key border-gray-300 bg-white text-xs font-bold uppercase">O</div>
                            <span class="text-lg text-gray-700 font-medium mr-4">Other:</span>
                            <input type="text" id="other-input-${step.id}" 
                                class="flex-1 bg-transparent border-b border-gray-300 focus:border-cyan-500 outline-none text-gray-700 pb-1" 
                                placeholder="Type here..." 
                                oninput="updateOther('${step.id}', this.value)"
                                value="${answers[step.id] && !step.options.includes(answers[step.id]) ? answers[step.id] : ''}">
                        </div>
                    ` : ''}
                </div>
            `;
        }
        else if (step.type === 'contact') {
            html = `
                <div class="mb-4 text-cyan-600 font-semibold text-sm uppercase tracking-wide">Contact Info</div>
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">${step.question}</h2>
                ${step.subtitle ? `<p class="text-gray-500 text-lg mb-8 italic">${step.subtitle}</p>` : '<div class="mb-8"></div>'}
                
                <div class="space-y-6 max-w-xl">
                    ${step.fields.map(field => `
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">${field.label}</label>
                            <input type="${field.inputType || 'text'}" 
                                class="w-full bg-transparent border-b-2 border-gray-300 focus:border-cyan-500 outline-none text-2xl py-2 transition-colors placeholder-gray-300" 
                                placeholder="${field.placeholder}"
                                value="${(answers[step.id] && answers[step.id][field.id]) || ''}"
                                oninput="updateContact('${step.id}', '${field.id}', this.value)">
                        </div>
                    `).join('')}
                </div>
            `;
        }
        else if (step.type === 'matrix') {
            html = `
                 <div class="mb-4 text-cyan-600 font-semibold text-sm uppercase tracking-wide">Question ${getQuestionNumber()}</div>
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">${step.question}</h2>
                <p class="text-gray-500 text-lg mb-8 italic">Rate each feature</p>
                
                <div class="space-y-6 max-w-2xl overflow-y-auto max-h-[60vh] pr-2 no-scrollbar">
                    ${step.rows.map((row, rIdx) => `
                        <div class="pb-6 border-b border-gray-100 last:border-0">
                            <p class="font-medium text-gray-900 mb-3 text-lg">${row}</p>
                            <div class="flex flex-wrap gap-2">
                                ${step.columns.map((col, cIdx) => `
                                    <button class="matrix-btn px-4 py-2 text-sm border rounded-full transition-colors ${getMatrixAnswer(step.id, row) === col ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-white text-gray-600 border-gray-300 hover:border-cyan-400'}"
                                        onclick="selectMatrix('${step.id}', '${row.replace(/'/g, "\\'")}', '${col.replace(/'/g, "\\'")}')"
                                        data-row="${row}" data-col="${col}">
                                        ${col}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        container.innerHTML = html;
        container.classList.remove('fade-out');
        container.classList.add('fade-in');

        updateNavigation();

        if (step.type === 'radio-other' && answers[step.id] && !step.options.includes(answers[step.id])) {
            const input = document.getElementById(`other-input-${step.id}`);
            if (input) input.focus();
        }

    }, 400);
}

// Logic Helpers
function isSelected(qId, value) {
    if (surveyData[currentStep].type === 'checkbox') {
        return (answers[qId] || []).includes(value);
    }
    return answers[qId] === value;
}

function selectOption(qId, value, type) {
    if (type === 'radio' || type === 'radio-other') {
        answers[qId] = value;
        updateSelectionVisuals(qId);
        if (type === 'radio') {
            setTimeout(() => handleNext(), 300);
        }
    } else if (type === 'checkbox') {
        const current = answers[qId] || [];
        const max = surveyData[currentStep].maxSelect || 99;

        if (current.includes(value)) {
            answers[qId] = current.filter(v => v !== value);
        } else {
            if (current.length < max) {
                answers[qId] = [...current, value];
            } else {
                return;
            }
        }
        updateSelectionVisuals(qId);
    }
}

function updateSelectionVisuals(qId) {
    const cards = document.querySelectorAll('.option-card');
    cards.forEach(card => {
        const val = card.getAttribute('data-value');
        if (!val) {
            if (card.querySelector('input')) {
                const otherVal = card.querySelector('input').value;
                if (answers[qId] === otherVal && otherVal !== '') {
                    card.classList.add('selected');
                } else if (answers[qId] && !surveyData[currentStep].options.includes(answers[qId])) {
                    card.classList.add('selected');
                } else {
                    card.classList.remove('selected');
                }
            }
            return;
        }

        if (isSelected(qId, val)) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
}

function selectOther(qId) {
    const input = document.getElementById(`other-input-${qId}`);
    if (input) {
        input.focus();
        if (input.value.trim() !== '') {
            answers[qId] = input.value;
        } else {
            delete answers[qId];
        }
    }
    updateSelectionVisuals(qId);
}

function updateOther(qId, value) {
    if (value.trim() !== '') {
        answers[qId] = value;
    }
}

function getMatrixAnswer(qId, row) {
    const ans = answers[qId] || {};
    return ans[row];
}

function selectMatrix(qId, row, col) {
    const currentAnswers = answers[qId] || {};
    currentAnswers[row] = col;
    answers[qId] = currentAnswers;
    updateMatrixVisuals(qId);
}

function updateMatrixVisuals(qId) {
    const buttons = document.querySelectorAll('.matrix-btn');
    buttons.forEach(btn => {
        const r = btn.getAttribute('data-row');
        const c = btn.getAttribute('data-col');
        const currentVal = answers[qId] && answers[qId][r];

        if (currentVal === c) {
            btn.classList.remove('bg-white', 'text-gray-600', 'border-gray-300', 'hover:border-cyan-400');
            btn.classList.add('bg-cyan-600', 'text-white', 'border-cyan-600');
        } else {
            btn.classList.remove('bg-cyan-600', 'text-white', 'border-cyan-600');
            btn.classList.add('bg-white', 'text-gray-600', 'border-gray-300', 'hover:border-cyan-400');
        }
    });
}

function updateContact(qId, fieldId, value) {
    if (!answers[qId]) answers[qId] = {};
    answers[qId][fieldId] = value;
}

function getQuestionNumber() {
    let count = 0;
    let total = 0;
    const isAnonymous = answers['identity_choice'] === 'Anonymously';

    surveyData.forEach((s, idx) => {
        if (s.type === 'intro' || s.type === 'outro' || s.id === 'identity_choice') return;
        if (s.id === 'contact_details' && isAnonymous) return;
        if (s.id === 'contact_details') return;

        total++;
        if (idx <= currentStep) count++;
    });

    if (currentStep >= surveyData.length - 1) count = total;

    const q1Index = surveyData.findIndex(s => s.id === 'q1');
    if (currentStep < q1Index) return "";

    const currentQ = currentStep - q1Index + 1;
    const totalQ = surveyData.length - q1Index - 1;
    return `${currentQ} of ${totalQ}`;
}

function isValid() {
    const step = surveyData[currentStep];
    if (step.type === 'intro' || step.type === 'outro') return true;

    const ans = answers[step.id];

    if (step.type === 'contact') {
        return ans && ans.name && ans.email && ans.name.length > 1 && ans.email.includes('@');
    }

    if (step.type === 'checkbox') {
        return ans && ans.length > 0;
    }
    if (step.type === 'matrix') {
        if (!ans) return false;
        return step.rows.every(row => ans[row]);
    }

    return !!ans;
}

async function handleNext() {
    if (!isValid() && currentStep > 0 && currentStep < surveyData.length - 1) {
        alert("Please answer the question to proceed.");
        return;
    }

    if (currentStep < surveyData.length - 2) {
        let nextStep = currentStep + 1;
        if (surveyData[nextStep].id === 'contact_details' && answers['identity_choice'] === 'Anonymously') {
            nextStep++;
        }
        currentStep = nextStep;
        renderStep();
    } else {
        // Submit logic
        if (nextBtn) {
            nextBtn.disabled = true;
            nextBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        }

        const success = await submitSurvey();

        if (success) {
            let nextStep = currentStep + 1;
            currentStep = nextStep;
            renderStep();
        } else {
            if (nextBtn) {
                nextBtn.disabled = false;
                nextBtn.innerHTML = `Submit <i class="fas fa-paper-plane ml-2"></i>`;
            }
        }
    }
}

function handlePrev() {
    if (currentStep > 0) {
        let prevStep = currentStep - 1;
        if (surveyData[prevStep].id === 'contact_details' && answers['identity_choice'] === 'Anonymously') {
            prevStep--;
        }
        currentStep = prevStep;
        renderStep();
    }
}

function updateNavigation() {
    const totalSteps = surveyData.length - 1;
    const percent = Math.round((currentStep / totalSteps) * 100);

    if (progressBar) progressBar.style.width = percent + '%';
    if (progressText) progressText.innerText = percent + '% completed';

    if (currentStep === 0) {
        if (nextBtn) nextBtn.innerHTML = 'Start Survey';
        if (prevBtn) prevBtn.classList.add('hidden');
    } else if (currentStep === surveyData.length - 1) {
        if (nextBtn) nextBtn.classList.add('hidden');
        if (prevBtn) prevBtn.classList.add('hidden');
    } else {
        if (nextBtn) {
            nextBtn.classList.remove('hidden'); // Ensure it's shown
            if (currentStep === surveyData.length - 2) {
                nextBtn.innerHTML = `Submit <i class="fas fa-paper-plane ml-2"></i>`;
            } else {
                nextBtn.innerHTML = `Next <i class="fas fa-check ml-2"></i>`;
            }
        }
        if (prevBtn) prevBtn.classList.remove('hidden');
    }
}

// Helper to update debug log
function updateDebugLog(isSuccess, message, details = '') {
    const debugDiv = document.getElementById('debug-container');
    const debugLog = document.getElementById('debug-log');

    if (debugDiv && debugLog) {
        debugDiv.classList.remove('hidden');
        if (isSuccess) {
            debugDiv.classList.remove('bg-red-50', 'text-red-600', 'border-red-200');
            debugDiv.classList.add('bg-green-50', 'text-green-600', 'border-green-200');
        } else {
            debugDiv.classList.remove('bg-green-50', 'text-green-600', 'border-green-200');
            debugDiv.classList.add('bg-red-50', 'text-red-600', 'border-red-200');
        }
        debugLog.innerText = message + (details ? `\n${details}` : '');
    }
}

async function submitSurvey() {
    try {
        // Prepare submission data
        const submissionData = {
            session_id: sessionId,
            form_topic: 'AI in Job Search',
            submitted_at: new Date().toISOString(),

            // Identity & Contact
            identity_choice: answers['identity_choice'] || null,
            contact_name: answers['contact_details']?.name || null,
            contact_email: answers['contact_details']?.email || null,

            // Survey Questions
            q1_current_status: answers['q1'] || null,
            q2_job_challenges: answers['q2'] || null,
            q3_placement_satisfaction: answers['q3'] || null,
            q4_ai_features_rating: answers['q4'] || null,
            q5_trust_ai: answers['q5'] || null,
            q6_switch_reasons: answers['q6'] || null,
            q7_education_field: answers['q7'] || null,

            // Metadata
            user_agent: navigator.userAgent,
        };

        console.log("Submitting record:", submissionData);

        // Insert new record
        const { data, error } = await supabase
            .from('survey_responses')
            .insert([submissionData])
            .select();

        if (error) throw error;

        // Show success message
        const successMsg = `✅ Submission Successful!\nSession ID: ${sessionId}\nTimestamp: ${new Date().toLocaleString()}`;
        updateDebugLog(true, successMsg);

        return true;

    } catch (error) {
        console.error("Submission error:", error);

        // Show error message
        const errorMsg = `❌ Submission Failed\nError: ${error.message}`;
        const details = `Details: ${JSON.stringify(error, null, 2)}`;
        updateDebugLog(false, errorMsg, details);

        alert(`Submission failed: ${error.message}\n\nPlease try again or contact support.`);
        return false;
    }
}

init();
