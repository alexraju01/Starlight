import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<ul>
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/movies">Movies</Link>
				</li>
				<li>
					<Link href="/blog/hello-world">Blog Post</Link>
				</li>
			</ul>
		</nav>
	);
}
