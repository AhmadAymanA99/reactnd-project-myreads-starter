import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component {
    putTitle = (name) => {
        if (name === 'currentlyReading')
            return 'Currently Reading'
        else if (name === 'wantToRead')
            return 'Want to Read'
        else if (name === 'read')
            return 'Read'
    }

    changeShelf = (e, book) => {
        this.props.changeShelf(e, book)
    }

    render() {
        const { name, Books } = this.props
        return (
            <div>
                <h2 className="bookshelf-title">{this.putTitle(name)}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            Books.map((book) =>
                                <li key={book.id}>
                                    <Book book={book} changeShelf={this.changeShelf} />
                                </li>
                            )
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf