export const slugify = (text: string) =>
	text
		.toLowerCase()
		.normalize("NFD") // removes accents
		.replace(/[\u0300-\u036f]/g, "") // removes diacritics
		.replace(/[^a-z0-9]+/g, "-") // non-alphanumeric → "-"
		.replace(/^-+|-+$/g, ""); // trim start/end hyphens
