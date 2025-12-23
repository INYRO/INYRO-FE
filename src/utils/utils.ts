export const formatToMonthYear = (date: Date): string => {
    const formatDate = date.toLocaleString("ko-kr", {
        year: "numeric",
        month: "numeric",
    });
    const spaceSliceFormatDate = formatDate.replace(" ", "");
    const replaceFormatDate = spaceSliceFormatDate.replace("/", ".");
    const finalFormatDate = replaceFormatDate.slice(0, -1);

    return finalFormatDate;
};
