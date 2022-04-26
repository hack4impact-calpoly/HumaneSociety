/* eslint-disable react/prop-types */
import { React, useState } from 'react';
import DatePicker from 'sassy-datepicker';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography, Grid } from '@mui/material';
import CircularProgressWithLabel from './circularProgress';
import Taskbar from './taskbar';
import '../css/tasks.css';

export default function Task() {
  const [date, setDate] = useState(new Date());

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const setDateBack = () => {
    const yesterday = new Date(new Date().setDate(date.getDate() - 1));
    setDate(yesterday);
  };

  // selected date for calendar doesnt move
  const setDateForward = () => {
    const tomorrow = new Date(new Date().setDate(date.getDate() + 1));
    setDate(tomorrow);
  };

  return (
    <div>
      <Taskbar />
      <Grid
        className="main"
        container
        direction="row"
      >
        <Grid item xs={3}>
          <DatePicker onChange={onChange} selected={date} />
        </Grid>
        <Grid
          item
          xs={9}
          container
          direction="column"
          justifyContent="sflex-start"
          alignItems="flex-start"
        >
          <Grid item sx={{ paddingBottom: 5 }}>
            <Grid
              className="dateSelector"
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Grid item>
                <IconButton
                  aria-label="back"
                  sx={{ color: '#1d4d71' }}
                  size="large"
                  onClick={setDateBack}
                >
                  <ArrowBackIosIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography
                  variant="h5"
                  style={{ fontWeight: 600 }}
                  sx={{ color: '#1d4d71' }}
                >
                  {`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="forward"
                  sx={{ color: '#1d4d71' }}
                  size="large"
                  onClick={setDateForward}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <CircularProgressWithLabel value={50} />
            { /* tasks go here */}
            <p>2/4 tasks completed</p>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
