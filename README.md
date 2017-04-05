# react-native-refresh-list-view
一个简单实现的列表下拉、上拉刷新控件

初学react native，做了一个简单的列表下拉、上拉刷新控件

控件代码一共100多行

## 使用

```` javascript
// render
<RefreshListView
    ref='listView'
    dataSource={this.state.dataSource}
    renderRow={(rowData) => <Text style={styles.title}>{rowData}</Text>}
    onHeaderRefresh={() => this.requestListWithReload(true)}
    onFooterRefresh={() => this.requestListWithReload(false)}
/>

// 开始下拉刷新
this.refs.listView.startHeaderRefreshing()

// 加载成功
this.refs.listView.endRefreshing(RefreshState.Idle)

// 加载失败
this.refs.listView.endRefreshing(RefreshState.Failure)

// 加载全部数据
this.refs.listView.endRefreshing(RefreshState.NoMoreData)

````

## 截图

<img src="https://github.com/huanxsd/react-native-refresh-list-view/blob/master/screen_shot/1.png" alt="1" title="1">
<img src="https://github.com/huanxsd/react-native-refresh-list-view/blob/master/screen_shot/2.png" alt="2" title="2">
<img src="https://github.com/huanxsd/react-native-refresh-list-view/blob/master/screen_shot/3.png" alt="3" title="3">

## 最后

如果喜欢，请顺手我一个star吧~  ：）
