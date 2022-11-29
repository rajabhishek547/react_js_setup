import React from "react";
import "./index.sass";


interface Props {
  children: any;
}

const SampleAccessioningDashboardRight: React.FC<Props> = ({ children }) => {

  return (
    <>
      {/* <div className="call-options"></div> */}
      {/* <SearchBar /> */}
      {/* <div></div> */}
      {/* <main className={classes.toolbar}>
        <div className={classes.content} /> */}
      {children && children}
      {/* </main> */}
    </>
  );
};


export default SampleAccessioningDashboardRight;
