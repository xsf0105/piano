import { QuarkElement, customElement } from "quarkc"
import style from "./index.less?inline"


@customElement({ tag: "app-header", style })
class MyComponent extends QuarkElement {
  render() {
    return (
      <div>
        <div style="background: black;">
            <div class="container">
                <div class="text-sm-center text-white py-5">
                    <h1>Quarkc Piano</h1>
                    <p>An interactive piano keyboard for Quarkc. Supports custom sounds,<br class="d-none d-sm-block" />
                        touch/click/keyboard events, and fully auto play song.</p>
                    <div class="mt-4">
                        <a class="btn btn-outline-light btn-lg" href="https://github.com/xsf0105/piano">View docs on
                            Github
                        </a>
                        <a class="btn btn-outline-light btn-lg" href="https://github.com/xsf0105/piano">查看该项目Github地址
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center">
            <p class="">Try it by clicking, tapping, or using your keyboard 1 to 9:</p>
            <p class="">鼠标点击钢琴键或者键盘按数字键 1 ~ 9:</p>
            <div style="color: rgb(119, 119, 119);"><svg fill="currentColor" preserveAspectRatio="xMidYMid meet"
                    height="32" width="32" viewBox="0 0 40 40" style="vertical-align: middle;">
                    <g>
                        <path d="m33.4 20l-13.4 13.4-13.4-13.4 2.5-2.3 9.3 9.3v-20.4h3.2v20.4l9.4-9.3z"></path>
                    </g>
                </svg></div>
        </div>
    </div>
    );
  }
}
