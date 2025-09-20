from typing import Any


pipeline_books_with_ratings = [
        {
            "$lookup": {
                "from": "ratings",  # ratings collection
                "localField": "_id",  # field in books
                "foreignField": "book_id",  # field in ratings
                "as": "ratings",  # new array with ratings
            }
        },
        {
            "$addFields": {
                "average_rating": {
                    "$cond": [
                        {"$gt": [{"$size": "$ratings"}, 0]},
                        {"$avg": "$ratings.rating"},
                        None,
                    ]
                },
                "ratings_count": {"$size": "$ratings"},
                "id" : "$_id",
            }
        },
        {
            "$project": {
                "ratings": 0,  # hide raw ratings
                "_id": 0,
            }
        }
    ]

def generate_pipeline(*, pipeline: list[dict[str, Any]], pagination: dict[str, Any], filters: dict[str, str] = {}) -> list[dict[str, Any]]:
    aggregations = []
    for key in filters.keys():
      if filters[key] is not None:
        aggregations.append({"$match": {key: {"$regex": f"^{filters[key]}", "$options": "i"}}})
    aggregations.append({"$skip": pagination["skip"]})
    aggregations.append({"$limit": pagination["limit"]})
    aggregations.extend(pipeline)

    return aggregations