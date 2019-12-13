import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 42,
        color: '#FFFFFF',
        position: "absolute",
        top: 139,
    },
    timeBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    time: {
        fontSize: 120,
        color: '#FFFFFF',
    },
    date: {
        fontSize: 26,
        color: '#FFFFFF',
    },
})
