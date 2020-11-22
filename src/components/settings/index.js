import React from 'react';
import SettingsSection1 from 'src/components/settings/settings-section-1';
import PageHeader from 'src/components/common/page-header';

function Settings() {
  return (
    <>
      <PageHeader title='Settings' />
      <SettingsSection1 />
    </>
  );
};

export default Settings;
