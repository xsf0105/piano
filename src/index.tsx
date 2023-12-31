import { QuarkElement, customElement } from "quarkc"
import style from "./index.less?inline"

import './app-header'
import './app-footer'
import './app-piano'

@customElement({ tag: "my-app", style })
class MyApp extends QuarkElement {
  render() {
    return (
      <div class="app">
      <app-header />
      <app-piano />
      <app-footer />
    </div>
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-app": MyApp
  }
}
