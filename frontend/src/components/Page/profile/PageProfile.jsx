import React from 'react';
import { Card } from '@mui/material';
const PageProfile = () => {
  return (
    <Card className="w-[50%] rounded-md m-2 shadow-xl overflow-hidden">
      <div className="h-24">
        <img
          src="https://plus.unsplash.com/premium_photo-1668618252845-d7b02384708a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-[100%]"
        />
      </div>
      <div className="p-4">John Doe</div>
    </Card>
  );
};

export default PageProfile;
