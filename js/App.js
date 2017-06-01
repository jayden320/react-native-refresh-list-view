//
//  Created by Liu Jinyong on 17/4/5.
//  Copyright © 2016年 Liu Jinyong. All rights reserved.
//
//  @flow
//  Github:
//  https://github.com/huanxsd/react-native-refresh-list-view

//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import RefreshListView, { RefreshState } from './RefreshListView'

// create a component
class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            dataList: [],
            page: 0,
        }

        { (this: any).keyExtractor = this.keyExtractor.bind(this) }
        { (this: any).renderCell = this.renderCell.bind(this) }
    }

    componentDidMount() {
        this.refs.listView.startHeaderRefreshing()
        // this.setState({ refreshing: true })
        // this.requestListWithReload(true)
    }

    //isReload 如果是下拉刷新，则isReload为true。如果是上拉翻页，则isReload为false
    requestListWithReload(isReload: boolean) {
        // this.setState({ refreshing: true })

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
                items.push({ title: i + page * 20 })
            }
            let dataList = isReload ? items : [...this.state.dataList, ...items]

            this.setState({
                page: page,
                dataList: dataList,
            })

            let footerState = RefreshState.Idle

            //测试加载全部数据的情况
            if (dataList.length > 50) {
                footerState = RefreshState.NoMoreData
            }

            this.refs.listView.endRefreshing(footerState)
        }, 1000);
    }

    keyExtractor(item: any, index: number) {
        return item.title
    }

    renderCell(info: Object) {
        return <Text style={styles.title}>{info.item.title}</Text>
    }

    render() {
        console.log('App render')
        return (
            <View style={styles.container}>
                {
                    <RefreshListView
                        ref='listView'
                        data={this.state.dataList}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderCell}
                        onHeaderRefresh={() => this.requestListWithReload(true)}
                        onFooterRefresh={() => this.requestListWithReload(false)}

                        // data={this.state.dataList}
                        // onRefresh={() => this.requestListWithReload(true)}
                        // refreshing={this.state.refreshing}
                        // ListFooterComponent={ListFooter}
                    />
                }
                {
                    // <FlatList
                    // data={this.state.dataList}
                    // keyExtractor={this.keyExtractor}
                    // onRefresh={() => this.requestListWithReload(true)}
                    // refreshing={this.state.refreshing}
                    // renderItem={this.renderCell}
                    // ListFooterComponent={ListFooter}
                    // />
                }
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
        height: 84,
        textAlign: 'center'
    }
});

//make this component available to the app
export default App;
