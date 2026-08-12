const movies = [
    {
        title: "Oppenheimer", genre: "Drama", year: "2023", rating: "8.9",
        image: "https://images.unsplash.com/photo-1594736797933-d0f06ba7a0d6?auto=format&fit=crop&w=600&q=85",
        description: "The story of the American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb."
    },
    {
        title: "Interstellar", genre: "Sci-Fi", year: "2014", rating: "8.7",
        image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=600&q=85",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    },
    {
        title: "The Dark Knight", genre: "Action", year: "2008", rating: "9.0",
        image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=600&q=85",
        description: "Batman faces a criminal mastermind whose reign of chaos pushes Gotham and its heroes to their limits."
    },
    {
        title: "The Grand Budapest", genre: "Comedy", year: "2014", rating: "8.1",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=85",
        description: "The adventures of a legendary concierge and his trusted lobby boy at a famous European hotel."
    },
    {
        title: "Blade Runner 2049", genre: "Sci-Fi", year: "2017", rating: "8.0",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=85",
        description: "A young blade runner discovers a long-buried secret that leads him to track down a former officer."
    },
    {
        title: "Mad Max: Fury Road", genre: "Action", year: "2015", rating: "8.1",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=85",
        description: "In a ruined wasteland, Max joins Furiosa and a band of rebels fleeing a tyrant and his army."
    },
    {
        title: "Parasite", genre: "Thriller", year: "2019", rating: "8.5",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=85",
        description: "A struggling family slowly enters the lives of a wealthy household with unexpected consequences."
    },
    {
        title: "Whiplash", genre: "Drama", year: "2014", rating: "8.5",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=85",
        description: "A young jazz drummer pursues perfection under the direction of an abusive instructor."
    }
];

const grid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const modal = document.getElementById("movieModal");
let selectedGenre = "All";

function renderMovies() {
    const query = searchInput.value.toLowerCase().trim();
    const filtered = movies.filter(movie => {
        const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
        const matchesSearch = movie.title.toLowerCase().includes(query) || movie.genre.toLowerCase().includes(query);
        return matchesGenre && matchesSearch;
    });

    grid.innerHTML = filtered.map((movie, index) => `
        <article class="movie-card" data-index="${movies.indexOf(movie)}">
            <div class="movie-image" style="background-image:url('${movie.image}')">
                <span class="movie-rating">★ ${movie.rating}</span>
            </div>
            <h3>${movie.title}</h3>
            <p>${movie.year} &nbsp;•&nbsp; ${movie.genre}</p>
        </article>
    `).join("");

    emptyState.style.display = filtered.length ? "none" : "block";
    document.querySelectorAll(".movie-card").forEach(card => {
        card.addEventListener("click", () => openModal(movies[card.dataset.index]));
    });
}

function openModal(movie) {
    document.getElementById("modalPoster").style.backgroundImage = `url('${movie.image}')`;
    document.getElementById("modalTitle").textContent = movie.title;
    document.getElementById("modalMeta").innerHTML = `<span>${movie.year}</span><i></i><span>${movie.genre}</span><i></i><span class="rating">★ ${movie.rating}</span>`;
    document.getElementById("modalDescription").textContent = movie.description;
    modal.classList.add("open");
}

document.getElementById("filters").addEventListener("click", event => {
    if (!event.target.classList.contains("filter")) return;
    document.querySelectorAll(".filter").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
    selectedGenre = event.target.dataset.genre;
    renderMovies();
});

searchInput.addEventListener("input", renderMovies);
document.getElementById("closeModal").addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", event => {
    if (event.target === modal) modal.classList.remove("open");
});

document.getElementById("themeBtn").addEventListener("click", () => {
    document.body.classList.toggle("light");
});

document.getElementById("heroPlay").addEventListener("click", () => {
    openModal({
        title: "Dune: Part Two", year: "2024", genre: "Action / Sci-Fi", rating: "8.7",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=85",
        description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family."
    });
});

document.getElementById("heroInfo").addEventListener("click", event => {
    event.target.textContent = "✓ Added to list";
    setTimeout(() => event.target.textContent = "＋ Add to list", 1800);
});

document.getElementById("newsletterForm").addEventListener("submit", event => {
    event.preventDefault();
    const button = event.target.querySelector("button");
    button.textContent = "Subscribed ✓";
    event.target.reset();
});

renderMovies();