// List the top 5 most common favorite fruits among the users

db.users.aggregate(
    [
        {
          $group: {
            _id: "$favoriteFruit",
            count: {
              $sum: 1 //Add 1 to the count wherever you see that specific fruit
            }
          }
        },
        {
            $sort: {
              count: -1
            }
        }, 
        {
          $limit: 2
        }
      
      ]
)