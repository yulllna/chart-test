const XAXIS_PADDING = 15;
const YAXIS_PADDING = 25;
const DURATION = 1000 * 30; // 30s
const MAX_VALUE = 100;
const Y_TICK_COUNT = 5;
const TOP_PADDING = 15;
const EX_TEXT = '00:00';

export class LineChart {
   canvas: HTMLCanvasElement;
   ctx: CanvasRenderingContext2D;
   canvasWidth: number;
   canvasHeight: number;
   chartWidth: number;
   chartHeight: number;
   xFormatWidth: number;
   startTime: number;
   endTime: number;
   xTimeInterval: number;
   data: number[];

   constructor(ref: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
      this.canvas = ref;
      this.ctx = ctx;

      this.canvasWidth = ref.width; // 실제 픽셀 크기
      this.canvasHeight = ref.height;
      this.chartWidth = this.canvasWidth - YAXIS_PADDING;
      this.chartHeight = this.canvasHeight - XAXIS_PADDING - TOP_PADDING;

      this.xFormatWidth = this.ctx.measureText(EX_TEXT).width;
      this.startTime = 0;
      this.endTime = 0;
      this.xTimeInterval = 0;

      this.data = [];
      this.setTime();
      this.drawChart();
   }

   // 시간을 실시간으로 세팅
   setTime = () => {
      this.endTime = Date.now();
      this.startTime = this.endTime - DURATION;
      this.setXInterval();
   };

   setXInterval = () => {
      let xPoint = 0;
      let timeInterval = 1000;
      while (true) {
         xPoint = (timeInterval / DURATION) * this.chartWidth;
         if (xPoint > this.xFormatWidth) {
            break;
         }
         timeInterval *= 2;
      }

      this.xTimeInterval = timeInterval;
   };

   // 차트를 그리는 함수
   drawChart = () => {
      const { ctx, chartHeight, canvasWidth, canvasHeight } = this;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight); // 캔버스 초기화

      ctx.beginPath();
      ctx.moveTo(YAXIS_PADDING, TOP_PADDING);
      // draw YAXIS
      ctx.lineTo(YAXIS_PADDING, chartHeight + TOP_PADDING);

      const yInterval = MAX_VALUE / (Y_TICK_COUNT - 1);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      for (let i = 0; i < Y_TICK_COUNT; i++) {
         const value = i * yInterval;
         const yPoint =
            TOP_PADDING + chartHeight - (value / MAX_VALUE) * chartHeight;
         ctx.fillText(value.toString(), YAXIS_PADDING - 3, yPoint);
      }
      // draw XAXIS
      ctx.lineTo(canvasWidth, this.chartHeight + TOP_PADDING);
      ctx.stroke();

      let currentTime = this.startTime - (this.startTime % this.xTimeInterval);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      while (currentTime < this.endTime + this.xTimeInterval) {
         const xPoint =
            ((currentTime - this.startTime) / DURATION) * this.chartWidth;
         const date = new Date(currentTime);
         const text = date.getMinutes() + ':' + date.getSeconds();

         ctx.fillText(text, xPoint, chartHeight + TOP_PADDING + 4);
         currentTime += this.xTimeInterval;

         // drawData
         ctx.beginPath();
         this.data.forEach((datum, index) => {
            const [time, value] = datum;
            const xPoint =
               ((time - this.startTime) / DURATION) * this.chartWidth;
            const yPoint =
               this.chartHeight - (value / MAX_VALUE) * this.chartHeight;

            if (index === 0) {
               ctx.moveTo(xPoint, yPoint);
            } else {
               ctx.lineTo(xPoint, yPoint);
            }
         });
      }

      ctx.stroke();

      // 애니메이션 루프 보장
      window.requestAnimationFrame(this.drawChart);
   };

   // 데이터를 갱신하는 함수
   updateDate = data => {
      this.data.push(data);
      //   this.setTime(); // 시간 갱신
      //   this.drawChart(); // 차트 다시 그리기
   };
}
