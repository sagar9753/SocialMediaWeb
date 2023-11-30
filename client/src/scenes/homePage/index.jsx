import Navbar from "scenes/navbar";
import UserProfile from "scenes/widgets/UserProfile";
import UserPost from "scenes/widgets/UserPost";

import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux/es/hooks/useSelector";
import AllPosts from "scenes/widgets/AllPosts";
import Advertise from "scenes/widgets/Advertise";
import FriendList from "scenes/widgets/FriendList";

const HomePage = () => {
    const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
    const { _id, pic_path } = useSelector((state) => state.user);
    return (
        <Box>
            <Navbar />
            <Box width="100%" padding="2rem 6%"
                display={isNonMobileScreen ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
                    <UserProfile userId={_id} pic_path={pic_path} />
                </Box>
                <Box flexBasis={isNonMobileScreen ? "42%" : undefined}
                    mt={isNonMobileScreen ? undefined : "2rem"}
                >
                    <UserPost pic_path={pic_path} />
                    <Box margin="2rem 0" />
                    <AllPosts userId={_id} />
                </Box>
                {isNonMobileScreen &&
                    <Box flexBasis="26%">
                        <Advertise />
                        <Box margin="2rem 0" />
                        <FriendList userId={_id} />
                    </Box>}
            </Box>
        </Box>
    )
}
export default HomePage;