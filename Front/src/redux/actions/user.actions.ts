import axios from "axios"

var baseURL: string = "http://localhost:3001/";
export const GET_USER = "GET_USER";

export const getUser = (name: string) => {
	return (dispatch: any) => {
		return axios.get(baseURL + 'clients/one/' + name)
		.then((ret) => {dispatch({ type: GET_USER, payload: ret.data })})
		.catch((err) => {dispatch({ type: GET_USER, payload: null })});
	};
};