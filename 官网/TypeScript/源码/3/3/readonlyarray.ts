let a: number[] = [1, 2, 3, 4];

let ro: ReadonlyArray<number> = a;

// ro[0] = 12;

// ro.push(5);

// ro.length = 100;

// a = ro;

a = ro as number[]