/*
 * @Author: zhao - ð
 * @Date: 2020-06-16 21:36:10
 * @LastEditTime: 2022-03-16 02:02:02
 * @LastEditors: zhao - ð
 * @Description:
 * @FilePath: /miniprogram-grid-luckdraw/tools/demo/pages/custom/custom.js
 */
Page({
  data: {
    prizeList: [],

    gridItemGap: 10, // å¥åå¸å±é´é
    gridItemWidth: 140,
    gridItemHeight: 130,
    speed: 100, // è¿è¡éåº¦(speed ç§/æ¬¡)
    minRunCount: 30, // æå°è¿è¡æ¬¡æ°
    diminishingCount: 25, // å¼å§åéçæ¶æº (å½è¿è¡å¤å°æ¬¡åå¼å§åé)
    deceleration: 60, // æ¯æ¬¡è¿è¡å¢å¤§é´éæ¶é´ (ç§/æ¬¡)
    uniqueKey: 'id', // å¯ä¸key
    imageSrcKey: 'prizeImageSrc' // å¥åå¾çå­æ®µå
  },
  onLoad() {
    this.postPrizeList().then(prizeList => {
      this.setData({prizeList})
    }).catch(() => {

    })
  },
  postPrizeList() {
    const prizeList = [
      {id: 1, prizeImageSrc: '/assets/prize-1.png'},
      {id: 2, prizeImageSrc: '/assets/prize-1.png'},
      {id: 3, prizeImageSrc: '/assets/prize-1.png'},
      {id: 4, prizeImageSrc: '/assets/prize-1.png'},
      {id: 5, prizeImageSrc: '/assets/prize-1.png'},
      {id: 6, prizeImageSrc: '/assets/prize-1.png'},
      {id: 7, prizeImageSrc: '/assets/prize-1.png'},
      {id: 8, prizeImageSrc: '/assets/prize-1.png'},
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
        title: 'æç¤º',
        content: 'æ­åæ¨æ½ä¸­' + res.id,
      })
    }).catch(() => {

    })
  }
})
