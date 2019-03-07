import React, {Component} from 'react';
import Keyboard from './Keyboard';
import $ from 'jquery';
import './App.css';

class App extends Component {
    state = {
        words : ["COUCOU", "ESSAYE DE ME TROUVER", "REACT", "PENDU"],
        guesses : 0,
        currentWord : null,
        wordSearch : "",
        usedLetters : [],
        won : false,
        newWord : ""
    }

    componentWillMount() {
        this.init()
    }

    init = index =>{
        const { words } = this.state
        const word = words[Math.floor(Math.random()*words.length)]
        this.setState({
            wordSearch : this.computeDisplay(word, []),
            currentWord : word,
            usedLetters : [],
            won : false,
            guesses : 0,
            newWord : React.createRef()
        })
    }

    restart = index => {
        this.init()
    }

    computeDisplay(phrase, usedLetters) {
        return phrase.replace(/\w/g,
            (letter) => (usedLetters.includes(letter) ? letter : "_")
        )
    }

    checkWon(){
        const { currentWord, usedLetters } = this.state
        this.setState({won: !this.computeDisplay(currentWord, usedLetters).includes('_')});
    }

    tryLetter = letter => {
        const { usedLetters, currentWord, guesses } = this.state

        usedLetters.push(letter)
        this.setState({
            usedLetters: usedLetters,
            wordSearch: this.computeDisplay(currentWord, usedLetters),
            guesses: guesses + 1
        })

        if(currentWord.includes(letter)){
            $("#" + letter).removeClass('btn-primary').addClass('btn-success').attr('disabled', true);
            this.checkWon();
            return true;
        } else {
            $("#" + letter).removeClass('btn-primary').addClass('btn-danger').attr('disabled', true);
            return false;
        }
    }


    handleSetNewWord = event => {
        const { newWord, words } = this.state
        event.preventDefault()
        if(newWord )
        words.push(newWord.value)
        this.setState({words: words})
        console.log(words)
    }

    render() {
        const { wordSearch, won, guesses } = this.state
        return (
            <div className="App container">
                <form onSubmit={this.handleSetNewWord}>
                    <input type="text" name="word" defaultValue="" ref={(field) => {this.state.newWord = field}}/>
                    <button type="submit">Ajouter</button>
                </form>
                <p>Essaie :{guesses}</p>
                <p className="word">{wordSearch}</p>

                {!won
                    ? <Keyboard onClick={this.tryLetter}/>
                    : <button className="btn btn-primary" onClick={this.restart}>Recommencer</button>}
            </div>
        );
    }
}

export default App;
