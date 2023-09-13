import React from 'react';
import react from '../static/logo.svg';
import mongo from '../static/mongo.svg';
import express from '../static/express.svg';
import node from '../static/node.svg';


function Home() {

  const style = {
    backgroundColor : 'black',
    height : '93.5vh',
    overflowY : 'scroll',
    display: 'flex',
    flexDirection : 'column',
    alignItems : 'center',
    justifyContent : 'space-around',
    fontFamily: 'sans-sarif',
    color : 'white'
  }

  const cardStyle = {
    display: 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    flexWrap : 'wrap'
  }

  const cardStyle2 = {
    border : 'none',
    width : '10rem',
    backgroundColor : 'transparent'
  }

  const imgStyle = {
    height : '100px'
  }

  return (
    <div style={style}>
      <h1>Hello, We are a</h1>
      <div style={cardStyle} >
        <div className="card" style={cardStyle2}>
          <img src={mongo} style={imgStyle} className="card-img-top text-center" alt="..." />
          <div className="card-body">
            <h1 className="card-text text-center" style={{ fontSize: '70px' }}>M</h1>
          </div>
        </div>
        <div className="card" style={cardStyle2}>
          <img src={express} style={imgStyle} className="card-img-top" alt="..." />
          <div className="card-body">
            <h1 className="card-text text-center" style={{ fontSize: '70px' }}>E</h1>
          </div>
        </div>
        <div className="card" style={cardStyle2}>
          <img src={react} style={imgStyle} className="card-img-top" alt="..." />
          <div className="card-body">
            <h1 className="card-text text-center" style={{ fontSize: '70px' }}>R</h1>
          </div>
        </div>
        <div className="card" style={cardStyle2}>
          <img src={node} style={imgStyle} className="card-img-top" alt="..." />
          <div className="card-body">
            <h1 className="card-text text-center" style={{ fontSize: '70px' }}>N</h1>
          </div>
        </div>
      </div>
      <h1>Company</h1>
    </div>
  )
}

export default Home