import User from '../components/Interface';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/actions/user.actions';
import { registerUser, updateUser } from '../redux/actions/users.actions';

const Connect = () => {
	const dispatch = useDispatch();
	const users = useSelector((state: any) => state.usersReducer);
	//const user = useSelector((state: any) => state.userReducer);

	var inputName: string;

	async function getClient(name: string) : Promise<User | undefined> {
		return users.filter((u: any) => u.name === name)[0];
	};

	const handleInput = (input: string) => {
		inputName = input;
	};

	async function connection () {
		if (!inputName)
			return;
		getClient(inputName).then((client : User | undefined) => {
			if (!client) {
				dispatch(registerUser(inputName));
			} else if (client) {
				dispatch(updateUser(client.id, {online: true}))
			}
		}).then(() => {dispatch(getUser(inputName));});
	};

	return (
		<div className='connect'>
			Type your Name :
			<input onChange={(e) => handleInput(e.target.value)} placeholder='yes here ...'></input>
			<button type='submit' onClick={connection}>confirm</button>
		</div>
	);
};

export default Connect;