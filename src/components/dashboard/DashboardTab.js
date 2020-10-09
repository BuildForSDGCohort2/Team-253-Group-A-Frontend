import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";

export const DashboardTab = withStyles(() => ({
  root: {
    textTransform: "none",
  },
  selected: {},
}))((props) => <Tab {...props} />);
