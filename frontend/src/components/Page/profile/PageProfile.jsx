import React from 'react';
import styles from '../../../styles/styles';
import PageInfo from './PageInfo';
import PageProfileData from './PageProfileData';

const PageProfile = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex py-10 justify-between">
        <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
          <PageInfo isCreator={true} />
        </div>
        <div className="w-[72%] rounded-[4px]">
          <PageProfileData isCreator={true} />
        </div>
      </div>
    </div>
  );
};

export default PageProfile;
