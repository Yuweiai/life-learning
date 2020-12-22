// 该接口用于描述一个拥有firstName和lastName字段的对象
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return `Hello, ${person.firstName} ${person.lastName}`
}

let user = {
    firstName: 'Jane',
    lastName: 'User'
}

document.body.innerHTML = greeter(user)