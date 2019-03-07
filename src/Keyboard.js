import React, {Component} from 'react';

class Keyboard extends Component {
    keyboard = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    render() {
        return (
            <div>
                {this.keyboard.map((letter) => {
                    return <button className="btn btn-primary m-4" id={letter} key={letter}
                                   onClick={() => this.props.onClick(letter)}>{letter}</button>
                })}
            </div>
        )
    }
}

export default Keyboard