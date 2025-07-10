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

    // Buat li baru
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${task} - ${date}</span>
        <button class="delete-btn">Delete</button>
    `;

    todoList.appendChild(li);

    // Bersihkan input
    todoInput.value = "";
    dateInput.value = "";
});

// Event delete
todoList.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete-btn")) {
        if (confirm("Are you sure you want to delete this task?")) {
            e.target.parentElement.remove();
        }
    }
});

// Event filter
filterInput.addEventListener("keyup", function(e) {
    const text = e.target.value.toLowerCase();
    const items = todoList.getElementsByTagName("li");

    Array.from(items).forEach(function(item) {
        const itemText = item.firstElementChild.textContent.toLowerCase();
        if (itemText.indexOf(text) != -1) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
});
