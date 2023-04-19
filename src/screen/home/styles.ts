import { StyleSheet } from 'react-native';
import { widthPercentageToDP as WP } from 'react-native-responsive-screen';
import { COLORS, SIZE } from '../../../assets/theme';

export const styles = StyleSheet.create({
    container: {
     flex: 1,
      backgroundColor: COLORS.white,
      marginTop: WP(18.5),
      padding:WP(4)
    },
    content: {
        backgroundColor: COLORS.background,
        borderRadius: WP(2.7),
        flexDirection: "row",
        width: "100%",
        marginVertical: WP(2),
        height: WP(16),  
    },
    contact: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: WP(3),
    },
    hwaderText: {
        fontSize: SIZE.h13,
        color: COLORS.gray,
        alignSelf: "center",
        marginVertical: WP(4),
    },
    text: {
      fontSize: SIZE.h11,
      color: COLORS.black,
      alignSelf: "center",
      marginVertical: WP(4),
    },
    searchInput: {
      paddingHorizontal: WP(2.7),
      paddingVertical: WP(5),
      borderRadius: WP(1.875),
      borderColor: COLORS.gray,
      marginHorizontal: WP(2.7),
      marginBottom: WP(2.7),
      backgroundColor: COLORS.background,
    },
    image: {
        width: WP(8.5),
        height: WP(8.5),
        borderRadius: WP(18.5),
        margin: WP(3.2), 
    },
  });