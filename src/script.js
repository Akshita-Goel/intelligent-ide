function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        showNotification('Welcome to Intelligent IDE');
    }, 1000);
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    document.getElementById('suggestFixBtn').addEventListener('click', function () {
        showNotification('Analyzing code for issues...');
        setTimeout(() => {
            const debugModal = new bootstrap.Modal(document.getElementById('debugModal'));
            debugModal.show();
        }, 800);
    });

    document.getElementById('generateCodeBtn').addEventListener('click', function () {
        const aiGenerateModal = new bootstrap.Modal(document.getElementById('aiGenerateModal'));
        aiGenerateModal.show();
    });

    document.getElementById('ciSettingsBtn').addEventListener('click', function () {
        const ciSettingsModal = new bootstrap.Modal(document.getElementById('ciSettingsModal'));
        ciSettingsModal.show();
    });

    document.getElementById('regenerateBtn').addEventListener('click', function () {
        document.getElementById('generatedCodePreview').textContent = `// Regenerated code
function sortArrayByProperty(array, property) {
if (!Array.isArray(array)) {
throw new TypeError('First argument must be an array');
}
if (typeof property !== 'string') {
throw new TypeError('Second argument must be a string');
}
return [...array].sort((a, b) => {
if (a[property] < b[property]) return -1;
if (a[property] > b[property]) return 1;
return 0;
});
}`;
        showNotification('Code regenerated');
    });
    document.getElementById('insertCodeBtn').addEventListener('click', function () {
        editor.replaceSelection(`function sortArrayByProperty(array, property) {
if (!Array.isArray(array)) {
throw new TypeError('First argument must be an array');
}
if (typeof property !== 'string') {
throw new TypeError('Second argument must be a string');
}
return [...array].sort((a, b) => {
if (a[property] < b[property]) return -1;
if (a[property] > b[property]) return 1;
return 0;
});
}`);
        const aiGenerateModal = bootstrap.Modal.getInstance(document.getElementById('aiGenerateModal'));
        aiGenerateModal.hide();
        showNotification('Code inserted successfully');
    });
    document.getElementById('applyFixBtn').addEventListener('click', function () {
        const fixedCode = editor.getValue().replace(
            `  // Calculate total (this will cause an error)
const total = calculateTotal(data);,                       
// Import fixed
// Calculate total using reduce
const total = data.reduce((sum, item) => sum + (item.value || 0), 0);`
        );
        editor.setValue(fixedCode);
        const debugModal = bootstrap.Modal.getInstance(document.getElementById('debugModal'));
        debugModal.hide();
        showNotification('Bug fix applied');
    });
    document.getElementById('debugCodeBtn').addEventListener('click', function () {
        showNotification('Analyzing code for bugs...');
        setTimeout(() => {
            const debugModal = new bootstrap.Modal(document.getElementById('debugModal'));
            debugModal.show();
        }, 800);
    });

    document.getElementById('generateTestsBtn').addEventListener('click', function () {
        showNotification('Generating test cases...');
        setTimeout(() => {
            const testsTab = document.getElementById('tests-tab');
            bootstrap.Tab.getOrCreateInstance(testsTab).show();

            document.querySelector('#tests .test-results').innerHTML += `
        <div class="test-item mt-3 new-test" style="background-color: #e7f5ff; padding: 8px; border-radius: 4px;">
            <div class="d-flex justify-content-between">
                <span><i class="bi bi-plus-circle text-primary"></i> <strong>New Test:</strong> Should handle null input</span>
                <span>Generated</span>
            </div>
            <div class="test-code mt-1">
                <pre style="margin: 0; font-size: 12px;">test('Should handle null input', () => {
expect(() => processData(null)).toThrow('Invalid data format');
});</pre>
</div>
<button class="btn btn-sm btn-success mt-2">Add to Test Suite</button>
</div>`;
        }, 1000);
    });

    document.getElementById('applyAndCloseBtn').addEventListener('click', function () {
        const debugModal = bootstrap.Modal.getInstance(document.getElementById('debugModal'));
        debugModal.hide();
        showNotification('Bug fix applied');
    });

    // Run tests
    document.getElementById('runAllTestsBtn').addEventListener('click', function () {
        this.disabled = true;
        this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Running...';

        setTimeout(() => {
            this.disabled = false;
            this.textContent = 'Run All Tests';
            showNotification('All tests completed: 11 passed, 1 failed');

            // Update test results
            document.querySelector('#tests .test-summary').innerHTML = `
            <span class="badge bg-success">11 Passed</span>
            <span class="badge bg-danger">1 Failed</span>
            <span class="badge bg-secondary">1 Skipped</span>
        `;
        }, 2000);
    });

    document.querySelectorAll('#fileTree li').forEach(item => {
        item.addEventListener('click', function (e) {
            e.stopPropagation();
            const isFolder = this.querySelector('.folder-icon');
            const fileName = this.textContent.trim();

            if (isFolder) {
                const sublist = this.querySelector('ul');
                if (sublist) {
                    sublist.style.display = sublist.style.display === 'none' ? 'block' : 'none';
                }
            } else {
                showNotification(`Opening ${fileName}...`);

                // Simulate opening different files
                if (fileName.includes('main.test.js')) {
                    editor.setValue(`// main.test.js
import { processData } from './main';
describe('processData', () => {
test('should process valid data correctly', () => {
const testData = [
{ id: 1, value: 10 },
{ id: 2, value: -5 },
{ id: 3, value: 15 }
];
Copyconst result = processData(testData);
expect(result.data.length).toBe(3);
expect(result.data[0].processed).toBe(true);
expect(result.data[1].processed).toBeUndefined();
expect(result.total).toBe(25); // Assuming calculateTotal sums all values
});
test('should throw error for invalid input', () => {
expect(() => processData(null)).toThrow('Invalid data format');
expect(() => processData('invalid')).toThrow('Invalid data format');
});
});
);                         
}
else if (fileName.includes('index.html')) {                             
 editor.setValue(
/**

Calculate the total value from an array of items
@parameter {Array} items - Array of items with value property
@returns {number} - Sum of all values
*/
export function calculateTotal(items) {
if (!Array.isArray(items)) {
return 0;
}

return items.reduce((total, item) => {
return total + (item.value || 0);
}, 0);
}
/**

Format currency value
@parameter {number} value - Number to format
@parameter {string} currency - Currency code
@returns {string} - Formatted currency string
*/
export function formatCurrency(value, currency = 'USD') {
return new Intl.NumberFormat('en-US', {
style: 'currency',
currency: currency
}).format(value);
}

/**

Filter items by a specific property value
@parameter {Array} items - Array of items
@parameter {string} property - Property name to filter by
@parameter {*} value - Value to compare against
@returns {Array} - Filtered array
*/
export function filterItems(items, property, value) {
if (!Array.isArray(items)) {
return [];
}

return items.filter(item => item[property] === value);
}`);
                }
            }
        });
    });
});