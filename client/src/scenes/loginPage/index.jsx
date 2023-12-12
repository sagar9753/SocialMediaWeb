import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form"

const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreen = useMediaQuery("(min-width : 1000px)");
    const isNonMobile = useMediaQuery("(min-width : 700px)");

    return (
        <Box>
            <Box width="100%" backgroundColor={theme.palette.background.alt} padding="1rem 6%" textAlign="center">
                <Typography
                    fontWeight="bold"
                    fontSize="32px"
                    color="primary"
                >
                    Social Media
                </Typography>
            </Box>

            <Box padding="70px" display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
                {isNonMobile && <img src="https://img.freepik.com/free-vector/hand-drawn-illustration-people-with-smartphone-marketing_52683-66659.jpg?w=996&t=st=1701441710~exp=1701442310~hmac=b2e7ff9c2bc78d2ed1c3f7466ea60ae75495341b794865baad7c411f480b37a8" alt="" width="500px" />}

                <Box width={isNonMobileScreen ? "50%" : "93%"} padding="2rem" margin="2rem auto"
                >
                    <Form />
                </Box>
            </Box>
        </Box>
    )
}
export default LoginPage;
