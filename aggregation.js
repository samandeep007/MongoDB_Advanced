// Find the count of all active users

[
    //Find all the active users
    {
        $match: {
            isActive: true
        }
    },

    //Count them and store them under Active Users
    {
        $count: 'Active Users'
    }
]


// What is the average age of all users

db.users.aggregate([
    {
        $group: {
            _id: null, //group by nothing --> everything is added to only one document
            averageAge: {
                $avg: "$age"
            }
        }
    }
])


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


// Find the total number of males and females

[
    {
        $group: {
            _id: "$gender",
            total: {
                $sum: 1
            }
        }
    }

]


// which country has the highest number of registered users

[
    {
        $group: {
            _id: "$company.location.country",
            count: {
                $sum: 1
            }
        }
    },
    {
        $sort: {
            count: -1
        }
    },
    {
        $limit: 1
    }
]


// List all unique eye colors present in the collection

[
    {
        $group: {
            _id: "$eyeColor",
        }
    }
]


// What is the average number of tags per user

[
    {
        $unwind: {
            path: "$tags"
        }
    },
    {
        $group: {
            _id: "$_id",
            count: { $sum: 1 }
        },
    },
    {
        $group: {
            _id: null,
            averageTags: { $avg: "$count" }
        }
    }

]


// What is the average number of tags per user
[
    {
        $addFields: {
            numberOfTags: {
                $size: { $ifNull: ["$tags", []] }
            }
        }
    },
    {
        $group: {
            _id: null,
            average: {
                $avg: "$numberOfTags"
            }
        }
    }
]

// How many users have 'enim' as one of their tags
[
    {
        $unwind: "$tags"
    },
    {
        $match: {
            "tags": "enim"
        }
    },
    {
        $count: 'total'
    }
]

// How many users have 'enim' as one of their tags
[
    {
        $match: {
            "tags": "enim"
        }
    },
    {
        $count: 'total'
    }
]


//What are the names and age of users who are inactive and have 'velit' as a tag

[
    {
        $addFields: {
            tags: "velit",
            isActive: false,
        },
    },
    {
        $project: {
            name: 1,
            age: 1
        }
    }

]


// How many users have a phone number starting with +1 (940)

[
    {
        $match: {
            "company.phone": {
                $regex: "\\+1 \\(940\\)",
                $options: "i"
            }
        }
    }, {
        $count: 'numberOfUsers'
    }
]


// How many users have a phone number starting with +1 (940)

[
    {
      $match: {
        "company.phone": /^\+1 \(940\)/
        }
      }
    ,{
      $count: 'numberOfUsers'
    }
  ]