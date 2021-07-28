

function createUser(req, res, next) {
    //Validate the body

    createUserHandler(req.body).then(data => res.status(200).send(200)).catch(err => res.status(500).send())
}

async function createUserHandler(body) {

}