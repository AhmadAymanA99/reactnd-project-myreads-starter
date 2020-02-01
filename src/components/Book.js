import React, { Component } from 'react'

class Book extends Component {
    printAuthors = (book) => {
        if (book.authors !== undefined) {
            return (
                book.authors.map((a) =>
                    <div key={a} className="book-authors">{a}</div>
                ))
        }
    }

    getCover =  (book) => {
        if(book.imageLinks && book.imageLinks.smallThumbnail)
            return book.imageLinks.smallThumbnail
        else
            return book.infoLink
    }

    render() {
        const book = this.props.book
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 130, height: 190, backgroundImage: `url(${ this.getCover(book) })` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={(e) => {
                            this.props.changeShelf(e, book)
                        }}>
                            <option value="move" isdisabled='true'>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {
                    
                    this.printAuthors(book)

                }
            </div>
        )
    }
}

export default Book