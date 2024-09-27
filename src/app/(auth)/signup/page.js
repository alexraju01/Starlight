"use client";
import { signup } from "@/utils/serverActions/auth";
import styles from "./page.module.css";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

export default function SignUpPage() {
	const [state, action] = useFormState(signup, undefined);
	return (
		<main className={styles.main}>
			<div className={styles.formContainer}>
				<form action={action} className={styles.form}>
					<h2>Log In</h2>
					<div className={styles.formItem}>
						<input id="username" name="username" type="text"></input>
						<label htmlFor="username">User Name</label>
					</div>
					{state?.errors?.username && <p>{state.errors.username}</p>}

					<div className={styles.formItem}>
						<input id="email" name="email" type="email"></input>
						<label htmlFor="email">Email</label>
					</div>
					{state?.errors?.email && <p>{state.errors.email}</p>}

					<div className={styles.formItem}>
						<input id="password" name="password" type="password"></input>
						<label htmlFor="password">Password</label>
					</div>
					{state?.errors?.password && (
						<div>
							<p>Password must:</p>
							<ul>
								{state.errors.password.map((error) => (
									<li key={error}>- {error}</li>
								))}
							</ul>
						</div>
					)}
					<div className={styles.passwordOptions}>
						<label for="remember">
							<input
								className={styles.remember}
								type="checkbox"
								id="remember"
							/>
							<p>Remember me</p>
						</label>
						<Link href="#">Forgot password</Link>
					</div>
					<button className={styles.logIn} type="submit">
						Log In
					</button>
					<div className={styles.accountOptions}>
						<p>
							Don&apos;t have an account?
							<Link href="#">Register</Link>
						</p>
					</div>
				</form>
			</div>
		</main>
	);
}
