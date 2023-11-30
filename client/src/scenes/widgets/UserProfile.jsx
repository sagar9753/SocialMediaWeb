import { ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined } from "@mui/icons-material";
import { Box, Typography, Divider, useTheme,useMediaQuery } from "@mui/material";
import UserImage from "componets/UserImage";
import FlexBetween from "componets/FlexBetween";
import ProfileStyle from "componets/ProfileStyle";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const UserProfile = ({ userId, pic_path }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const isNonMobileScreen = useMediaQuery("(min-width : 1000px)");

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log("sjgfbdshf");
        setUser(data);
    };


    useEffect(() => {
        getUser();
    }, []);

    if (!user) {
        return null;
    }

    const { firstName, lastName, location, occupation, viewedProfile, impression, friends, } = user;

    return (
        <ProfileStyle 
        // position={isNonMobileScreen ? "fixed" : "sticky"}
        // width={isNonMobileScreen ? "23%" : "auto" }
        >
            {/* first row */}
            <FlexBetween gap="0.5rem" paddingBottom="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={pic_path} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>
                            {friends.length} friends
                        </Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>
            <Divider />

            {/* Second row */}
            <Box padding="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>
                        {location}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>
                        {occupation}
                    </Typography>
                </Box>
            </Box>
            <Divider />
            {/* Third row */}
            <Box padding="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>
                        Profile viewer
                    </Typography>
                    <Typography color={main} fontWeight="500">
                        {viewedProfile}
                    </Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium}>
                        Post Impressions
                    </Typography>
                    <Typography color={main} fontWeight="500">
                        {impression}
                    </Typography>
                </FlexBetween>
            </Box>
            <Divider />

            {/* Fourth row */}
            <Box padding="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Profiles
                </Typography>
                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>
                                Social Network
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/linkedin.png" alt="twitter" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Linkedin
                            </Typography>
                            <Typography color={medium}>
                                Network PLatform
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
            </Box>
        </ProfileStyle>
    )
}
export default UserProfile;
