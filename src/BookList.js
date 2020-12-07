import React from 'react';
import Book from './Book';
import './BookList.css'

const key = 'AIzaSyDAfOfDK_Wr3y4CLkv7rtCTyjnkoZD1BUM';

export default class BookList extends React.Component{
    state = {
        books: [],
        search: '',
        printType: 'all',
        bookType: 'no-filter'
    }

    render(){
        return(
            <main>
                     <div>
                        <form className='search-form'>
                            <span className='search-box'>
                                <label htmlFor='search-box'>Search: </label>
                                <input type="text" required='required' id='search-box' onChange={this.setSearch}></input>
                                <button type='submit' onClick={this.getBooks}>Search</button>
                            </span>
                            <span className='filters'>
                                <label htmlFor='print-type'>Print Type:</label>
                                <select name='print-type' id='print-type' onChange={this.changePrintType}>
                                    <option value='all'>All</option>
                                    <option value='books'>Books</option>
                                    <option value='magazines'>Magazines</option>
                                </select>
                                <label htmlFor='book-type'>Book Type: </label>
                                <select name='book-type' id='book-type' onChange={this.changeBookType}>
                                    <option value='no-filter'>No Filter</option>
                                    <option value='partial'>Partial</option>
                                    <option value='full'>Full</option>
                                    <option value='free-ebooks'>Free eBooks</option>
                                    <option value='paid-ebooks'>Paid eBooks</option>
                                    <option value='ebooks'>eBooks</option>
                                </select>
                            </span>
                        </form>
                    </div>
                    <div className='book-list'>
                        <ul>
                            {this.state.books}
                        </ul>
                    </div>

            </main>
        )
    }

    setSearch = (e) => {
        this.setState({search: e.target.value});
    }

    changePrintType = (e) => {
        this.setState({printType: e.target.value});
    }

    changeBookType = (e) => {
        this.setState({bookType: e.target.value});
    }

    getBooks = (e) => {
        let books = [];
        let filterString = ''
        let counter = 0;
        e.preventDefault();
        if(this.state.bookType !== 'no-filter'){
            filterString = `&filter=${this.state.bookType}`
        }
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.search}&printType=${this.state.printType}${filterString}&key=${key}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            books = data.items.map(book => {
                return (
                    <Book title={book.volumeInfo.title}
                     price={book.saleInfo.listPrice ? '$' + book.saleInfo.listPrice.amount : 'Not for Sale'}
                     authors={book.volumeInfo.authors}
                     info={book.searchInfo.textSnippet}
                     thumbnail={book.volumeInfo.imageLinks.thumbnail}
                     key={counter++}/>
                )
                        
            })
            this.setState({books: books})
        })
    }
}