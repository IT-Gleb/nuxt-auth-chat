export default defineEventHandler(async (event) => {
  let result: any;
  let error: any = null;
  let status: number = -1;
  let ValutesData: TValuteData = { data: [] };

  try {
    result = await $fetch("https://www.cbr-xml-daily.ru/daily_json.js", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        //"Cache-Control": "max-age=3600, must-revalidate",
      },
      retry: 3,
      retryDelay: 500,
      timeout: 3000,
      cache: "force-cache",
      async onResponse({ request, response, options }) {
        status = response.status;
      },
      parseResponse: JSON.parse,
      //      ignoreResponseError: true,
    });
    if (status === 200 && result) {
      let tmp: any = result.Valute;
      if (tmp) {
        let keys: string[] = Object.keys(tmp);
        keys.forEach((item) => {
          let valItem: TValutaItem = tmp[item];
          valItem.Date = result.Date;
          valItem.PreviousDate = result.PreviousDate;
          ValutesData.data.push(valItem);
        });
      }
    }
  } catch (err) {
    error = (err as Error).message;
    ValutesData.error = error;
    status = -1;
    console.log(err);
  }

  // await fetch("https://www.cbr-xml-daily.ru/daily_json.js", {
  //   method: "GET",
  //   headers: { "Content-Type": "application/json;charset=utf-8" },
  //   cache: "force-cache",
  // })
  //   .then((res: any) => res.json())
  //   .then((data) => {
  //     result = data;
  //     if (result) {
  //       //console.log(result);
  //       let tmp: any = result.Valute;

  //       let Values: string[] = Object.keys(tmp);
  //       //console.log(Values);
  //       if (Values) {
  //         Values.forEach((item) => {
  //           let tmpItem: TValutaItem = tmp[item];
  //           tmpItem.Date = result.Date;
  //           tmpItem.PreviousDate = result.PreviousDate;
  //           ValutesData.push(tmpItem);
  //         });
  //       }
  //     }
  //   })
  //   .catch((err) => {
  //     error = (err as Error).message;
  //     console.log(error);
  //   });

  // if (error) {
  //   // console.log(error);
  //   return { error: error };
  // }
  return ValutesData;
});
