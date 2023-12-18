import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box, Divider, IconButton, Typography, useTheme,
} from "@mui/material";
import FlexBetween from "componets/FlexBetween";
import Friend from "componets/Friend";
import ProfileStyle from "componets/ProfileStyle";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts,setIsProfile } from "state";
import { useNavigate } from "react-router-dom";

const SinglePost = ({ postId, postuserId, name, description, location, pic_path, userPic_path, likes, comments, isProfile=false }) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;


  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;


  const patchLike = async () => {
    console.log(postId);
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
        <Friend friendId={postuserId} name={name} subtitle={location} userPic_path={userPic_path}
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
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
            {/* Comments */}
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
              <IconButton><ShareOutlined /></IconButton>
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
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
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