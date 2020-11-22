import Avatar from '@material-ui/core/Avatar';

export default function AvatarWrapper({ children, onClick }) {

  return (
    <Avatar onClick={onClick}>
      {children}
    </Avatar>
  );
}