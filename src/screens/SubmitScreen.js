import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import OptionsContainer from '../components/OptionsContainer';
// import {data} from '../config/data';

export default function SubmitScreen() {
  const data = useSelector(state => state.data);
  const choice = useSelector(state => state.choice);
  const [correctOnes, setCorrectOnes] = useState([]);
  const [score, setScore] = useState(0);
  useEffect(() => {
    setScore(0);
    scoring();
    check();
  }, []);
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const scoring = () => {
    let score = 0;
    choice.map(item => {
      if (item.correct) {
        score++;
      }
    });
    setScore(score);
  };
  // console.log(correctOnes);
  const ListHeaderComponent = () => {
    return (
      <View style={styles.score}>
        <Text style={styles.scoreText}>
          {score}/{data.length}
        </Text>
      </View>
    );
  };
  const ifExists = i => {
    if (choice) {
      if (choice.filter(item => item.id === i.id).length > 0) {
        return false;
      }
    }
    return true;
  };
  const answer = item => {
    // return 'Hello';
    let data = '';
    item.map(obj => {
      if (obj.correct) {
        // console.log(obj.data, 'hhhhh');
        // const data = obj.id;
        data = obj.data;
      }
    });
    return data;
  };
  const check = () => {
    const correct = [];

    data.map(item =>
      item.options.map(obj => {
        if (obj.correct) {
          correct.push(obj);
        }
      }),
    );
    setCorrectOnes(correct);
  };
  const getDone = item => {
    item.map(it => log);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        ListHeaderComponent={ListHeaderComponent}
        keyExtractor={data => data.id.toString()}
        // bounces={false}
        ItemSeparatorComponent={() => {
          return <View style={{width: '100%', height: 10}} />;
        }}
        renderItem={({item, index}) => (
          <View style={styles.sheet}>
            <View style={styles.questionContainer}>
              <Text style={styles.question}>
                Q:{index + 1}) {item.question}
              </Text>
            </View>
            <OptionsContainer data={item.options} submitScreen />

            {1 > 0 && (
              <View style={styles.questionContainer}>
                <Text style={styles.question}>Correct Answer</Text>
                <View style={styles.correct}>
                  <Text>
                    {answer(item.options) ? answer(item.options) : 'undefined'}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  score: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 50,
  },
  scoreText: {
    fontSize: 40,
    color: '#fff',
  },
  questionContainer: {
    backgroundColor: '#1115',
    padding: 10,
  },
  question: {
    color: '#fff',
    fontSize: 16,
  },
  correct: {padding: 15, backgroundColor: 'green', borderRadius: 30},
});
