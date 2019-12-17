import { StyleSheet } from 'react-native';
import HomeStyles from './home.css';
import NoticeStyles from './notice.css';
import WarmPromptStyles from './warmPrompt.css';
import FeelingStyles from './feeling.css';
import LivingStyles from './living.css';
import OrderStyles from './order.css';
import SearchStyles from './search.css';
import AwaitStyles from './await.css';

const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
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
    // components
    // header
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 30,
    },
    headerLeft: {  
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        height: 63,
        width: 260,
    },
    titleRight: { fontSize: 20, color: '#ffffff' }
})

export { HomeStyles, NoticeStyles, WarmPromptStyles, FeelingStyles, LivingStyles, OrderStyles, SearchStyles, AwaitStyles };

export default GlobalStyles;
