
export function collisionRectRect(
    rec1 : { start : { x : number , y : number } , w : number , h : number },
    rec2 : { start : { x : number , y : number } , w : number , h : number }
) : boolean {
    return rectRectCopied(
        rec1.start.x , rec1.start.y , rec1.w , rec1.h,
        rec2.start.x , rec2.start.y , rec2.w , rec2.h);
}

export function rectRectCopied( r1x : number, r1y : number, r1w : number, r1h : number, 
    r2x : number, r2y : number, r2w : number, r2h : number) {

    // are the sides of one rectangle touching the other?
  
    if (r1x + r1w >= r2x &&    // r1 right edge past r2 left
        r1x <= r2x + r2w &&    // r1 left edge past r2 right
        r1y + r1h >= r2y &&    // r1 top edge past r2 bottom
        r1y <= r2y + r2h) {    // r1 bottom edge past r2 top
          return true;
    }
    return false;
  }

export function collisionLineRectangle(
    rec : { start : { x : number , y : number } , w : number , h : number },
    line : {p1: { x: number, y: number }, p2: { x: number, y: number } }
) : boolean {
    const line1 = { p1 : rec.start , p2 : { x: rec.start.x + rec.w , y : rec.start.y }};
    const line2 = { p1 : rec.start , p2 : { x: rec.start.x , y : rec.start.y + rec.h }};
    const line3 = { p2 : { x: rec.start.x + rec.w , y : rec.start.y + rec.h } , p1 : { x: rec.start.x + rec.w , y : rec.start.y }};
    const line4 = { p2 : { x: rec.start.x + rec.w , y : rec.start.y + rec.h } , p1 : { x: rec.start.x , y : rec.start.y + rec.h }};
    return collisionLineLine(line,line1) || collisionLineLine(line,line2) || collisionLineLine(line,line3) || collisionLineLine(line,line4);
}
 
export function collisionLineLine(
    l1: { p1: { x: number, y: number }, p2: { x: number, y: number } },
    l2: { p1: { x: number, y: number }, p2: { x: number, y: number } }): boolean {
    return IsIntersectingCopied(
        { X: l1.p1.x, Y: l1.p1.y },
        { X: l1.p2.x, Y: l1.p2.y },
        { X: l2.p1.x, Y: l2.p1.y },
        { X: l2.p2.x, Y: l2.p2.y }
    );
}

export function IsIntersectingCopied(
    a: { X: number, Y: number },
    b: { X: number, Y: number },
    c: { X: number, Y: number },
    d: { X: number, Y: number }) : boolean {
    const denominator = ((b.X - a.X) * (d.Y - c.Y)) - ((b.Y - a.Y) * (d.X - c.X));
    const numerator1 = ((a.Y - c.Y) * (d.X - c.X)) - ((a.X - c.X) * (d.Y - c.Y));
    const numerator2 = ((a.Y - c.Y) * (b.X - a.X)) - ((a.X - c.X) * (b.Y - a.Y));

    // Detect coincident lines (has a problem, read below)
    if (denominator == 0) return numerator1 == 0 && numerator2 == 0;

    const r = numerator1 / denominator;
    const s = numerator2 / denominator;

    return (r >= 0 && r <= 1) && (s >= 0 && s <= 1);
}
