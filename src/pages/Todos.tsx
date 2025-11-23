import { useFetch } from '../hooks/useFetch';
import type {TodoInterface} from "../types/todo.interface.ts";

const Todos = () => {
    const {
        data: todos,
        error,
        isLoading
    } = useFetch<TodoInterface>('https://jsonplaceholder.typicode.com/todos', 20);

    return (
        <div>
            <h1>Todos List</h1>
            {isLoading && <h2 className='loading'>Loading todos...</h2>}
            {error && <h2 className='error'>{error}</h2>}
            <ul>
                {!!todos?.length && todos.map((todo: TodoInterface) => (
                    <li key={todo.id}>
                        <strong>{todo.title}</strong> - {todo.completed ? 'Completed' : 'Pending'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todos;