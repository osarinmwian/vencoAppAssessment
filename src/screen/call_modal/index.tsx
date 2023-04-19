import React, { useState } from "react";
import { View, Text } from "react-native";
import CustomModal from "../../component/modal";
import { styles } from "./styles";

type Props = {
  isVisible: boolean;
  closeModal?: () => void;
};

const CallModal = (props: Props) => {
  return (
    <CustomModal isVisible={props.isVisible} onBackdropPress={props.closeModal}>
      <View style={styles.modal}>
        <Text>Man</Text>
      </View>
    </CustomModal>
  );
};

export default CallModal;
