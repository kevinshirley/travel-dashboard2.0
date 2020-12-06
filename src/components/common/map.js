import React, { Component } from 'react';
import getConfig from 'next/config';
import GoogleMapReact from 'google-map-react';
import { LOCATION_ON_ICON } from 'src/components/material-ui/icons';

const { publicRuntimeConfig } = getConfig();

const AnyReactComponent = ({ text }) => <div onClick={() => console.log('clicked on', text)} style={{ cursor: 'pointer' }}>{LOCATION_ON_ICON}{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 45.548790,
      lng: -73.587220
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '250px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: publicRuntimeConfig.googleCloudApi }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={45.548790}
            lng={-73.587220}
            text='$740'
          />
          <AnyReactComponent
            lat={45.570302}
            lng={-73.638769}
            text='$525'
          />
          <AnyReactComponent
            lat={45.527265}
            lng={-73.664175}
            text='$940'
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
