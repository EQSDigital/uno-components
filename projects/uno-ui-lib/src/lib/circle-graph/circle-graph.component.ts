import { Component, ViewChild, ElementRef, ChangeDetectionStrategy, Input, OnChanges, Output, EventEmitter, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'uno-circle-graph',
    templateUrl: 'circle-graph.component.html',
    styleUrls: ['circle-graph.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircleGraphComponent implements OnInit, OnChanges {

    @Input() evaluated = 100;
    @Input() projected = 1;

    @Input() posLegX1 = 0.8;
    @Input() posLegY1 = 0.81;

    @Input() posLegX2 = 0.8;
    @Input() posLegY2 = 1.28;

    @Input() width = 183;
    @Input() height = 183;

    @Input() evaluatedTitle = 'evaluated';
    @Input() projectedTitle = 'projected';
    @Input() levelTitle = 'level';
    @Input() levelType: any;

    @Input() color = '#f28b00';

    @Output() evaluatedEmitter = new EventEmitter();
    @Output() projectedEmitter = new EventEmitter();

    @ViewChild('myCanvas', { static: true }) private myCanvas: ElementRef;
    private canvas: HTMLCanvasElement;
    private percentage: number;
    private radius: number;
    private total: number;

    constructor(private render: Renderer2) { }

    ngOnInit() {
        this.canvas = this.myCanvas.nativeElement;
        this.render.setProperty(this.canvas, 'width', this.width);
        this.render.setProperty(this.canvas, 'height', this.height);

        this.recalculateCanvas();
    }

    ngOnChanges() {
        if (this.canvas) {
            this.recalculateCanvas();
        }
    }

    private recalculateCanvas() {
        this.radius = 80;

        this.total = this.evaluated + this.projected;
        this.percentage = this.projected > 0 ? (this.projected / this.total) * 100 : 1;

        this.drawPercentageCircle(this.percentage, this.radius, this.canvas);
    }

    private degreesToRadians(deg: number) {
        return (deg / 180) * Math.PI;
    }

    private percentToRadians(percentage: number) {
        // convert the percentage into degrees
        const degrees = percentage * 360 / 100;
        // and so that arc begins at top of circle (not 90 degrees) we add 270 degrees
        return this.degreesToRadians(degrees + 270);
    }

    private drawPercentageCircle(percentage: number, radius: number, canvas: HTMLCanvasElement) {
        const context: CanvasRenderingContext2D = canvas.getContext('2d');
        canvas.style.backgroundColor = 'transparent';

        const x = canvas.width / 2;
        const y = canvas.height / 2;
        const startAngle = this.percentToRadians(0);
        const endAngle = this.percentToRadians(percentage);
        // set to true so that we draw the missing percentage
        let counterClockwise = true;

        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
        context.lineWidth = 15;

        // line color
        context.strokeStyle = this.hexToRgbA(this.color, '0.25');
        context.stroke();

        // set to false so that we draw the actual percentage
        counterClockwise = false;

        context.beginPath();
        context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
        context.lineWidth = 15;
        context.lineCap = 'round';

        // line color
        context.strokeStyle = this.color;
        context.stroke();

        // Legend
        context.beginPath();
        context.moveTo(x * this.posLegX1, y * this.posLegY1);
        context.lineWidth = 8;
        context.lineCap = 'round';
        context.lineTo(x * this.posLegX1, y * this.posLegY1);
        context.strokeStyle = this.hexToRgbA(this.color, '0.25');
        context.stroke();

        context.beginPath();
        context.moveTo(x * this.posLegX2, y * this.posLegY2);
        context.lineWidth = 8;
        context.lineCap = 'round';
        context.lineTo(x * this.posLegX2, y * this.posLegY2);
        context.strokeStyle = this.color;
        context.stroke();
    }

    private hexToRgbA(hex: string, op: string) {
        let c: any;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length === 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }

            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + op + ')';
        }

        throw new Error('Bad Hex');
    }
}
