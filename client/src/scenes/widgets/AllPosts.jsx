import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "state"
import SinglePost from "./SinglePost"
import { Box } from "@mui/material"

const AllPosts = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () => {
        const res = await fetch("http://localhost:3001/posts",
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
        const data = await res.json();
        dispatch(setPosts({ posts: data }));
    }
    const getUserPosts = async () => {
        const res = await fetch(`http://localhost:3001/posts/${userId}/posts`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
        const data = await res.json();
        dispatch(setPosts({ posts: data }));
    }
    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        }
        else {
            getPosts();
        }
    }, [])
    return (
        <>
            {(posts && posts.length > 0) && posts.map(
                ({
                    _id, userId, firstName, lastName, description, location, pic_path, userPic_path, likes, comments,
                }) => (
                    
                    <SinglePost
                        key={_id}
                        postId={_id}
                        postuserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        pic_path={pic_path}
                        userPic_path={userPic_path}
                        likes={likes}
                        comments={comments}
                    />
                    
                )
                
            )}
        </>
    )
}

export default AllPosts