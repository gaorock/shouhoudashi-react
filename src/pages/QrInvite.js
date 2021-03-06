import React from 'react';
import {Helmet} from "react-helmet";


export default function StaffInvite () {

  return (
    <section className="page-staff-invite">
        <Helmet>
          <title>邀请二维码</title>
        </Helmet>
      <div className="page-content">
        <div className="top"></div>
        <div className="qr"></div>
      </div>
    
    </section>
  )
}