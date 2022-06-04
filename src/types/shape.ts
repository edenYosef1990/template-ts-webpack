import * as utils from '../utils/utilsFunctions';

export abstract class Shape{
    abstract isColliding(shape : Shape): boolean;
}

export class Rectangle extends Shape {

    public start: {x: number, y : number};
    public width : number;
    public height : number;

    constructor(
        start : {x : number ,y : number} , 
        width : number , height : number){
        super();
        this.start = start;
        this.width = width;
        this.height = height;
    }

    isColliding(shape: Shape): boolean {
        if (shape instanceof Rectangle){
            const rectangle = shape;
            return utils.collisionRectRect(
                {start : this.start , w : this.width , h : this.height},
                {start : rectangle.start , w : rectangle.width , h : rectangle.height}
            );
        }
        else if(shape instanceof Line){
            const line = shape;
            return utils.collisionLineRectangle(
                {start : this.start , w : this.width , h : this.height},
                { p1 : line.start , p2 : line.end}
            )
        }

        return false;
    }
    

}

export class Line extends Shape {
    public start : {x : number,y : number};
    public end : {x : number,y : number};

    constructor(start : 
        {x : number ,y : number} , end : 
        {x : number ,y : number}){
        super();
        this.start = start;
        this.end = end;
    }

    isColliding(shape: Shape): boolean {
        if (shape instanceof Rectangle){
            const rectangle = shape;
            return utils.collisionLineRectangle(
                {start : rectangle.start , w : rectangle.width , h : rectangle.height},
                { p1 : this.start , p2 : this.end}
            )

        }
        else if(shape instanceof Line){
            const line = shape;
            return utils.collisionLineLine(
                {p1 : line.start , p2 : line.end} , 
                { p1 : this.start , p2 : this.end}
                ); 
        }

        return false;
    }

}