import { Comment,CommentOutlined,ThumbUp,ThumbUpOutlined } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box, Divider, IconButton, Typography, useTheme, InputBase, Button
} from "@mui/material";
import FlexBetween from "componets/FlexBetween";
import UserImage from "componets/UserImage";
import Friend from "componets/Friend";
import ProfileStyle from "componets/ProfileStyle";
import { useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "state";

const SinglePost = ({ postId, postuserId, name, description, location, pic_path, userPic_path, likes, comments, isProfile = false }) => {
  const [isComments, setIsComments] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const curUserPic = useSelector((state) => state.user.pic_path);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;


  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;


  const patchLike = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const doComment = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commUser: loggedInUserId, comment: commentValue }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setCommentValue("");
  }

  const deletePost = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/posts/${postuserId}/${postId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  }

  return (
    <Box>
      <ProfileStyle>
        <Friend friendId={postuserId} name={name} subtitle={location} userPic_path={userPic_path} isProfile={isProfile}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {pic_path && (
          <img src={`${process.env.REACT_APP_BACKEND}/assets/${pic_path}`} alt="post"
            width="100%"
            height="auto"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            {/* Likes */}
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <ThumbUp sx={{ color: primary }} />
                ) : (
                  <ThumbUpOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
            {/* Comments */}
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                {isComments ? (
                  <Comment sx={{ color: "grey" }} />
                ) : (
                  <CommentOutlined />
                )}
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>

          </FlexBetween>
          <Box>
            {isProfile && loggedInUserId === postuserId && <IconButton onClick={() => {
              deletePost()
            }}><DeleteIcon /></IconButton>}
          </Box>
        </FlexBetween>
        {isComments && (
          <Box mt="0.5rem">
            <FlexBetween gap="1rem" mb="1.5rem">
              <UserImage image={curUserPic} size="40px" />
              <InputBase placeholder="What's on your mind....."
                onChange={(e) => setCommentValue(e.target.value)}
                value={commentValue}
                sx={{
                  width: "100%",
                  // backgroundColor: palette.neutral.light,
                  borderRadius: "0rem",
                  borderBottom:"1px solid grey",
                  padding: "5px"
                }}
              />
              <Button
                // disabled={!post}
                onClick={doComment}
                sx={{
                  color: "wheat",
                  backgroundColor: "#3D6A64",
                  borderRadius: ".6rem",
                  padding:".2rem 1.3rem",
                  
                }}
              >
                comment
              </Button>
            </FlexBetween>
            {comments.slice(0).reverse().map((comment) => (
              <Box mt="" key={comment._id}>
                <Divider />
                <Box padding=".2rem 1rem">
                <Box display="flex" alignItems="center" gap=".5rem">
                  <UserImage image={comment.commUser.pic_path} size="30px" />
                  <p>{comment.commUser.firstName + "  " + comment.commUser.lastName}</p>
                </Box>
                <span style={{ color: '#B9C4C3',paddingLeft:"2.3rem" }}>{comment.comment}</span>
                </Box>
              </Box>
            ))}
            <Divider />
          </Box>
        )}
      </ProfileStyle>
      <Box margin="1.5rem 0" />
    </Box>
  )

}

export default SinglePost