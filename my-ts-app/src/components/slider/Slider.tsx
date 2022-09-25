import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}m`;
}

export default function DiscreteSlider() {
  return (
    <Box sx={{  display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Slider
        sx={{ margin: 'auto'}}
        aria-label="Temperature"
        defaultValue={30}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={3}
        marks
        min={300}
        max={700}
      />
      {/* <Slider defaultValue={30} step={10} marks min={10} max={110} disabled /> */}
    </Box>
  );
}