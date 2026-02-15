const supabase = window.supabaseClient;

// Configuration for Charts
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = '#4b5563';

async function initDashboard() {
    try {
        // Fetch all data
        const { data, error, count } = await supabase
            .from('survey_responses')
            .select('*', { count: 'exact' });

        if (error) throw error;

        // Update Total Count
        document.getElementById('total-responses').innerText = count || data.length;
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('charts-container').classList.remove('hidden');

        // Process Data
        const aggregations = aggregateData(data);

        // Render Charts
        renderPieChart('chart-q1', aggregations.q1, 'Status');
        renderBarChart('chart-q2', aggregations.q2, 'Challenges', true); // Horizontal Bar
        renderPieChart('chart-q3', aggregations.q3, 'Satisfaction');
        renderMatrixChart('chart-q4', aggregations.q4);
        renderPieChart('chart-q5', aggregations.q5, 'Trust Level');
        renderBarChart('chart-q6', aggregations.q6, 'Reasons', true);
        renderBarChart('chart-q7', aggregations.q7, 'Education Field');

    } catch (err) {
        console.error('Dashboard Error:', err);
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('error-message').classList.remove('hidden');
    }
}

function aggregateData(data) {
    const agg = {
        q1: {}, // Status
        q2: {}, // Challenges (Multi)
        q3: {}, // Satisfaction
        q4: {}, // Matrix
        q5: {}, // Trust
        q6: {}, // Switch Reasons (Multi)
        q7: {}  // Education
    };

    data.forEach(response => {
        // Single Selects (Q1, Q3, Q5, Q7)
        countOption(agg.q1, response.q1_current_status);
        countOption(agg.q3, response.q3_placement_satisfaction);
        countOption(agg.q5, response.q5_trust_ai);
        countOption(agg.q7, response.q7_education_field);

        // Multi Selects (Q2, Q6) check if array or string
        processMultiSelect(agg.q2, response.q2_job_challenges);
        processMultiSelect(agg.q6, response.q6_switch_reasons);

        // Matrix (Q4)
        if (response.q4_ai_features_rating) {
            Object.entries(response.q4_ai_features_rating).forEach(([feature, rating]) => {
                if (!agg.q4[feature]) agg.q4[feature] = { "Very Useful": 0, "Useful": 0, "Neutral": 0, "Not Useful": 0 };
                if (agg.q4[feature][rating] !== undefined) {
                    agg.q4[feature][rating]++;
                }
            });
        }
    });

    return agg;
}

function countOption(obj, value) {
    if (!value) return;
    obj[value] = (obj[value] || 0) + 1;
}

function processMultiSelect(obj, value) {
    if (!value) return;
    if (Array.isArray(value)) {
        value.forEach(v => countOption(obj, v));
    } else if (typeof value === 'string') {
        countOption(obj, value);
    }
}

// Chart Rendering Helpers

function renderPieChart(canvasId, dataObj, label) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(dataObj),
            datasets: [{
                label: label,
                data: Object.values(dataObj),
                backgroundColor: [
                    '#22d3ee', '#3b82f6', '#8b5cf6', '#a855f7', '#ec4899', '#f43f5e'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            let value = context.parsed;
                            let total = context.dataset.data.reduce((a, b) => a + b, 0);
                            let percentage = Math.round((value / total) * 100) + '%';
                            return label + value + ' (' + percentage + ')';
                        }
                    }
                }
            }
        }
    });
}

function renderBarChart(canvasId, dataObj, label, horizontal = false) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(dataObj),
            datasets: [{
                label: 'Votes',
                data: Object.values(dataObj),
                backgroundColor: '#3b82f6',
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: horizontal ? 'y' : 'x',
            responsive: true,
            scales: {
                x: { beginAtZero: true },
                y: { beginAtZero: true }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            let value = context.parsed[horizontal ? 'x' : 'y'];
                            let total = context.dataset.data.reduce((a, b) => a + b, 0);
                            let percentage = Math.round((value / total) * 100) + '%';
                            return label + value + ' (' + percentage + ')';
                        }
                    }
                }
            }
        }
    });
}

function renderMatrixChart(canvasId, dataObj) {
    const features = Object.keys(dataObj);
    const ratings = ["Very Useful", "Useful", "Neutral", "Not Useful"];

    // Calculate total responses per feature (row)
    const rowTotals = {};
    features.forEach(f => {
        rowTotals[f] = ratings.reduce((sum, r) => sum + (dataObj[f][r] || 0), 0);
    });

    const datasets = ratings.map((rating, idx) => ({
        label: rating,
        data: features.map(f => dataObj[f][rating]),
        backgroundColor: ['#22c55e', '#3b82f6', '#facc15', '#ef4444'][idx]
    }));

    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: features.map(f => f.length > 30 ? f.substring(0, 30) + '...' : f), // Truncate long labels
            datasets: datasets
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
                x: { stacked: true },
                y: { stacked: true }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        title: (items) => features[items[0].dataIndex],
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            let value = context.parsed.x;
                            let featureIndex = context.dataIndex;
                            let featureName = features[featureIndex];
                            let total = rowTotals[featureName];
                            let percentage = total > 0 ? Math.round((value / total) * 100) + '%' : '0%';
                            return label + value + ' (' + percentage + ')';
                        }
                    }
                }
            }
        }
    });
}

// Run
initDashboard();
