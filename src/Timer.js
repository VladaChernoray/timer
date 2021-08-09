import React, { Component } from "react";
import "./App.css";

class Timer extends Component {

    state = {
        timerState: false,
        timerStart: 0,
        timerValue: 0
    };

   /* DoubleClick = ({ onClick = () => { }, onDoubleClick = () => { }, children }) => {
        let timer;
        const onClickHandler = event => {
            clearTimeout(timer);
            if (event.detail === 1) {
                timer = setTimeout(onClick, 300)
            } else if (event.detail === 2) {
                onDoubleClick()
            }
        }
    }*/

    pressCounter = () => {
        this.setState({ pressCount: this.state.pressCount + 1 });
        setTimeout(() => {
            if (this.state.pressCount === 2) {
              this.startTimer();
            }
            this.setState({ pressCount: 0 });
        }, 300)
    };

    startTimer = () => {
        this.setState({
            timerState: true,
            timerStart: Date.now() - this.state.timerValue,
            timerValue: this.state.timerValue
        });
        this.timer = setInterval(() => {
            this.setState({
                timerValue: Date.now() - this.state.timerStart
            });
        }, 10);
    };

    stopTimer = () => {
        this.setState({ timerState: false });
        clearInterval(this.timer);
    };

    resetTimer = () => {
        this.setState({
            timerStart: 0,
            timerValue: 0
        });
        clearInterval(this.timer);
    };

    render() {
        const { timerValue } = this.state;

        let seconds = ("0" + (Math.floor(timerValue / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(timerValue / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(timerValue / 3600000)).slice(-2);

        return (
            <div className="timer_container">
                <div className="timer__container"> { hours } : { minutes } : { seconds } </div>

                {this.state.timerState === false &&
                this.state.timerValue === 0 && (
                    <button onClick={this.startTimer}>Start</button>
                )}

                {this.state.timerState === true && (
                    <button onClick={this.stopTimer}>Stop</button>
                )}

                {this.state.timerState === false &&
                this.state.timerValue > 0 && (
                    <button onClick={this.pressCounter}>Wait</button>
                )}

                {this.state.timerValue >= 0 && (
                    <button onClick={this.resetTimer}>Reset</button>
                )}
            </div>
        );
    }
}

export default Timer;