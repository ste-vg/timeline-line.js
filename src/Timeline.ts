export enum LineSide
{
	right,
	left
}

export interface TimelineElement
{
	element: HTMLElement;
	side: LineSide;
	radius?: number[];
}

export interface Pos
{
    x: number,
    y: number
}

export class Timeline
{
	private options:TimelineElement[];
	private svg:HTMLElement;
	private path:SVGPathElement;

	constructor(svg:HTMLElement, options:TimelineElement[])
	{
		this.options = options;
        this.path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        this.svg = svg;
        this.svg.appendChild(this.path);
		
		this.draw();
	}
	
	public draw()
	{
		let lastItem:TimelineElement;
		let lastPos:Pos;
		
		let path: any[] = ['M'];
		
		this.options.map(item => 
		{
			let e = item.element;
			let bbox = {
				x: e.offsetLeft,
				y: e.offsetTop,
				width: e.offsetWidth,
				height: e.offsetHeight
			};
			
			let pos1 = {x: 0, y:0};
			let pos2 = {x: 0, y:0};
			
			switch (item.side)
			{
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
			
			if(lastPos)
			{
				if(pos1.y == lastPos.y)
				{
					if(lastPos.x > pos1.x)
					{	
						path = path.concat([lastPos.x - (lastItem.radius ? lastItem.radius[1] : 0), lastPos.y, 'L'])
						path = path.concat([pos1.x + (item.radius ? item.radius[0] : 0), lastPos.y, 'Q'])
					}
					else
					{
						path = path.concat([lastPos.x + (lastItem.radius ? lastItem.radius[1] : 0), lastPos.y, 'L'])
						path = path.concat([pos1.x - (item.radius ? item.radius[0] : 0), lastPos.y, 'Q'])
					}
				}
				else
				{
						
				}
			}
			
			path = path.concat([pos1.x, pos1.y])
			
			if(item.radius)
			{
				if(pos1.y == pos2.y)
				{
					if(lastPos) path = path.concat([pos1.x + item.radius[0], pos1.y, 'L'])
					path = path.concat([pos2.x - item.radius[1], pos1.y, 'Q'])
				}
				else
				{
					if(lastPos) path = path.concat([pos1.x, pos1.y + item.radius[0], 'L'])
					path = path.concat([pos1.x, pos2.y - item.radius[1], 'Q'])
				}
			}
			
			path = path.concat([pos2.x, pos2.y])
			
			lastPos = pos2;
			lastItem = item;
		})
		
 		path.splice(path.length - 3, 1, 'L');
		this.path.setAttribute('d', path.join(' '))
	}
}