//
//  Created by Siddhartha Sarkar
//  @description This is the Funtional version of the `Demo.js`

import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, SafeAreaView } from 'react-native'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import Cell from './Cell'
import testData from './data'

export default function DemoFC() {
  const [dataList, setDataList] = useState([]);
  const [refreshState, setRefreshState] = useState(RefreshState.Idle);

  useEffect(() => {
    onHeaderRefresh();
  }, []);

  const onHeaderRefresh = () => {
    setRefreshState(RefreshState.HeaderRefreshing);

    // 模拟网络请求
    setTimeout(() => {
      // 模拟网络加载失败的情况
      if (Math.random() < 0.2) {
        setRefreshState(RefreshState.Failure);
        return;
      }

      //获取测试数据
      const dataList = getTestList(true);

      setDataList(dataList);
      setRefreshState(
        dataList.length < 1 ? RefreshState.EmptyData : RefreshState.Idle
      );
    }, 2000);
  };

  const onFooterRefresh = () => {
    setRefreshState(RefreshState.FooterRefreshing);

    // 模拟网络请求
    setTimeout(() => {
      // 模拟网络加载失败的情况
      if (Math.random() < 0.2) {
        setRefreshState(RefreshState.Failure);
        return;
      }

      //获取测试数据
      const dataList = getTestList(false);

      setDataList(dataList);
      setRefreshState(
        dataList.length > 50 ? RefreshState.NoMoreData : RefreshState.Idle
      );
    }, 2000);
  };

  // 获取测试数据
  const getTestList = (isReload: boolean): object[] => {
    const newList = testData.map((data) => {
      return {
        imageUrl: data.squareimgurl,
        title: data.mname,
        subtitle: `[${data.range}]${data.title}`,
        price: data.price,
      };
    });
    return isReload
      ? Math.random() < 0.2
        ? []
        : newList
      : [...dataList, ...newList];
  };

  const keyExtractor = (item: any, index: number) => {
    return index.toString();
  };

  const renderCell = (info: any) => {
    return <Cell info={info.item} />;
  };

  console.log("render scene");

  return (
    <SafeAreaView style={styles.container}>
      <RefreshListView
        data={dataList}
        keyExtractor={keyExtractor}
        renderItem={renderCell}
        refreshState={refreshState}
        onHeaderRefresh={onHeaderRefresh}
        onFooterRefresh={onFooterRefresh}

        // 可选
        footerRefreshingText="玩命加载中 >.<"
        footerFailureText="我擦嘞，居然失败了 =.=!"
        footerNoMoreDataText="-我是有底线的-"
        footerEmptyDataText="-好像什么东西都没有-"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    height: 84,
    textAlign: "center",
  },
});
