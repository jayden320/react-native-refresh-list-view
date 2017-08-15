//
//  Created by Liu Jinyong on 17/4/5.
//  Copyright © 2016年 Liu Jinyong. All rights reserved.
//
//  @flow
//  Github:
//  https://github.com/huanxsd/react-native-refresh-list-view

import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native'

export const RefreshState = {
    Idle: 0,
    HeaderRefreshing: 1,
    FooterRefreshing: 2,
    NoMoreData: 3,
    Failure: 4,
}

const debug = false

const footerRefreshingText = '数据加载中…'
const footerFailureText = '点击重新加载'
const footerNoMoreDataText = '已加载全部数据'

class RefreshListView extends PureComponent {

    props: {
        refreshState: number,
        onHeaderRefresh: (refreshState: number) => void,
        onFooterRefresh: (refreshState: number) => void,
        data: Array<any>,
    }

    componentWillReceiveProps(nextProps) {
        console.log('RefreshListView componentWillReceiveProps ' + JSON.stringify(nextProps))
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('RefreshListView componentDidUpdate ' + JSON.stringify(prevProps) + '     state: ' + JSON.stringify(prevState))
    }

    onHeaderRefresh() {
        debug && console.log('onHeaderRefresh')

        if (this.shouldStartHeaderRefreshing()) {
            this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
        }
    }

    onEndReached(info: any) {
        debug && console.log('onEndReached   ' + info.distanceFromEnd)

        if (this.shouldStartFooterRefreshing()) {
            this.props.onFooterRefresh(RefreshState.FooterRefreshing)
        }
    }

    shouldStartHeaderRefreshing() {
        debug && console.log('shouldStartHeaderRefreshing')

        if (this.props.refreshState == RefreshState.HeaderRefreshing ||
            this.props.refreshState == RefreshState.FooterRefreshing) {
            return false
        }

        return true
    }

    shouldStartFooterRefreshing(): boolean {
        debug && console.log('shouldStartFooterRefreshing')

        let {refreshState, data} = this.props
        if (data.length == 0) {
            return false
        }

        return (refreshState == RefreshState.Idle)
    }

    render() {
        return (
            <FlatList
                onEndReachedThreshold={0.3}
                onEndReached={(info) => this.onEndReached(info)}
                onRefresh={() => this.onHeaderRefresh()}
                refreshing={this.props.refreshState == RefreshState.HeaderRefreshing}
                ListFooterComponent={() => this.renderFooter()}
                {...this.props}
            />
        )
    }

    renderFooter() {
        let footer = null

        switch (this.props.refreshState) {
            case RefreshState.Idle:
                footer = (<View style={styles.footerContainer} />)
                break
            case RefreshState.Failure: {
                footer = (
                    <TouchableOpacity
                        style={styles.footerContainer}
                        onPress={() => {
                            this.props.onFooterRefresh(RefreshState.FooterRefreshing)
                        }}
                    >
                        <Text style={styles.footerText}>{footerFailureText}</Text>
                    </TouchableOpacity>
                )
                break
            }
            case RefreshState.FooterRefreshing: {
                footer = (
                    <View style={styles.footerContainer} >
                        <ActivityIndicator size="small" color="#888888" />
                        <Text style={[styles.footerText, {marginLeft: 7}]}>{footerRefreshingText}</Text>
                    </View>
                )
                break
            }
            case RefreshState.NoMoreData: {
                footer = (
                    <View style={styles.footerContainer} >
                        <Text style={styles.footerText}>{footerNoMoreDataText}</Text>
                    </View>
                )
                break
            }
        }

        return footer
    }

}

const styles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 44,
    },
    footerText: {
        fontSize: 14,
        color: '#555555'
    }
})

export default RefreshListView