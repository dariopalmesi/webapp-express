const connection = require('../database/connection');

function index(req, res) {
    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        return res.json(results);
    })
}

function show(req, res) {

    const id = req.params.id
    const sql = `SELECT * FROM movies WHERE id =?`
    const reviewsSql = `SELECT * FROM reviews WHERE movie_id =?`

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) { return res.status(404).json({ err: 'Movie not found' }) }

        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ error: err })

            const movie = {
                ...results[0],
                reviews: reviewsResults
            }

            res.json(movie)
        })
    })
}

function postReview(req, res) {
    const movie_id = Number(req.params.id)
    const { name, text, vote } = req.body
    const now = new Date()
    const reviewDate = `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}`

    const sql = "INSERT INTO `reviews` SET name=?, text=?, vote=?, movie_id=?, created_at=?"

    connection.query(sql, [name, text, vote, movie_id, reviewDate], (err, result) => {
        if (err) return res.status(500).json({ error: err })
        return res.status(201).json({ success: true })

    })

}


module.exports = {
    index,
    show,
    postReview
}
