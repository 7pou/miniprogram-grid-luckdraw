/*
 * @Author: zhao - π
 * @Date: 2020-06-16 21:36:10
 * @LastEditTime: 2022-03-16 01:10:20
 * @LastEditors: zhao - π
 * @Description:
 * @FilePath: /miniprogram-grid-luckdraw/tools/demo/pages/index/index.js
 */
Page({
  data: {
    prizeList: []
  },
  onLoad() {
    this.postPrizeList().then(prizeList => {
      this.setData({prizeList})
    }).catch((err) => {
      console.log(err)
    })
  },
  postPrizeList() {
    const prizeList = [
      {id: 1, name: 'ε₯ε-1', src: '/assets/prize-1.png'},
      {id: 2, name: 'ε₯ε-2', src: '/assets/prize-1.png'},
      {id: 3, name: 'ε₯ε-3', src: '/assets/prize-1.png'},
      {id: 4, name: 'ε₯ε-4', src: '/assets/prize-1.png'},
      {id: 5, name: 'ε₯ε-5', src: '/assets/prize-1.png'},
      {id: 6, name: 'ε₯ε-6', src: '/assets/prize-1.png'},
      {id: 7, name: 'ε₯ε-7', src: '/assets/prize-1.png'},
      {id: 8, name: 'ε₯ε-8', src: '/assets/prize-1.png'},
    ]
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(prizeList)
      }, 1000)
    })
  },
  postLottery() {
    return new Promise((resolve) => {
      const randomId = Math.ceil(Math.random() * 8)
      const res = {id: randomId}
      setTimeout(() => {
        resolve(res)
      }, 1000)
    })
  },
  handleLottery() {
    this.postLottery().then(res => this.selectComponent('#GridLuckdrawRef').setup(res)).then((res) => {
      wx.showModal({
        title: 'ζη€Ί',
        content: 'ζ­εζ¨ζ½δΈ­' + res.id,
      })
    }).catch(() => {

    })
  },
  handleNavCustomPage() {
    wx.navigateTo({
      url: '/pages/custom/custom'
    })
  }
})
