export const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        day: "numeric",
        month: "short",
    };

    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};
