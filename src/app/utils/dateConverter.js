export const dateConverter = (date) => {
	const dateObj = new Date(date);
	const year = dateObj.getFullYear();
	const month = dateObj.toLocaleString("en-US", { month: "long" });
	return `${month} ${year}`;
};
