document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const modeToggleBtn = document.getElementById("mode-toggle");
  const projectsPanel = document.getElementById("projects-panel");
  const sidebar = document.getElementById("sidebar");
  const closeSidebarBtn = document.getElementById("close-sidebar");
  const topBar = document.getElementById("top-bar");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const appTitle = document.getElementById("app-title");

  // Light/Dark mode toggle
  modeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");

    const isDark = document.body.classList.contains("dark-mode");
    modeToggleBtn.textContent = isDark ? "☀️" : "🌙";
  });

  // Example Projects
  const exampleProjects = [
    {
      name: "To-Do List",
      url: "https://osamah277.github.io/to-do-list/",
      image: "./image/todolist.jpg"
    },
  ];

  function loadProjects() {
    projectsPanel.innerHTML = "";
    exampleProjects.forEach(project => {
      const a = document.createElement("a");
      a.href = project.url;
      a.className = "project-button";
      a.target = "_blank";

      const img = document.createElement("img");
      img.src = project.image;
      img.alt = project.name;
      img.className = "project-icon";

      const span = document.createElement("span");
      span.textContent = project.name;

      a.appendChild(img);
      a.appendChild(span);
      projectsPanel.appendChild(a);
    });
  }

  loadProjects();

  // Open sidebar
  hamburgerBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
    hamburgerBtn.style.visibility = "hidden";
  });

  // Close sidebar
  closeSidebarBtn.addEventListener("click", () => {
    sidebar.classList.remove("open");
    hamburgerBtn.style.visibility = "visible";
  });

  // Optional: Click outside to close sidebar
  window.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      sidebar.classList.remove("open");
      hamburgerBtn.style.visibility = "visible";
    }
  });
});
