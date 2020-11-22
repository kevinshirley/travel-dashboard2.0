import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const theme = {
  IconButton: {
    color: '#fff'
  }
};

const useStyles = makeStyles((theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

export default function InputWithIcon(props) {
  const classes = useStyles(theme);
  const { text, icon } = props;

  return (
    <div className="input-field">
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          {icon}
        </Grid>
        <Grid item>
          <TextField label={text} />
        </Grid>
      </Grid>
    </div>
  );
}