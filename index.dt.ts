declare module "lodash";
declare module "chart.js";

declare type TValutaItem = {
  Date: string;
  PreviousDate: string;
  ID: string;
  NumCode: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
  Previous: number;
};

declare type TValuteData = {
  data: TValutaItem[];
  error?: string;
};

declare type TValItem = {
  Nominal: string | number;
  Value: string;
  VunitRate: string;
  Date: string;
  ID: string;
  Name: string;
  CharCode: string;
};

declare type TClientMessage = {
  id: string;
  name: string;
  message: string;
  messageDate: string;
};

declare type TClient = {
  id: string;
  name: string;
  isFromServer: boolean;
};
