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
 Home Page - Desktop View
 ![starlight-desktop](https://github.com/user-attachments/assets/5e21ca4b-31ac-43c9-976b-b4ba2fa5b5de)

 Movie List Page - Desktop View
 ![Screenshot 2025-04-01 161409](https://github.com/user-attachments/assets/49f6b137-4da0-40a0-b0be-b7c224d1fcd2)

Movie Detail Page - Desktop View
![Screenshot 2025-04-01 161750](https://github.com/user-attachments/assets/d86518a1-8f22-4566-85fc-767a946cb737)
![Screenshot 2025-04-01 165856](https://github.com/user-attachments/assets/e7919f58-f71a-4fbc-a7eb-ee13eac925bb)


TV Show Detail Page - Desktop View
![starlight-tvShow](https://github.com/user-attachments/assets/2316c9b7-8cce-4905-828e-5da443e5bbaf)
![starlight-TvShowDeatil-part2](https://github.com/user-attachments/assets/4f404052-2f45-4de0-9555-84640dcbb91a)

Genre List Page - Desktop View
![starlight-genreList](https://github.com/user-attachments/assets/1e297b80-199c-4f81-b0c8-9b981d374afe)

Genre specified(Animation) Media List - Desktop View
![Screenshot 2025-04-01 165924](https://github.com/user-attachments/assets/a98e50f6-57e6-4699-a526-f6a7058f8125)

Discover Search Page - Desktop View
![Screenshot 2025-04-01 170705](https://github.com/user-attachments/assets/547ecc9d-8eb0-4f11-b44a-99314c6e0dfb)

## 📦 Installation & Setup
Prerequisites:
- Node.js v22.14.0 or later

  
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
- [x] Transition from JavaScript to TypeScript.
- [ ] Transition from CSS Module to Tailwind
- [ ] Improve pagination for all the pages that require it.
- [ ] Add user authentication.
- [ ] Implement watchlist and favorites.
- [ ] Improve search with advanced filters.
- [ ] Implement infinite scrolling for a smoother experience.
- [ ] Redesign the website using Figma designs.
