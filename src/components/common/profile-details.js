import React from 'react';
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { 
  CHAT_ICON,
  NOTIFICATIONS_ICON,
  PROFILE_ICON,
  SPACING
} from 'src/components/material-ui/icons';
import Link from 'src/components/common/link';
import { selectSessionProfile } from 'src/store/selectors/session';

function ProfileDetails({ name }) {
  const profile = useSelector(selectSessionProfile);

  return (
    <div className='profile-details'>
      <ul>
        <li>
          <IconButton aria-label="messages" color="inherit">
            <Badge badgeContent={4} color="secondary">
              {CHAT_ICON}
            </Badge>
          </IconButton>
        </li>
        <li>
          <IconButton aria-label="notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              {NOTIFICATIONS_ICON}
            </Badge>
          </IconButton>
        </li>
        <li>
          {profile && profile.firstName ? (
            <Link href='/account'>
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                {PROFILE_ICON}
              </IconButton>
              <span>Hi, {profile.firstName}</span>
            </Link>
          ) : (
            <div className='sign-in-trigger-wrapper'>
              <span><Link href='/sign-in'>Sign in</Link></span>{SPACING}/{SPACING}<span><Link href='/sign-up'>Sign up</Link></span>{SPACING}{SPACING}
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}

export default ProfileDetails;
