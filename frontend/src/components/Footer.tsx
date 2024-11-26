import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Footer component definition
const Footer: React.FC = () => {
  return (
    <Box component="footer" className="fixed-footer">
      <Typography variant="body2" color="textSecondary">
        © 2024 User Management Application. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
