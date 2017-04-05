//
//  Created by Liu Jinyong on 17/4/5.
//  Copyright © 2016年 Liu Jinyong. All rights reserved.
//
//  Github:
//  https://github.com/huanxsd/react-native-refresh-list-view

//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';

import RefreshListView, { RefreshState } from './RefreshListView'

// create a component
class App extends Component {

    constructor(props) {
        super(props)
        
        this.dataList = [];

        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            page: 0,
        }
    }

    componentDidMount() {
        this.refs.listView.startHeaderRefreshing()
    }

    //isReload 如果是下拉刷新，则isReload为true。如果是上拉翻页，则isReload为false
    requestListWithReload(isReload: boolean) {
        let page = isReload ? 0 : this.state.page + 1

        setTimeout(() => {
            // 测试网络加载失败的情况
            if (Math.random() < 0.3) {
                this.refs.listView.endRefreshing(RefreshState.Failure)
                alert('加载失败')
                return;
            }

            let items = []
            for (let i = 0; i < 20; i++) {
                items.push(i + page * 20)
            }
            if (isReload) {
                this.dataList = items
            } else {
                this.dataList.push(...items)
            }

            this.setState({
                page: page,
                dataSource: this.state.dataSource.cloneWithRows(this.dataList)
            })

            let footerState = RefreshState.Idle

             //测试加载全部数据的情况
            if (this.dataList.length > 50) {
                footerState = RefreshState.NoMoreData
            }
            // alert('fuck ' + footerState + ' count ' + this.dataList.length)

            this.refs.listView.endRefreshing(footerState)
        }, 1000);
    }

    render() {
        return (
            <View style={styles.container}>
                <RefreshListView
                    ref='listView'
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text style={styles.title}>{rowData}</Text>}
                    onHeaderRefresh={() => this.requestListWithReload(true)}
                    onFooterRefresh={() => this.requestListWithReload(false)}
                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    title: {
        fontSize: 18,
        height: 44,
        textAlign: 'center'
    }
});

//make this component available to the app
export default App;
