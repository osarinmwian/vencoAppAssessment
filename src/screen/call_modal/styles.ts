import { StyleSheet } from 'react-native';
import { widthPercentageToDP as WP } from 'react-native-responsive-screen';
import { COLORS, SIZE } from '../../../assets/theme';

export const styles = StyleSheet.create({
  modal: {
    width: "99%",
    borderTopLeftRadius: WP(6),
    borderTopRightRadius: WP(6),
    height: WP(100),
    backgroundColor: COLORS.background,
    padding: WP(2.7),
    alignSelf: "center",
    marginTop: WP(10),
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
    color: COLORS.white,
    alignSelf: "center",
  },
  addTask: {
    marginVertical: WP(4),
    alignSelf: "center",
    color: COLORS.purple,
    fontSize: SIZE.h8,
    fontWeight: "bold",
  },
});
