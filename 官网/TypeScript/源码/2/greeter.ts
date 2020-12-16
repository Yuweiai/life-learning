function greeter(person: string) {
    return `Hello, person`
}

// const user = 'Jane User'
// error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
let user = [0, 1, 2]

document.body.innerHTML = greeter(user)