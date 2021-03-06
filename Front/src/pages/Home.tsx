//import { useHistory ,useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, updateUser } from '../redux/actions/users.actions';
import { useContext, useEffect } from 'react';
import ChatSocket from '../components/ChatSocket';
import chatContext from '../App'
import { getChannel } from '../redux/actions/channel.actions';


const Home = () => {
	const dispatch = useDispatch();
	const user = useSelector((state: any) => state.userReducer);
	//const users = useSelector((state: any) => state.usersReducer);

	var inputName: string = "";

	useEffect(() => {
		dispatch(getUsers());
		window.localStorage.user = user.name + "," + user.id;
		window.addEventListener("beforeunload", function() {dispatch(updateUser(user.id, {online: false}));});
	}, []);

	const handleInput = (input: string) => {
		inputName = input;
	};

	async function test (which: number) {


		if (which === 1)
		{
			var input: any = document.getElementById("input");
			input.value = "";
			//axios.get(baseURL + 'clients/all', {headers: {name: 'lol', token: 'love'}}).then((ret) => console.log(ret.data));
		}
		else if (which === 2)
		{
			//axios.get(baseURL + 'clients/one/' + inputName).then((ret) => console.log(ret.data));
			//await dispatch(getUser(inputName));
			//await console.log(user);
		}
	};

	return (
		<div>
			<Navigation userCard={user} />
			<div className="home">
				<input id='input' onChange={(e) => handleInput(e.target.value)} placeholder='type input for test 1'></input>
				<button type='submit' onClick={() => {test(1)}}>test 1</button>
				<button type='submit' onClick={() => {test(2)}}>test 2</button>
			</div>
		</div>
	);
};

export default Home;