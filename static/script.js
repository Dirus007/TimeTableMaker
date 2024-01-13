document.addEventListener('DOMContentLoaded', () => {
    initializeTimetable();
    addLine();
    setupDragAndDrop();
});

function initializeTimetable() {
    const timetable = document.getElementById('timetable');
    for (let i = 0; i < 25; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        timetable.appendChild(cell);
    }
}

function addLine() {
    const lineContainer = document.createElement('div');
    lineContainer.classList.add('line');

    const lineText = document.createElement('input');
    lineText.type = 'text';
    lineText.placeholder = 'Enter text';

    const lineColor = document.createElement('input');
    lineColor.type = 'color';

    const lineSize = document.createElement('input');
    lineSize.type = 'number';
    lineSize.placeholder = 'Font size';

    lineContainer.append(lineText, lineColor, lineSize);
    document.getElementById('linesContainer').appendChild(lineContainer);
}

function createTextBlock() {
    const bgColor = document.getElementById('bgColor').value;
    const lines = document.querySelectorAll('.line');

    let textBlock = document.createElement('div');
    textBlock.style.backgroundColor = bgColor;

    lines.forEach(line => {
        let textDiv = document.createElement('div');
        textDiv.draggable = true;
        textDiv.textContent = line.children[0].value;
        textDiv.style.color = line.children[1].value;
        textDiv.style.fontSize = line.children[2].value + 'px';
        textBlock.appendChild(textDiv);
    });

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = function() { this.parentNode.remove(); };

    textBlock.appendChild(deleteBtn);
    document.getElementById('objectCreationPanel').appendChild(textBlock);
}

function setupDragAndDrop() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        cell.addEventListener('drop', (event) => {
            event.preventDefault();
            let textBlock = document.querySelector('.dragging');
            if (textBlock) {
                cell.textContent = textBlock.textContent;
                cell.style.color = textBlock.style.color;
                cell.style.fontFamily = textBlock.style.fontFamily;
                cell.style.fontSize = textBlock.style.fontSize;
                cell.style.backgroundColor = textBlock.style.backgroundColor; // Ensure background color is copied
            }
        });
    });

    document.addEventListener('dragstart', (event) => {
            event.target.classList.add('dragging');
    });

    document.addEventListener('dragend', (event) => {
            event.target.classList.remove('dragging');
    });
}

function addDeleteFunctionality(block) {
    const deleteBtn = block.querySelector('.delete-btn');
    if (deleteBtn) {
        deleteBtn.onclick = function() { this.parentNode.remove(); };
    }
}

function updateCellSize() {
    const cellHeight = document.getElementById('cellHeight').value;
    const cellWidth = document.getElementById('cellWidth').value;
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        if (cellHeight) {
            cell.style.height = cellHeight + 'px';
        }
        if (cellWidth) {
            cell.style.width = cellWidth + 'px';
        }
    });
}

function addRow() {
    const timetable = document.getElementById('timetable');
    let columnCount = getComputedStyle(timetable).gridTemplateColumns.split(' ').length;
    for (let i = 0; i < columnCount; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        timetable.appendChild(cell);
    }
}

function removeRow() {
    const timetable = document.getElementById('timetable');
    let columnCount = getComputedStyle(timetable).gridTemplateColumns.split(' ').length;
    for (let i = 0; i < columnCount; i++) {
        if (timetable.lastChild) {
            timetable.removeChild(timetable.lastChild);
        }
    }
}

function addColumn() {
    const timetable = document.getElementById('timetable');
    let columnCount = getComputedStyle(timetable).gridTemplateColumns.split(' ').length;
    let newColumnCount = columnCount + 1;
    timetable.style.gridTemplateColumns = `repeat(${newColumnCount}, 1fr)`;
    let rowCount = timetable.childElementCount / columnCount;
    let totalCells = rowCount * newColumnCount;
    adjustCellCount(timetable, totalCells);
}

function removeColumn() {
    const timetable = document.getElementById('timetable');
    let columnCount = getComputedStyle(timetable).gridTemplateColumns.split(' ').length;
    if (columnCount > 1) {
        let newColumnCount = columnCount - 1;
        timetable.style.gridTemplateColumns = `repeat(${newColumnCount}, 1fr)`;
        let rowCount = timetable.childElementCount / columnCount;
        let totalCells = rowCount * newColumnCount;
        adjustCellCount(timetable, totalCells);
    }
}

function adjustCellCount(timetable, totalCells) {
    while (timetable.childElementCount < totalCells) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        timetable.appendChild(cell);
    }
    while (timetable.childElementCount > totalCells) {
        timetable.removeChild(timetable.lastChild);
    }
}


document.getElementById('downloadBtn').addEventListener('click', downloadTimetable);

function downloadTimetable() {
    const timetable = document.getElementById('timetable');
    html2canvas(timetable).then(canvas => {
        let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let link = document.createElement('a');
        link.download = 'timetable.png';
        link.href = image;
        link.click();
    });
}
