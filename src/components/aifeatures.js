// Build project button
document.getElementById('buildProjectBtn').addEventListener('click', function () {
    const ciTab = document.getElementById('ci-tab');
    bootstrap.Tab.getOrCreateInstance(ciTab).show();

    const progressBar = document.querySelector('.build-progress .progress-bar');
    progressBar.style.width = '0%';
    document.querySelector('.build-status .d-flex span:first-child').textContent = 'Build #12346 started';
    document.querySelector('.build-status .d-flex span:last-child').textContent = '0%';

    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        progressBar.style.width = progress + '%';
        document.querySelector('.build-status .d-flex span:last-child').textContent = progress + '%';

        if (progress >= 100) {
            clearInterval(interval);
            document.querySelector('.build-status .d-flex span:first-child').textContent = 'Build #12346 completed';
            showNotification('Build completed successfully');
        }
    }, 200);
});

document.getElementById('aiAssistBtn').addEventListener('click', function () {
    showNotification('AI Assistant activated');
    setTimeout(() => {
        const aiSuggestionsTab = document.getElementById('ai-suggestions-tab');
        bootstrap.Tab.getOrCreateInstance(aiSuggestionsTab).show();

        document.querySelector('#ai-suggestions').innerHTML += `
        <div class="ai-suggestion mt-3" style="background-color: #f0fff4; border-left: 3px solid #38a169;">
            <h6>Performance Improvement</h6>
            <p>I noticed your processData function processes items with a for loop. Converting this to use Array.map() or Array.filter() could improve readability and performance.</p>
            <pre style="background-color: #f8f9fa; padding: 8px; border-radius: 4px; font-size: 12px;">// Suggested change:
const processedData = data.map(item => {
if (item.value > 0) {
return { ...item, processed: true };
}
return item;
});</pre>
<button class="btn btn-sm btn-outline-primary">Apply Suggestion</button>
</div>`;
    }, 500);
});