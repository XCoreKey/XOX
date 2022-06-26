import { useState } from "react";
import {Text, TouchableOpacity, Button} from "react-native";
import { Flex, HStack, VStack } from 'react-native-flex-layout';
import checkWinner from "./checkWinner";

function Box({ value, onPress, highlighted, disabled}) {
	return  (
	<TouchableOpacity disabled={disabled} onPress={onPress}>
	<Flex center w={96} h={96} style={{ backgroundColor:highlighted ? "tomato" : "#5196F430"}}>
		<Text style={{fontSize: 62}}>{ value }</Text>
	</Flex>
	</TouchableOpacity>
	)
}

function App() {

	const [currentPlayer, setCurrentPlayer] = useState("X");

	const [board, setBoard] = useState(Array(9).fill(null));

	const [highlighted, setHighlighted] = useState([]);

	const [winner ,setWinner] = useState (null);

	const handlePress = (index)=> {
		const newBoard = [...board];
		newBoard[index] = currentPlayer;
		setBoard(newBoard);

		const winnerLine = checkWinner(newBoard)

		if(winnerLine){
			setHighlighted(winnerLine)
			setWinner(currentPlayer)
			alert(`${currentPlayer} won!`)
		} else {
					setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
		}
	};

	const getBox = (index) => (
			<Box
				value={board[index]}
				onPress={() => handlePress(index)}
				highlighted={highlighted.includes(index)}
				disabled={winner || board[index]}
			/>
	);

	const handleReset = () => {
		setCurrentPlayer("X");
		setBoard(Array(9).fill(null));
		setHighlighted([]);
		setWinner(null);
	}
	return (
	<VStack fill center spacing={6}>
		<Text style={{fontSize: 30}}>{currentPlayer} to play</Text>
		<HStack spacing={6} shouldWrapChildren>
			{getBox(0)}
			{getBox(1)}
			{getBox(2)}
		</HStack>
		<HStack spacing={6} shouldWrapChildren>
			{getBox(3)}
			{getBox(4)}
			{getBox(5)}
		</HStack>
		<HStack spacing={6} shouldWrapChildren>
			{getBox(6)}
			{getBox(7)}
			{getBox(8)}
		</HStack>
		<Button title="Reset" onPress={handleReset}/>
	</VStack>
	)
}


export default App;