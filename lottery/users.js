function User(name, number) {
    this.name = name;
    this.number = number;
}

let users = []

function addUser(name, number)
{
    users.push(new User(name, number))
}

module.exports = {
    addUser: addUser,
    users: users
}
