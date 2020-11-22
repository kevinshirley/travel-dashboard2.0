import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { ADD_ICON, SPACING } from 'src/components/material-ui/icons';
import TextField from 'src/components/common/text-field';
import RoundedButton from 'src/components/material-ui/rounded-button';
import { Formik, Field } from 'formik';

export default function IncludedDrawerCta({ setIncluded }) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = () => (
    <Formik 
      onSubmit={(values) => {
        console.log('values', values);
      }}
      initialValues={{
        text: '',
        icon: '',
      }}
    >
      {({ handleSubmit }) => (
        <form className='included-item-drawer' onSubmit={handleSubmit}>
          <h1>Included Item</h1>
          <Field name='text' label='Text' component={TextField} />
          <Field name='icon' label='Icon' component={TextField} />
          <RoundedButton className='add-trip-cta' text={'Save'} type='submit' />
        </form>
      )}
    </Formik>
  );

  return (
    <>
      <Button className='included-item-link' onClick={toggleDrawer('right', true)}>{ADD_ICON}{SPACING}Create new Included item</Button>
      <SwipeableDrawer 
        anchor='right'  
        open={state.right} 
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {list('right')}
      </SwipeableDrawer>
    </>
  );
}
