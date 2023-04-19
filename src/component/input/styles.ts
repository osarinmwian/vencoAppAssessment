import { StyleSheet } from 'react-native';
import { widthPercentageToDP as WP } from 'react-native-responsive-screen';
import { COLORS, SIZE } from '../../../assets/theme';
export const styles = StyleSheet.create({
  viewInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: '100%',
    fontSize: SIZE.h4,
  },
  container: {
    padding: WP(4.3),
  },
  input: {
    height: WP(13.5),
    paddingHorizontal: WP(4),
    borderRadius: WP(2),
    borderColor: COLORS.gray,
    borderWidth: WP(0.15),
    color: COLORS.white,
  },
  inputStyle: {
    height: WP(60),
    fontSize: SIZE.h5,
    color: COLORS.black,
  },
  labelStyle: { fontSize: WP(2), color: COLORS.gray },
  placeholderStyle: { fontSize: SIZE.h5, color: COLORS.gray },
  textErrorStyle: { fontSize: SIZE.h5, color: COLORS.gray },
});
