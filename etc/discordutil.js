module.exports.idToUsername = async (client, id) => {
    try {
        console.log(`fetching user with id: ${id}`);
        const username = (await client.users.fetch(id)).username;
        console.log(username);
        return username;
    }
    catch(e) {
        console.log(e);
        return `unresolvedID${id}`;
    }
};