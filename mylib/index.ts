import { sortBy } from "lodash";

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

export function WSfromUrl(paramURL: string) {
  const removed: string = "_nuxt/";
  const url = new URL(paramURL);
  let res: string = "";
  //console.log(url.protocol);
  let tempHost: string = url.host;
  if (tempHost[tempHost.length - 1] === ".") {
    tempHost = tempHost.substring(0, tempHost.length - 2);
  }
  switch (url.protocol) {
    case "http:":
      res = "ws://";
      break;
    case "https:":
      res = "wss://";
      break;
    default:
      res = "wss://";
      break;
  }
  res = res + tempHost + import.meta.env.BASE_URL;
  res = res.replace(removed, "");
  //  res = res.replaceAll(".", "");

  return res;
}

export function HttpfromUrl(paramURL: string) {
  const removed: string = "_nuxt/";
  const url = new URL(paramURL);
  let res: string = url.protocol + "//";
  let tempHost: string = url.host;
  if (tempHost[tempHost.length - 1] === ".") {
    tempHost = tempHost.substring(0, tempHost.length - 2);
  }
  let b_url: string = import.meta.env.BASE_URL;
  b_url = b_url.replace(".", "");
  //console.log(tempHost, b_url);

  res = res + tempHost + b_url;
  res = res.replace(removed, "");
  if (res[res.length - 1] === ".") {
    res = res.substring(0, res.length - 2);
  }

  console.log(res);

  return res;
}

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

export function getMiddle(param: number[]) {
  let res: number = 0;
  if (param && param.length > 0) {
    res = param.reduce((acc, item) => {
      return (acc = acc + item);
    }, 0);
    res = res / param.length;
  }
  return res;
}

export function getAverage(param: number[]): number {
  let res: number = 0;
  if (param && param.length > 1) {
    let tmp = sortBy(param);
    let ind = tmp.length >> 1;
    //console.log(ind, tmp.length);
    if (tmp.length % 2 !== 0) {
      res = tmp[ind];
    } else {
      let valMinus: number = tmp[ind - 1];
      let valPlus: number = tmp[ind + 1];
      res = tmp[ind];
      if (valMinus !== undefined || valMinus !== isNaN) {
        res = (res + valMinus) / 2;
      }
      if (valPlus !== undefined || valPlus !== isNaN) {
        res = (res + valPlus) / 2;
      }
    }
  } else {
    if (param) {
      res = param[0];
    }
  }

  return res;
}
