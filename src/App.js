import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelfList from "./components/BookShelfList";
import {Route} from 'react-router-dom';

export default class BooksApp extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            read: [],
            wantToRead: [],
            currentlyReading: []
        }
    }

    componentWillMount() {
        BooksAPI.getAll().then(books => {
            this.setState({
                read: books.filter(b => b.shelf === 'read'),
                wantToRead: books.filter(b => b.shelf === 'wantToRead'),
                currentlyReading: books.filter(b => b.shelf === 'currentlyReading')
            })
        })
    }

    render() {
        return (
            <div className="app">
                <Route path="/" exact render={() => (
                    <BookShelfList
                        currentlyReading={this.state.currentlyReading}
                        wantToRead={this.state.wantToRead}
                        read={this.state.read}
                    />
                )}/>
            </div>
        )
    }
}
