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

function returnuser (usrroom) {
    let users1=[];
    for(let i=0;i<users.length;i++)
    {
        if(usrroom === users[i].room)
        {
            users1.push(users[i]);
        }
    }
    return users1;
}

function removeuser (id) {
    let users1=[];
    for(let i=0;i<users.length;i++)
    {
        if(id===users[i].id)
        {
            //Holaaaa!!!!!
        }
        else {
            users1.push(users[i])
        }
    }
    users=users1;
}

module.exports = { adduser , getuser , returnuser , removeuser};