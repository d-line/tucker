import { AppBar, Button, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {TiArrowBack} from "react-icons/ti";
import {AiFillStar, AiOutlineUnorderedList} from "react-icons/ai";
import { BsFillArchiveFill} from "react-icons/bs";
import {SiAddthis} from "react-icons/si"

const Header = () => {
  const navigate = useNavigate();

  const toStories = () => {
    navigate('/stories');
  }

  const toFeeds = () => {
    navigate('/feeds');
  }

  const toSubscribe = () => {
    navigate('/subscribe');
  }

  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
        <div>
          <Button variant="contained" onClick={toStories} size="large" startIcon={<TiArrowBack />}/>
        </div>
        <div style={{
          display: 'flex',
          gap: '5px'
        }}>
          <Button variant="outlined" onClick={toStories} size="large" startIcon={<AiFillStar />}></Button>
          <Button variant="outlined" onClick={toStories} size="large" startIcon={<BsFillArchiveFill />}></Button>
          <Button variant="outlined" onClick={toFeeds} size="large" startIcon={<AiOutlineUnorderedList />}></Button>
          <Button variant="outlined" onClick={toSubscribe} size="large" startIcon={<SiAddthis />}></Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
