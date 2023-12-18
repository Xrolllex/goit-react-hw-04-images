import React from 'react';
import { LineWave } from 'react-loader-spinner';
import css from './loader.module.css';

const Loader = () => {
  return (
    <div className={css.loaderContainer}>
      <LineWave color="#00BFFF" height={200} width={200}/>
    </div>
  );
};

export default Loader;