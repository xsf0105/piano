import { QuarkElement, customElement } from "quarkc"
import style from "./index.less?inline"
import { connectStore } from 'gluang';
import { store } from '../store';

// 演示：月亮代表我的心
import moon from '../app-piano/songs/moon.js'
// 按键和音符的关系
import keys from './keys.js'

@customElement({ tag: "app-footer", style })
class MyFooter extends connectStore(QuarkElement) {

  componentDidMount() {
    this.data = {
      title: "Quarkc",
      song: [],
      keys
    }

    store.setSong(moon)
  }

  render() {
    console.log(store, 122);

    return (
<div class="app-footer">
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
                    {store.song.map((item)=>{if(item[0].note){return(
                    <p class="mt-3 code">
                        <code class="p-2 text-dark">{
                            item.map((item2)=>{
                                if(item2.note){
                                    return(
                                        <span style={{color:store.data.count===item2.index?'red':'black'}}>{this.data.keys[item2.note]},</span>
                                    )
                                }
                            })}
                        </code>
                    </p>)}})}
                </div>
            </div>
        </div>
        <div class="bg-yellow mt-5 py-5">
            <div class="container">
                <div class="text-center text-secondary">Made with <span role="img"
                        aria-label="keyboard emoji">🎵</span>by <a class="text-secondary"
                        href="https://github.com/Wscats"><strong>@xsf0105</strong></a></div>
            </div>
        </div>
    </div>
    );
  }
}
