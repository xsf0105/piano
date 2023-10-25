import { QuarkElement, customElement } from "quarkc"
import style from "./index.less?inline"
import { connectStore } from 'gluang';
import { store } from '../store';

// 演示：月亮代表我的心
import moon from '../app-piano/songs/moon'
// 按键和音符的关系
import keys from './keys'

@customElement({ tag: "app-footer", style })
class MyFooter extends connectStore(QuarkElement) {

  componentDidMount() {
    // TODO: gluang 需要修改，调用 setSong 的时候，没有重新渲染 render ！！！
    // store.setSong(moon)

    // console.log('didMount', store.song);
  }

  handle2Melody() {
    store.setSong(moon)
    console.log('click', store.song);
    // this.update()
    // linear-gradient(-20deg, rgb(51, 48, 251), rgb(0, 0, 0), rgb(34, 34, 34))
  }

  render() {
    console.log(store.song, 122);

    return (
<div class="app-footer" onClick={this.handle2Melody.bind(this)}>
        <hr class="mt-5" />
        <div class="row mt-5">
            <div class="col">
                <div class="text-center">
                    <p class="mt-4">
                        You can click on the keyboard and play the melody that belongs to you. Here is an example of a
                        piano piece:
                    </p>
                    <p>你可以点击键盘依顺序按以下键，控制好节奏演奏属于你的旋律，下面是一首钢琴曲的例子:</p>
                    <p class="mt-4">Enjoy it!</p>
            {store.song}
                    {
                      store.song.map((item)=>{
                        console.log(item, 22);

                      if(item[0].note){
                        return(
                          <p class="mt-3 code">
                            <code class="p-2 text-dark">{
                                item.map((item2)=>{
                                    if(item2.note){
                                        return(
                                            <span style={{color:store.count===item2.index?'red':'black'}}>
                                              {keys[item2.note]},
                                            </span>
                                        )
                                    }
                                })}
                            </code>
                          </p>
                        )
                      }})
                    }
                </div>
            </div>
        </div>
        <div class="bg-yellow mt-5 py-5">
            <div class="container">
                <div class="text-center text-secondary">Made with <span role="img"
                        aria-label="keyboard emoji">🎵</span>by <a class="text-secondary"
                        href="https://github.com/xsf0105"><strong>@xsf0105</strong></a></div>
            </div>
        </div>
    </div>
    );
  }
}
