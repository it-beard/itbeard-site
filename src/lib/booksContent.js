// The texts of the /books page. They are by far the largest on the site, so they travel
// with that page instead of the main bundle: importing this module (Books.jsx does)
// makes getPage('books') and getPage('library') available.
import books from '../../content/books.md?raw'
import library from '../../content/library.md?raw'
import { addPages } from './content'

addPages({ books, library })
