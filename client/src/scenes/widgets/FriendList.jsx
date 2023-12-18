import { Box, Typography, useTheme } from "@mui/material";
import Friend from "componets/Friend";
import ProfileStyle from "componets/ProfileStyle";
import Wid from "componets/Wid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendList = ({userId}) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const getFriends = async () => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND}/users/${userId}/friends`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await res.json();
        dispatch(setFriends({ friends: data }));
    };

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <ProfileStyle>
            {console.log(friends)}
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {Object.values(friends).map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPic_path={friend.pic_path}
                    />
                    // <Wid userPic_path={ friend.userPic_path }/>

                ))}
            </Box>
        </ProfileStyle>
    )
}

export default FriendList