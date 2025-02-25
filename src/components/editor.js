// Initialize CodeMirror
const editor = CodeMirror(document.getElementById("editor"), {
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
    lineWrapping: true,
    indentUnit: 2,
    tabSize: 2,
    value: `// Sample JavaScript code
function processData(data) {
if (!data || !Array.isArray(data)) {
throw new Error("Invalid data format");
}

let result = []; // This variable is unused (will trigger a warning)

// Process each item
for (let i = 0; i < data.length; i++) {
const item = data[i];
// Some processing logic
if (item.value > 0) {
item.processed = true;
}
}

// Calculate total (this will cause an error)
const total = calculateTotal(data);

return {
data: data,
total: total
};
}

// Export the function
export default processData;`
});