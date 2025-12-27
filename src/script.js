const courses = [
    { id: 1, title: 'Intro to CS in Java', credits: 6 },
    { id: 2, title: 'Linear Algebra 1', credits: 7 },
    { id: 3, title: 'Discrete Mathematics', credits: 4 },
    { id: 4, title: 'Programming Systems Workshop', credits: 4 },
    { id: 5, title: 'Linear Algebra 2', credits: 5 },
    { id: 6, title: 'Calculus 1', credits: 7 },
]

const students = [
  {
    id: 1,
    name: 'Alice Brown',
    grades: [
      { grade: 98, course: 1 },
      { grade: 95, course: 4 },
      { grade: 92, course: 2 },
      { grade: 90, course: 6 }
    ]
  },
  {
    id: 2,
    name: 'Bob Smith',
    grades: [
      { grade: 80, course: 1 },
      { grade: 100, course: 3 },
      { grade: 95, course: 5 },
    ]
  },
  {
    id: 3,
    name: 'Charlie Johnson',
    grades: [
      { grade: 91, course: 1 },
      { grade: 60, course: 3 },
      { grade: 61, course: 4 }
    ]
  },
  {
    id: 4,
    name: 'Dana Levi',
    grades: [
      { grade: 88, course: 2 },
      { grade: 85, course: 4 },
      { grade: 87, course: 1 },
      { grade: 89, course: 6 }
    ]
  },
  {
    id: 5,
    name: 'Emilia Garcia',
    grades: [
      { grade: 61, course: 3 },
      { grade: 60, course: 1 },
      { grade: 75, course: 4 }
    ]
  },
  {
    id: 6,
    name: "Frank O'Connor",
    grades: [
      { grade: 100, course: 4 },
      { grade: 100, course: 1 },
      { grade: 100, course: 5 }
    ]
  },
  {
    id: 7,
    name: 'Gina Kim',
    grades: [
      { grade: 84, course: 2 },
      { grade: 79, course: 3 },
      { grade: 88, course: 4 },
      { grade: 81, course: 6 },
      { grade: 90, course: 1 }
    ]
  },
  {
    id: 8,
    name: 'Hacker Man',
    grades: [
      { grade: 94, course: 1 },
      { grade: 91, course: 4 },
      { grade: 91, course: 2 }
    ]
  },
  {
    id: 9,
    name: 'Ivy Chen',
    grades: [
      { grade: 95, course: 4 },
      { grade: 94, course: 1 },
      { grade: 91, course: 3 }
    ]
  },
  {
    id: 10,
    name: 'John Long',
    grades: [
      { grade: 91, course: 4 },
      { grade: 94, course: 1 }
    ]
  }
];
// ===== print to HTML =====
var out = document.getElementById("output");
var btn = document.getElementById("runBtn");

function clearOut() {
  out.textContent = "";
}

function printLine(text) {
  out.textContent += text + "\n";
}

function printObj(obj) {
  printLine(JSON.stringify(obj, null, 2));
}

//Demand 1
function addStudent(newStudent) {
  if (newStudent == null) throw new Error("Bad input");
  if (typeof newStudent.name !== "string") throw new Error("Name missing");
  if (newStudent.name.trim() === "") throw new Error("Name missing");
  if (!Array.isArray(newStudent.grades)) throw new Error("Grades must be array");

  // check courses exist + fix grades (round)
  var fixedGrades = [];
  for (var i = 0; i < newStudent.grades.length; i++) {
    var g = newStudent.grades[i];

    if (g == null) throw new Error("Bad grade item");

    var cId = g.course;
    var grade = g.grade;

    if (typeof cId !== "number" || cId % 1 !== 0) throw new Error("Course id must be integer");

    // check course exists
    var foundCourse = false;
    for (var k = 0; k < courses.length; k++) {
      if (courses[k].id === cId) {
        foundCourse = true;
        break;
      }
    }
    if (!foundCourse) throw new Error("Course not found: " + cId);

    if (typeof grade !== "number") throw new Error("Bad grade number");

    // round if not integer
    if (grade % 1 !== 0) grade = Math.round(grade);

    if (grade < 0 || grade > 100) throw new Error("Grade out of range for course " + cId);

    fixedGrades.push({ grade: grade, course: cId });
  }

  // must pass course 1 and 4
  var has1 = false, has4 = false;
  var grade1 = 0, grade4 = 0;

  for (var j = 0; j < fixedGrades.length; j++) {
    if (fixedGrades[j].course === 1) {
      has1 = true;
      grade1 = fixedGrades[j].grade;
    }
    if (fixedGrades[j].course === 4) {
      has4 = true;
      grade4 = fixedGrades[j].grade;
    }
  }

  if (!has1) throw new Error("Missing course 1");
  if (!has4) throw new Error("Missing course 4");
  if (grade1 < 60 || grade4 < 60) throw new Error("Must pass course 1 and 4");

  // get next id
  var maxId = 0;
  for (var m = 0; m < students.length; m++) {
    if (students[m].id > maxId) maxId = students[m].id;
  }

  var obj = {
    id: maxId + 1,
    name: newStudent.name.trim(),
    grades: fixedGrades
  };

  students.push(obj);
  return obj;
}

