const firebaseConfig = {
  apiKey: "AIzaSyAF8UYfBkX81IJQJGFQKYrPYKuHmFhc4k8",
  authDomain: "reviews-a0e3f.firebaseapp.com",
  projectId: "reviews-a0e3f",
  storageBucket: "reviews-a0e3f.firebasestorage.app",
  messagingSenderId: "829529427765",
  appId: "1:829529427765:web:63781103a3c7649964067c",
  measurementId: "G-TQC5MTNSV5"
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Initialize Firestore database AFTER app initialization
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const modeToggleBtn = document.getElementById("mode-toggle");
  const projectsPanel = document.getElementById("projects-panel");
  const reviewInput = document.getElementById("review-input");
  const submitReviewBtn = document.getElementById("submit-review");
  const reviewsList = document.getElementById("reviews-list");

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
      name: "Seen It",
      url: "./under-construction.html",
      image: "./image/under-construction.jpeg",
      lastUpdated: "Under Construction"
    },
    {
      name: "To-Do List",
      url: "https://osamah277.github.io/to-do-list/",
      image: "./image/todolist.jpg",
      lastUpdated: "2025-06-30 00:00"
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

      const textContainer = document.createElement("div");
      textContainer.style.display = "flex";
      textContainer.style.flexDirection = "column";

      const span = document.createElement("span");
      span.textContent = project.name;
      span.style.fontWeight = "bold";

      const lastUpdate = document.createElement("small");
      lastUpdate.textContent = `Last updated: ${project.lastUpdated}`;
      lastUpdate.style.fontSize = "0.7em";
      lastUpdate.style.color = "rgba(255, 255, 255, 0.7)";
      lastUpdate.style.marginTop = "2px";

      textContainer.appendChild(span);
      textContainer.appendChild(lastUpdate);

      a.appendChild(img);
      a.appendChild(textContainer);

      projectsPanel.appendChild(a);
    });
  }

  loadProjects();

  submitReviewBtn.addEventListener("click", async () => {
    const reviewText = reviewInput.value.trim();
    const projectName = document.getElementById("Project-name").value.trim();

    if (reviewText === "" || projectName === "") return;

    const reviewData = {
      author: "Anonymous",
      project: projectName,
      text: reviewText,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
      await db.collection("reviews").add(reviewData);
      reviewInput.value = "";
      document.getElementById("Project-name").value = "";
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  });


  function loadReviews() {
  db.collection("reviews")
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      reviewsList.innerHTML = "";

      snapshot.forEach((doc) => {
        const data = doc.data();
        const reviewEntry = document.createElement("div");
        reviewEntry.className = "review-entry";

        // Project Name
        const project = document.createElement("div");
        project.className = "review-project";
        project.textContent = `Project: ${data.project || "Unnamed Project"}`;
        project.style.fontWeight = "bold";
        project.style.marginBottom = "6px";

        // Review Text
        const text = document.createElement("div");
        text.textContent = data.text || "";

        // Author + Timestamp container
        const meta = document.createElement("div");
        meta.className = "review-meta";

        // Author
        const author = document.createElement("div");
        author.className = "review-author";
        author.textContent = data.author || "Anonymous";

        // Timestamp
        const time = document.createElement("div");
        time.className = "review-time";
        if (data.createdAt?.toDate) {
          const date = data.createdAt.toDate();
          time.textContent = date.toLocaleString(undefined, {
            hour12: false,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
        }

        meta.appendChild(author);
        meta.appendChild(time);

        // Append all
        reviewEntry.appendChild(project);
        reviewEntry.appendChild(text);
        reviewEntry.appendChild(meta);
        reviewsList.appendChild(reviewEntry);
      });
    });
}

  loadReviews();

});
