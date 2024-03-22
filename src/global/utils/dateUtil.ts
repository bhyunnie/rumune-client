export enum DateFormatType {
  YYYYMMDDHHMMSS,
  YYYYMMDDHHMM,
  YYYYMMDDHH,
  YYYYMMDD,
  YYMMDD,
}

const dateUtil = {
  formatDate: (originalDateString: string, format: DateFormatType): string => {
    const date = new Date(originalDateString);

    const year = date.getFullYear().toString().padStart(4, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    switch (format) {
      case DateFormatType.YYYYMMDDHHMMSS:
        return year + month + day + hours + minutes + seconds;
      case DateFormatType.YYYYMMDDHHMM:
        return year + month + day + hours + minutes;
      case DateFormatType.YYYYMMDDHH:
        return year + month + day + hours;
      case DateFormatType.YYYYMMDD:
        return year + month + day;
      case DateFormatType.YYMMDD:
        return year.slice(2) + month + day;
      default:
        return "";
    }
  },
  isLastDay: (dateString: string, days: number): boolean => {
    const targetDate = new Date(dateString);
    const now = new Date();
    const differenceInMs = now.getTime() - targetDate.getTime();
    const daysInMs = days * 24 * 60 * 60 * 1000;
    return differenceInMs <= daysInMs;
  },
};

export default dateUtil;
