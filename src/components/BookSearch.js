import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class BookSearch extends Component {
    state = {
        searchQuery: '',
        books: [],
        flag: 0
    }

    search = (query) => {
        let searchBooks
        let res = []
        BooksAPI.search(query)
            .then((boos) => {
                searchBooks = boos
                BooksAPI.getAll()
                    .then((books) => {
                        //console.log('searchBooks', searchBooks)
                        //console.log('books', books)
                        if (!searchBooks.error) {
                            searchBooks.filter(book => {
                                books.filter(b => (book.id === b.id) ? (res.push(b)) : console.log('no'))
                                res.push(book)
                                return 1
                            })

                            //console.log(res)

                            for (let i = 0; i < res.length; i++) {
                                for (let j = 0; j < res.length; j++) {
                                    if(res[i].id === res[j].id && !res[i].shelf && res[j].shelf)
                                        res.splice(i, 1)
                                }
                            }
                            
                            //console.log(res)

                            this.setState({
                                books: res,
                                flag: 1
                            })

                        }
                        else{
                            this.setState({
                                books: '',
                                flag: 1
                            })
                        }
                    })
            })
    }

    onSearch = () => {
        return this.checkSearch()
    }

    checkSearch = () => {
        const Books = this.state.books
        if (this.state.searchQuery === '') {
            return (
                <div><h3>Enter Search Query</h3></div>
            )
        }
        else if (Books === '') {
            return (
                <div><h3>NO RESULTS</h3></div>
            )
        }
        else if (Books && Books.length > 0) {
            return (
                Books.map((book) =>
                    <li key={book.id}>
                        <Book book={book} changeShelf={this.changeShelf} flag={'a'} />
                    </li>
                ))
        }
    }

    changeShelf = (e, book) => {
        BooksAPI.update(book, e.target.value)
        book.shelf = e.target.value
        this.state.books.filter(bo =>
            this.setState({ books: [...this.state.books] })
        )
    }

    render() {
        const { searchQuery } = this.state
        return (
            <div className="search-books" >
                <div className="search-books-bar">
                    <Link to='/'> <button className="close-search">Close</button> </Link>

                    <div className="search-books-input-wrapper">
                        <input
                            value={searchQuery}
                            onChange={(event) => this.setState({
                                searchQuery:
                                    event.target.value
                            },
                                () => {
                                    if (this.state.searchQuery !== '') {
                                        this.search(this.state.searchQuery)
                                    }
                                    else {
                                    }
                                })
                            }
                            type="text"
                            placeholder="Search by title or author"
                        />
                    </div>

                </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.flag === 1 ?
                                this.onSearch() : <h3>Enter Search Query</h3>
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch