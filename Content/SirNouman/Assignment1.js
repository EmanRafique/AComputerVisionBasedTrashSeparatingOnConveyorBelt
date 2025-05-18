import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const questions = [
    {
      question: '1+1=?',
      options: [
        {key: '1', value: '3'},
        {key: '2', value: '2'},
        {key: '3', value: '6'},
        {key: '4', value: '4'},
      ],
      correctAnswer: '2',
    },
    {
      question: '4+4=?',
      options: [
        {key: '1', value: '6'},
        {key: '2', value: '8'},
        {key: '3', value: '7'},
        {key: '4', value: '5'},
      ],
      correctAnswer: '8',
    },
    {
      question: '2+2=?',
      options: [
        {key: '1', value: '4'},
        {key: '2', value: '8'},
        {key: '3', value: '7'},
        {key: '4', value: '5'},
      ],
      correctAnswer: '4',
    },
    {
      question: '1*3=?',
      options: [
        {key: '1', value: '6'},
        {key: '2', value: '8'},
        {key: '3', value: '3'},
        {key: '4', value: '5'},
      ],
      correctAnswer: '3',
    },
    {
      question: '5+5=?',
      options: [
        {key: '1', value: '2'},
        {key: '2', value: '8'},
        {key: '3', value: '10'},
        {key: '4', value: '5'},
      ],
      correctAnswer: '10',
    },
    {
      question: '7+2=?',
      options: [
        {key: '1', value: '6'},
        {key: '2', value: '9'},
        {key: '3', value: '10'},
        {key: '4', value: '5'},
      ],
      correctAnswer: '9',
    },
    {
      question: '10+0=?',
      options: [
        {key: '1', value: '6'},
        {key: '2', value: '8'},
        {key: '3', value: '10'},
        {key: '4', value: '5'},
      ],
      correctAnswer: '10',
    },
    {
      question: '1+8=?',
      options: [
        {key: '1', value: '6'},
        {key: '2', value: '8'},
        {key: '3', value: '10'},
        {key: '4', value: '9'},
      ],
      correctAnswer: '9',
    },
    {
      question: '5+6=?',
      options: [
        {key: '1', value: '11'},
        {key: '2', value: '8'},
        {key: '3', value: '10'},
        {key: '4', value: '5'},
      ],
      correctAnswer: '11',
    },
    {
      question: '1+3+4=?',
      options: [
        {key: '1', value: '11'},
        {key: '2', value: '8'},
        {key: '3', value: '10'},
        {key: '4', value: '5'},
      ],
      correctAnswer: '8',
    },
  ];
  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(prevScore => prevScore + 10);
    }
    setSelectedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsQuizFinished(true);
    }
  };
  const handleFinish = () => {
    setIsQuizFinished(true);
  };
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setIsQuizFinished(false);
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: '#fff' }}>
      <View style={{ backgroundColor: 'orange', marginBottom: 10 }}>
        <Text style={{ textAlign: 'center', fontSize: 30, paddingBottom: 10, fontWeight: 'bold' }}>Quiz</Text>
      </View>

      {isQuizFinished ? (
        <View style={{ backgroundColor: '#a5d6a7', padding: 20, borderRadius: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Summary</Text>
          <Text>Total Questions: {questions.length}</Text>
          <Text>Total Correct Answers: {Math.floor(score / 10)}</Text>
          <Text>Total Score: {score}</Text>
          <TouchableOpacity
            style={{ backgroundColor: 'purple', padding: 15, borderRadius: 10, alignItems: 'center' }}
            onPress={resetQuiz}
          >
            <Text style={{ color: 'yellow', fontWeight: 'bold', fontSize: 16 }}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={{ backgroundColor: '#d3d3d3', padding: 15, borderRadius: 10, marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Question: {questions[currentQuestion].question}</Text>
          </View>

          <View style={{ backgroundColor: '#b3e5fc', padding: 15, borderRadius: 10, marginBottom: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Options:</Text>
            <RadioButton.Group
              onValueChange={value => setSelectedOption(value)}
              value={selectedOption}
            >
              {questions[currentQuestion].options.map(option => (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} key={option.key}>
                  <RadioButton value={option.value} />
                  <Text>{option.value}</Text>
                </View>
              ))}
            </RadioButton.Group>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: selectedOption ? 'purple' : 'grey',
              padding: 15,borderRadius: 10,alignItems: 'center',marginBottom: 10,}}
            onPress={currentQuestion < questions.length - 1 ? handleNextQuestion : handleFinish}
            disabled={!selectedOption}
          >
            <Text style={{ color: 'yellow', fontWeight: 'bold', fontSize: 16 }}>
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default QuizApp;