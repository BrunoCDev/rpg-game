module.exports = {
  getDatabaseUser(req, res, next) {
    const db = req.app.get('db')
    const { id } = req.params.id
    db.getUserById([ id ])
    .then(response => {
      console.log(response)
      res.json(response[0])
    })
    .catch(console.log)
  },
  getCharacter(req, res, next) {
    const { id } = req.params
    const db = req.app.get('db')
    db.getCharacterById([ id ])
    .then(response => {
      res.json(response)
    })
    .catch(console.log)
  }
}