import  React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import head1 from "../static/1.JPG";
import head2 from "../static/2.JPG";
import head3 from "../static/3.JPG";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { StyleSheet, useState, useEffect, Text } from "react";

const FriendList = () => {
  const userid = localStorage.getItem("current_user_id");
  const baseUrl2 = process.env.REACT_APP_API_ENDPOINT;
  const [friendList,setFriends] = React.useState([]);

  const newList = [];
  axios.get(`${baseUrl2}/author/${userid}/followers/`).then((res) => {
    res.data.map((infor) => {
      newList.push({
        github: infor.github_name,
        follower: infor.user_name,
      });
    });
    setFriends(newList)
  });

  const listItems = friendList.map((item) => (
    <Grid
      item
      xs={8}
      justifyContent="flex-start"
      alignItems="flex-start"
      backgroundColor="#fff"
      borderBottom="1.2px solid #f0f2f7"
      padding="30px"
      boxShadow="0 1px 3px rgb(18 18 18 / 10%)"
      marginLeft={50}
      marginRight={50}
    >
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Avatar alt={`head1`} src={head1} />
            </Grid>
            <Grid item>
              <Typography>{item.follower}</Typography>
            </Grid>
            <Grid item marginLeft={30}>
              <Typography>{"hi"}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item marginLeft={7}>
          <Typography>{item.github}</Typography>
        </Grid>
      </Grid>
    </Grid>
  ));
  return (
    <div>
      <Grid container direction="column" alignSelf="center" marginTop={2}>
        {listItems}
      </Grid>
    </div>
  );
};

export default FriendList;
