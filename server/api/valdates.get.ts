import { XMLParser } from "fast-xml-parser";

export default defineEventHandler(async (event) => {
  let valdata: TValItem[] = [];
  let url = event.path;

  const urlParams = new URLSearchParams(url);
  const d1 = urlParams.get("d1");
  const d2 = urlParams.get("d2");
  const vId = urlParams.get("vId");
  const isValid = d1 !== undefined && d2 !== undefined && vId !== undefined;
  if (!isValid) {
    return valdata;
  }
  //console.log(urlParams.get("d2"), urlParams.get("vId"));

  const res: any = await $fetch(
    `https://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=${d1}&date_req2=${d2}&VAL_NM_RQ=${vId}`,
    {
      headers: { "Content-Type": "application/xml" },
      method: "GET",
      retry: 3,
      retryDelay: 400,
      cache: "force-cache",
    }
  );
  if (res) {
    const parser = new XMLParser({
      ignoreAttributes: false,
      // alwaysCreateTextNode: true,
    });
    let obj: any = parser.parse(res);
    //console.log(res);
    //const builder = new XMLBuilder();
    //let xmlContent = builder.build(obj);

    //console.log(obj);
    //console.log(xmlContent);
    let tmp: any[] = obj.ValCurs.Record;
    //console.log(tmp);

    if (tmp === undefined) return [];
    if (tmp.length > 0) {
      tmp.forEach((item) => {
        //console.log(item);
        let tempItem: TValItem = {
          ID: "",
          Date: "",
          Nominal: "",
          Value: "",
          VunitRate: "",
          Name: "",
          CharCode: "",
        };
        tempItem.Value = item.Value.replaceAll(",", ".");
        if (item.VunitRate) {
          tempItem.VunitRate = String(item.VunitRate).replaceAll(",", ".");
        }
        tempItem.Date = item["@_Date"];
        tempItem.ID = item["@_Id"];
        tempItem.Nominal = item.Nominal;
        //console.log(tempItem.VunitRate);
        valdata.push(tempItem);
      });
    }
  }

  return valdata;
});
