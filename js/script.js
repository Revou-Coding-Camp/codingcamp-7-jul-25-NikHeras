console.log('lagi jalan');
// Ambil elemen dari HTML
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filterInput = document.getElementById("filter-input");

// Event submit form
todoForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Validasi input
    const task = todoInput.value.trim();
    const date = dateInput.value;

    if (task === "" || date === "") {
        alert("Please fill in both task and date.");
        return;
    }

    // Buat lits baru
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${task}</td>
        <td>${date}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    todoList.appendChild(tr);

    // Bersihkan input
    todoInput.value = "";
    dateInput.value = "";
});

// Event delete
todoList.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete-btn")) {
        if (confirm("Are you sure you want to delete this task?")) {
            e.target.parentElement.parentElement.remove();
        }
    }
});

// Event filter
// filterInput.addEventListener("keyup", function(e) {
//     const text = e.target.value.toLowerCase();
//     const items = todoList.getElementsByTagName("tr");

//     Array.from(rows).forEach(function(row) {
//         const taskText = row.cells[0].textContent.toLowerCase();
//         if (taskText.indexOf(text) != -1) {
//             row.style.display = "";
//         } else {
//             row.style.display = "none";
//         }
//     });
// });
filterInput.addEventListener("keyup", function(e) {
    const text = e.target.value.toLowerCase();
    const rows = todoList.getElementsByTagName("tr");

    const matched = []; // array untuk menyimpan yang cocok
    const unmatched = []; // array untuk menyimpan yang tidak cocok

    Array.from(rows).forEach(function(row) {
        if (row.cells.length > 0) {
            const taskText = row.cells[0].textContent.toLowerCase();
            if (taskText.indexOf(text) != -1) {
                matched.push(row);
            } else {
                unmatched.push(row);
            }
        }
    });

    // Hapus semua row dari table
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }

    // Tambahkan yang cocok di atas
    matched.forEach(function(row) {
        todoList.appendChild(row);
        row.style.display = ""; // pastikan ditampilkan
    });

    // Tambahkan yang tidak cocok di bawah, sembunyikan
    unmatched.forEach(function(row) {
        todoList.appendChild(row);
        row.style.display = "none";
    });
});

