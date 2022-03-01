import axios from "axios"

export const GET_USER = "GET_USER";

export const getUser = (name: string) => {
	return (dispatch: any) => {
		return axios.get("http://" + window.location.hostname + ":3001/" + 'clients/one/' + name)
		.then((ret) => {dispatch({ type: GET_USER, payload: ret.data })})
		.catch((err) => {dispatch({ type: GET_USER, payload: null })});
	};
};