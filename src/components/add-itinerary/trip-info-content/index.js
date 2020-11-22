import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as moment from 'moment';
import { propOr, isEmpty } from 'ramda';
import ItineraryOverviewDrawer from 'src/components/common/itinerary-overview-drawer';
import { camelCaseToNormal } from 'src/utils/string';
import Calendar from 'src/components/common/calendar';
import IconButton from '@material-ui/core/IconButton';
import TextField from 'src/components/common/text-field';
import { Formik, Field } from 'formik';
import { CLOSE_ICON, SPACING, PENCIL_ICON } from 'src/components/material-ui/icons';
import Avatar from 'src/components/material-ui/avatar';

const TripInfoContent = ({
  day,
  uploadCoverImage,
  openStartDateCalendar,
  tripStartDate,
  isStartDateCalendarOpened,
  closeStartDateCalendar,
  setPriceType,
  tripOverview,
  isEditingTripStartDate,
  overviewTripStartDate,
  toggleEditStartDate
}) => {
  const calendarCloseIconClasses = cx({
    'not-visible': !isStartDateCalendarOpened,
  });

  const renderTripStartDate = () => {
    if (isEmpty(overviewTripStartDate)) {
      return (
        <Field
          name='tripStartDate'
          label='Enter Trip Start Date here'
          component={TextField}
          onClick={openStartDateCalendar}
          value='2020-10-22'
          containerClass='mb-0'
        />
      );
    }
  
    {(isEditingTripStartDate || overviewTripStartDate) ? (
      <Field
        name='tripStartDate'
        label='Enter Trip Start Date here'
        component={TextField}
        onClick={openStartDateCalendar}
        value={overviewTripStartDate ? moment.utc(overviewTripStartDate).format('LL') : ''}
        containerClass='mb-0'
      />
    ) : (
      <span className='trip-info__inner-content'>{!isEmpty(tripStartDate) ? moment.utc(tripStartDate).format('LL') : moment.utc(overviewTripStartDate).format('LL')}</span>
    )}
    {!isStartDateCalendarOpened && (tripStartDate || overviewTripStartDate) && (
      <div className='trip-info__inner-icon'  onClick={() => toggleEditStartDate()} type='button'>
        <Avatar>
          {PENCIL_ICON}
        </Avatar>
      </div>
    )}
  };

  return (
    <>
      <div className='header'>
        <div className='trip-info__header-title'>
          <h4>Trip Information</h4>
        </div>
        <ItineraryOverviewDrawer
          categoryTabIndex={0}
          day={day}
          uploadCoverImage={uploadCoverImage}
          openStartDateCalendar={openStartDateCalendar}
          tripStartDate={tripStartDate}
          isStartDateCalendarOpened={isStartDateCalendarOpened}
          closeStartDateCalendar={closeStartDateCalendar}
          setPriceType={setPriceType}
          tripOverview={tripOverview}
        />
      </div>
      <div className='trip-info__content'>
        <div className='trip-info__title trip-info__content-item'>
          <div className='trip-info__content-item-inner'>
            <h3 className='trip-info__inner-title'>Title:</h3>
            <span className='trip-info__inner-content'>{tripOverview.title}</span>
          </div>
        </div>
        <div className='trip-info__title trip-info__content-item'>
          <div className='trip-info__content-item-inner'>
            <h3 className='trip-info__inner-title'>Location:</h3>
            <span className='trip-info__inner-content'>{tripOverview.location}</span>
          </div>
        </div>
        <div className='trip-info__title trip-info__content-item'>
          <div className='trip-info__content-item-inner'>
            <h3 className='trip-info__inner-title'>Country:</h3>
            <span className='trip-info__inner-content'>{tripOverview.country}</span>
          </div>
        </div>
        <div className='trip-info__title trip-info__content-item'>
          <div className='trip-info__content-item-inner'>
            <h3 className='trip-info__inner-title'>Price:</h3>
            {propOr('', 'priceType', tripOverview) && (
              <span className='trip-info__inner-content'>{`$${tripOverview.price}`} {camelCaseToNormal(tripOverview.priceType)}</span>
            )}
          </div>
        </div>
        <div className='trip-info__title trip-info__content-item'>
          <div className='trip-info__content-item-inner'>
            <h3 className='trip-info__inner-title'>Overview:</h3>
            <span className='trip-info__inner-content'>{tripOverview.overview}</span>
          </div>
        </div>
        <div className='trip-info__start-date trip-info__content-item'>
          <div className='start-date-content trip-info__content-item-inner'>
            <h3 className='trip-info__inner-title'>Start Date:</h3>
            {(isEditingTripStartDate || overviewTripStartDate) ? (
              <Field
                name='tripStartDate'
                label='Enter Trip Start Date here'
                component={TextField}
                onClick={openStartDateCalendar}
                value={overviewTripStartDate ? moment.utc(overviewTripStartDate).format('LL') : ''}
                containerClass='mb-0'
              />
            ) : (
              <span className='trip-info__inner-content'>{!isEmpty(tripStartDate) ? moment.utc(tripStartDate).format('LL') : moment.utc(overviewTripStartDate).format('LL')}</span>
            )}
            {!isStartDateCalendarOpened && (tripStartDate || overviewTripStartDate) && (
              <div className='trip-info__inner-icon'  onClick={() => toggleEditStartDate()} type='button'>
                <Avatar>
                  {PENCIL_ICON}
                </Avatar>
              </div>
            )}
          </div>
          <div className='calendar-wrapper'>
            <Calendar isVisible={isStartDateCalendarOpened} />
            <div className='close-start-date-calendar'>
              <IconButton 
                color="inherit" 
                id='icon-button' 
                onClick={closeStartDateCalendar}
                className={calendarCloseIconClasses}
              >
                {CLOSE_ICON}
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

TripInfoContent.propTypes = {
  uploadCoverImage: PropTypes.func,
};

export default TripInfoContent;
