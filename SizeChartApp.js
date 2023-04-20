import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const SizeChartApp = () => {
  const [bust, setBust] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [size, setSize] = useState('');

  const MIN_BUST_CM = 81.28; 
  const MIN_WAIST_CM = 60.96; 
  const MIN_HIPS_CM = 86.36; 

 
  const S_SIZE_CM = {
    bust_min: 81.28, 
    bust_max: 86.36, 
    waist_min: 60.96, 
    waist_max: 66.04, 
    hips_min: 86.36, 
    hips_max: 91.44 
  };

  const M_SIZE_CM = {
    bust_min: 86.36, 
    bust_max: 91.44, 
    waist_min: 66.04, 
    waist_max: 71.12, 
    hips_min: 91.44, 
    hips_max: 96.52 
  };

  const L_SIZE_CM = {
    bust_min: 91.44, 
    bust_max: 96.52, 
    waist_min: 71.12, 
    waist_max: 76.2, 
    hips_min: 96.52, 
    hips_max: 101.6 
  };

  const XL_SIZE_CM = {
    bust_min: 96.52, 
    bust_max: 101.6, 
    waist_min: 76.2, 
    waist_max: 81.28, 
    hips_min: 101.6, 
    hips_max: 106.68 
  };

  function handleCalculateSize() {
    let newSizes = [];

    
    if (bust < MIN_BUST_CM || waist < MIN_WAIST_CM || hips < MIN_HIPS_CM) {
     
      setSize("Error: Please enter valid measurements.");
      return;
    }
  
    if (bust >= S_SIZE_CM.bust_min && bust < S_SIZE_CM.bust_max && waist >= S_SIZE_CM.waist_min && waist < S_SIZE_CM.waist_max && hips >= S_SIZE_CM.hips_min && hips < S_SIZE_CM.hips_max) {
      newSizes.push("S");
    } 
  
    if (bust >= M_SIZE_CM.bust_min && bust < M_SIZE_CM.bust_max && waist >= M_SIZE_CM.waist_min && waist < M_SIZE_CM.waist_max && hips >= M_SIZE_CM.hips_min && hips < M_SIZE_CM.hips_max) {
      newSizes.push("M");
    }
  
    if (bust >= L_SIZE_CM.bust_min && bust < L_SIZE_CM.bust_max && waist >= L_SIZE_CM.waist_min && waist < L_SIZE_CM.waist_max && hips >= L_SIZE_CM.hips_min && hips < L_SIZE_CM.hips_max) {
      newSizes.push("L");
    }
  
    if (bust >= XL_SIZE_CM.bust_min && bust < XL_SIZE_CM.bust_max && waist >= XL_SIZE_CM.waist_min && waist < XL_SIZE_CM.waist_max && hips >= XL_SIZE_CM.hips_min && hips < XL_SIZE_CM.hips_max) {
      newSizes.push("XL");
    }
  
    if (newSizes.length === 0) {
      
      setSize("Error: No size found for given measurements.");
      return;
    }
  
    setSize(newSizes.join(", "));
  }

  return (
    <div>
      <p>Add measurements manually</p>

      <Form>
        <Row>
          <Col>
            <Form.Group controlId="formBust">
              <Form.Label>Bust measurement:</Form.Label>
              <Form.Control type="text" value={bust} onChange={e => setBust(parseFloat(e.target.value))} />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formWaist">
              <Form.Label>Waist measurement:</Form.Label>
              <Form.Control type="text" value={waist} onChange={e => setWaist(parseFloat(e.target.value))} />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formHips">
              <Form.Label>Hips measurement:</Form.Label>
              <Form.Control type="text" value={hips} onChange={e => setHips(parseFloat(e.target.value))} />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="dark" classaName="" onClick={handleCalculateSize}>Calculate size</Button>
      </Form>

      {size.startsWith("Error") ? (
        <p style={{ color: "red"}}>{size}</p>
      ) : (
        <p>Recommended size: {size}</p>
      )}
    </div>
  );
};

export default SizeChartApp;
