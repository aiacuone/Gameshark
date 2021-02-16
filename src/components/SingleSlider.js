import React from 'react'
import Slider from '@material-ui/core/Slider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


export default function SingleSlider({title,setValue,value,min,max,step}) {
// export default function newSlider() {


    // console.log(title,value,setValue)


    const handleChange = (e,val) => {
        setValue(val);
    };

    const muiTheme = createMuiTheme({
        overrides:{
            MuiSlider: {
                thumb:{
                    color: "black",
                },
                track: {
                    color: 'red'
                },
                rail: {
                    color: 'blue'
                }
            }
        }
    });

    return (
        <div style={{width:300,margin:50}}>
            <h3>{title}</h3>
            <ThemeProvider theme={muiTheme}>
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="off"
                    min={min}
                    max={max}
                    step={step&&step}
                    // ThumbComponent={'svg'}
                />
                <h5>{value}</h5>
            </ThemeProvider>
        </div>
    );
}