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
        BooksAPI.search(query)
            .then(async (books) => {
                await this.setState({
                    books,
                    flag: 1
                })
                //await console.log(books)
            })
    }

    onSearch = (P) => {
        //console.log('promise', P)
        return this.checkSearch()
    }

    checkSearch = () => {
        const Books = this.state.books
        if (this.state.searchQuery === '') {
            //console.log('empty')
            return (
                <div><h3>Enter Search Query</h3></div>
            )
        }
        else if (!Books || Books.error) {
            //console.log('no')
            return (
                <div><h3>NO RESULTS</h3></div>
            )
        }
        else if (Books && Books.length > 0) {
            //console.log('okay')
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
                                    //console.log('Query :', this.state.searchQuery)

                                    if (this.state.searchQuery !== '') {
                                        this.search(this.state.searchQuery)
                                    }
                                    else {
                                        //console.log(2)
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
                                this.onSearch() : <h3>Enter Search Query</h3>//console.log('h')
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch