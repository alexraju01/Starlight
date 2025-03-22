# Starlight 🎬
Starlight is a modern, elegant movie and TV series discovery app built using the latest **Next.js 15 App Router**. 
It offers a clean, responsive interface that allows users to browse, search, and explore detailed information about their favorite films and shows — all powered by a robust movie API.

The app is designed with performance and user experience in mind, making it fast, intuitive, and mobile-friendly.


## 🚀 Features
- 🔍 **Search Functionality** – Instantly search for The Movie Database (`TMDB`) Api and TV series by title.
- 🎬 **Browse Popular Movies & TV Shows** – Explore trending and top-rated content.
- 📄 **Detailed Information** – View synopsis, ratings, genres, and more.
- ⚡ **Optimized Performance** – Built with Next.js for fast, server-side rendering and seamless client-side navigation.
  <!-- - 🌙 **Dark/Light Mode** – Enjoy a visually appealing interface with theme toggling. -->
  <!-- - 🔗 **Direct Links to Trailers** – Watch trailers directly from the app. -->

## 🛠️ Technologies Used

- **Next.js** – Server-side rendering and static site generation.
- **React** – Component-based UI development.
- **Tailwind CSS** – Styling for a modern and responsive UI.
- **Movie API** – Fetches movie and TV series data.

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
npm install  # or yarn install
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

## 📌 Roadmap

- [x] Upgrade to Next.js 15.
- [x] Transition to typescript.
- [ ] Improve Pagination for all the pages that require it.
- [ ] Add user authentication.
- [ ] Implement watchlist and favorites.
- [ ] Improve search with advanced filters.
- [ ] Implement infinite scrolling for a smoother experience.
