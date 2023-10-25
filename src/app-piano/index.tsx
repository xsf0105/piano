import { QuarkElement, customElement, state } from "quarkc"
import style from "./index.less?inline"
import { connectStore } from 'gluang';
import { store } from '../store';

// 音符文件
import notes from './notes'
// 演示：月亮代表我的心
import moon from './songs/moon'
// 演示：富士山下
import fuji from './songs/fuji'
// 蒲公英的约定
import pgydyd from './songs/pgydyd'
// 小幸运
import xxy from './songs/xxy'
// 音符和键盘的映射关系表
import pianoKeys from './pianoKeys'

@customElement({ tag: "app-piano", style })
class MyPiano extends connectStore(QuarkElement) {

  setSong = (song) => store.setSong(song)

  setCount = (count) => store.setSong(count)

  componentDidMount() {
    document.onkeydown = (event) => {
      // console.log(event)
      const e = event || window.event || arguments.callee.caller.arguments[0];
      const playNote = (key) => {
        if (e.shiftKey === true) {
          this.playNote(`${key}2`)
        } else if (e.altKey === true) {
          this.playNote(`${key}5`)
        } else if (e.ctrlKey === true) {
          this.playNote(`${key}3`)
        } else if (e.metaKey === true) {
          this.playNote(`${key}6`)
          e.returnValue = false;
        } else {
          this.playNote(`${key}4`)
        }
      }
      if (e && 49 <= e.keyCode && e.keyCode <= 55) {
        // console.log({
        //   ...this
        // })
        switch (e.keyCode) {
          case 49:
            playNote('C')
            break;
          case 50:
            playNote('D')
            break;
          case 51:
            playNote('E')
            break;
          case 52:
            playNote('F')
            break;
          case 53:
            playNote('G')
            break;
          case 54:
            playNote('A')
            break;
          case 55:
            playNote('B')
            break;
        }
      }
      if (e && (81 === e.keyCode || e.keyCode === 87 || e.keyCode === 69 || e.keyCode === 82 || e.keyCode === 84)) {
        switch (e.keyCode) {
          case 81:
            playNote('C#')
            break;
          case 87:
            playNote('D#')
            break;
          case 69:
            playNote('F#')
            break;
          case 82:
            playNote('G#')
            break;
          case 84:
            playNote('A#')
            break;
        }
      }
    }
  }

  // 暂停播放
  stopSong() {
    clearTimeout(this.timer)
    store.song = []
    store.count = 0
    console.log('reset')
  }

  playNote(name) {
    console.log(notes, name, 999);

    console.log(notes[name])
    if (!notes[name]["isPlay"]) {
      // console.log(name)
      const audio = this[name].childNodes[1]
      this[name].style.background = `linear-gradient(-20deg, #3330fb, #000, #222)`
      const timer = setTimeout(() => {
        // console.log(this[name].getAttribute('data-type'))
        this[name].getAttribute('data-type') === 'white' ? this[name].style.background = `linear-gradient(-30deg, #f8f8f8, #fff)` : this[name].style.background = `linear-gradient(-20deg, #222, #000, #222)`
        // clearInterval(timer)
        clearTimeout(timer)
      }, 500)
      audio.currentTime = 0
      audio.play()
      // 设置对应的音符为正在播放，相当于节流的开关
      notes[name]["isPlay"] = true
      const isPlay = setTimeout(() => {
        notes[name]["isPlay"] = false
        clearTimeout(isPlay)
      }, 500)
    }
  }

