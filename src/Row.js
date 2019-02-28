import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 100,
  },
  header: {
    fontSize: 12,
  },
  title: {
    fontSize: 18,
  }
}

const Row = ({classes, headerText, titleText, descriptionText}) => {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.header} color="textSecondary" gutterBottom>
          {headerText}
        </Typography>
        <Typography className={classes.title} color="textPrimary">
          {titleText}
        </Typography>
        <Typography className={classes.description} color="textPrimary">
          {descriptionText}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(Row);
