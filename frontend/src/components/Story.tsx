import { Box, Button, ButtonGroup } from "@mui/material";
import { IoMdDoneAll, IoMdShareAlt, IoMdStar } from "react-icons/io";
import { Link } from "react-router-dom";
import { updateStory } from "../helpers/api";

const Story = (props: any) => {
  const { id, title, feed, body, permalink, onRead } = props;

  const stripHtml = (html: string) =>
    html ? html.replace(/<\/?[^>]+(>|$)/g, "") : "";

  const read = async () => {
    await updateStory(id, {
        isRead: true
    });
    onRead();
  };

  return (
    <>
      <Box
        sx={{
          border: "3px solid white",
          background: "white",
          borderRadius: "5px",
          mb: 1,
          color: "#484948",
          height: "30px",
          lineHeight: "30px",
          cursor: "pointer",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          display: "flex",
          direction: "row",
          gap: "5px",
          textAlign: "left",
          px: 2,
        }}
      >
        <div
          style={{
            minWidth: "200px",
          }}
        >
          {feed.name}:
        </div>
        <div>{stripHtml(title)}</div>
        <div
          style={{
            color: "#c5c5c5",
          }}
        >
          {stripHtml(body)}
        </div>
      </Box>
      <Box
        sx={{
          border: "3px solid black",
          borderRadius: "5px",
          textAlign: "left",
          px: 2,
          py: 2,
          mb: 2,
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: body }}></div>
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
      </Box>
    </>
  );
};

export default Story;
