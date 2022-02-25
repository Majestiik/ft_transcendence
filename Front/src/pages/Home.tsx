//import { useHistory ,useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, updateUser } from '../redux/actions/users.actions';
import { useEffect } from 'react';
import ChatSocket from '../components/ChatSocket';


const Home = () => {
	const dispatch = useDispatch();
	const user = useSelector((state: any) => state.userReducer);
	//const users = useSelector((state: any) => state.usersReducer);

	var inputName: string = "";

	//const location = useLocation()
	//const history = useHistory()

	useEffect(() => {
		dispatch(getUsers());
		window.localStorage.user = user.name + "," + user.id;
		window.addEventListener("beforeunload", function() {dispatch(updateUser(user.id, {online: false}));});
	}, []);

	const handleInput = (input: string) => {
		inputName = input;
	};

	async function test (which: number) {

		//console.log("location : " + location.pathname);
		//console.log("pathname : " + history.location.pathname);
		//console.log("window href : " + window.location.href.split(':', 2));

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
				<ChatSocket />
				<input id='input' onChange={(e) => handleInput(e.target.value)} placeholder='type input for test 1'></input>
				<button type='submit' onClick={() => {test(1)}}>test 1</button>
				<button type='submit' onClick={() => {test(2)}}>test 2</button>
			</div>
		</div>
	);
};

export default Home;