import type {PostInterface} from "../types/post.interface.ts";
import {useFetch} from "../hooks/useFetch.ts";

const Posts = () => {
    const { data: posts, error, isLoading } = useFetch<PostInterface>(
        'https://jsonplaceholder.typicode.com/posts',
        10
    );

    return(
        <div>
            <h1>Posts List</h1>
            {isLoading && <h2 className='loading'>Loading posts...</h2>}
            {error && <h2 className="error"> {error}</h2>}
            <ul>
                {!!posts.length && posts.map((post: PostInterface) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;