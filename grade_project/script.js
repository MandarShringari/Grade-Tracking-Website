let currentClassKey = "";

function loadClassData(key) {
  currentClassKey = key;
  renderTable();
}

function addGrade() {
  const subject = document.getElementById("subjectInput").value.trim();
  const grade = document.getElementById("gradeInput").value.trim();
  const comment = document.getElementById("commentInput").value.trim();

  if (!subject || !grade) {
    alert("Subject and Grade are required.");
    return;
  }

  const data = JSON.parse(localStorage.getItem(currentClassKey) || "[]");
  data.push({ subject, grade, comment });
  localStorage.setItem(currentClassKey, JSON.stringify(data));

  // Clear inputs
  document.getElementById("subjectInput").value = "";
  document.getElementById("gradeInput").value = "";
  document.getElementById("commentInput").value = "";

  renderTable();
}

function renderTable() {
  const data = JSON.parse(localStorage.getItem(currentClassKey) || "[]");
  const tbody = document.querySelector("#gradeTable tbody");
  tbody.innerHTML = "";

  data.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.subject}</td>
      <td>${entry.grade}</td>
      <td>${entry.comment}</td>
      <td><button onclick="deleteGrade(${index})">Delete</button></td>
    `;
    tbody.appendChild(row);
  });
}

function deleteGrade(index) {
  const data = JSON.parse(localStorage.getItem(currentClassKey) || "[]");
  data.splice(index, 1);
  localStorage.setItem(currentClassKey, JSON.stringify(data));
  renderTable();
}

function goBack() {
  window.location.href = "index.html";
}