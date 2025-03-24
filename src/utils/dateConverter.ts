export const dateConverter = (date: string | undefined | null): string => {
	if (!date || isNaN(Date.parse(date))) {
		return "----";
	}

	const dateObj = new Date(date);
	const year = dateObj.getFullYear();
	const month = dateObj.toLocaleString("en-US", { month: "long" });

	return `${month} ${year}`;
};
