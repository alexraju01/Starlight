"use server";

import { SignupFormSchema } from "../validations/authValidation";

// import { SignupFormSchema } from "@/app/lib/definitions";

export async function signup(state, formData) {
	// Validate form fields
	const validatedFields = SignupFormSchema.safeParse({
		username: formData.get("username"),
		email: formData.get("email"),
		password: formData.get("password"),
	});

	// If any form fields are invalid, return early
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}
	console.log("jgsfjhgsd");
	// Call the provider or db to create a user...
	console.log("Form validated successfully!", {
		username: validatedFields.data.username,
		email: validatedFields.data.email,
		password: validatedFields.data.password, // Optional, avoid logging sensitive info like password in production
	});
}
