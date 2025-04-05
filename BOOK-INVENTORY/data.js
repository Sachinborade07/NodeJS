const authors = [
    { id: 1, name: 'J.K. Rowling' },
    { id: 2, name: 'George Orwell' }
];

const genres = [
    { id: 1, name: 'Fantasy' },
    { id: 2, name: 'Dystopian' }
];

const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

const books = [
    { id: 1, title: 'Harry Potter', author_id: 1, genre_id: 1 },
    { id: 2, title: '1984', author_id: 2, genre_id: 2 }
];

const idCounters = {
    authors: authors.length + 1,
    genres: genres.length + 1,
    users: users.length + 1,
    books: books.length + 1
};

module.exports = {
    authors,
    genres,
    users,
    books,
    idCounters
};
