import React, { Component } from 'react'
import { MAX_TIME_COUNT } from './constants/Const_Stopwatch'
import mk2digit from './utils/str_tools'
import './Stopwatch.css'

// Stopwatchコンポーネントを定義
class Stopwatch extends Component {

  // マウントしたとき
  componentWillMount () {
    this.state = { // 初期値を設定
      isLive: false,
      time_str: '00:00:00'
    }
    this.timeCount = 0
    this.timerId = 0
  }

  // アンマウントしたとき
  componentWillUnmount () {
    clearInterval(this.timerId)
  }

  setTime () {
    var hour = mk2digit(Math.floor(this.timeCount / 3600))
    var minute = mk2digit(Math.floor((this.timeCount % 3600) / 60))
    var second = mk2digit((this.timeCount % 3600) % 60)
    this.setState({
      time_str: `${hour}:${minute}:${second}`
    })
  }

  // 開始ボタンを押したとき
  startClickHandler (e) {
    this.timerStart();
  }

  // 停止ボタンを押したとき
  stopClickHandler (e) {
    this.timerStop();
  }

  // リセットボタンを押したとき
  resetClickHandler (e) {
    this.timerReset()
  }

  // タイマースタート
  timerStart () {
    this.setState({isLive: true})
    this.timerId = setInterval(e => {
      if(this.timeCount === MAX_TIME_COUNT){
        this.timerStop()
        return
      }
      this.timeCount += 1
      this.setTime()
    }, 1000)
  }

  // タイマーストップ
  timerStop () {
    clearInterval(this.timerId)
    this.setState({isLive: false})
  }

  // タイマーリセット
  timerReset () {
    this.timeCount = 0
    this.setState({
      time_str: '00:00:00'
    })
  }

  // 画面描画 --- (※7)
  render () {
    return (
    <div className='Stopwatch'>
      <span className='disp'>
        {this.state.time_str}
      </span>
      <br/>
      { //停止状態ならSTARTボタン,RESETボタンを表示
        this.state.isLive === false &&
        [<button onClick={(e)=>this.startClickHandler(e)}>START</button>,
         <button onClick={(e)=>this.resetClickHandler(e)}>RESET</button>]
      }
      { //稼働状態ならSTOPボタンを表示
        this.state.isLive === true &&
        <button onClick={(e)=>this.stopClickHandler(e)}>STOP</button>
      }
    </div>
    )
  }
}

export default Stopwatch
