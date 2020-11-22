import InputBase from '@material-ui/core/InputBase';

export default function InputField({ placeholder, className, ariaLabel }) {

  return (
    <InputBase
      placeholder={placeholder}
      className={className}
      inputProps={{ 'aria-label': ariaLabel }}
    />
  );
}