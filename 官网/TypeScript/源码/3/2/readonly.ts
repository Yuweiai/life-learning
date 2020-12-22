interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = {x: 10, y: 20};
// error TS2540: Cannot assign to 'x' because it is a read-only property.
// p1.x = 5;