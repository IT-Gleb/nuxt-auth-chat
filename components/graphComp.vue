<script setup lang="ts">
import { Chart, type ChartItem } from "chart.js/auto";
import { PriceFormat, getMin, getMax, ScreenBreakPoint } from "~/mylib";
import { useBreakpoints } from "@vueuse/core";
const props = defineProps<{ chartData: TValItem[] }>();

const chartRef = ref<ChartItem>();
const myChart = ref();
type TmyChartPointData = {
  value: number;
  name: string;
  date: string;
  nominal: string | number;
};

const once = ref<any>("tablet2");
const middleLarge = ref<boolean>(true);
const delayed = ref<boolean>(false);
const isAnimation = ref<boolean>(true);

const breakpoints = useBreakpoints(ScreenBreakPoint);

Chart.defaults.font.size = 12;

onMounted(() => {
  let tmpData = props.chartData.map((item) => {
    let point: TmyChartPointData = {
      value: Number(item.Value),
      name: item.Name,
      date: item.Date,
      nominal: item.Nominal,
    };
    return point;
  });

  let Min: number = getMin(tmpData, "value");

  let Max: number = getMax(tmpData, "value");
  isAnimation.value = props.chartData.length < 120;

  myChart.value = new Chart(chartRef.value as ChartItem, {
    data: {
      labels: [],

      datasets: [
        {
          type: "line",
          indexAxis: "x",

          label: `Курс ${tmpData[0].nominal} ${tmpData[0].name} к Рублю с ${
            tmpData[0].date
          } по ${tmpData[tmpData.length - 1].date}`,
          data: tmpData,
          fill: true,
          tension: 0.15,
          borderColor: ["#1ee3b7"],
          parsing: {
            yAxisKey: "value",
            xAxisKey: "date",
          },

          backgroundColor: (context: any) => {
            if (!context.chart.chartArea) {
              return;
            }
            const {
              ctx,
              chartArea: { top, width, bottom },
            } = context.chart;
            const bgColors: string[] = [
              "#30b73222",
              "#30b73233",
              "#30b73233",
              "#c0f2c055",
              "#c0f2c033",
              "#c0f2c033",
              "#dff9df11",
            ];
            const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
            const colorsStep = 1 / (bgColors.length - 1);

            for (let i: number = 0; i < bgColors.length; i++) {
              gradientBg.addColorStop(0 + i * colorsStep, bgColors[i]);
            }

            return gradientBg;
          },
          pointRadius: 1,
          borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      // maintainAspectRatio: true,

      //animation: false,
      animation: {
        onComplete: () => {
          delayed.value = true;
        },
        delay: (context) => {
          let delay = 0;
          if (!isAnimation.value) {
            return delay;
          }
          if (
            context.type === "data" &&
            context.mode === "default" &&
            !delayed.value
          ) {
            delay = context.dataIndex * 25 + context.datasetIndex * 8;
          }
          return delay;
        },
      },

      // animations: {
      //   borderColor: {
      //     type: "color",
      //     duration: 2500,
      //     loop: true,
      //     easing: "linear",
      //     from: "green",
      //     to: "black",
      //   },
      // },

      scales: {
        y: {
          title: {
            display: true,
            text: "Рубль - [Значения]",
          },
          ticks: {
            callback: function (value) {
              return PriceFormat(value as number);
            },
          },
          min: Min,
          max: Max,
        },
        x: {
          title: {
            display: true,
            text: "Временная шкала",
          },
        },
        //xAxes: [{ ticks: { fontSize: 8 } }],
      },
      plugins: {
        title: {
          display: true,
          text: "ГРАФИК (по данным ЦЕНТРОБАНКа)",
        },

        legend: {
          labels: {
            font: {
              family: "Roboto",
              style: "normal",
              weight: "bold",
              size: 12,
            },
          },
        },
        tooltip: {
          backgroundColor: "#30b73288",
          titleColor: "navy",

          callbacks: {
            label: function (context) {
              let lbl = context.dataset.label || "";
              if (lbl) {
                lbl = "";
              }
              if (context.parsed.y !== null) {
                let abc: TmyChartPointData = context.dataset.data[
                  context.dataIndex
                ] as unknown as TmyChartPointData;
                lbl +=
                  abc?.nominal +
                  " - " +
                  abc?.name +
                  " : " +
                  PriceFormat(context.parsed.y);
              }
              return lbl;
            },
            labelColor: function (context) {
              return {
                borderColor: "yellow",
                backgroundColor: "rgb(255, 200, 180)",
                borderWidth: 2,
                borderDash: [2, 2],
                borderRadius: 2,
              };
            },
            labelTextColor: function (context) {
              return "#543453";
            },
          },
        },
      },
    },
  });

  //myChart.value.defaults.global.defaultFontSize = 12;
  //console.log(myChart.value.config);
});

watch(breakpoints.active(), () => {
  let active: string | undefined = breakpoints.active().value;
  middleLarge.value = breakpoints.between("tablet2", "largeDescktop").value;
  //console.log(middleLarge.value);
  if (active !== undefined) {
    if ((once.value as string).toLowerCase() !== active.toLowerCase()) {
      myChart.value?.resize();

      try {
        myChart.value.config.options.scales.y.title.display = middleLarge.value;
        myChart.value.config.options.scales.x.title.display = middleLarge.value;
        myChart.value.config.options.plugins.title.display = middleLarge.value;

        myChart.value.config.options.plugins.legend.labels.font.size =
          middleLarge.value ? 16 : 10;
        myChart.value.config.options.plugins.legend.labels.font.weight =
          middleLarge.value ? "bold" : "normal";
        Chart.defaults.font.size = middleLarge.value ? 12 : 10;

        myChart.value?.update();
      } catch {
        console.log("error");
      }
    }
    once.value = active;
  }
});
</script>

<template>
  <div
    class="w-full relative lg:min-h-[400px] xl:w-full xl:h-full border-2 border-slate-600/300 rounded-2xl overflow-hidden"
  >
    <canvas ref="chartRef" id="graphId"></canvas>
  </div>
</template>
