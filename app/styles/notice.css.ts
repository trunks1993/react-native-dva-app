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
        // height: 65,
        marginTop: 46,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 78,
        alignItems: 'center',
    },
    btn: {
        width: 180,
        height: 64,
        marginRight: 82,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: '#70D6FC',
        fontSize: 24,
    },
    content: {
        padding: 50,
        paddingBottom: 5,
        height: 571,
        marginTop: 18,
        marginLeft: 78,
        marginRight: 78,
    },
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
    // noticeDetail
    info: {
        height: 660,
        marginTop: 33,
        marginLeft: 80,
        marginRight: 80,
        paddingLeft: 60,
        paddingRight: 60,
    },
    detailTitleBox: {
        height: 139,
        borderBottomWidth: 1,
        borderBottomColor: '#1AC4C6',
        paddingTop: 43,
    },
    detailTitle: {
        color: '#ffffff',
        fontSize: 30,
        lineHeight: 30,
    },
    detailTime: {
        color: '#ffffff',
        fontSize: 20,
        lineHeight: 20,
        marginTop: 21,
    },
    detailContentBox: {
        marginTop: 30,
        height: 480,
    }
})
