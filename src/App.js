//import './App.css';
import { useEffect, useState } from 'react';
import { Grid, Button, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// to do:
/*
  - implement HTTP POST when ready for web server
  - add color picker
  - drag to color multiple cells 
    -> can be down with mouse down, trace location of cells and if we go over then hit (used to do this with python)
  - clean up UI
*/



function App() {

  const [grid, setGrid] = useState([]);
  const [color, setColor] = useState('#f00');

  // create 32x64 grid
  useEffect(() => {
    const matrix = new Array(32).fill(0).map(() => new Array(64).fill('#fff')); // 0,0 0,1 0,2 ... 0,63
    setGrid(matrix);
  }, []);
  
  // what to do when a cell is selected
  const handleClick = ((x, y) => {
    const temp = [...grid];
    const preVal = temp[x][y];
    temp[x][y] = preVal === color ? "#fff" : color;
    setGrid(temp);
  });

  // reset grid to new
  const handleReset = ((e) => {
    e.preventDefault();
    const matrix = new Array(32).fill(0).map(() => new Array(64).fill('#fff')); // 0,0 0,1 0,2 ... 0,63
    setGrid(matrix);
  });

  // POST grid object over http to web server
  const handleSubmit = ((e) => {
    e.preventDefault();

    // make http request to web server here, wait for response, catch any errors and display
  });

  return (
    <div>
      <div className="s">
          {grid.map((_, id) => (
            <Grid container spacing={ .5 } justifyContent="center">
            {_.map((_, index) => (
              <Grid item xs={.12} ys={.2} key={index}>
                <div style={{height: "1em", width: "1em", backgroundColor: grid[id][index], borderStyle: "solid"}} onClick={() => handleClick(id, index)}></div>
              </Grid>
            ))}
            </Grid>
          ))}
      </div>
      <div style={{textAlign: "center"}}>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="#f00"
            name="radio-buttons-group"
            onChange={(value) => setColor(value.target.value)}
          >
            <FormControlLabel value="#f00" control={<Radio />} label="Red" />
            <FormControlLabel value="#00f" control={<Radio />} label="Blue" />
            <FormControlLabel value="#0f0" control={<Radio />} label="Green" />
          </RadioGroup>
        </FormControl>
      </div>
      <div style={{textAlign: "center", marginTop: "5em", justifyContent: "center"}}>
      <Button variant="contained" onClick={((e) => handleReset(e))} style={{marginRight: "1em"}}>
        Reset
      </Button>
      <Button variant="contained" endIcon={<SendIcon />} onClick={(e) => handleSubmit(e)}>
        Send
      </Button>
      </div>
    </div>
  );
}

export default App;
