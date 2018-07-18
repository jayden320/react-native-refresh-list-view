//
//  Created by Liu Jinyong on 17/4/5.
//  Copyright © 2016年 Liu Jinyong. All rights reserved.
//
//  @flow
//  Github:
//  https://github.com/huanxsd/react-native-refresh-list-view

import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, ViewPropTypes} from 'react-native'

export const RefreshState = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
  EmptyData: 5,
}

const DEBUG = false
const log = (text: string) => {DEBUG && console.log(text)}

type Props = {
  refreshState: number,
  onHeaderRefresh: Function,
  onFooterRefresh?: Function,
  data: Array<any>,

  listRef?: any,

  footerRefreshingText?: string,
  footerFailureText?: string,
  footerNoMoreDataText?: string,
  footerEmptyDataText?: string,

  footerRefreshingComponent?: any,
  footerFailureComponent?: any,
  footerNoMoreDataComponent?: any,
  footerEmptyDataComponent?: any,

  renderItem: Function,
}

type State = {

}

class RefreshListView extends PureComponent<Props, State> {

  static defaultProps = {
    footerRefreshingText: '数据加载中…',
    footerFailureText: '点击重新加载',
    footerNoMoreDataText: '已加载全部数据',
    footerEmptyDataText: '暂时没有相关数据',
  }

  componentWillReceiveProps(nextProps: Props) {
    log('[RefreshListView]  RefreshListView componentWillReceiveProps ' + nextProps.refreshState)
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    log('[RefreshListView]  RefreshListView componentDidUpdate ' + prevProps.refreshState)
  }

  onHeaderRefresh = () => {
    log('[RefreshListView]  onHeaderRefresh')

    if (this.shouldStartHeaderRefreshing()) {
      log('[RefreshListView]  onHeaderRefresh')
      this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
    }
  }

  onEndReached = (info: {distanceFromEnd: number}) => {
    log('[RefreshListView]  onEndReached   ' + info.distanceFromEnd)

    if (this.shouldStartFooterRefreshing()) {
      log('[RefreshListView]  onFooterRefresh')
      this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
    }
  }

  shouldStartHeaderRefreshing = () => {
    log('[RefreshListView]  shouldStartHeaderRefreshing')

    if (this.props.refreshState == RefreshState.HeaderRefreshing ||
      this.props.refreshState == RefreshState.FooterRefreshing) {
      return false
    }

    return true
  }

  shouldStartFooterRefreshing = () => {
    log('[RefreshListView]  shouldStartFooterRefreshing')

    let {refreshState, data} = this.props
    if (data.length == 0) {
      return false
    }

    return (refreshState == RefreshState.Idle)
  }

  render() {
    log('[RefreshListView]  render  refreshState:' + this.props.refreshState)

    let {renderItem, ...rest} = this.props

    return (
      <FlatList
        ref={this.props.listRef}
        onEndReached={this.onEndReached}
        onRefresh={this.onHeaderRefresh}
        refreshing={this.props.refreshState == RefreshState.HeaderRefreshing}
        ListFooterComponent={this.renderFooter}
        onEndReachedThreshold={0.1}

        renderItem={renderItem}

        {...rest}
      />
    )
  }

  renderFooter = () => {
    let footer = null

    let {
      footerRefreshingText,
      footerFailureText,
      footerNoMoreDataText,
      footerEmptyDataText,

      footerRefreshingComponent,
      footerFailureComponent,
      footerNoMoreDataComponent,
      footerEmptyDataComponent,
    } = this.props

    switch (this.props.refreshState) {
      case RefreshState.Idle:
        footer = (<View style={styles.footerContainer} />)
        break
      case RefreshState.Failure: {
        footer = (
          <TouchableOpacity onPress={() => {
            if (this.props.data.length == 0) {
              this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
            } else {
              this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
            }
          }}
          >
            {footerFailureComponent ? footerFailureComponent : (
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>{footerFailureText}</Text>
              </View>
            )}
          </TouchableOpacity>
        )
        break
      }
      case RefreshState.EmptyData: {
        footer = (
          <TouchableOpacity onPress={() => {
            this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
          }}
          >
            {footerEmptyDataComponent ? footerEmptyDataComponent : (
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>{footerEmptyDataText}</Text>
              </View>
            )}
          </TouchableOpacity>
        )
        break
      }
      case RefreshState.FooterRefreshing: {
        footer = footerRefreshingComponent ? footerRefreshingComponent : (
          <View style={styles.footerContainer} >
            <ActivityIndicator size="small" color="#888888" />
            <Text style={[styles.footerText, {marginLeft: 7}]}>{footerRefreshingText}</Text>
          </View>
        )
        break
      }
      case RefreshState.NoMoreData: {
        footer = footerNoMoreDataComponent ? footerNoMoreDataComponent : (
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