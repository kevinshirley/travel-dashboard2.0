import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { 
  CHAT_ICON,
  NOTIFICATIONS_ICON,
  PROFILE_ICON,
} from 'src/components/material-ui/icons';
import Link from 'src/components/common/link';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'src/store/selectors/session';
import { useAction } from 'src/store/hooks';
import * as actions from 'src/store/actions';
import { MODALS } from 'src/store/constants/modals';

function ProfileDetails({ name }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const openModal = useAction(actions.ui.openModal);

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
          {isLoggedIn ? (
            <Link href='/account'>
              <span>{name}</span>
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                {PROFILE_ICON}
              </IconButton>
            </Link>
          ) : (
            <div
              className='sign-in-trigger-wrapper'
              onClick={() => openModal({
                modal: MODALS.SIGN_IN,
              })}
            >
              <span>Sign in</span>
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                {PROFILE_ICON}
              </IconButton>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}

export default ProfileDetails;
