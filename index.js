define("Timeline", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LineSide;
    (function (LineSide) {
        LineSide[LineSide["right"] = 0] = "right";
        LineSide[LineSide["left"] = 1] = "left";
    })(LineSide = exports.LineSide || (exports.LineSide = {}));
    var Timeline = /** @class */ (function () {
        function Timeline(svg, options) {
            this.options = options;
            this.path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            this.svg = svg;
            this.svg.appendChild(this.path);
            this.draw();
        }
        Timeline.prototype.draw = function () {
            var lastItem;
            var lastPos;
            var path = ['M'];
            this.options.map(function (item) {
                var e = item.element;
                var bbox = {
                    x: e.offsetLeft,
                    y: e.offsetTop,
                    width: e.offsetWidth,
                    height: e.offsetHeight
                };
                var pos1 = { x: 0, y: 0 };
                var pos2 = { x: 0, y: 0 };
                switch (item.side) {
                    case LineSide.left:
                        pos1.x = bbox.x;
                        pos1.y = bbox.y;
                        pos2.x = bbox.x;
                        pos2.y = bbox.y + bbox.height;
                        break;
                    case LineSide.right:
                        pos1.x = bbox.x + bbox.width;
                        pos1.y = bbox.y;
                        pos2.x = bbox.x + bbox.width;
                        pos2.y = bbox.y + bbox.height;
                        break;
                }
                if (lastPos) {
                    if (pos1.y == lastPos.y) {
                        if (lastPos.x > pos1.x) {
                            path = path.concat([lastPos.x - (lastItem.radius ? lastItem.radius[1] : 0), lastPos.y, 'L']);
                            path = path.concat([pos1.x + (item.radius ? item.radius[0] : 0), lastPos.y, 'Q']);
                        }
                        else {
                            path = path.concat([lastPos.x + (lastItem.radius ? lastItem.radius[1] : 0), lastPos.y, 'L']);
                            path = path.concat([pos1.x - (item.radius ? item.radius[0] : 0), lastPos.y, 'Q']);
                        }
                    }
                    else {
                    }
                }
                path = path.concat([pos1.x, pos1.y]);
                if (item.radius) {
                    if (pos1.y == pos2.y) {
                        if (lastPos)
                            path = path.concat([pos1.x + item.radius[0], pos1.y, 'L']);
                        path = path.concat([pos2.x - item.radius[1], pos1.y, 'Q']);
                    }
                    else {
                        if (lastPos)
                            path = path.concat([pos1.x, pos1.y + item.radius[0], 'L']);
                        path = path.concat([pos1.x, pos2.y - item.radius[1], 'Q']);
                    }
                }
                path = path.concat([pos2.x, pos2.y]);
                lastPos = pos2;
                lastItem = item;
            });
            path.splice(path.length - 3, 1, 'L');
            this.path.setAttribute('d', path.join(' '));
        };
        return Timeline;
    }());
    exports.Timeline = Timeline;
});
define("index", ["require", "exports", "Timeline"], function (require, exports, Timeline_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(Timeline_1);
});
