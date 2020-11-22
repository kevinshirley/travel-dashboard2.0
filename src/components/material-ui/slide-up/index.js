import React from 'react';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function SlideUp(props) {
  const [checked, setChecked] = React.useState(false);
  const { children } = props;
  const test = false;

  const handleChange = () => {
    setChecked(prev => !prev);
  };

  return (
    <div>
      <div>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show"
        />
        <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
          <Paper elevation={3}>
            {children}
          </Paper>
        </Slide>
      </div>
    </div>
  );
}