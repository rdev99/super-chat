users = [];

function adduser(id,room,username) {
    let user = {
        id,
        room,
        username
    }

    users.push(user);

    return user;
}

function getuser(id) {
    for(let i=0;i<users.length;i++)
    {
        if(id===users[i].id)
        {
            return users[i];
        }
    }
}

module.exports = { adduser , getuser };