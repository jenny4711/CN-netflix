
// import React, { useState, useEffect } from "react";
// import { Range, getTrackBackground } from "react-range";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styled from 'styled-components';
import oc from 'open-color';
// import '../CSS/Range.css'

import React from 'react'

export default  ()=>({min,max,value,pushable,allowCross, ariaLabelGroupForHandles,ariaLabelledByGroupForHandles,tabIndex,onChange}) => (
  <>
    <Slider.range 
   
    className='t-slider'
    min={min}
    max={max}
    value={value}
    defaultValue={[1990, 2022]}
    allowCross={allowCross}
    pushable={pushable}
    ariaLabelGroupForHandles={ariaLabelGroupForHandles}
    ariaLabelledByGroupForHandles={ariaLabelledByGroupForHandles}
    tabIndex={tabIndex}
    tipFormatter={value => `${value}%`}
    count={1}
    onChange={onChange}
    />

  </>
);




