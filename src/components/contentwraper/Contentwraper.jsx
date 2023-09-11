import React from "react";

import "./Contentwraper.scss";

const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;