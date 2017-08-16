# react-native-refresh-list-view

初学react native，看到github上现有的相关控件实现都较为复杂，又不太符合自己心中想要的样子。于是自己做了一个简单的列表下拉、上拉刷新控件。列表使用的是FlatList。

控件的实现非常简单，代码一共100多行，方便各位根据自己的需求随意修改。如果有bug或建议，欢迎提issue。

## 截图

### 下拉刷新

<img src="https://github.com/huanxsd/react-native-refresh-list-view/blob/master/screen_shot/1.png" alt="1" title="1">

### 上拉翻页

<img src="https://github.com/huanxsd/react-native-refresh-list-view/blob/master/screen_shot/2.png" alt="2" title="2">

### 已加载全部数据

<img src="https://github.com/huanxsd/react-native-refresh-list-view/blob/master/screen_shot/3.png" alt="3" title="3">

## 安装

### NPM
```
npm install --save react-native-refresh-list-view
```

### 手动安装
下载源码，将RefreshListView.js拖入工程中


## 运行Demo

### 第一步
进入Example目录，执行：
```
npm install
```

### 第二步
```
react-native run-ios
```

## 接口

``` javascript
render() {
    return (
        <RefreshListView
            data={this.state.dataList}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCell}

            refreshState={this.state.refreshState}
            onHeaderRefresh={this.onHeaderRefresh}
            onFooterRefresh={this.onFooterRefresh}
        />
    )
}

// 下拉刷新
this.setState({refreshState: RefreshState.HeaderRefreshing})

// 上拉翻页
this.setState({refreshState: RefreshState.FooterRefreshing})

// 加载成功
this.setState({refreshState: RefreshState.Idle})

// 加载失败
this.setState({refreshState: RefreshState.Failure})

// 加载全部数据
this.setState({refreshState: RefreshState.NoMoreData})
```

## 常见问题
列表滑动过程中，可能会出现警告
Task orphaned for request <NSMutableURLRequest: [[SOME_HEX_CODE]]> { URL: [[IMG_URL]] }

具体错误见[官方issue](https://github.com/facebook/react-native/issues/12152)。
解决方案：使用图片缓存库[react-native-cached-image](https://github.com/kfiroo/react-native-cached-image)


## 最后

如果喜欢，请顺手我一个star，非常感谢~  ：）
