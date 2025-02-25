// Sidebar resizer functionality
const sidebarResizer = document.getElementById('sidebarResizer');
const sidebar = document.querySelector('.sidebar');
let isResizing = false;

sidebarResizer.addEventListener('mousedown', function (e) {
    isResizing = true;
    document.body.style.cursor = 'col-resize';
    e.preventDefault();
});

document.addEventListener('mousemove', function (e) {
    if (!isResizing) return;

    let newWidth = e.clientX;
    if (newWidth < 100) newWidth = 100;
    if (newWidth > 500) newWidth = 500;

    sidebar.style.width = newWidth + 'px';
});

document.addEventListener('mouseup', function () {
    isResizing = false;
    document.body.style.cursor = 'default';
});

// Panel resizer functionality
const panelResizer = document.getElementById('panelResizer');
const panelContainer = document.querySelector('.panel-container');
const editorWrapper = document.querySelector('.editor-wrapper');
let isPanelResizing = false;

panelResizer.addEventListener('mousedown', function (e) {
    isPanelResizing = true;
    document.body.style.cursor = 'row-resize';
    e.preventDefault();
});

document.addEventListener('mousemove', function (e) {
    if (!isPanelResizing) return;

    const editorContainer = document.querySelector('.editor-container');
    const editorRect = editorContainer.getBoundingClientRect();
    const containerHeight = editorRect.height;

    let panelHeight = containerHeight - (e.clientY - editorRect.top);
    if (panelHeight < 100) panelHeight = 100;
    if (panelHeight > containerHeight - 200) panelHeight = containerHeight - 200;

    panelContainer.style.height = panelHeight + 'px';
    editorWrapper.style.height = (containerHeight - panelHeight - 5) + 'px';
});

document.addEventListener('mouseup', function () {
    isPanelResizing = false;
    document.body.style.cursor = 'default';
});