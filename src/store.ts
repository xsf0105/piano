import { createGluang } from 'gluang';

class MyState extends createGluang {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;

    static get stateVars() {
        return {
          count: 0,
          song: []
        };
    }

    sub() {
      this.count--
    }

    add() {
        this.count++
    }

    setSong(song) {
      // 构建新的数组，给它下标值来做索引
      const melody = [];
      song.map((item, index) => {
          melody.push({
              ...item,
              index
          })
      })

      // 处理成每30个音符一个数组，自动播放时候自动显示按键
      const temp = []
      for (let j = 0; j < melody.length; j += 30) {
          temp.push(melody.slice(j, j + 30))
      }
      // 如果直接用 this.song.push(xxx)，不能被 gluang 中的 Object.defineProperty 捕获
      // 等后面给 gluang 数据绑定替换为 proxy
      this.song = temp;
    }
}

export const store = new MyState();