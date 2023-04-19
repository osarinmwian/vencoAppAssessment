import { StyleSheet } from 'react-native';
import { widthPercentageToDP as WP } from 'react-native-responsive-screen';
import { COLORS, SIZE } from '../../../assets/theme';

export const styles = StyleSheet.create({
container: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginTop: WP(18.5),
        padding: WP(4),
        justifyContent: "center",
        alignItems: "center",
        
      },
  modal: {
    width: "90%",
    borderRadius: WP(6),
    height: WP(50),
    backgroundColor: COLORS.background,
    padding: WP(2.7),
    alignSelf: "center",
    marginTop: WP(10),
    justifyContent: "center",
    alignItems: "center",
   
  },
  textIputView: {
    marginTop: WP(20),
  },
 
  touchable: {
    marginVertical: WP(2),
    backgroundColor: COLORS.purple,
    width: WP(20),
    borderRadius: WP(2),
    padding: WP(2.5),
    marginTop: WP(5),
    alignSelf: "flex-end",
  },
  text: {
    color: COLORS.gray,
    alignSelf: "center",
    fontSize: SIZE.h6,
  },
});
