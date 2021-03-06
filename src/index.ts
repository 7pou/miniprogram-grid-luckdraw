/*
 * @Author: zhao - ð
 * @Date: 2020-03-15 22:48:39
 * @LastEditTime: 2022-03-16 02:21:45
 * @LastEditors: zhao - ð
 * @Description:
 * @FilePath: /miniprogram-grid-luckdraw/src/index.ts
 */

const grid = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
]
Component({
  properties: {
    list: {type: Array, value: []},
    gridItemGap: {type: Number, value: 10, observer() { this.parseGridStyle() }},
    gridItemWidth: {type: Number, value: 140, observer() { this.parseGridStyle() }},
    gridItemHeight: {type: Number, value: 130, observer() { this.parseGridStyle() }},
    animated: {type: Boolean, value: false}, // å è½½å¨ç» (æä¸æ¯æ)
    speed: {type: Number, value: 100}, // è¿è¡éåº¦(speed ç§/æ¬¡)
    minRunCount: {type: Number, value: 30}, // æå°è¿è¡æ¬¡æ°
    diminishingCount: {type: Number, value: 25}, // å¼å§åéçæ¶æº (å½è¿è¡å¤å°æ¬¡åå¼å§åé)
    deceleration: {type: Number, value: 60}, // æ¯æ¬¡è¿è¡å¢å¤§é´éæ¶é´ (ç§/æ¬¡)
    uniqueKey: {type: String, value: 'id'}, // å¯ä¸key
    imageSrcKey: {type: String, value: 'src'}, // å¥åå¾çå­æ®µå
    activeStyle: {type: String, value: 'background-color: rgba(255, 249, 70, 0.7);border-radius: 20rpx;'} // å½åéä¸­çæ ·å¼
  },
  data: {
    created: false,
    currentLuckIndex: null,
    gridStyleList: [],
    gridStyleSlot: ''
  },
  ready() {
    this.parseGridStyle()
  },
  methods: {
    setup<T>(res: T): Promise<T> {
      return this.run(res).then(() => res)
    },
    run<T>(res:T, count = 0, rootResolve, initSpeed) {
      // è¿è¡ä¸­ä¸åè®¸åæ¬¡è°ç¨
      if (this.running === true && count === 0) return Promise.reject(new Error('running..'))

      this.running = true


      return new Promise((resolve) => {
        rootResolve = rootResolve || resolve
        const {
          speed, minRunCount, list,
          diminishingCount, uniqueKey, currentLuckIndex,
          deceleration
        } = this.data
        initSpeed = initSpeed || speed // åå§è¿è¡éåº¦é´é

        const currentLucky = list[currentLuckIndex] // å½åéä¸­çå¥é¡¹

        if (count >= minRunCount && currentLucky && currentLucky[uniqueKey] === res[uniqueKey]) {
          this.running = false
          return rootResolve(currentLucky)
        }

        // å½è¿è¡å°éè¦åéçæ¬¡æ°æ¶, å¹¶ä¸è¿è¡é´éå°äº1000ms æ¶,å¢å¤§è¿è¡é´é
        if (count >= diminishingCount && initSpeed < 1000) {
          initSpeed += (count - diminishingCount) * deceleration
        }


        this.setData({currentLuckIndex: count % list.length})
        console.log(initSpeed)
        setTimeout(() => {
          this.run(res, count + 1, rootResolve, initSpeed)
        }, initSpeed)
        return null
      })
    },
    parseGridStyle() {
      const gridStyleList = []
      const {gridItemHeight, gridItemWidth, gridItemGap} = this.data
      const styles = [
        `width: ${gridItemWidth}rpx`,
        `height: ${gridItemHeight}rpx`,
        `top: ${gridItemHeight + gridItemGap + gridItemGap}rpx`,
        `left: ${gridItemWidth + gridItemGap + gridItemGap}rpx`,
      ]
      this.setData({gridStyleSlot: styles.join(';')})
      for (let i = 0; i < grid.length; i++) {
        const x = grid[i][0]
        const y = grid[i][1]
        const trans = `transform: translate(${(gridItemWidth + gridItemGap) * x}rpx, ${(gridItemHeight + gridItemGap) * y}rpx);`

        gridStyleList.push([...styles, trans].join(';'))
      }
      this.setData({gridStyleList})
    }
  }

})
