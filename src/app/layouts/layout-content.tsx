import { Box } from "@mui/material";
import { Fragment } from "react";

export interface LayoutContentProps {
  className?: string;
  children: React.ReactNode;
  SubHeaderComponent?: React.ReactNode;
}

const LayoutContent = (props: LayoutContentProps) => {
  return (
    <Fragment>
      {props.SubHeaderComponent ? (
        <Box
          sx={{
            position: "sticky",
            display: "flex",
            alignItems: "center",
            height: "42px",
            top: 0,
            borderBottom: "1px solid",
            borderColor: "divider",
            padding: "0.25rem 1.75rem",
          }}
        >
          {props.SubHeaderComponent}
        </Box>
      ) : null}
      <Box
        sx={{
          height: "calc(100vh - 90px)",
          padding: "1.75rem",
          overflowY: "auto",
          backgroundColor: "background.paper",
        }}
      >
        {props.children}
      </Box>
    </Fragment>
  );
};

export default LayoutContent;
