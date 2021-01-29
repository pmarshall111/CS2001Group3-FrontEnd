import React from "react";
import {
  Container,
  Grid,
  Button,
  // Typography,
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  CardMedia,
  CardHeader,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "110vh",
    backgroundColor: theme.palette.grey[200],
    paddingTop: theme.spacing(5),
  },
}));

function HomePage() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <h1>Welcome to CareRUs</h1>
      <Grid container spacing={3}>
        <Grid item sm={4}>
          <Card variant="outlined">
            <CardHeader title="Residents" />
            <CardActionArea>
              <CardMedia
                image="https://rg-group.co.uk/wp-content/uploads/2019/08/CareHome1.jpg"
                style={{ height: 200 }}
              />
              <CardContent></CardContent>
            </CardActionArea>
            <CardActions>
              <Button>View Residents</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item sm={4}>
          <Card>
            <CardHeader title="Medications" />
            <CardActionArea>
              <CardMedia
                image="https://www.practicalpainmanagement.com/sites/default/files/imagecache/lightbox-large/images/2016/07/18/14253266_M.jpg"
                style={{ height: 200 }}
              />
              <CardContent></CardContent>
            </CardActionArea>
            <CardActions>
              <Button>View Medications</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item sm={4}>
          <Card>
            <CardHeader title="Emails" />
            <CardActionArea>
              <CardMedia
                image="https://cdn.mos.cms.futurecdn.net/MCTaifsDFHvU7pJ9uKmjzY.jpg"
                style={{ height: 200 }}
              />
              <CardContent></CardContent>
            </CardActionArea>
            <CardActions>
              <Button>View Emails</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item sm={4}>
          <Card>
            <CardHeader title="Care Workers" />
            <CardActionArea>
              <CardMedia
                image="https://helpr.org.uk/wp-content/uploads/2018/04/caring-staff.jpg"
                style={{ height: 200 }}
              />
              <CardContent></CardContent>
            </CardActionArea>
            <CardActions>
              <Button>View Care Workers</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item sm={4}>
          <Card>
            <CardHeader title="Daily Tasks" />
            <CardActionArea>
              <CardMedia
                image="https://thumbs.dreamstime.com/b/task-list-icon-logo-illustration-summer-icons-set-outline-holiday-tour-travel-vector-simple-modern-graphic-flat-design-159161578.jpg"
                style={{ height: 200 }}
              />
              <CardContent></CardContent>
            </CardActionArea>
            <CardActions>
              <Button>View Tasks</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item sm={4}>
          <Card>
            <CardHeader title="Pharmacies" />
            <CardActionArea>
              <CardMedia
                image="https://mmo.aiircdn.com/326/5e8b2443bb37b.jpg"
                style={{ height: 200 }}
              />
              <CardContent></CardContent>
            </CardActionArea>
            <CardActions>
              <Button>View Pharmacies</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
