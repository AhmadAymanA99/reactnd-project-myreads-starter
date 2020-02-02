import React from 'react'
//import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import BookSearch from './components/BookSearch'
import ShelfsList from './components/ShelfsList'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path='/search'
          render={() => (
            <BookSearch />
          )} />

        <Route exact path='/'
          render={() => (
            <ShelfsList />
          )} />
      </div>
    )
  }
}

export default BooksApp
