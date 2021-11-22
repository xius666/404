import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import noimage from "../static/noimage.png";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, CardContent, Card } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const heading = {
  fontSize: "30px",
  color: "black",
  fontWeight: "bold",
};
const images = {
  marginBottom: "15px",
  height: "200px",
  width: "200px",
};

const EditPost = () => {
  const history = useHistory();
  const location = useLocation();
  const [item1, setItem] = React.useState(location.state);
  const [isImage, setIsImage] = React.useState(() => {
    if (item1.contentType != "Image") {
      return false;
    } else {
      return true;
    }
  });
  const [fileBase64String, setFileBase64String] = React.useState();

  const [image, setImage] = React.useState(null);

  const [preview, setPreview] = React.useState();
  const [textChoice, setTextChoice] = React.useState(() => {
    if (item1.contentType === "") {
      return "text/plain";
    } else {
      return "text/markdown";
    }
  });

  const [visibility, setVisibility] = React.useState(item1.state);

  const [title, setTitle] = React.useState(item1.title);
  const [common, setCommon] = React.useState(item1.content);
  const [date, setDate] = React.useState(location.date);

  const userid = localStorage.getItem("current_user_id");
  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;

  const uploadImage = (files) => {
    //accept = 'image/*';
    const file = files[0];
    if (file) {
      setImage(file);
      encodeFileBase64(image);
    } else {
      if (isImage == true) {
        setImage(location.state.image);
      } else {
        setImage(noimage);
      }
    }
  };
  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFileBase64String(reader.result);
      };
    }
  };
  const handleCheckBoxChange = (e) => {
    setIsImage(!isImage);
  };
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        encodeFileBase64(image);
      };
      reader.readAsDataURL(noimage);
    } else {
      if (isImage == true) {
        setPreview(noimage);
      } else {
        setPreview(noimage);
      }
    }
  }, [image]);

  const imageUpload = () => {
    //encodeFileBase64(image);
    console.log("hi", fileBase64String);
    setPreview(fileBase64String);
  };

  const submited = async () => {
    const authorID = localStorage.getItem("current_user_id");
    const currentDateTime = Date().toLocaleString();
    setDate(currentDateTime);
    const author = await axios.get(`${baseUrl2}/author/${userid}/`, {
      auth: {
        username: "admin",
        password: "admin",
      },
    });

    if (textChoice === "text/plain") {
      if (isImage === true) {
        const newpost = await axios.put(
          `${baseUrl2}/author/${userid}/posts/${item1.id}/`,
          {
            type: "post",
            id: item1.id,
            title: title,
            contentType: textChoice,
            content: common,
            // image: fileBase64String,
            published: date,
            author: author.data,
            visibility: visibility,
            source: "https://i-connect.herokuapp.com/service/posts/",
            origin: "https://i-connect.herokuapp.com/service/posts/",
          },
          {
            auth: {
              username: "admin",
              password: "admin",
            },
          }
        );
        history.push({ pathname: "/" });
      } else {
        const newpost = await axios.put(
          `${baseUrl2}/author/${userid}/posts/${item1.id}/`,
          {
            type: "post",
            id: item1.id,
            title: title,
            contentType: textChoice,
            content: common,
            published: date,
            author: author.data,
            visibility: visibility,
            source: "https://i-connect.herokuapp.com/service/posts/",
            origin: "https://i-connect.herokuapp.com/service/posts/",
          },

          {
            auth: {
              username: "admin",
              password: "admin",
            },
          }
        );
        history.push({ pathname: "/" });
      }
    } else if (textChoice === "text/markdown") {
      const newpost = await axios.put(
        `${baseUrl2}/author/${userid}/posts/${item1.id}/`,
        {
          type: "post",
          id: item1.id,
          title: title,
          contentType: textChoice,
          content: common,
          published: date,
          author: author.data,
          visibility: visibility,
          source: "https://i-connect.herokuapp.com/service/posts/",
          origin: "https://i-connect.herokuapp.com/service/posts/",
        },
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      );
      history.push({ pathname: "/" });
    } else if (common === "") {
      const newpost = await axios.put(
        `${baseUrl2}/author/${userid}/posts/${item1.id}/`,
        {
          type: "post",
          id: item1.id,
          title: title,
          contentType: "image",
          content: fileBase64String,
          published: date,
          author: author.data,
          visibility: visibility,
          source: "https://i-connect.herokuapp.com/service/posts/",
          origin: "https://i-connect.herokuapp.com/service/posts/",
        },
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      );
      history.push({ pathname: "/" });
    }
  };

  return (
    <Grid container direction="column" justifyContent="center">
      <Grid item alignItems="center">
        <div style={heading}>Edit Post</div>
      </Grid>

      <Grid
        item
        //bgcolor = '#eeeeee'
        alignItems="flex-start"
      >
        <TextField
          style={{ marginTop: 5, marginBottom: 5, width: "50%", marginLeft: 5 }}
          id="addTitle"
          label="title"
          variant="filled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Grid>

      <Grid container alignItems="flex-start" direction="row">
        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={textChoice}
              label="Input Type"
              autoWidth
              onChange={(e) => setTextChoice(e.target.value)}
            >
              <MenuItem value={"text/plain"}>text/plain</MenuItem>

              <MenuItem value={"text/markdown"}>text/markdown</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Image"
              onChange={(e) => handleCheckBoxChange(e)}
            />{" "}
          </FormControl>
        </Grid>
      </Grid>

      <Grid item>
        <TextField
          style={{
            marginTop: 5,
            marginBottom: 5,
            width: "90%",
            height: "90%",
            marginLeft: 5,
          }}
          id="addDescription"
          label="add description"
          variant="filled"
          multiline
          rows={10}
          value={common}
          onChange={(e) => setCommon(e.target.value)}
        />
      </Grid>
      {isImage ? (
        <CardContent>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  uploadImage(event.target.files);
                }}
              />
              <Button
                variant="contained"
                color="success"
                sx={{ marginInlineStart: "5px" }}
                onClick={() => {
                  imageUpload();
                }}
              >
                Upload
              </Button>
            </Grid>
            <Card sx={{ maxWidth: 200, maxHeight: 200 }}>
              <img style={images} src={preview} />
            </Card>
          </Grid>
        </CardContent>
      ) : null}

      <Grid item alignItems="flex-start">
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            sx={{
              marginInlineStart: "5px",
            }}
          >
            State
          </FormLabel>
          <RadioGroup
            aria-label="private?"
            name="radio-buttons-group"
            value={visibility}
            onChange={(event) => {
              setVisibility(event.target.value);
            }}
          >
            <FormControlLabel
              value="PUBLIC"
              sx={{
                marginInlineStart: "5px",
              }}
              control={<Radio />}
              label="Public"
            />
            <FormControlLabel
              value="PRIVATE"
              sx={{
                marginInlineStart: "5px",
              }}
              control={<Radio />}
              label="Private"
            />
            <FormControlLabel
              value="FRIENDS"
              sx={{
                marginInlineStart: "5px",
              }}
              control={<Radio />}
              label="Friend Only"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid
        item
        direction="row"
        //bgcolor = '#e0e0e0'
      >
        <Button
          variant="contained"
          color="success"
          sx={{ marginInlineStart: "5px" }}
          onClick={(event) => {
            submited(event.target);
          }}
        >
          Save Post
        </Button>

        <Button
          variant="contained"
          sx={{
            marginInlineStart: "50px",
          }}
          onClick={() => {
            let path = `/mypost`;
            history.push(path);
          }}
        >
          Cancle
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditPost;
