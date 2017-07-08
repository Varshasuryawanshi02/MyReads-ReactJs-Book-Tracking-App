/**
 * Created by anirudh.r on 08/07/17.
 */

import React, {Component} from 'react';
import Book from "./Book";

export default class BookShelf extends Component {
    render() {
        const {shelfTitle, bookList} = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            bookList.map((book, index) => {
                                <li key={index}>
                                    <Book title={book.title} author={book.authors} imageUrl={book.coverURL}/>
                                </li>
                            })
                        }
                    </ol>
                </div>
            </div>
        )
    }
}
