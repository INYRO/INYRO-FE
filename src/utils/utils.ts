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
    const d = Array.isArray(value) ? value[0] : value;
    if (!d) return null;

    const year = d.getFullYear();
    // getMonth()는 0부터 시작하므로 +1 필요, padStart로 두 자리 맞춤
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};
