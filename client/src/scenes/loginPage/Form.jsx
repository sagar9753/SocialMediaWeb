import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setMsg } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "componets/FlexBetween";
import { toast } from "react-toastify"

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValReg = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

const initialValLogin = {
    email: "",
    password: "",
};

const Form = () => {
    const message = useSelector((state) => state.msg);
    const [pagetype, setPagetype] = useState("login");
    const { palette } = useTheme();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pagetype === "login";
    const isRegister = pagetype === "register";

    const register = async (values, onSubmitProps) => {
        // this is for to send data info with image
        const formData = new FormData();

        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("pic_path", values.picture.name);

        const sendRespose = await fetch(
            `${process.env.REACT_APP_BACKEND}/auth/register`,
            {
                method: "POST",
                body: formData
            }
        );
        const savedUser = await sendRespose.json();
        onSubmitProps.resetForm();

        if(savedUser){
            dispatch(setMsg({ msg: "Verification mail is sent to mail. Plz verify to continue" }))
            setTimeout(() => {
                dispatch(setMsg({ msg: "" }))
            }, 5000);
            setPagetype("login");
        }
        if(savedUser.msg === "Email is Already used") {
            dispatch(setMsg({msg:savedUser.msg}))
            setTimeout(() => {
                
            }, 3000);
        }
    }

    const login = async (values, onSubmitProps) => {
        const logResponse = await fetch(
            `${process.env.REACT_APP_BACKEND}/auth/login`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            }
        );
        const loggedIn = await logResponse.json();
        // console.log(loggedIn.msg);
        onSubmitProps.resetForm();
        // alert(loggedIn.msg)
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/home")
        }
        if (loggedIn.msg === "Invalid email or password" || loggedIn.msg === "Plz verify first to continue from your mail box!!!") {
            // toast.error("Please fill in all fields")
            dispatch(setMsg({ msg: loggedIn.msg }))
            setTimeout(() => {
                dispatch(setMsg({ msg: "" }))
            }, 3000);
        }

    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <>
            {message &&
                <Box mb="1rem" padding=".5rem" textAlign="center" fontSize="1rem" color="black" backgroundColor="#DE5858">{message}</Box>
            }
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={isLogin ? initialValLogin : initialValReg}
                validationSchema={isLogin ? loginSchema : registerSchema}
            >

                {({
                    values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4,minmax(0,1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            {isRegister && (
                                <>
                                    <TextField
                                        label="First Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.firstName}
                                        name="firstName"
                                        error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        label="Last Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        name="lastName"
                                        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        label="Location"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.location}
                                        name="location"
                                        error={Boolean(touched.location) && Boolean(errors.location)}
                                        helperText={touched.location && errors.location}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                    <TextField
                                        label="Occupation"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.occupation}
                                        name="occupation"
                                        error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                        helperText={touched.occupation && errors.occupation}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                    <Box
                                        gridColumn="span 4"
                                        border={`1px solid ${palette.neutral.medium}`}
                                        borderRadius="5px"
                                        padding="1rem"
                                    >
                                        <Dropzone
                                            acceptedFiles=".jpg,.jpeg,.png"
                                            multiple={false}
                                            onDrop={(acceptedFiles) =>
                                                setFieldValue("picture", acceptedFiles[0])
                                            }
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <Box
                                                    {...getRootProps()}
                                                    border={`2px dashed ${palette.primary.main}`}
                                                    padding="1rem"
                                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                                >
                                                    <input {...getInputProps()} />
                                                    {!values.picture ? (
                                                        <p>Add Picture Here</p>
                                                    ) : (
                                                        <FlexBetween>
                                                            <Typography>
                                                                {values.picture.name}
                                                            </Typography>
                                                            <EditOutlinedIcon />
                                                        </FlexBetween>
                                                    )}
                                                </Box>
                                            )}
                                        </Dropzone>
                                    </Box>
                                </>
                            )}
                            <TextField
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        {/* Submit button */}
                        <Box>
                            <Button fullWidth type="submit"
                                sx={{
                                    m: "2rem 0",
                                    p: "1rem",
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt,
                                    "&:hover": { color: palette.primary.main },
                                }}
                            >
                                {isLogin ? "LOGIN" : "REGISTER"}
                            </Button>
                            <Typography onClick={() => {
                                setPagetype(isLogin ? "register" : "login");
                                resetForm();
                            }}
                                sx={{
                                    textDecoration: "underline",
                                    color: "primary",
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: palette.primary.main,
                                    },
                                }}
                            >
                                {isLogin ? "Don't have an account? Sign Up here."
                                    : "Already have an account? Login here."}
                            </Typography>
                        </Box>
                    </form>
                )}
            </Formik>

        </>
    )
}

export default Form;