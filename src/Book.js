import React from 'react';
import './Book.css'

export default class Book extends React.Component{
    render(){
        return(
            <li className='book'>
                <div className='cover'>
                    <img src={this.props.thumbnail} alt={`{${this.props.title} Cover}`} />
                </div>
                    <div className='info'>
                    <h2>{this.props.title}</h2>
                    <h3> Author: {this.props.authors}</h3>
                    <p>Price: {this.props.price}</p>
                    <p>{this.props.info}</p>
                </div>
            </li>
        )
    }
}