import React from "react";
import DashboardLeft from "../../Dashboards/dashboard-left";
import DashboardRight from "../../Dashboards/dashboard-right";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        padding: "20px"
    }
});

interface Props {
    children: any;
}

const SampleAccessioningDash: React.FC<Props> = ({ children }) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <DashboardLeft />
            <DashboardRight>{children && children}</DashboardRight>
        </div>
    );
};

export default SampleAccessioningDash;

