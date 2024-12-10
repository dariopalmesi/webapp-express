


const NotFound = (req, res,) => {
    res.status(404).json({ err: 'not found' })
}

module.exports = NotFound