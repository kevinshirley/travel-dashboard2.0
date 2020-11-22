import Alert from '@material-ui/lab/Alert';

export default function MaterialUiAlert({ children, type }) {
  // Type options: success - info - warning - error

  return (
    <Alert severity={type}>
      {children}
    </Alert>
  );
}
