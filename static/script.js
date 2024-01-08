document.getElementById('addCourseBtn').addEventListener('click', function() {
    document.getElementById('courseForm').style.display = 'block';
});

var timetable = document.getElementById('timetable');
var timetableCells = timetable.getElementsByTagName('td');

for (var i = 0; i < timetableCells.length; i++) {
    var cell = timetableCells[i];
    cell.addEventListener('dragover', function(event) {
        event.preventDefault(); // Allow drop
    });

    cell.addEventListener('drop', function(event) {
        event.preventDefault();
        var courseId = event.dataTransfer.getData('text/plain');
        var courseDiv = document.getElementById(courseId);
        if (courseDiv) {
            // Calculate the day and time from the cell's position
            var day = this.cellIndex - 1; // Subtract 1 to account for the time column
            var time = this.parentNode.rowIndex - 1; // Subtract 1 to account for the header row

            // Update the content of the cell with the course information
            var courseClone = courseDiv.cloneNode(true);
            courseClone.style.position = 'static';
            courseClone.style.left = '';
            courseClone.style.top = '';
            courseClone.dropped = true;

            // Set the background color of the course div
            courseClone.style.backgroundColor = courseDiv.style.backgroundColor;

            // Clear the cell's previous content and append the course div
            while (this.firstChild) {
                this.removeChild(this.firstChild);
            }
            this.appendChild(courseClone);
        }
    });
}

function makeDraggable(element) {
    element.draggable = true;
    element.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
        event.target.style.opacity = '0.5';
    });
    element.addEventListener('dragend', function(event) {
        event.target.style.opacity = '';
    });
}

function addCourse() {
    var courseName = document.getElementById('courseName').value;
    var courseCode = document.getElementById('courseCode').value;
    var teacherName = document.getElementById('teacherName').value;
    var courseColor = document.getElementById('courseColor').value;

    var courseDiv = document.createElement('div');
    courseDiv.className = 'course';
    courseDiv.innerHTML = courseName + '<br>( ' + courseCode + ' )<br> {' + teacherName + '}';


    courseDiv.style.backgroundColor = courseColor;
    document.getElementById('courseContainer').appendChild(courseDiv);

    makeDraggable(courseDiv);

    document.getElementById('courseForm').style.display = 'none';
    document.getElementById('courseName').value = '';
    document.getElementById('courseCode').value = '';
    document.getElementById('teacherName').value = '';
    document.getElementById('courseColor').value = '#ffffff';
}
