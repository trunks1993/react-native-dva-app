import { StyleSheet } from 'react-native';
import HomeStyles from './home.css';
import NoticeStyles from './notice.css';

const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    titleIcon: {
        width: 250,
        height: 65,
        display: "flex",
        // alignItems: "center",
        justifyContent: "center"
    },
    font_28: {
        color: '#ffffff',
        marginLeft: 31,
        fontSize: 28,
    },
    font_52: {
        color: '#ffffff',
        marginLeft: 31,
        fontSize: 52,
    },
    font_20: {
        color: '#ffffff',
        marginLeft: 31,
        fontSize: 20,
    },
})

export { HomeStyles, NoticeStyles };

export default GlobalStyles;
