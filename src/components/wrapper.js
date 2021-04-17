import React from 'react';
import {Helmet} from "react-helmet";

export default function Wrapper ({children, title, className}) {

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <section className={className}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
      <div className="page-content">
        {children}
      </div>
    
    </section>
  )
}