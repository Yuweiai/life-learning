var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Rigth"] = 3] = "Rigth";
})(Direction || (Direction = {}));
console.log(Direction.Up, typeof Direction.Up);
console.log(Direction.Up === 0);
console.log(Direction);
console.log(Direction[0]);
