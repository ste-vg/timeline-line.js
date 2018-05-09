declare enum LineSide {
    right = "right",
    left = "left",
}
interface TimelineElement {
    element: any;
    side: LineSide;
    radius?: number[];
}
interface Pos {
    x: number;
    y: number;
}
declare class Timeline {
    private options;
    private svg;
    private path;
    static fromClass(className: string, startSide?: LineSide, radius?: number): TimelineElement[];
    constructor(svg: HTMLElement, options: TimelineElement[]);
    draw(): void;
}
