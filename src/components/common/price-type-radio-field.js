import React, { useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function ItineraryPriceType({ setPriceType }) {
  const [value, setValue] = React.useState('perPerson');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setPriceType(value);
  }, [value, setPriceType]);

  return (
    <FormControl component="fieldset" className='price-type-form-control'>
      <RadioGroup aria-label="gender" className='price-type-radio-group' name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="perPerson" control={<Radio />} label="Per Person" />
        <FormControlLabel value="total" control={<Radio />} label="Total" />
      </RadioGroup>
    </FormControl>
  );
}
