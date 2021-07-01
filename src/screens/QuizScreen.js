import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import OptionsContainer from '../components/OptionsContainer';
// import {data} from '../config/data';
import {addChoice, addPoints, removeChoice, subsPoints} from '../redux/actions';

export default function QuizScreen({navigation: {navigate}}) {
  //   const option = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
  // console.log(currentIndex);
  const [currentIndex, setCurrentIndex] = useState(0);
  // useEffect(() => {
  //   choice.map(item => dispatch(removeChoice(item)));
  // }, []);
  const data = useSelector(state => state.data);

  const [item, setItem] = useState([]);
  useEffect(() => {
    setItem(shuffleOption(data));
  }, []);
  useEffect(() => {
    const backAction = () => {
      // if (currentIndex === 0) {
      console.log(currentIndex, 'back');
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
      // } else {
      //   console.log(currentIndex, 'increased back');

      //   setTimeout(() => {
      //     try {
      //       slider.current.scrollToIndex({
      //         index: currentIndex - 1,
      //       });
      //       // console.log(choice);
      //       setCurrentIndex(currentIndex - 1);
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   }, 500);

      //   return true;
      // }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const [timer, setTimer] = useState(60);
  const dispatch = useDispatch();
  //   const Currentchoice = useSelector(state => state.choice);
  const slider = useRef(null);
  //   const choice = useSelector(state => state.choice);
  const choice = useSelector(state => state.choice);
  // console.log(currentIndex);
  const scrollToNext = () => {
    setTimeout(() => {
      try {
        slider.current.scrollToIndex({
          index: currentIndex + 1,
        });
        // console.log(choice);
      } catch (error) {
        console.log(error);
      }
    }, 500);
    setCurrentIndex(currentIndex + 1);
  };
  const scrollToPrev = () => {
    setTimeout(() => {
      try {
        slider.current.scrollToIndex({
          index: currentIndex - 1,
        });
      } catch (error) {
        console.log(error);
      }
    }, 500);
    setCurrentIndex(currentIndex - 1);
  };
  const shuffleOption = array => {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };
  const handlePress = (options, choice) => {
    options.map(item => dispatch(removeChoice(item)));
    dispatch(addChoice(choice));
    // dispatch(subsPoints());
  };
  const handleSubmit = () => {
    Alert.alert('Hold on!', 'Are you sure you want to Submit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => navigate('SubmitScreen')},
    ]);
  };

  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     setTimer(lastTimerCount => {
  //       lastTimerCount <= 1 && clearInterval(interval);
  //       return lastTimerCount - 1;
  //     });
  //     // if (timer === 0) Alert.alert('time Over');
  //   }, 1000); //each count lasts for a second
  //   //cleanup the interval on complete
  //   return () => clearInterval(interval);
  // }, []);
  // setTimeout(() => {
  //   Alert.alert('Over');
  //   setTimer(0);
  // }, 60000);
  const clearResponse = item => {
    item.map(i => dispatch(removeChoice(i)));
  };
  console.log(Dimensions.get('screen').height / 3.2);
  const ala =
    'data:image/jpeg;base64,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';
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Quizzz</Text>
        <Text>
          {currentIndex + 1}/{data.length}
        </Text>
        {/* <Text>{timer}</Text> */}
      </View>
      <FlatList
        ref={slider}
        data={item}
        keyExtractor={data => data.id.toString()}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        scrollEnabled={false}
        // onMomentumScrollEnd={() => console.log('Scroll')}
        // onScroll={() => console.log('scroll')}
        renderItem={({item, index}) => (
          <View style={styles.sheet}>
            <ScrollView style={styles.questionContainer}>
              <Text style={styles.question}>
                Q:{index + 1}) {item.question}
              </Text>
              <View style={styles.image}>
                <Image
                  style={{height: '100%', width: '100%'}}
                  source={{uri: ala}}
                />
              </View>
            </ScrollView>
            <Text
              onPress={() => clearResponse(item.options)}
              style={{color: '#fff', backgroundColor: 'blue'}}>
              clear Response
            </Text>

            <OptionsContainer
              handlePress={handlePress}
              data={item.options}
              shuffle
            />
          </View>
        )}
      />
      {choice.length === data.length && (
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={{
            position: 'absolute',
            bottom: 70,
            backgroundColor: 'red',
            padding: 15,
            alignSelf: 'center',
          }}>
          <Text>submit</Text>
        </TouchableOpacity>
      )}
      <View style={styles.footer}>
        {currentIndex !== 0 && (
          <TouchableOpacity
            onPress={() => scrollToPrev()}
            style={styles.button}>
            <Text>Prev</Text>
          </TouchableOpacity>
        )}
        {currentIndex !== data.length - 1 && (
          <TouchableOpacity
            onPress={() => scrollToNext()}
            style={[styles.button, {position: 'absolute', right: 0}]}>
            <Text>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 50,
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {color: '#fff', fontSize: 16},
  sheet: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  questionContainer: {
    backgroundColor: 'red',
    padding: 10,
    maxHeight: '30%',
  },
  image: {height: Dimensions.get('screen').height / 3.2, marginTop: 15},
  question: {
    color: '#fff',
    fontSize: 16,
  },
  options: {
    flex: 1,
    backgroundColor: '#000',
  },

  footer: {
    height: 50,
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    width: 70,
  },
});
