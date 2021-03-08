const tickets = [
    {
        id: 1,
        title: "Space Between Us",
        cinema: "Cinema 1",
        date: "2021-02-22",
        time: "09:10",
        amount: 2,
    },
    {
        id: 2,
        title: "John Wick",
        cinema: "Cinema 4",
        date: "2021-02-22",
        time: "11:30",
        amount: 1,
    },
];

/**
 * Naujas formatas
const tickets = {
    "1;Cinema 1;2021-02-22;09:10" : { 
        quantity: 2,
    },
    "2;Cinema 4;2021-02-22;11:30" : {
        quantity: 1,
    },
};
 */
export default tickets;