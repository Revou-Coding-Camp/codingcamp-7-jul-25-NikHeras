console.log('lagi jalan');
// Ambil elemen dari HTML
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filterInput = document.getElementById("filter-input");
const showDeletedBtn = document.getElementById("show-deleted");
const showActiveBtn = document.getElementById("show-active");

let activeTasks = [];
let deletedTasks = [];

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
    
    activeTasks.push({ id: Date.now(), task, date });
    renderActiveTasks();
    
    // Bersihkan input
    todoInput.value = "";
    dateInput.value = "";
});

// Event delete
todoList.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete-btn")) {
        if (confirm("Are you sure you want to delete this task?")) {
            const id = parseInt(e.target.getAttribute("data-id"));
            const index = activeTasks.findIndex(task => task.id === id);
            // deletedTasks.push(removed);
            // renderActiveTasks();
            if (index !== -1) {
                const removed = activeTasks.splice(index, 1)[0];
                deletedTasks.push(removed);
                renderActiveTasks();
            }
        }
    }
    
});

// filter
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

// History
showDeletedBtn.addEventListener("click", function() {
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }

    // Tampilkan task yang dihapus
    deletedTasks.forEach(function(item) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.task}</td>
            <td>${item.date}</td>
            <td><em>Deleted</em></td>
        `;
        todoList.appendChild(tr);
    });
});
// tombol kembali
showActiveBtn.addEventListener("click", function() {
    // while (todoList.firstChild) {
    //     todoList.removeChild(todoList.firstChild);
    // }
    // location.reload(); 
    renderActiveTasks();
});

function renderActiveTasks() {
    // Hapus row
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }

    // Tampilkan task yang aktif
    activeTasks.forEach(function(item) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.task}</td>
            <td>${item.date}</td>
            <td><button class="delete-btn" data-id="${item.id}">Delete</button></td>
        `;
        todoList.appendChild(tr);
    });
}
