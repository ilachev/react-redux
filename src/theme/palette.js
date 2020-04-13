import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export default {
    black,
    white,
    primary: {
        contrastText: white,
        dark: colors.blue[900],
        main: colors.blue[600],
        light: colors.blue[300]
    },
    secondary: {
        contrastText: white,
        dark: colors.indigo[900],
        main: colors.indigo[600],
        light: colors.indigo[100]
    },
    error: {
        contrastText: white,
        dark: colors.red[900],
        main: colors.red[600],
        light: colors.red[400],
        ease: colors.red[100],
    },
    success: {
        contrastText: white,
        dark: colors.green[900],
        main: colors.green[600],
        light: colors.green[400],
        ease: colors.green[100],
    },
    text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600],
        link: colors.blue[600]
    },
    link: colors.blue[800],
    icon: colors.blueGrey[600],
    background: {
        default: '#F4F6F8',
        paper: white
    },
    divider: colors.grey[200]
};