  // 使用递归弹奏 具有时间效果
  playSong(song) {
    store.setSong([...song])

    let offset = 0
    let time = 0

    const playSong = async () => {
      // 右边是从外部来中断递归
      if (offset < song.length && store.song.length > 0) {
        switch (typeof song[offset]) {
          // 简谱2演奏方法 根据 ++12345--6. 简单旋律情况
          case 'string':
            // eslint-disable-next-line no-case-declarations
            const letters = song[offset].match(/[0-9]/g)
            switch (letters.length) {
              case 1:
                time = this.handleString(song, offset)
                break
              default:
                time = this.handleStrings(song, offset)
                break
            }
            break;
          // 简谱1演奏方法 根据 CDEFGAB，复杂旋律情况，比如有和弦
          case 'object':
            console.log(song[offset]['note'])
            time = song[offset]['time'];
            this.playNote(song[offset]['note'])
            break;
          case 'number':
            // 休止符
            switch (song[offset]) {
              case 0:
                time = 1000
                break
            }
            break;
        }
        await new Promise<void>((resolve) => {
          const timer = setTimeout(() => {
            clearInterval(timer)
            resolve()
          }, time)
        })
        offset++
        // console.log(offset)
        // console.log(store.count)
        // 这里太久都忘了为什么 offset 是怎么变的了，用强制更新让 count 更新来激活暂停按钮吧
        this.update()
        // 自定义事件，跟下面底部的音符自动跳动结合
        store.add()
        playSong()
      } else {
        // 暂停播放
        clearTimeout(this.timer)
        store.song = []
        store.count = 0
        return;
      }
    }
    playSong()
  }

  // 使用定时器弹奏
  // playSongByInterval
  playSongByInterval(song) {
    clearInterval(this.interval)
    let offset = 0
    let time = 0
    this.interval = setInterval(() => {
      if (offset < song.length) {
        switch (typeof song[offset]) {
          // 简谱2演奏方法 根据 ++12345--6. 简单旋律情况
          case 'string':
            const letters = song[offset].match(/[0-9]/g)
            switch (letters.length) {
              case 1:
                time = this.handleString(song, offset)
                break
              default:
                time = this.handleStrings(song, offset)
                break
            }
            break;
          // 简谱1演奏方法 根据 CDEFGAB，复杂旋律情况，比如有和弦
          case 'object':
            console.log(song[offset]['note'])
            time = song[offset]['time'];
            this.playNote(song[offset]['note'])
            break;
          case 'number':
            // 休止符
            switch (song[offset]) {
              case 0:
                time = 1000
                break
            }
            break;
        }
        ++offset
      } else {
        clearInterval(this.interval)
      }
    }, 500)
  }

