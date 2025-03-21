export const dateConverter = (date: string): string => {
	if (!date || isNaN(Date.parse(date))) {
		throw new Error("Invalid date string provided.");
	}

	const dateObj = new Date(date);
	const year = dateObj.getFullYear();
	const month = dateObj.toLocaleString("en-US", { month: "long" });

	return `${month} ${year}`;
};
