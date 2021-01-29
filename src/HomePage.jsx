import React from "react";
import {
  Container,
  Grid,
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: theme.palette.grey[200],
    paddingTop: theme.spacing(5),
  },
}));

function HomePage() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <h1>Dashboard</h1>
      <Grid container spacing={3}>
        <Grid item sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Residents</Typography>
              <Typography variant="subtitle1">Lorem </Typography>
            </CardContent>
            <CardActions>
              <Button>Read More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Medications</Typography>
              <Typography variant="subtitle1">Lorem </Typography>
            </CardContent>
            <CardActions>
              <Button>Read More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Emails</Typography>
              <Typography variant="subtitle1">Lorem </Typography>
            </CardContent>
            <CardActions>
              <Button>Read More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Care workers</Typography>
              <Typography variant="subtitle1">Lorem </Typography>
            </CardContent>
            <CardActions>
              <Button>Read More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Daily Tasks</Typography>
              <Typography variant="subtitle1">Lorem </Typography>
            </CardContent>
            <CardActions>
              <Button>Read More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Pharmacies</Typography>
              <Typography variant="subtitle1">Lorem </Typography>
            </CardContent>
            <CardActions>
              <Button>Read More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
