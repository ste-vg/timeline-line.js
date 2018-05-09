declare module "Timeline" {
    export enum LineSide {
        right = 0,
        left = 1,
    }
    export interface TimelineElement {
        element: HTMLElement;
        side: LineSide;
        radius?: number[];
    }
    export interface Pos {
        x: number;
        y: number;
    }
    export class Timeline {
        private options;
        private svg;
        private path;
        constructor(svg: HTMLElement, options: TimelineElement[]);
        draw(): void;
    }
}
declare module "index" {
    export * from "Timeline";
}
