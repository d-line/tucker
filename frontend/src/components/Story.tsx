import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  ButtonGroup,
  Grid,
  Typography,
} from "@mui/material";
import { IoMdDoneAll, IoMdShareAlt, IoMdStar } from "react-icons/io";
import { Link } from "react-router-dom";
import { updateStory } from "../helpers/api";
import { MdExpandMore } from "react-icons/md";
import { useState } from "react";

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0]}${name[1]}`,
  };
};

const Story = (props: any) => {
  const { id, title, feed, body, permalink, onRead } = props;

  const [expanded, setExpanded] = useState<string | false>(false);

  const stripHtml = (html: string) =>
    html ? html.replace(/<\/?[^>]+(>|$)/g, "") : "";

  const read = async () => {
    await updateStory(id, {
      isRead: true,
    });
    onRead();
  };

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Accordion expanded={expanded === id} onChange={handleChange(id)}>
      <AccordionSummary
        expandIcon={<MdExpandMore />}
        aria-controls={`${id}-bh-content`}
        id={`${id}-bh-header`}
      >
        <Grid container>
          <Grid item xs={1}>
            <Avatar {...stringAvatar(feed.name)} />
          </Grid>
          <Grid item xs={4}>
            <Typography
              sx={{
                textAlign: "left",
                height: "30px",
                lineHeight: "32px",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
              noWrap
            >
              {feed.name}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textAlign: "left",
              }}
              noWrap
            >
              {stripHtml(title)}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          textAlign: "left",
        }}
      >
        <div
          className="story-content"
          dangerouslySetInnerHTML={{ __html: body }}
        ></div>
        <div style={{ clear: "both" }}></div>
        <ButtonGroup
          variant="contained"
          sx={{
            mt: 1,
          }}
        >
          <Button
            component={Link}
            to={permalink}
            target="_blank"
            startIcon={<IoMdShareAlt />}
          >
            Open
          </Button>
          <Button startIcon={<IoMdDoneAll />} onClick={read}>
            Mark as Read
          </Button>
          <Button startIcon={<IoMdStar />}>Star</Button>
        </ButtonGroup>
      </AccordionDetails>
    </Accordion>
  );
};

export default Story;
