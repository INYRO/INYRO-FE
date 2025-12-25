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

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

export const formatDate = (value: SelectedDate): string | null => {
    const d = Array.isArray(value) ? value[0] : value; // range면 시작일 사용
    return d ? d.toISOString().slice(0, 10) : null;
};
