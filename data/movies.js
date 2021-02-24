const movies = [
    {
        id: 1,
        title: "Space Between Us",
        image: "images/1.jpg",
        description: "The first human born on Mars travels to Earth for the first time, experiencing the wonders of the planet through fresh eyes.He embarks on an adventure with a street smart girl to discover how he came to be.",
        cast: [
            "Gary Oldman",
            "Asa Butterfield",
        ],
        genre: [
            "Adventure",
            "Drama",
            "Romance",
        ],
        trailer: "https://www.youtube.com/embed/x73-573aWfs",
        score: 6.4,
        times: {
            "Cinema 1": [
                "9:10",
                "10:20",
                "11:30"
            ],
            "Cinema 2": [
                "9:10",
                "10:20",
                "11:30"
            ],
        },
    },
    {
        id: 2,
        title: "John Wick",
        image: "images/2.jpg",
        description: "An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.",
        cast: [
            "Keanu Reeves",
            "Michael Nyqvist",
            "Alfie Allen",
        ],
        genre: [
            "Action",
            "Crime",
            "Thriller",
        ],
        trailer: "https://www.youtube.com/embed/C0BMx-qxsP4",
        score: 7.4,
        times: {
            "Cinema 3": [
                "9:10",
                "10:20",
                "11:30"
            ],
            "Cinema 4": [
                "9:10",
                "10:20",
                "11:30"
            ],
        },
    },
    {
        id: 3,
        title: "Spider-Man Homecoming",
        image: "images/3.jpg",
        description: "",
        cast: [
            "Oliver Harper",
        ],
        genre: [
            "Talk-Showr",
        ],
        trailer: "https://www.youtube.com/embed/n9DwoQ7HWvI",
        score: 8.3,
        times: {
            "Cinema 5": [
                "9:10",
                "10:20",
                "11:30"
            ],
            "Cinema 6": [
                "9:10",
                "10:20",
                "11:30"
            ],
        },
    },
    {
        id: 4,
        title: "Beauty and the Beast",
        image: "images/4.jpg",
        description: "A selfish Prince is cursed to become a monster for the rest of his life, unless he learns to fall in love with a beautiful young woman he keeps prisoner.",
        cast: [
            "Emma Watson",
            "Dan Stevens",
            "Luke Evans",
        ],
        genre: [
            "Family",
            "Fantasy",
            "Musical",
        ],
        trailer: "https://www.youtube.com/embed/e3Nl_TCQXuw",
        score: 7.4,
        times: {
            "Cinema 7": [
                "9:10",
                "10:20",
                "11:30"
            ],
            "Cinema 8": [
                "9:10",
                "10:20",
                "11:30"
            ],
        },
    },
    {
        id: 5,
        title: "Pirates of the Caribbean: Dead Men Tell No Tales",
        image: "images/5.jpg",
        description: "Captain Jack Sparrow is pursued by old rival Captain Salazar and a crew of deadly ghosts who have escaped from the Devil's Triangle. They're determined to kill every pirate at sea...notably Jack.",
        cast: [
            "Johnny Depp",
            "Geoffrey Rush",
            "Javier Bardem",
        ],
        genre: [
            "Action",
            "Adventure",
            "Fantasy",
        ],
        trailer: "https://www.youtube.com/embed/Hgeu5rhoxxY",
        score: 6.5,
        times: {
            "Cinema 9": [
                "9:10",
                "10:20",
                "11:30"
            ],
            "Cinema 10": [
                "9:10",
                "10:20",
                "11:30"
            ],
        },
    },
    {
        id: 6,
        title: "The Witches",
        image: "images/6a.jpg",
        description: "A young boy and his grandmother have a run-in with a coven of witches and their leader.",
        cast: [
            "Anne Hathaway", "Octavia Spencer", "Stanley Tucci"
        ],
        genre: [
            "Adventure",
            "Comedy",
            "Family",
        ],
        trailer: "https://www.youtube.com/embed/9nlhmJF5FNI",
        score: 5.2,
        times: {
            "Cinema 11": [
                "9:10",
                "10:20",
                "11:30"
            ],
            "Cinema 12": [
                "9:10",
                "10:20",
                "11:30"
            ],
        },
    },
    {
        id: 7,
        title: "Hillbilly Elegy",
        image: "images/7a.jpg",
        description: "An urgent phone call pulls a Yale Law student back to his Ohio hometown, where he reflects on three generations of family history and his own future.",
        cast: [
            "Amy Adams", "Glenn Close", "Gabriel Basso",
        ],
        genre: [
            "Drama",
        ],
        trailer: "https://www.youtube.com/embed/KW_3aaoSOYg",
        score: 6.8,
        times: {
            "Cinema 13": [
                "9:10",
                "10:20",
                "11:30"
            ],
            "Cinema 14": [
                "9:10",
                "10:20",
                "11:30"
            ],
        },
    },
    {
        id: 8,
        title: "Cadaver",
        image: "images/8a.jpg",
        description: "In the starving aftermath of a nuclear disaster, a family of three attends a charitable event at a hotel, which takes a dark turn when people start to disappear.",
        cast: [
            "Gitte Witt", "Thomas Gullestad", "Thorbjørn Harr"
        ],
        genre: [
            "Drama",
            "Horror",
            "Thriller"
        ],
        trailer: "https://www.youtube.com/embed/eHsdyzddTBg",
        score: 5.1,
        times: {
            "Cinema 15": [
                "9:10",
                "10:20",
                "11:30"
            ],
            "Cinema 16": [
                "9:10",
                "10:20",
                "11:30"
            ],
        },
    },
    {
        id: 9,
        title: "One Night in Miami",
        image: "images/9.jpg",
        description: "A fictional account of one incredible night where icons Muhammad Ali, Malcolm X, Sam Cooke, and Jim Brown gathered discussing their roles in the Civil Rights Movement and cultural upheaval of the 60s.",
        cast: [
            "Kingsley Ben-Adir", "Eli Goree", "Aldis Hodge"
        ],
        genre: [
            "Drama",
        ],
        trailer: "https://www.youtube.com/embed/K8vf_Cmh9nY",
        score: 7.2,
        times: {
            "Cinema 17": [
                "9:10",
                "10:20",
                "11:30"
            ],
            "Cinema 18": [
                "9:10",
                "10:20",
                "11:30"
            ],
        },
    },
    {
        id: 10,
        title: "Black Box",
        image: "images/10.jpg",
        description: "After losing his wife and his memory in a car accident, a single father undergoes an agonizing experimental treatment that causes him to question who he really is.",
        cast: [
            "Mamoudou Athie", "Phylicia Rashad", "Amanda Christine"
        ],
        genre: [
            "Horror", "Mystery", "Sci-Fi"
        ],
        trailer: "https://www.youtube.com/embed/nj6JIzrIzxk",
        score: 6.2,
        times: {
            "Cinema 19": [
                "9:10",
                "10:20",
                "11:30"
            ],
            "Cinema 20": [
                "9:10",
                "10:20",
                "11:30"
            ],
        },
    },
]

export const index = Object.fromEntries(movies.map((value, key) => [value.id, key]));

export default movies;