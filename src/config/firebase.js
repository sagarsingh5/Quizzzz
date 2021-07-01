import firestore from '@react-native-firebase/firestore';

export const questions = firestore().collection('Questions');
