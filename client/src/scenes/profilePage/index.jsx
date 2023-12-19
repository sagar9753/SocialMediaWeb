import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";

import UserProfile from "scenes/widgets/UserProfile";
import UserPost from "scenes/widgets/UserPost";
import FriendList from "scenes/widgets/FriendList";
import AllPosts from "scenes/widgets/AllPosts";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();   
    const token = useSelector((state) => state.token);
    const posts = useSelector((state) => state.posts);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const getUser = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
        // dispatch(setIsProfile({ isProfile: true }));
        console.log("mmmmmmm");
    }, [posts]);

    if (!user)
        return null;

    return (
        <Box>
            {console.log("Rerenderrrrrrrrrr")}
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserProfile userId={userId} pic_path={user.pic_path} isProfile />
                    <Box m="2rem 0" />
                    <FriendList userId={userId} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    {/* <UserPost pic_path={user.pic_path} />
                    <Box m="2rem 0" /> */}
                    <AllPosts userId={userId} isProfile />
                </Box>
            </Box>
        </Box>
    )
}
export default ProfilePage;