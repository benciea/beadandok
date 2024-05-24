const url = "https://vvri.pythonanywhere.com/api";

const expanded = {};

function fetchCourses() {
    fetch(`${url}/courses`).then(response => response.json()).then(data => {document.getElementById('courses').innerHTML = '';data.forEach(course => {addCoursePanel(course);});})
    .catch(error => console.log(`Hiba történt: ${error}`));
}

function createCourse() {
    const courseName = document.getElementById("newCourseName").value;
    fetch(`${url}/courses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: courseName })
    })
    .then(response => response.json()).then(data => {console.log("Új kurzus: ", data); fetchCourses();})
    .catch(error => console.log("Hiba történt: " + error));
}

function addCoursePanel(course) {
    const coursePanel = document.createElement('div');
    coursePanel.classList.add('course');
    coursePanel.dataset.courseId = course.id;
    coursePanel.innerHTML = `
        <h2>Kurzus: ${course.name}</h2>
        <div class="btn-group">
            <button class="btn" onclick="toggleStudents(${course.id})">Diákok</button>
            <button class="btn" onclick="addStudent(${course.id})">Új diák</button>
            <button class="btn" onclick="deleteCourse(${course.id})">Törlés</button>
        </div>
        <div class="students" id="students_${course.id}">
            <h3>Diákok:</h3>
            ${course.students.map(student => `
                <div class="studentItem">
                    <span id="studentName_${student.id}">${student.name}</span>
                    <div class="btn-group">
                        <button class="btn" onclick="renameStudent(${student.id})">Átnevezés</button>
                        <button class="btn" onclick="deleteStudent(${course.id}, ${student.id}, this)">Törlés</button>
                    </div>
                </div>
            `).join('')}
        </div>`;
    document.getElementById('courses').appendChild(coursePanel);
}

function addStudent(courseId) {
    const studentName = prompt("Kérem, adja meg az új diák nevét:");
    if (studentName) {
        fetch(`${url}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: studentName,
                course_id: courseId
            })
        })
        .then(response => response.json()).then(data => {fetchCourses();})
        .catch(error => console.log("Hiba történt: " + error));
    }
}

function renameStudent(studentId) {
    const studentNameEl = document.getElementById(`studentName_${studentId}`);
    const newStudentName = prompt("Diál új neve:", studentNameEl.innerText);
    if (newStudentName !== null) {
        console.log(newStudentName);
        fetch(`${url}/students/${studentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newStudentName })
        })
        .then(response => response.json()).then(data => {studentNameEl.innerText = newStudentName;})
        .catch(error => console.log(`Hiba történt: ${error}`));
    }
}

function deleteStudent(courseId, studentId, button) {
    fetch(`${url}/students/${studentId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            const studentElement = button.parentNode.parentNode;
            studentElement.remove();
        } else {
            console.log("Hiba a diák törlésekor");
        }
    })
    .catch(error => console.log(`Hiba történt: ${error}`));
}

function deleteCourse(courseId) {
    fetch(`${url}/courses/${courseId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            const coursePanel = document.querySelector(`.course[data-course-id="${courseId}"]`);
            if (coursePanel) {
                coursePanel.remove();
            }
        } else {
            console.log("Nem sikerült törölni a kurzust.");
        }
    })
    .catch(error => console.log(`Hiba történt: ${error}`));
}

function toggleStudents(courseId) {
    const studentsElement = document.getElementById(`students_${courseId}`);
    if (expanded[courseId]) {
        studentsElement.style.maxHeight = '0';
        expanded[courseId] = false;
    } else {
        studentsElement.style.maxHeight = `${studentsElement.scrollHeight}px`;
        expanded[courseId] = true;
    }
}

fetchCourses();