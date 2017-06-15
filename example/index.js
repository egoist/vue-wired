import Vue from 'vue'
import wired from '../src'

const App = {
  name: 'app',
  render() {
    console.log(this.pending)
    return (
      <div id="app">
        <p>
          {this.pending.good
            ? <strong>Loading good boy...</strong>
            : <h1 style="color:green">Good boy's name: {this.good.name}</h1>}
        </p>
        <p>
          {this.pending.bad
            ? <strong>Loading bad boy...</strong>
            : <h1 style="color: red">
                {this.rejected.bad ? this.rejected.bad.message : this.bad.name}
              </h1>}
        </p>
      </div>
    )
  }
}

const WiredApp = wired({
  good: () =>
    new Promise(resolve => setTimeout(() => resolve({ name: 'EGOIST' }), 1000)),
  bad: () => Promise.reject(new Error(`No name, cuz I'm bad`))
})(App)

new Vue({
  el: '#app',
  render: h => h(WiredApp)
})