  // 处理多音
  // 处理 ['++3--45.']
  handleStrings(song, offset) {
    const reg = /[0-9]/g
    const str = song[offset]
    let order = 1
    const result = []
    while (true) {
      const temp = reg.exec(str)
      if (temp) {
        result.push({
          text: temp[0], index: temp.index, order: order
        })
        order++
      } else {
        break
      }
    }
    result.map((item) => {
      switch (str[item.index - 1]) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
          break;
        // 处理+5
        case '+':
          item.text = `+${item.text}`
          switch (str[item.index - 2]) {
            // 处理++5
            case '+':
              item.text = `+${item.text}`
              break;
          }
          break;
        case '-':
          item.text = `-${item.text}`
          switch (str[item.index - 2]) {
            case '-':
              item.text = `-${item.text}`
              break;
          }
          break;
        // 处理++#5
        case '#':
          item.text = `#${item.text}`
          switch (str[item.index - 2]) {
            case '-':
              item.text = `-${item.text}`
              switch (str[item.index - 3]) {
                case '-':
                  item.text = `-${item.text}`
                  break;
              }
              break;
            case '+':
              item.text = `+${item.text}`
              switch (str[item.index - 3]) {
                case '+':
                  item.text = `+${item.text}`
                  break;
              }
              break;
          }
          break;
      }
      // 处理5..
      switch (str[item.index + 1]) {
        case '.':
          item.text = `${item.text}.`
          switch (str[item.index + 2]) {
            // 处理5..
            case '.':
              item.text = `${item.text}.`
              break;
          }
          break;
      }
    })
    // 转化为['3','4','5']
    const notes = result.map((item) => {
      return item.text
    })
    // 存放多个按键的时间
    const time = []
    notes.forEach((item, index) => {
      time.push(this.handleString(notes, index))
    })
    // 取最大的时间返回
    return time.sort()[0]
  }

  // 处理单音
  // 处理 ['++3','--4','5.']
  handleString(song, offset) {
    // 处理字母结果 CDEFG
    const letter = song[offset].match(/[0-9]/g)[0]
    // 处理 --7 判断有多少个-
    const subKey = song[offset].split('-').length - 1
    // 处理 ++7 判断有多少个+
    const addKey = song[offset].split('+').length - 1
    // 处理 7.. 判断有多少个.
    const pointKey = song[offset].split('.').length - 1
    // 处理 #7 判断有多少个.
    const halfKey = song[offset].split('#').length - 1
    let note;
    let key;
    let time;
    switch (letter) {
      // 休止符
      case '0':
        return time = 1000
      case '1':
        note = 'C'
        break;
      case '2':
        note = 'D'
        break;
      case '3':
        note = 'E'
        break;
      case '4':
        note = 'F'
        break;
      case '5':
        note = 'G'
        break;
      case '6':
        note = 'A'
        break;
      case '7':
        note = 'B'
        break;
    }
    switch (subKey) {
      case 0:
        key = 4
        break;
      case 1:
        key = 3
        break;
      case 2:
        key = 2
        break;
    }
    switch (addKey) {
      case 0:
        key = 4
        break;
      case 1:
        key = 5
        break;
      case 2:
        key = 6
        break;
    }
    switch (pointKey) {
      case 0:
        time = 500
        break;
      case 1:
        time = 1000
        break;
      case 2:
        time = 1500
        break;
    }
    console.log(`${note + (halfKey > 0 ? '#' : '') + key}`)
    this.playNote(`${note + (halfKey > 0 ? '#' : '') + key}`)
    return time
  }

  // 录音
  recordSong() { }

  render() {
    return (
      <>
        <div class="">
          <div class="piano">
            {pianoKeys?.map((item)=>{return(
            <div class="piano-key">
              <div data-type="white" ref={e=>{ this[item.white.name] = e }} class="piano-key__white"
                onClick={this.playNote.bind(this,item.white.name)} data-key={item.white.keyCode}
                data-note={item.white.name}>
                <span class="piano-note">{item.white.name}</span>
                <audio preload="auto" src={notes[item.white.name].url} hidden='true' data-note={item.white.name}
                  class='audioEle'></audio>
              </div>
              <div data-type="black" ref={e=>{ this[item.black.name] = e }} style={{
                display: item.black.name ? 'block' : 'none'
              }} class="piano-key__black" onClick={this.playNote.bind(this,item.black.name)} data-key={item.black.keyCode}
                data-note={item.black.name}>
                <span class="piano-note" style="color:#fff">{item.black.name}</span>
                <audio preload="auto" src={notes[item.black.name]&&notes[item.black.name].url}
                  hidden='true' data-note={item.black.name} class='audioEle'></audio>
              </div>
            </div>
            )})}
          </div>

          <div class="text-center">
            <p>Click the button below to let the piano play the song automatically:</p>

            <p>点击下面按钮让钢琴自动演奏歌曲:{store.count > 0 ? '1' : '0'}</p>

            <div>
              {store.count > 0 ?(
              <button onClick={this.stopSong.bind(this)} class="btn btn-outline-info btn-stop">Stop 暂停</button>
              ):(
              <div>
                <button onClick={this.playSong.bind(this,moon)} class="btn btn-outline-info">月亮代表我的心</button>
                <button onClick={this.playSong.bind(this,pgydyd)} class="btn btn-outline-info">蒲公英的约定</button>
                <button onClick={this.playSong.bind(this,xxy)} class="btn btn-outline-info">小幸运</button>
                <button onClick={this.playSong.bind(this,fuji)} class="btn btn-outline-info">富士山下&爱情转移</button>
              </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
