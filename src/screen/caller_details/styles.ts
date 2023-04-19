import { StyleSheet } from 'react-native';
import { widthPercentageToDP as WP } from 'react-native-responsive-screen';
import { COLORS, SIZE } from '../../../assets/theme';

export const styles = StyleSheet.create({
container: {
      marginTop: WP(20),
      flex: 1,
      backgroundColor: COLORS.background
    },
image: {
    width: WP(90),
    height: WP(90),
    marginBottom: WP(2.7),
    borderRadius: WP(10)
   
  },
  content: {
    justifyContent: "center",
    alignSelf: "center"
  },
  text: {
    fontSize: SIZE.h10,
    color: COLORS.gray,
    marginTop: WP(1), 
  },
  headerText: {
    fontSize: SIZE.h12,
    color: COLORS.lightBlack,
    marginRight: WP(2)
  },
  viewStyle: {
    flexDirection: "row",
    marginVertical: WP(2)
  },
});
