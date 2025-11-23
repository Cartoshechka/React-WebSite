import type {UserInterface} from "../types/user.interface.ts";
import {useFetch} from "../hooks/useFetch.ts";

const Users = () => {
    const { data: users, error, isLoading } = useFetch<UserInterface>(
        'https://jsonplaceholder.typicode.com/users'
    );

    return(
        <div>
            <h1>Users List</h1>
            {isLoading && <h2 className='loading'>Loading users...</h2>}
            {error && <h2 className="error">{error}</h2>}
            <ul>
                {!!users.length && users.map((user: UserInterface) => (
                    <li key={user.id}>{user.name} ({user.email})</li>
                ))}
            </ul>
        </div>
    );
};

export default Users;