export declare enum WrapPathSide {
    right = 0,
    left = 1,
}
export interface WrapPathOption {
    element: HTMLElement;
    side: WrapPathSide;
    radius?: number[];
}
export interface Pos {
    x: number;
    y: number;
}
export declare class WrapPath {
    private options;
    private svg;
    private path;
    constructor(svg: HTMLElement, options: WrapPathOption[]);
    draw(): void;
}
