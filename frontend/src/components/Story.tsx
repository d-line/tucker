import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, ButtonGroup, Typography } from "@mui/material";
import { IoMdDoneAll, IoMdShareAlt, IoMdStar } from "react-icons/io";
import { Link } from "react-router-dom";
import { updateStory } from "../helpers/api";
import { MdExpandMore } from "react-icons/md";
import { useState } from "react";

const Story = (props: any) => {
  const { id, title, feed, body, permalink, onRead } = props;

  const [expanded, setExpanded] = useState<string | false>(false);

  const stripHtml = (html: string) =>
    html ? html.replace(/<\/?[^>]+(>|$)/g, "") : "";

  const read = async () => {
    await updateStory(id, {
        isRead: true
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
      <Avatar>{feed.name[0]}</Avatar>
      <Typography sx={{ flex: 1, textAlign: 'left', height: '30px', lineHeight: '32px', px: 1,
        overflow: "hidden", whiteSpace: "nowrap"}} noWrap>
        {feed.name}
      </Typography>
      <Typography sx={{ overflow: "hidden", flex: 1, whiteSpace: "nowrap", textAlign: 'left' }} noWrap>{stripHtml(title)}</Typography>
    </AccordionSummary>
    <AccordionDetails sx={{
          textAlign: "left",
    }}>
      <div className="story-content" dangerouslySetInnerHTML={{ __html: body }}></div>
      <div style={{"clear": "both"}}></div>
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
  )
};

export default Story;
