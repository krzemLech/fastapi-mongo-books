const dbName = "fastapi-mongo"

use(dbName)

const ratings = db.ratings.find()

const books = db.books.find().limit(10)

console.log(ratings.toArray())
console.log(books.toArray().map(book => book._id))

const exampleRatings = [
  { user_id: 1, movie_id: 1, rating: 5, timestamp: 978300760 },
  { user_id: 1, movie_id: 2, rating: 3, timestamp: 978300760 },
  { user_id: 1, movie_id: 3, rating: 4, timestamp: 978300760 },
  { user_id: 2, movie_id: 1, rating: 4, timestamp: 978300760 },
  { user_id: 2, movie_id: 2, rating: 2, timestamp: 978300760 },
  { user_id: 2, movie_id: 3, rating: 5, timestamp: 978300760 },
  { user_id: 3, movie_id: 1, rating: 3, timestamp: 978300760 },
]