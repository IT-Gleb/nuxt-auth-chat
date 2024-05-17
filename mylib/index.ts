export const offset2Week: number = 14;
export const ScreenBreakPoint = {
  mobile: 0,
  mobilePro: 412,
  tablet: 640,
  tablet2: 768,
  laptop: 1024,
  desktop: 1280,
  largeDescktop: 1440,
};

export function PriceFormat(param: number): string {
  let res: string = "";

  res = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  }).format(param);

  return res;
}

export function Number_Format(param: number): string {
  let res: string = "0";
  // res = new Intl.NumberFormat("ru-RU", {
  //   style: "decimal",
  //   maximumFractionDigits: 2,
  // }).format(param);
  res = param.toFixed(2);
  res = res.replaceAll(",", ".");
  res = res.replaceAll(" ", "");

  //console.log(res);
  return res;
}

export function Date_Format(paramUTC: string): string {
  let res: string = "";
  //let tmp: string[] = paramUTC.split("T");
  let Dt = new Date(paramUTC.trim());

  res = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(Dt);
  return res;
}

export function nowDate() {
  let res: string = "";
  let Dt = new Date();
  res = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(Dt);

  return res;
}

export function Date_Convert(param: string) {
  let res: string = "";
  let dt = new Date(param);
  let day: string =
    dt.getDate() < 10 ? "0" + dt.getDate() : String(dt.getDate());
  let mn: string =
    dt.getMonth() < 10 ? "0" + (dt.getMonth() + 1) : String(dt.getMonth() + 1);
  let year: string = String(dt.getFullYear());
  res = day + "/" + mn + "/" + year;
  //console.log(res);
  return res;
}

export function My_DateToString(paramDate: Date) {
  const abc: string = "-";
  let res: string = "";

  let day = paramDate.getDate();
  let mounth = paramDate.getMonth();
  let year = paramDate.getFullYear();

  let dayStr: string = day < 10 ? "0" + day : String(day);

  let mounthStr: string = mounth < 10 ? "0" + (mounth + 1) : String(mounth + 1);

  res = String(year) + abc + mounthStr + abc + dayStr;

  return res;
}

export function Date_Diff(paramDate: Date, paramDayMinus: number) {
  let res: string = "";

  let dt = paramDate;
  let day = dt.getDate();
  // dt.setDate(day - paramDayMinus);
  let newDate = new Date(dt.getFullYear(), dt.getMonth(), day - paramDayMinus);

  return (res = My_DateToString(newDate));
}

export function Date_Add(paramDate: Date, paramDayPlus: number) {
  let res: string = "";

  let dt = paramDate;
  let day = dt.getDate();
  //dt.setDate(day + paramDayMinus);
  let newDate = new Date(dt.getFullYear(), dt.getMonth(), day + paramDayPlus);

  return (res = My_DateToString(newDate));
}

export function getMin(param: any, paramNameValue: string) {
  let res: number = 0;
  if (Array.isArray(param)) {
    let tmp = Object.values(param).map((item) => item[paramNameValue]);

    res = Math.min(...tmp);
  }
  return res;
}

export function getMax(param: any, paramNameValue: string) {
  let res: number = 0;
  if (Array.isArray(param)) {
    let tmp = Object.values(param).map((item) => item[paramNameValue]);

    res = Math.max(...tmp);
  }
  return res;
}
