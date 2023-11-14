import { Box } from '@mui/material';

const Story = (props: any) => {
    const {title, feed, body, permalink } = props;

    const stripHtml = (html: string) => html ? html.replace(/<\/?[^>]+(>|$)/g, "") : '';

  return (
    <>
    <Box sx={{
        border: '3px solid white',
        background: 'white',
        borderRadius: '5px',
        mb: 1,
        color: '#484948',
        height: '30px',
        lineHeight: '30px',
        cursor: 'pointer',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'flex',
        direction: 'row',
        gap: '5px',
        textAlign: 'left',
        px: 2
    }}>
        <div style={{
            minWidth: '200px'
        }}>
            {feed.name}:
        </div>
        <div>
            {stripHtml(title)}
        </div>
        <div style={{
            color: '#c5c5c5'
        }}>
            {stripHtml(body)}
        </div>
    </Box>
    <Box sx={{
        border: "3px solid black",
        borderRadius: "5px",
        textAlign: "left",
        px: 2,
        py: 2,
        mb: 2
    }}>
        <div dangerouslySetInnerHTML={{__html: body}}></div>
        <a href={permalink} target="_blank">Link</a>
    </Box>
    </>
  )
}

export default Story