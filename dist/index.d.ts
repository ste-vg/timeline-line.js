declare enum LineSide {
    right = 0,
    left = 1,
}
interface TimelineElement {
    element: HTMLElement;
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
    constructor(svg: HTMLElement, options: TimelineElement[]);
    draw(): void;
}
