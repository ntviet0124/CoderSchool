import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const CHOICES = [
  {
    name: 'rock',
    uri: 'http://pngimg.com/uploads/stone/stone_PNG13622.png'
  },
  {
    name: 'paper',
    uri: 'https://www.stickpng.com/assets/images/5887c26cbc2fc2ef3a186046.png'
  },
  {
    name: 'scissors',
    uri: 'http://pluspng.com/img-png/png-hairdressing-scissors-beauty-salon-scissors-clipart-4704.png'
  }
];

const Button = props => (
  <TouchableOpacity
    style={styles.buttonStyle}
    onPress={() => props.onPress(props.name)}
  >
    <Text style={styles.buttonText}>
      {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
    </Text>
  </TouchableOpacity>
);

const Resutl = props => {
  return(
    <View style={{flex: 1, flexDirection: 'row'}}>
      <Text style={[styles.statisTitle, {flex: 0.4}]}>{props.title}</Text>
      <Text style={{flex: 0.2, fontSize: 18}}>{props.count}</Text>
      <Text style={{flex: 0.4, fontSize: 18}}>{props.percent != '' ? `${props.percent}%` : '%'}</Text>
    </View>
  );
}

const ChoiceCard = ({ player, choice: { uri, name } }) => {
  const title = name && name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <View style={styles.choiceContainer}>
      <Text style={styles.choiceDescription}>{player}</Text>
      <Image source={{ uri: uri }} resizeMode="contain" style={styles.choiceImage} />
      <Text style={styles.choiceCardTitle}>{title}</Text>
    </View>
  );
};

const getRoundOutcome = userChoice => {
  const computerChoice = randomComputerChoice().name;
  let result;

  if (userChoice === 'rock') {
    result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';
  }
  if (userChoice === 'paper') {
    result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
  }
  if (userChoice === 'scissors') {
    result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
  }

  if (userChoice === computerChoice) result = 'Tie game!';
  return [result, computerChoice];
};

const randomComputerChoice = () => CHOICES[Math.floor(Math.random() * CHOICES.length)];

export default function App() {

  // React hook way
  const [gamePrompt, setGamePrompt] = useState('Fire!');
  const [userChoice, setUserChoice] = useState({});
  const [computerChoice, setComputerChoice] = useState({});
  const [countWin, setCountWin] = useState(0);
  const [countLose, setCountLose] = useState(0);
  const [countTie, setCountTie] = useState(0);
  const [countRound, setCountRound] = useState(0);

  const getResultColor = () => {
    if (gamePrompt === 'Victory!') return 'green';
    if (gamePrompt === 'Defeat!') return 'red';
    return null;
  };
  
  const onPress = playerChoice => {

    const [result, compChoice] = getRoundOutcome(playerChoice);
  
    const newUserChoice = CHOICES.find(choice => choice.name === playerChoice);
    const newComputerChoice = CHOICES.find(choice => choice.name === compChoice);
  
    setGamePrompt(result);
    setUserChoice(newUserChoice);
    setComputerChoice(newComputerChoice);

    if (result === 'Victory!') {
      setCountWin(countWin + 1);
    } else if (result === 'Defeat!') {
      setCountLose(countLose + 1);
    } else {
      setCountTie(countTie + 1);
    }
    setCountRound(countRound + 1)
  };

  const setPercentages = count => {
    return (countRound != 0) ? Math.floor(count/countRound*10000)/100 : 0;
  }

  const resetGame = () => {
    setCountWin(0);
    setCountLose(0);
    setCountTie(0);
    setCountRound(0);
    setUserChoice({});
    setComputerChoice({});
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 35, color: getResultColor() }}>{gamePrompt}</Text>
      <View style={styles.choicesContainer}>
        <ChoiceCard player="Player" choice={userChoice} />
        <Text style={{ color: '#250902', fontSize: 25, fontWeight: '600' }}>vs</Text>
        <ChoiceCard player="Computer" choice={computerChoice} />
      </View>
      <View style={styles.wrapControl}>
        <View style={styles.btnControl}>
          {
            CHOICES.map(choice => {
              return <Button key={choice.name} name={choice.name} onPress={onPress} />;
            })
          }
        </View>
        <View style={styles.statistical}>
          <View style={{ flex: 1, marginTop: 5 }}>
            <Resutl title="Round" count={countRound} percent="" />
            <Resutl title="Win" count={countWin} percent={setPercentages(countWin)} />
            <Resutl title="Lose" count={countLose} percent={setPercentages(countLose)} />
            <Resutl title="Tie" count={countTie} percent={setPercentages(countTie)} />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
            <TouchableOpacity
              style={[styles.buttonStyle, {backgroundColor: '#00bf00'}]}
              onPress={resetGame}
            >
              <Text style={styles.buttonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ebee'
  },
  buttonStyle: {
    width: '100%',
    marginVertical: 5,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#640D14',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  choicesContainer: {
    margin: 10,
    borderWidth: 2,
    paddingTop: 100,
    shadowRadius: 5,
    paddingBottom: 100,
    borderColor: 'grey',
    shadowOpacity: 0.90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
  },
  choiceContainer: {
    flex: 1,
    alignItems: 'center',
  },
  choiceDescription: {
    fontSize: 25,
    color: '#250902',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  choiceCardTitle: {
    fontSize: 30,
    color: '#250902'
  },
  choiceImage: {
    width: 150,
    height: 150,
    padding: 10,
  },
  wrapControl: {
    display: 'flex',
    flexDirection: 'row',
  },
  btnControl: {
    flex: 1,
    padding: 10,
  },
  statistical: {
    flex: 1,
    padding: 10,
  },
  statisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#250902',
  }
});
