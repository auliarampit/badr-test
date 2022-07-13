/* eslint-disable react-native/no-inline-styles */
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const App = () => {
  const [data, setData] = useState(null);
  const getData = () => {
    return fetch(
      'https://61ce6ff47067f600179c5e98.mockapi.io/v1/orders?page=1&limit=10',
    )
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <SafeAreaView style={styles.padding}>
        <Text style={styles.title}>Order List</Text>

        <FlatList
          keyExtractor={(_e, idx) => idx.toString()}
          data={data}
          renderItem={({item}) => {
            return (
              <View style={styles.container}>
                <View style={styles.rowSpaceBeetwen}>
                  <View style={styles.left}>
                    <Text style={[styles.text, {fontWeight: '500'}]}>
                      Order Id
                    </Text>
                    <Text style={[styles.text, {fontWeight: '700'}]}>
                      {item?.order_id}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.textStatus,
                      item?.status !== 'status 1' && {color: '#219653'},
                    ]}>
                    {item?.status === 'status 1' ? 'Shipped' : 'Completed'}
                  </Text>
                </View>

                <View style={styles.gap} />

                <View style={styles.rowSpaceBeetwen}>
                  <View style={styles.left}>
                    <Text style={styles.text}>Customer</Text>
                    <Text style={styles.text}>Qty/Package</Text>
                    <Text style={styles.text}>Total Item</Text>
                    <Text style={styles.text}>Order Date</Text>
                  </View>
                  <View style={styles.rigth}>
                    <Text style={styles.text}>{item?.name}</Text>
                    <Text style={styles.text}>{item?.quantity}</Text>
                    <Text style={styles.text}>{item?.total_item}</Text>
                    <Text style={styles.text}>
                      {item?.created_at?.slice(0, 10) +
                        ' ' +
                        item?.created_at?.slice(14, 19)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  padding: {
    padding: 16,
    marginBottom: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rowSpaceBeetwen: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  left: {
    flex: 1,
    justifyContent: 'center',
  },
  gap: {
    height: 2,
    backgroundColor: 'rgb(225, 225, 225)',
    width: '100%',
    marginVertical: 16,
  },
  rigth: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 1,
  },
  text: {
    fontSize: 13,
    color: '#4F4F4F',
    lineHeight: 25,
  },
  textStatus: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF7B00',
  },
});