//Demand 2
function analyzeStudentGrades(studentId) {
  // find student
  var st = null;
  for (var i = 0; i < students.length; i++) {
    if (students[i].id === studentId) {
      st = students[i];
      break;
    }
  }
  if (st == null) throw new Error("Student not found");

  // overall avg (ceil)
  var allSum = 0;
  var allCount = 0;
  for (var a = 0; a < students.length; a++) {
    for (var b = 0; b < students[a].grades.length; b++) {
      allSum += students[a].grades[b].grade;
      allCount++;
    }
  }
  var overallAvg = Math.ceil(allSum / allCount);

  // student avg (ceil)
  var mySum = 0;
  for (var c = 0; c < st.grades.length; c++) {
    mySum += st.grades[c].grade;
  }
  var avg = Math.ceil(mySum / st.grades.length);

  var aboveBy = avg - overallAvg;
  var isAboveBy20 = (aboveBy >= 20);

  // last 2 grades > avg
  var n = st.grades.length;
  var last1 = st.grades[n - 1].grade;
  var last2 = st.grades[n - 2].grade;
  var improved = (last1 > avg && last2 > avg);

  return { avg: avg, isAboveBy20: isAboveBy20, aboveBy: aboveBy, improved: improved };
}

//Demand 3
function getSuspiciousPairs() {
  // build map: "course|grade" list of students
  var keys = {};

  for (var i = 0; i < students.length; i++) {
    var s = students[i];

    for (var j = 0; j < s.grades.length; j++) {
      var g = s.grades[j];
      var key = g.course + "|" + g.grade;

      if (keys[key] == null) keys[key] = [];
      keys[key].push({ id: s.id, name: s.name });
    }
  }

  // unique pairs by "min|max"
  var pairSeen = {};
  var res = [];

  for (var keyName in keys) {
    var list = keys[keyName];
    if (list.length < 2) continue;

    for (var a = 0; a < list.length; a++) {
      for (var b = a + 1; b < list.length; b++) {
        var id1 = list[a].id;
        var id2 = list[b].id;

        var min = id1 < id2 ? id1 : id2;
        var max = id1 < id2 ? id2 : id1;

        var pKey = min + "|" + max;

        if (!pairSeen[pKey]) {
          pairSeen[pKey] = true;

          var name1 = (min === id1) ? list[a].name : list[b].name;
          var name2 = (min === id1) ? list[b].name : list[a].name;

          res.push([name1, name2]);
        }
      }
    }
  }

  return res;
}

function printSuspiciousPairs() {
  var pairs = getSuspiciousPairs();

  if (pairs.length === 0) {
    printLine("אין זוגות חשודים כלל");
    return;
  }

  for (var i = 0; i < pairs.length; i++) {
    printLine(pairs[i][0] + " - " + pairs[i][1]);
  }
}

//Demand 4
function sortStudents() {
  var copy = students.slice(); // do not change original array

  function avgOf(s) {
    var sum = 0;
    for (var i = 0; i < s.grades.length; i++) {
      sum += s.grades[i].grade;
    }
    return sum / s.grades.length;
  }

  copy.sort(function (a, b) {
    var avA = avgOf(a);
    var avB = avgOf(b);

    if (avA !== avB) return avA - avB;

    var cA = a.grades.length;
    var cB = b.grades.length;

    if (cA !== cB) return cA - cB;

    return a.name.localeCompare(b.name);
  });

  return copy;
}

//Demand 5
function getWeakStudents() {
  var res = [];

  for (var i = 0; i < students.length; i++) {
    var s = students[i];

    // calc avg
    var sum = 0;
    for (var j = 0; j < s.grades.length; j++) {
      sum += s.grades[j].grade;
    }
    var avg = sum / s.grades.length;

    var n = s.grades.length;
    var last1 = s.grades[n - 1].grade;
    var last2 = s.grades[n - 2].grade;

    var cond1 = (avg < 70);
    var cond2 = (last1 < avg && last2 < avg);

    if (cond1 || cond2) res.push(s);
  }

  return res;
}

//run tests and print
function runAll() {
  clearOut();

  printLine("=== Demand 1 ===");
  try {
    var added = addStudent({
      name: "Test Student",
      grades: [
        { grade: 90.6, course: 1 },
        { grade: 77, course: 4 },
        { grade: 88, course: 2 }
      ]
    });
    printLine("Added:");
    printObj(added);
  } catch (e) {
    printLine("Error: " + e.message);
  }

  printLine("\n=== Demand 2 ===");
  try {
    printObj(analyzeStudentGrades(1));
  } catch (e) {
    printLine("Error: " + e.message);
  }

  printLine("\n=== Demand 3 ===");
  printSuspiciousPairs();

  printLine("\n=== Demand 4 ===");
  var sorted = sortStudents();
  for (var i = 0; i < sorted.length; i++) {
    var s = sorted[i];

    // compute avg for display
    var sum = 0;
    for (var j = 0; j < s.grades.length; j++) sum += s.grades[j].grade;
    var avg = sum / s.grades.length;

    printLine(s.name + " | avg=" + avg.toFixed(2) + " | courses=" + s.grades.length);
  }

  printLine("\n=== Demand 5 ===");
  var weak = getWeakStudents();
  for (var i = 0; i < weak.length; i++) {
    printLine(weak[i].name);
  }
}

if (btn) btn.addEventListener("click", runAll);
runAll();