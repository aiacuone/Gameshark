import React from 'react';
import Slider from '@material-ui/core/Slider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


export default function RangeSlider({title,value,setValue,min,max,step}) {

  const handleChange = (e,val) => {
    setValue(val);
  };

  const muiTheme = createMuiTheme({
    overrides:{
      MuiSlider: {
        thumb:{
          color: "white",
        },
        track: {
          color: 'grey'
        },
        rail: {
          color: 'black'
        }
      }
    }
  });

  return (
    <div style={{width:200,margin:30}}>
        <h3>{title}</h3>
        <ThemeProvider theme={muiTheme}>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="off"
                min={min}
                max={max}
                step={step&&step}
            />
            <h5>{value[0] +' - '+ value[1]}</h5>
        </ThemeProvider>
    </div>
  );
}