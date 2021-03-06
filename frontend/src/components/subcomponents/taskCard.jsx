/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Card, Checkbox, CardContent, IconButton, Collapse, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import '../../css/taskCard.css';

function ExpandIcon({ open }) {
  if (open === true) {
    return <ExpandMoreIcon sx={{ color: 'black' }} />;
  }
  return <ExpandLessIcon sx={{ color: 'black' }} />;
}

function TaskCard({
  taskID, checked = false, setChecked, name, description,
}) {
  const [expand, setExpand] = useState(false);

  return (
    <div>
      <Card>
        <CardContent sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
          <div id="checkAndName">
            <Checkbox checked={checked || false} onChange={() => setChecked(taskID, !checked)} sx={{ color: 'black', '&.Mui-checked': { color: '#4AA7AC' } }} />
            <Typography
              sx={{
                display: 'flex',
                pt: '.6rem',
              }}
            >
              {name}
            </Typography>
          </div>
          <IconButton onClick={() => setExpand(!expand)}>
            <ExpandIcon open={expand} />
          </IconButton>
        </CardContent>
        <Collapse in={expand}>
          <CardContent>
            <p id="desc">{description}</p>
          </CardContent>
        </Collapse>
      </Card>
      <div id="lowerBorder" />
    </div>
  );
}

ExpandIcon.propTypes = {
  open: PropTypes.bool.isRequired,
};

TaskCard.propTypes = {
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default TaskCard;
