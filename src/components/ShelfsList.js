import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

import * as BooksAPI from '../BooksAPI'

class BooksLibrary extends Component {
    state = {
        shelfs: [
            'currentlyReading',
            'wantToRead',
            'read'
        ],
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then(async (books) => {
                await this.setState({
                    books
                })
            })
    }

    changeShelf = (e, book) => {

        BooksAPI.update(book, e.target.value)
        book.shelf = e.target.value
        this.state.books.filter(bo =>
            this.setState({ books: [...this.state.books] })
        )

    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                <div className="list-books-content">
                    <div>
                        {
                            this.state.shelfs.map((shelfName) =>
                                <div key={shelfName} className="bookshelf">
                                    {
                                        <Shelf
                                            name={shelfName}
                                            Books={this.state.books.filter(book => book.shelf === shelfName)}
                                            changeShelf={this.changeShelf}
                                        />
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>


                <div className="open-search">
                    <Link to='/search'><button>Add a book</button></Link>
                </div>
            </div>
        )
    }
}

export default BooksLibrary