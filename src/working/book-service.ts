enum Genre {
  Detective = "Detective",
  Adventure = "Adventure",
  ScienceFiction = "Science Fiction",
  Fantasy = "Fantasy",
}


interface Author {
  id: number;
  firstName: string;
  lastName: string;
}


interface Book {
  id: number;
  title: string;
  authorId: number;
  genre: Genre;
  publicationYear: number;
}


const books: Book[] = [
  {
    id: 1,
    title: "The Adventures of Sherlock Holmes",
    authorId: 1,
    genre: Genre.Detective,
    publicationYear: 1892,
  },
  {
    id: 2,
    title: "The Adventures of Fandorin",
    authorId: 2,
    genre: Genre.Detective,
    publicationYear: 1998,
  },
  {
    id: 3,
    title: "King Solomon's Mines",
    authorId: 3,
    genre: Genre.Adventure,
    publicationYear: 1885,
  },
  {
    id: 4,
    title: "Foundation Trilogy",
    authorId: 4,
    genre: Genre.ScienceFiction,
    publicationYear: 1951,
  },
  {
    id: 5,
    title: "Harry Potter",
    authorId: 5,
    genre: Genre.Fantasy,
    publicationYear: 1997,
  },
  {
    id: 6,
    title: "Twenty Thousand Leagues Under the Sea",
    authorId: 6,
    genre: Genre.Adventure,
    publicationYear: 1870,
  },
  {
    id: 7,
    title: "Treasure Island",
    authorId: 7,
    genre: Genre.Adventure,
    publicationYear: 1883,
  },
];


const authors: Author[] = [
  { 
    id: 1, 
    firstName: "Arthur Conan", 
    lastName: "Doyle" 
  },
  { 
    id: 2, 
    firstName: "Boris", 
    lastName: "Akunin" 
  },
  {
    id: 3, 
    firstName: "H.Rider", 
    lastName: "Haggard" 
  },
  {
    id: 4, 
    firstName: "Isaac", 
    lastName: "Asimov" 
  },
  { 
    id: 5, 
    firstName: "J.K.", 
    lastName: "Rowling" 
  },
  { 
    id: 6, 
    firstName: "Jules", 
    lastName: "Verne" 
  },
  { 
    id: 7, 
    firstName: "Robert Louis", 
    lastName: "Stevenson" 
  },
];


interface IBookService {
    getBooks(): Book[];
    getBookById(id: number): Book | undefined;
    getAuthors(): Author[];
    getAuthorById(id: number): Author | undefined;
    getBooksByAuthorId(authorId: number): Book[];
    getBooksByAuthorName(authorName: string): Book[];
    getAuthorByBookId(bookId: number): Author | undefined;
    search(query: string): string[];
}


class BookService implements IBookService {
  getBooks(): Book[] {
    return books;
  }

  getBookById(id: number): Book | undefined {
    return books.find((book) => book.id === id);
  }

  getAuthors(): Author[] {
    return authors;
  }

  getAuthorById(id: number): Author | undefined {
    return authors.find((author) => author.id === id);
  }

  getBooksByAuthorId(authorId: number): Book[] {
    return books.filter((book) => book.authorId === authorId);
  }

  getBooksByAuthorName(authorName: string): Book[] {
    const author = authors.find(
      (author) => (author.firstName + " " + author.lastName) === authorName
    );
    return author ? books.filter((book) => book.authorId === author.id) : [];
  }

  getAuthorByBookId(bookId: number): Author | undefined {
    const book = books.find((book) => book.id === bookId);
    return book ? authors.find((author) => author.id === book.authorId) : undefined;
  }

  search(query: string): string[] {
    const searchStringLowerCase = query.toLowerCase();
    const results: string[] = [];

    books.forEach((book) => {
      const author = authors.find((author) => author.id === book.authorId);
      if (
        author &&
        (book.title.toLowerCase().includes(searchStringLowerCase) ||
          (author.firstName + " " + author.lastName).toLowerCase().includes(searchStringLowerCase))
      ) {
        results.push(author.firstName + " " + author.lastName) + " - " + book.title;
      }
    });

    return results;
  }
}
