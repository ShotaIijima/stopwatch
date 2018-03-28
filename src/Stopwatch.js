import React, { Component } from 'react'
import MAX_TIME_COUNT from './conf/conf'
import mk2digit from './util/str_util'
import './Stopwatch.css'

// Stopwatchコンポーネントを定義
class Stopwatch extends Component {
  constructor(props){
    super(props)
    this.state = { // 初期値を設定
      started: false,
      time_str: '00:00:00'
    }
  }

  // マウントする直前
  componentWillMount () {
    this.time_count = 0
    this.timer_id = 0
  }

  // アンマウントする直前
  componentWillUnmount () {
    clearInterval(this.timer_id)
  }

  setTime () {
    var hour = mk2digit(Math.floor(this.time_count / 3600))
    var minute = mk2digit(Math.floor((this.time_count % 3600) / 60))
    var second = mk2digit((this.time_count % 3600) % 60)
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
    this.setState({started: true})
    this.timer_id = setInterval(e => {
      if(this.time_count === MAX_TIME_COUNT){
        this.timerStop()
        return
      }
      this.time_count += 1
      this.setTime()
    }, 1000)
  }

  // タイマーストップ
  timerStop () {
    clearInterval(this.timer_id)
    this.setState({started: false})
  }

  // タイマーリセット
  timerReset () {
    this.time_count = 0
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
        this.state.started === false &&
        [<button onClick={(e)=>this.startClickHandler(e)}>START</button>,
         <button onClick={(e)=>this.resetClickHandler(e)}>RESET</button>]
      }
      { //稼働状態ならSTOPボタンを表示
        this.state.started === true &&
        <button onClick={(e)=>this.stopClickHandler(e)}>STOP</button>
      }
    </div>
    )
  }
}

export default Stopwatch
