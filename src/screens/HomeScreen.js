import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getData, removeChoice} from '../redux/actions';
import {questions} from '../config/firebase';
// import {data} from '../config/data';

export default function HomeScreen({navigation: {navigate}}) {
  const [user, setUser] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const data = useSelector(state => state.data);
  const fetchData = async () => {
    const item = [];
    await questions.onSnapshot(query => {
      query.forEach(doc => {
        item.push({...doc.data(), id: doc.id});
        dispatch(getData(item));
      });
    });
  };
  useEffect(() => {
    choice.map(item => dispatch(removeChoice(item)));
    fetchData();
  }, []);
  const choice = useSelector(state => state.choice);
  const dispatch = useDispatch();
  const handlePress = () => {
    if (user.length < 4) {
      setErrorMessage('User should be atleast 4 alphabet');
    } else {
      navigate('Quiz');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Quizz</Text>
      <View style={styles.textInput}>
        <TextInput
          placeholder="Name of team or individual"
          // style={{color: '#FFF'}}
          placeholderTextColor="#fff"
          onChangeText={e => setUser(e)}
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handlePress}>
          Start Quiz
        </Text>
      </TouchableOpacity>
      {errorMessage.length > 0 && (
        <Text style={{color: 'red'}}>{errorMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {backgroundColor: 'red', padding: 10},
  buttonText: {fontSize: 20, color: '#fff'},
  text: {
    fontSize: 30,
    marginBottom: 50,
    color: '#fff',
  },
  textInput: {
    backgroundColor: '#a9a9a9',
    padding: 5,
    borderRadius: 50,
    width: '100%',
    marginVertical: 40,
  },
});
