
# miniprogram-grid-luckdraw

# 小程序九宫格抽奖动画组件

* 支持布局调整
* 带有完整实例代码
* 调用简单, 与业务解耦(只有一个方法)

## 使用

1. 安装

```
npm install --save miniprogram-grid-luckdraw
```

2. 在需要使用 luckdraw 的页面 page.json 中添加 luckdraw 自定义组件配置

```
{
  "usingComponents": {
    "GridLuckdraw": "miniprogram-grid-luckdraw"
  }
}
```

3. 在wxml文件 挂载 luckdraw 组件,并声明id

```
const prizeList = [
  {id:1, name: '西瓜'},
  {id:2, name: '苹果'},
  {id:3, name: '香蕉'},
  {id:4, name: '橙子'},
  {id:5, name: '葡萄'},
  {id:6, name: '梨子'},
  {id:7, name: '哈密瓜'},
  {id:8, name: '草莓'},
]
<GridLuckdraw list="{{ prizeList }}" id="GridLuckdrawRef" />
```

4. 在js文件中调用

```

const id = 1 // 抽奖接口返回的奖品ID
this.selectComponent('#GridLuckdrawRef').setup({ id }).then(() => {
  wx.showToast({ title: '抽中了' })
})
```

## 参数说明

| 参数          | 类型           | 是否必填 | 默认值    | 说明                    |
| ------------  | ------------- | ------ | -------- | ----------------------------  |
| list          |  array        | 是     | []     | 奖品列表                          |
| uniqueKey     | string        | 否     | 'id'   | 唯一key                           |
| imageSrcKey   | string        | 否     | 'src'  | 奖品图片字段名                      |
| imageRadius   | number        | 否     | 0      | 奖品图片圆角                     |
| prizeNameKey   | string       | 否     | 'name' | 奖品图片圆角                     |
| prizeNameStyle | string       | 否     | ''     | 奖品图片圆角                     |
| imageRadius   | number        | 否     | 0      | 奖品图片圆角                     |
| gridItemGap   | number        | 否     | 10     | 奖品布局间隙                      |
| gridItemWidth | number        | 否     | 140    | 奖品宽度                          |
| gridItemHeight| number        | 否     | 130    | 奖品高度                          |
| animated      | boolean       | 否     | false  | 加载动画 (暂不支持)                |
| speed         | number        | 否     | 100    | 运行速度(speed 秒/次)              |
| minRunCount   | number        | 否     | 30     | 最小运行次数                        |
| diminishingCount| number      | 否     | 25     | 开始减速的时机 (当运行多少次后开始减速) |
| deceleration  | string        | 否     | 60     | 每次运行增大间隔时间 (秒/次)          |
| activeStyle   | string        | 否     | 'background-color: rgba(255, 249, 70, 0.7);border-radius: 20rpx;'  | 抽奖动画选中样式                      |
