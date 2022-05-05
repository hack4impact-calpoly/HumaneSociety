/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import { React, useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography, Grid } from '@mui/material';
import CircularProgressWithLabel from './circularProgress';
import TaskCard from './taskCard';
import Taskbar from './taskbar';
import '../css/tasks.css';

const testTasks = [
  {
    title: 'task1',
    desc: 'task1 desc',
  },
  {
    title: 'task2',
    desc: 'task2 desc',
  },
  {
    title: 'task3',
    desc: 'task3 desc',
  },
  {
    title: 'task4',
    desc: 'task4 desc',
  },
  {
    title: 'task5',
    desc: 'task5 desc',
  },
];

export default function Task() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState(testTasks);
  const [checked, setChecked] = useState(new Map()); // will need to loop over tasks to init map
  const [completion, setCompletion] = useState(0);
  useEffect(() => {
    // fetch date's tasks and update state
    // setTasks(testTasks);
  }, [date]);

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const setDateBack = () => {
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    setDate(yesterday);
  };

  const setDateForward = () => {
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow);
  };

  const getChecked = (title) => {
    // returns if a task is checked, false if not in checked map
    const isChecked = checked.get(title);
    return isChecked || false;
  };

  const getNumComplete = () => {
    let numComplete = 0;
    checked.forEach((key, value) => {
      if (value) {
        numComplete += 1;
      }
    });
    return numComplete;
  };

  const onCheckedChange = (title, isChecked) => {
    const temp = new Map(checked);
    if (isChecked) {
      temp.set(title, isChecked);
    } else {
      temp.delete(title);
    }
    setChecked(temp);
  };

  useEffect(() => {
    // determine completion progress when checked is changed
    const numTasks = tasks.length;
    const numComplete = getNumComplete();
    setCompletion(Math.floor((numComplete / numTasks) * 100));
  }, [checked]);

  return (
    <div>
      <Taskbar />
      <Grid
        className="main"
        container
        direction="row"
        spacing={0.5}
      >
        <Grid item lg={3} sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} color="secondary" />
          </LocalizationProvider>
        </Grid>
        <Grid
          item
          lg={3}
          md={4}
          xs={4}
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item sx={{ paddingBottom: 10 }}>
            <Grid
              className="dateSelector"
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              wrap="nowrap"
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
            <CircularProgressWithLabel value={completion} />
          </Grid>
        </Grid>
        <Grid item lg={6} md={8} xs={8} sx={{ paddingTop: 5, paddingBottom: 3 }}>
          <Typography variant="body1" id="subtitle" align="right">
            {`${getNumComplete()}/${tasks.length} tasks completed`}
          </Typography>
          {tasks.map((task, index) => (
            <div key={index}>
              <TaskCard
                name={task.title}
                description={task.desc}
                checked={getChecked(task.title)}
                setChecked={onCheckedChange}
              />
            </div>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}