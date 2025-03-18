# Starlight

Starlight is a sleek and modern movie and TV series discovery app built with **Next.js**. It leverages a Movie API to provide users with the ability to browse, search, and view details of their favorite movies and TV shows in a user-friendly interface.

## 🚀 Features

- 🔍 **Search Functionality** – Instantly search for The Movie Database (`TMDB`) Api and TV series by title.
- 🎬 **Browse Popular Movies & TV Shows** – Explore trending and top-rated content.
- 📄 **Detailed Information** – View synopsis, ratings, genres, and more.
- 🌙 **Dark/Light Mode** – Enjoy a visually appealing interface with theme toggling.
- ⚡ **Optimized Performance** – Built with Next.js for fast, server-side rendering and seamless client-side navigation.
- 🔗 **Direct Links to Trailers** – Watch trailers directly from the app.

## 📝 Changelog

### [1.0.10] - 2025-03-18
#### Added
- Implemented infinite scrolling for smoother browsing.
- Improved search with advanced filters.
- Enhanced UI animations using Framer Motion.

#### Fixed
- Resolved API fetch errors for specific movie IDs.
- Fixed a bug causing incorrect dark mode toggling.

---

### [1.0.9] - 2025-03-10
#### Added
- Added user authentication (OAuth support).
- Implemented watchlist and favorites feature.

#### Fixed
- Fixed minor UI glitches on mobile devices.
- Improved performance by optimizing API calls.

---

### [1.0.8] - 2025-02-28
#### Added
- Integrated trailer links for movies & TV shows.
- Introduced theme switching between Dark/Light mode.

#### Fixed
- Search results now correctly display all matching entries.


## 🛠️ Technologies Used

- **Next.js** – Server-side rendering and static site generation.
- **React** – Component-based UI development.
- **Tailwind CSS** – Styling for a modern and responsive UI.
- **Movie API** – Fetches movie and TV series data.
- **Framer Motion** – Smooth animations for a great user experience.

## 📸 Screenshots

> _Add relevant screenshots showcasing the UI and features._

## 📦 Installation & Setup

To get started with Starlight on your local machine, follow these steps:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/starlight.git
cd starlight
```

### 2️⃣ Install Dependencies
```bash
yarn install  # or npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file in the root directory and add the following:
```env
NEXT_PUBLIC_MOVIE_API_KEY=your_api_key_here
NEXT_PUBLIC_MOVIE_API_URL=https://api.themoviedb.org/3
```

> Replace `your_api_key_here` with your actual API key from [The Movie Database (TMDb)](https://www.themoviedb.org/).

### 4️⃣ Run the Development Server
```bash
yarn dev  # or npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** to view the app.

## 🔧 Deployment

Starlight can be deployed on platforms like **Vercel** for seamless performance. To deploy:

1. Push your code to GitHub.
2. Connect the repository to [Vercel](https://vercel.com/).
3. Add environment variables in the Vercel dashboard.
4. Deploy with one click!

## 📌 Roadmap
- [ ] Upgrade to Next.js 15.
- [ ] Transition to typescript.
- [ ] Improve Pagination for all the pages that require it.
- [ ] Add user authentication.
- [ ] Implement watchlist and favorites.
- [ ] Improve search with advanced filters.
- [ ] Implement infinite scrolling for a smoother experience.
