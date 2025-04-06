// 🔹 Student class to represent a student with a name and list of grades
class Student {
    constructor(name) {
        this.name = name;
        this.grades = []; // stores test scores
    }

    // Add a new score to the grades list
    addGrade(score) {
        this.grades.push(score);
    }

    // Calculate average of all grades
    getAverage() {
        const sum = this.grades.reduce((a, b) => a + b, 0);
        return this.grades.length ? sum / this.grades.length : 0;
    }

    // Return average with 2 decimal places
    getAverageFixed() {
        return this.getAverage().toFixed(2);
    }
}

// 🔹 Teacher class with name and subject they teach
class Teacher {
    constructor(name, subject) {
        this.name = name;
        this.subject = subject;
    }
}

// 🔹 Classroom class which holds a subject, a teacher, and students
class Classroom {
    constructor(subject, teacher) {
        this.subject = subject;
        this.teacher = teacher;
        this.students = []; // list of students in this classroom
    }

    // Add a student to this classroom
    addStudent(student) {
        this.students.push(student);
    }

    // Assign random grades (60–100) to each student in the class
    giveGrades() {
        this.students.forEach(s => {
            const score = Math.floor(Math.random() * 41) + 60;
            s.addGrade(score);
        });
    }

    // Calculate average grade for the whole class
    getClassAverage() {
        const total = this.students.reduce((sum, s) => sum + s.getAverage(), 0);
        return this.students.length ? total / this.students.length : 0;
    }
}

// 🔹 Setup data for the simulation

// Step 1: Define subjects
const subjects = ["Math", "Science", "English", "History", "Art"];

// Step 2: Create a teacher for each subject
const teachers = subjects.map((subj, i) => new Teacher(`Teacher${i + 1}`, subj));

// Step 3: Create 30 students named Student1 to Student30
const students = Array.from({ length: 30 }, (_, i) => new Student(`Student${i + 1}`));

// Step 4: Create one classroom for each subject, assigning a teacher
const classes = subjects.map((subj, i) => new Classroom(subj, teachers[i]));

// Step 5: Assign students evenly to classrooms (round-robin style)
students.forEach((student, i) => {
    const cls = classes[i % classes.length];
    cls.addStudent(student);
});

// Step 6: Assign random grades to each student in each class
classes.forEach(cls => cls.giveGrades());

// 🔹 1. Find and print Top 5 students based on average grade
const top5 = [...students].sort((a, b) => b.getAverage() - a.getAverage()).slice(0, 5);
console.log("🎓 Top 5 Students by Average Grade:");
top5.forEach((s, i) => {
    console.log(`${i + 1}. ${s.name} - Avg: ${s.getAverageFixed()}`);
});
console.log("");

// 🔹 2. Find teacher with class that has highest student average
let topClass = classes.sort((a, b) => b.getClassAverage() - a.getClassAverage())[0];
console.log(`🏆 Teacher with highest student average: ${topClass.teacher.name} (${topClass.subject})`);
console.log(`Class Average: ${topClass.getClassAverage().toFixed(2)}\n`);

// 🔹 3. Print all students per class with their average score
console.log("📚 Students per Class:");
classes.forEach(cls => {
    console.log(`\n${cls.subject} - Teacher: ${cls.teacher.name}`);
    cls.students.forEach(s => {
        console.log(`- ${s.name}: ${s.getAverageFixed()}`);
    });
});
