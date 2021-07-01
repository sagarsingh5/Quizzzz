import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  YellowBox,
} from 'react-native';
import {useSelector} from 'react-redux';

export default function OptionsContainer({
  data,
  handlePress,
  shuffle,
  showIcon,
  submitScreen,
}) {
  const [item, setItem] = useState([]);
  useEffect(() => {
    setItem(shuffleOption(data));
  }, []);
  // function getRandomColor() {
  //   var hex = Math.floor(Math.random() * 0xffffff);
  //   return '#' + ('000000' + hex.toString(16)).substr(-6);
  // }
  //   console.log();
  //   const [choosen, setChoosen] = useState(null)
  const shuffleOption = array => {
    if (shuffle) {
      let i = array.length - 1;
      for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    } else {
      return array;
    }
  };

  //   console.log(item.id);
  const choice = useSelector(state => state);

  const ifExists = i => {
    if (choice) {
      if (choice.choice.filter(item => item.id === i.id).length > 0) {
        return true;
      }
    }
    return false;
  };
  const getBackground = item => {
    if (ifExists(item)) {
      if (submitScreen) {
        if (item.correct) {
          return 'green';
        } else {
          return 'red';
        }
      } else {
        return 'green';
      }
    }
    return '#fff';
  };
  return (
    <View style={styles.options}>
      <FlatList
        data={item}
        keyExtractor={data => data.id.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => (handlePress ? handlePress(data, item) : null)}
            style={[
              styles.option,
              // {backgroundColor: item.correct ? 'yellow' : 'blue'},
              {backgroundColor: getBackground(item)},
            ]}>
            <Text style={[styles.optionText]}>
              {index + 1}) {item.data}
            </Text>
            {/* {item.correct & showIcon && <Text>correct</Text>} */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  options: {
    flex: 1,
    backgroundColor: '#000',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  option: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 35,
  },
  optionText: {
    // color: '#fff',
    fontSize: 16,
  },
});
