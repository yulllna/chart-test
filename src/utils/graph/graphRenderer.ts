export class GraphRenderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private canvasWidth: number;
    private canvasHeight: number;
    private PADDING_BOTTOM: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;

        this.canvasWidth = 0;
        this.canvasHeight = 0;
        this.PADDING_BOTTOM = 20;
     }

     public setSize(): void {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
    
        // 캔버스 스타일 크기 설정
        this.canvas.style.width = `${rect.width}px`;
        this.canvas.style.height = `${rect.height}px`;
    
        // 실제 캔버스 크기 설정
        this.canvasWidth = rect.width;
        this.canvasHeight = rect.height - this.PADDING_BOTTOM;
    
        // 캔버스 버퍼 크기 설정
        this.canvas.width = this.canvasWidth * dpr;
        this.canvas.height = (this.canvasHeight + this.PADDING_BOTTOM) * dpr;
    
        // 컨텍스트 스케일 설정
        this.ctx.scale(dpr, dpr);
    }

    public setEvent(): void {
        this.canvas.addEventListener('click', this.clickEvent);
    }

    private clickEvent(event: MouseEvent): void {
        console.log(event.clientX, event.clientY);
    }

    public drawGraph(): void {
        this.ctx.fillStyle = 'antiquewhite';
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
}