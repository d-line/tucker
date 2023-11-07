import { AppBar, Button, Toolbar } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <div>
          <Button>Primary</Button>
          <Button disabled>Disabled</Button>
          <Button href="#text-buttons">Link</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
