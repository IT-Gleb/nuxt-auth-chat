import { defineStore } from "pinia";
import orderBy from "lodash/orderBy";

export const useValuteStore = defineStore("valutes", () => {
  const valutesList = ref<TValuteData>({ data: [] });
  const SelectedIndex = ref<number>(0);
  const SelectedItem = ref<TValutaItem>({
    Date: "",
    ID: "R01235",
    Previous: 0,
    PreviousDate: "",
    Value: 0,
    Name: "",
    Nominal: 0,
    NumCode: "",
    CharCode: "",
  });

  function setSelItem(paramItem: TValutaItem) {
    SelectedItem.value = Object.assign(paramItem);
  }

  function setSelIndex(paramIndex: number) {
    SelectedIndex.value = paramIndex;
  }

  function getItemByID(paramID: string) {
    let res: TValutaItem = {
      Date: "",
      ID: "",
      Previous: 0,
      PreviousDate: "",
      Value: 0,
      Name: "",
      Nominal: 0,
      NumCode: "",
      CharCode: "",
    };
    if (valutesList.value.data.length > 0) {
      let temp: TValutaItem[] = valutesList.value.data.filter((item) => {
        return item.ID.trim().toLowerCase() === paramID.trim().toLowerCase();
      });
      if (temp.length > 0) {
        res = temp[0];
      }
    }
    return res;
  }

  function getItemByName(paramName: string) {
    let res: TValutaItem = {
      Date: "",
      ID: "",
      Previous: 0,
      PreviousDate: "",
      Value: 0,
      Name: "",
      Nominal: 0,
      NumCode: "",
      CharCode: "",
    };
    if (valutesList.value.data.length > 0) {
      let temp: TValutaItem[] = valutesList.value.data.filter((item) => {
        return (
          item.Name.trim().toLowerCase() === paramName.trim().toLowerCase()
        );
      });
      if (temp.length > 0) {
        res = temp[0];
      }
    }
    return res;
  }

  function setList(param: TValutaItem[]) {
    valutesList.value.data = Array.from(param);
  }

  function orderByName(paramAsc: boolean) {
    if (valutesList.value.data.length > 1) {
      const sortstr: boolean | "desc" | "asc" = paramAsc ? "desc" : "asc";
      valutesList.value.data = orderBy(
        valutesList.value.data,
        ["Name"],
        [sortstr]
      );
    }
  }
  function orderByPrice(paramAsc: boolean) {
    if (valutesList.value.data.length > 1) {
      const sortstr: boolean | "desc" | "asc" = paramAsc ? "desc" : "asc";
      valutesList.value.data = orderBy(
        valutesList.value.data,
        ["Value"],
        [sortstr]
      );
    }
  }
  function orderByCode(paramAsc: boolean) {
    if (valutesList.value.data.length > 1) {
      const sortstr: boolean | "desc" | "asc" = paramAsc ? "desc" : "asc";
      valutesList.value.data = orderBy(
        valutesList.value.data,
        ["CharCode"],
        [sortstr]
      );
    }
  }

  return {
    valutesList,
    SelectedItem,
    SelectedIndex,
    setSelItem,
    setSelIndex,
    getItemByID,
    getItemByName,
    setList,
    orderByName,
    orderByPrice,
    orderByCode,
  };
});
