import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  img:{
    width: 100,
    height: 100
  },

  progress: {
    height: 3,
    width: 0,
    backgroundColor: '#f00',
    position: 'absolute',
    top: 0,
    left: 0,
    animation: '$progress 1s linear',
  },
  '@keyframes progress': {
    to: {
      backgroundColor: 'rgb(149, 59, 190)',
      width: '100%',
    },
  },
});

export default styles;
