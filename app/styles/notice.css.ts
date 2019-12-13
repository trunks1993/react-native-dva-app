import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 30,
    },
    headTitle: {  
        position: 'absolute',
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        height: 63,
        width: 260,
    },
    iconBack: {
        width: 50,
        height: 35,
        marginRight: 10,
    },
    btnTools: {
        height: 65,
        marginTop: 46,
        backgroundColor: 'red',
    },
    content: {
        // position: 'absolute',
        // backgroundColor: 'blue',
        // top: 191,
        // bottom: 38,
        // left: 78,
        // right: 78,
        padding: 50,
        paddingBottom: 5,
        height: 571,
        marginTop: 18,
        marginLeft: 78,
        marginRight: 78,
    },
    // contentImg: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     right: 0,

    //     // height: '100%',
    //     // width: '100%',
    // },
    newsTitleBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    newsTitle: {
        fontSize: 22,
        color: 'rgba(255, 255, 255, 0.5)',
    },
    newsContent: {
        marginTop: 18,
    },
    newsContentText: {
        fontSize: 20,
        color: '#ffffff'
    },
})
