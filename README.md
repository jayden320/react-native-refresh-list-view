# react-native-refresh-list-view

Deprecated:后期在这个库中更新
https://github.com/huanxsd/react-native-jykit

初学react native，看到github上现有的相关控件实现都较为复杂，又不太符合自己心中想要的样子。于是自己花了一个小时做了一个简单的列表下拉、上拉刷新控件。列表使用的是FlatList。

控件的实现非常简单，代码一共100多行，方便各位根据自己的需求随意修改。如果有bug或建议，欢迎提issue。

## 运行Demo

### 第一步
```
npm npm install
```

### 第二步
```
react-native run-ios
```

## 使用

```` javascript
// render
<RefreshListView
    ref={(e) => this.listView = e}
    data={this.state.dataList}
    keyExtractor={this.keyExtractor}
    renderItem={this.renderCell}
    onHeaderRefresh={() => this.requestList(true)}
    onFooterRefresh={() => this.requestList(false)}
/>

// 开始下拉刷新
this.listView.startHeaderRefreshing()

// 加载成功
this.listView.endRefreshing(RefreshState.Idle)

// 加载失败
this.listView.endRefreshing(RefreshState.Failure)

// 加载全部数据
this.listView.endRefreshing(RefreshState.NoMoreData)

````

## 截图

<img src="https://github.com/huanxsd/react-native-refresh-list-view/blob/master/screen_shot/1.png" alt="1" title="1">
<img src="https://github.com/huanxsd/react-native-refresh-list-view/blob/master/screen_shot/2.png" alt="2" title="2">
<img src="https://github.com/huanxsd/react-native-refresh-list-view/blob/master/screen_shot/3.png" alt="3" title="3">

## 最后

如果喜欢，请顺手我一个star，非常感谢~  ：）
