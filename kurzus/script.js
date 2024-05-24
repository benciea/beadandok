const url = "https://vvri.pythonanywhere.com/api";
const expanded = {};

async function fetchCourses() {
    try {
        const response = await fetch(`${url}/courses`);
        const data = await response.json();
        document.getElementById('courses').innerHTML = '';
        data.forEach(course => {
            addCoursePanel(course);
        });
    } catch (error) {
        console.log(`Hiba történt: ${error}`);
    }
}

async function createCourse() {
    const courseName = document.getElementById("newCourseName").value;
    try {
        const response = await fetch(`${url}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: courseName })
        });
        const data = await response.json();
        console.log("Új kurzus: ", data);
        fetchCourses();
    } catch (error) {
        console.log("Hiba történt: " + error);
    }
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

async function addStudent(courseId) {
    const studentName = prompt("Kérem, adja meg az új diák nevét:");
    if (studentName) {
        try {
            const response = await fetch(`${url}/students`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: studentName,
                    course_id: courseId
                })
            });
            const data = await response.json();
            fetchCourses();
        } catch (error) {
            console.log("Hiba történt: " + error);
        }
    }
}

async function renameStudent(studentId) {
    const studentNameEl = document.getElementById(`studentName_${studentId}`);
    const newStudentName = prompt("Diák új neve:", studentNameEl.innerText);
    if (newStudentName !== null) {
        try {
            const response = await fetch(`${url}/students/${studentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newStudentName })
            });
            const data = await response.json();
            studentNameEl.innerText = newStudentName;
        } catch (error) {
            console.log(`Hiba történt: ${error}`);
        }
    }
}

async function deleteStudent(courseId, studentId, button) {
    try {
        const response = await fetch(`${url}/students/${studentId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            const studentElement = button.parentNode.parentNode;
            studentElement.remove();
        } else {
            console.log("Hiba a diák törlésekor");
        }
    } catch (error) {
        console.log(`Hiba történt: ${error}`);
    }
}

async function deleteCourse(courseId) {
    try {
        const response = await fetch(`${url}/courses/${courseId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            const coursePanel = document.querySelector(`.course[data-course-id="${courseId}"]`);
            if (coursePanel) {
                coursePanel.remove();
            }
        } else {
            console.log("Nem sikerült törölni a kurzust.");
        }
    } catch (error) {
        console.log(`Hiba történt: ${error}`);
    }
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
