import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelfList from "./components/BookShelfList";
import SearchBook from "./components/SearchBook";
import {Route} from 'react-router-dom';

export default class BooksApp extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({ books })
        })
    }

    onShelfChange = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then(
                this.setState((state) => ({
                    books: state.books.map(b => {
                        if (b.title === book.title) {
                            b.shelf = shelf;
                            return b
                        } else {
                            return b
                        }
                    })
                }))
            )
    };

    render() {
        const state = this.state;
        const currentlyReading = state.books.filter((book) => book.shelf === 'currentlyReading')
        const wantToRead = state.books.filter((book) => book.shelf === 'wantToRead')
        const read = state.books.filter((book) => book.shelf === 'read')

        return (
            <div className="app">
                <Route path="/" exact render={() => (
                    <BookShelfList
                        currentlyReading={currentlyReading}
                        wantToRead={wantToRead}
                        read={read}
                        onShelfChange={this.onShelfChange}
                    />
                )}/>
                <Route path="/search" render={({history}) => (
                    <SearchBook
                        onShelfChange={this.onShelfChange}
                        history={history}
                        books={currentlyReading.concat(wantToRead, read)}
                    />
                )}/>
            </div>
        )
    }
}
