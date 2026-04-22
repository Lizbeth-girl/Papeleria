const form = document.getElementById("form");
const list = document.getElementById("list");

const t = document.getElementById("t");
const p = document.getElementById("p");
const d = document.getElementById("d");

let data = [];
let filter = "all";

function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("active");
}

form.onsubmit = e => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const fecha = document.getElementById("fecha").value;

  data.push({
    id: Date.now(),
    nombre,
    fecha,
    done: false
  });

  form.reset();
  render();
};

document.querySelectorAll(".filter").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.f;
    render();
  }
});

function toggle(id) {

  data = data.map(x => x.id === id ? { ...x, done: !x.done } : x);

  filter = "all";

  document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
  document.querySelector('[data-f="all"]').classList.add("active");

  render();
}

function del(id) {
  data = data.filter(x => x.id !== id);
  render();
}

function render() {
  list.innerHTML = "";

  let f = data.filter(x => {
    if (filter === "pending") return !x.done;
    if (filter === "done") return x.done;
    return true;
  });

  f.forEach(x => {
    const div = document.createElement("div");
    div.className = "item" + (x.done ? " done" : "");

    div.innerHTML = `
      <span>${x.nombre} - ${x.fecha}</span>
      <div>
        <button onclick="toggle(${x.id})">
           ${x.done
        ? '<i class="fa-solid fa-rotate-left"></i>'
        : '<i class="fa-solid fa-check"></i>'} 
        </button>
        <button onclick="del(${x.id})">🗑</button>
      </div>
    `;

    list.appendChild(div);
  });

  t.textContent = data.length;
  p.textContent = data.filter(x => !x.done).length;
  d.textContent = data.filter(x => x.done).length;
}