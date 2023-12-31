import { EditOutlined, DeleteOutlined, AttachFileOutlined, GifBoxOutlined, ImageOutlined, MicOutlined, MoreHorizOutlined } from "@mui/icons-material";
import { Box, Divider, Typography, InputBase, useTheme, Button, IconButton, useMediaQuery } from "@mui/material";
import FlexBetween from "componets/FlexBetween";
import ProfileStyle from "componets/ProfileStyle";
import UserImage from "componets/UserImage";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const UserPost = ({ pic_path }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("pic_path", image.name);
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
    };

    return (
        <ProfileStyle>
            <FlexBetween gap="1rem">
                <UserImage image={pic_path} />
                <InputBase placeholder="What's on your mind....."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "5px"
                    }}
                />
            </FlexBetween>
            {isImage && (
                <Box border={`1px solid ${medium}`}
                    borderRadius="5px"
                    padding="1rem"
                    mt="1rem"
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) =>
                            setImage(acceptedFiles[0])
                        }
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    width="100%"
                                    border={`2px dashed ${palette.primary.main}`}
                                    padding="1rem"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Add Image Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>
                                                {image.name}
                                            </Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton sx={{ width: "15%" }}
                                        onClick={() => setImage(null)}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}
            <Divider sx={{ margin: "1.25rem 0" }} />
            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
        </ProfileStyle>
    )
}

export default UserPost;
