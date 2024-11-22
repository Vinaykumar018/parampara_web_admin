import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSliders } from '../../slices/slidersSlice';

const Slider = () => {
  const dispatch = useDispatch();
  const { sliders, loading, error } = useSelector((state) => state.sliders); // Access state.sliders instead of state.webSlider

  useEffect(() => {
    if (!loading) {
      dispatch(fetchSliders());
    }
  }, [loading, dispatch]);

  useEffect(() => {
    console.log('Sliders:', sliders); // Log the sliders whenever they change
  }, [sliders]);

  useEffect(() => {
    if (error) {
      console.error('Error fetching sliders:', error); // Log errors if fetch fails
    }
  }, [error]);

  return <></>;
};

export default Slider;
