import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    input,
    InputSignal,
    signal,
    TemplateRef,
    WritableSignal,
} from '@angular/core';

const PADDING = 12;

@Component({
    selector: 'app-shared-chart-bar',
    standalone: true,
    template: `
        <svg
            [style.--color-desktop]="'#098637'"
            [style.--color-mobile]="'#ff9300'"
            [attr.width]="_svg_width()"
            [attr.height]="_svg_height()"
            [attr.viewBox]="_svg_viewbox()"
            [style.width.%]="100"
            [style.height.%]="100"
            [attr.fill]="'currentColor'">
            <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stop-color="var(--color-desktop)" stop-opacity="0.8"></stop>
                    <stop offset="95%" stop-color="var(--color-desktop)" stop-opacity="0.1"></stop>
                </linearGradient>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stop-color="var(--color-mobile)" stop-opacity="0.8"></stop>
                    <stop offset="95%" stop-color="var(--color-mobile)" stop-opacity="0.1"></stop>
                </linearGradient>
            </defs>
            <g>
                @for (level of _levels(); track $index) {
                    <line
                        stroke="#cccccc4F"
                        fill="none"
                        [attr.x1]="level.x1"
                        [attr.y1]="level.y1"
                        [attr.x2]="level.x2"
                        [attr.y2]="level.y2"
                        [attr.width]="level.width"
                        [attr.height]="level.height"></line>
                }
            </g>
            <!-- <g>
                <text
                    orientation="bottom"
                    width="342"
                    height="30"
                    stroke="none"
                    x="33.5"
                    y="179"
                    class="recharts-text recharts-cartesian-axis-tick-value"
                    text-anchor="middle"
                    fill="#666">
                    <tspan x="33.5" dy="0.71em">Jan</tspan>
                </text>
            </g> -->
            <g>
                @for (path of _paths(); track $index) {
                    <path
                        [attr.fill]="'url(#fillMobile)'"
                        [attr.x]="path.x"
                        [attr.y]="path.y"
                        [attr.width]="path.width"
                        [attr.height]="path.height"
                        [attr.radius]="path.radius"
                        [attr.d]="path.d"></path>
                }
            </g>
            <g>
                @for (xLabel of _axisXLabels(); track $index) {
                    <text
                        [style.fontSize.em]="'0.7'"
                        orientation="bottom"
                        [attr.width]="xLabel.width"
                        [attr.height]="xLabel.height"
                        stroke="none"
                        [attr.x]="xLabel.x"
                        [attr.y]="xLabel.y"
                        text-anchor="middle"
                        fill="#666">
                        <tspan [attr.x]="xLabel.x" dy="-0.35em">{{ xLabel.cordinate }}</tspan>
                    </text>
                }
            </g>
        </svg>
    `,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'w-full h-[100px] flex text-green-500',
    },
})
export class SharedHeroIconsComponent {
    private readonly elementRef = inject(ElementRef);

    public readonly data: InputSignal<Array<Record<string, number>>> = input();
    public readonly x: InputSignal<string> = input();
    public readonly y: InputSignal<string> = input();
    public readonly axisX: InputSignal<TemplateRef<any>> = input();
    public readonly axisY: InputSignal<TemplateRef<any>> = input();

    protected _svg: WritableSignal<any> = signal(null);

    protected _svg_width: WritableSignal<any> = signal(null);
    protected _svg_height: WritableSignal<any> = signal(null);
    protected _svg_viewbox = computed(() => `0 0 ${this._svg_width()} ${this._svg_height()}`);

    protected yAxisParts = computed(() => {
        return new Set([0, ...this.data().map((cord) => cord?.[this.y()])]);
    });

    protected yAxisHeight = computed(() => this._height / this.yAxisParts().size);
    protected xAxisParts = computed(() => {
        return this.data().map((cord) => cord?.[this.x()]);
    });

    protected xAxisWidth = computed(() => this._width / this.xAxisParts().length);

    protected _levels = computed(() =>
        Array.from(this.yAxisParts()).map((yPart, idx) => ({
            x1: 0,
            y1: this.yAxisHeight() * idx,
            x2: this._width,
            y2: this.yAxisHeight() * idx,
            width: this._width,
            height: this.yAxisHeight(),
        }))
    );

    protected _paths = computed(() => {
        const bars = this.data().map((cordinate, idx) => {
            const max_y = Math.max(...this.yAxisParts());

            const path_height = this._height * (cordinate[this.y()] / max_y);
            const path_width = this.xAxisWidth();
            const path_x = this.xAxisWidth() * idx;
            const path_y = this._height - path_height;

            return {
                x: path_x,
                y: path_y,
                width: path_width,
                height: path_height,
                radius: 0,
                d: `M ${path_x},${path_y} h ${path_width} v ${path_height} h -${path_width} Z`,
            };
        });

        return bars;
    });

    protected _axisXLabels = computed(() => {
        const _default = {
            width: '342',
            height: '30',
            stroke: 'none',
            x: '33.5',
            y: '179',
            cordinate: 0,
        };

        const _x_labels = this._paths().reduce((labels, path, idx) => {
            const _cordinates = this.data()[idx];
            const _x = _cordinates[this.x()];

            const _neighbour = labels[labels.length - 1];

            if (_neighbour?.cordinate == _x) {
                _neighbour.x += path.width / 2;
            } else {
                labels.push({
                    width: this._width,
                    height: 20,
                    x: path.x + path.width / 2,
                    y: this._height + 25,
                    cordinate: _x,
                });
            }

            return labels;
        }, []);

        return _x_labels;
    });

    ngOnInit() {
        this._svg_width.set(this.dimensions.width);
        this._svg_height.set(this.dimensions.height);
    }

    private get _width() {
        return this.dimensions.width;
    }

    private get _height() {
        return this.dimensions.height - 25;
    }

    private get dimensions() {
        return (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect();
    }
}
