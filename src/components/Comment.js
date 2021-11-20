import Grid from "@material-ui/core/Grid";

import { Avatar } from "@material-ui/core";
import Button from "@mui/material/Button";
import makeStyles from "@material-ui/styles/makeStyles";
import React, { useEffect } from "react";
import { Typography, Box } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { Form } from "reactstrap";

import dummy_image from "../static/musle.png";
import axios from "axios";
import Popup from "./Popup";
import Profile from "./Profile";
import "./font/style.css";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import { v4 as uuidv4 } from "uuid";

const tempCommentList = [
  {
    type: "comment",
    author: {
      type: "author",
      id: "http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
      url: "http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
      host: "http://127.0.0.1:5454/",
      displayName: "Greg Johnson",
      github: "http://github.com/gjohnson",
      profileImage: "https://i.imgur.com/k7XVwpB.jpeg",
    },
    comment: "Sick Olde English 1fdsafafasfffffdaoihohohoi",
    contentType: "text/markdown",
    published: "2015-03-09T13:07:04+00:00",
    id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments/f6255bb01c648fe967714d52a89e8e9c1",
  },
  {
    type: "comment",
    author: {
      type: "author",
      id: "http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
      url: "http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
      host: "http://127.0.0.1:5454/",
      displayName: "Greg Johnson",
      github: "http://github.com/gjohnson",
      profileImage: "https://i.imgur.com/k7XVwpB.jpeg",
    },
    comment: "Sick Olde English 2",
    contentType: "text/markdown",
    published: "2015-03-09T13:07:04+00:00",
    id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments/f6255bb01c648fe967714d52a89e8e9c2",
  },
  {
    type: "comment",
    author: {
      type: "author",
      id: "http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
      url: "http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
      host: "http://127.0.0.1:5454/",
      displayName: "Greg Johnson",
      github: "http://github.com/gjohnson",
      profileImage: "https://i.imgur.com/k7XVwpB.jpeg",
    },
    comment: "Sick Olde English 3",
    contentType: "text/markdown",
    published: "2015-03-09T13:07:04+00:00",
    id: "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments/f6255bb01c648fe967714d52a89e8e9c3",
  },
];

const useStyles = makeStyles(() => ({
  stream: {
    marginLeft: "10px",
    marginTop: "100px",
  },
  postCard: {
    backgroundColor: "#fff",
    borderBottom: "1.2px solid #f0f2f7",
    padding: "30px",
    boxShadow: "0 1px 3px rgb(18 18 18 / 10%)",
  },
  cardInPost: {
    border: 0,
  },
}));

function Comments(props) {
  const styleClasses = useStyles();
  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;
  const path = window.location.pathname;
  const [user, setUser] = React.useState();
  const [github_user, setGit_user] = React.useState();
  const [newComment, setNewComment] = React.useState("");

  // const commentsList = tempCommentList;

  const [openPopup, setOpenPopup] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  useEffect(() => {
    axios
      .get(`${baseUrl2}${path}/`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      })
      .then((response) => {
        console.log(response.data.comments);
        setComments(response.data.comments);
      });
  }, []);
  const handleRemove = (e) => {
    const id = e.id;
    const newList = comments.filter((item) => item.id !== id);
    setComments(newList);
  };
  const open = (author, git) => {
    setUser(author);
    setGit_user(git);
    setOpenPopup(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const isoString = now.toISOString();
    axios
      .post(
        `${baseUrl2}${path}/`,
        {
          author: {
            id: localStorage.getItem("current_user_id"),
            github_name: localStorage.getItem("github_user"),
            user_name: localStorage.getItem("user_name"),
            type: "author",
          },
          comment: newComment,
          published: isoString,
          id: uuidv4(),
          type: "comment",
          contentType: "text",
        },
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      )
      .then(
        (response) => {
          console.log(response);
          console.log(comments);
          const newComments = comments.concat([response.data]);

          setComments(newComments);
          setNewComment("");
        },
        (error) => {
          alert("error ");
          console.log(error);
        }
      );
  };

  const commentStream = comments.map((comment) => (
    <Grid item>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item>
          <Avatar
            src={dummy_image}
            onClick={() =>
              open(comment.author.user_name, comment.author.github_name)
            }
          ></Avatar>
        </Grid>
        <Grid item>
          <Typography>{comment.author.user_name}</Typography>
          <Typography>{comment.published}</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Typography variant="h5" color="text.primary">
          {comment.comment}
        </Typography>
      </Grid>

      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      ></Grid>
    </Grid>
  ));
  console.log(commentStream);
  // console.log(commentsList);
  return (
    <Form onSubmit={handleSubmit}>
      <Popup
        title={"Profile"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <Profile
          user={user}
          post_github_user={github_user}
          is_follow={true}
        ></Profile>
      </Popup>

      <Grid
        container
        spacing={2}
        className={styleClasses.stream}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <div class="text text-1">Comments</div>
        <Grid container alignItems="center" justifyContent="center">
          <Box
            sx={{
              width: 600,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <AddReactionIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              fullWidth
              label="Add your comments..."
              variant="standard"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              type="submit"
              sx={{
                marginLeft: 1,
              }}
              variant="contained"
            >
              Add
            </Button>
          </Box>
        </Grid>

        {commentStream}
      </Grid>
    </Form>
  );
}
export default Comments;
