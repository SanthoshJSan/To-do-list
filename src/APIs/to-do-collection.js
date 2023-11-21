import axios from 'axios';

const serverUrl = 'http://localhost:7000/'

export const fetchToDo = () => {
	return axios.get(serverUrl+'fetch-todo');
}

export const insertToDo = (todoArray) => {
	return axios.post(serverUrl+'save', todoArray);
}

export const deleteToDo = (taskName) => {
	return axios.post(serverUrl+'delete-todo', { taskName });
}