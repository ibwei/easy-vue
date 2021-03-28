import Vue from './@vue/vue'
const vm = new Vue({
  el: '#app',
  data: {
    person: {
      name: 'ibaiwei',
      age: 26,
      fav: 'game'
    },
    msg: '欢迎来学习呀！',
    htmlStr: '<h2>点击我切换图片</h2>'
  },
  methods: {
    callName() {
      console.log(this.person)
      this.$data.htmlStr = `<img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2929098685,222241871&fm=26&gp=0.jpg" alt="hahahh"/>`
      this.$data.msg = '1111'
    }
  }
})
