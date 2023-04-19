/* eslint-disable react-native/no-inline-styles */
import React from "react";

import { ViewStyle } from "react-native";

import Modal from "react-native-modal";

interface CustomModalProps {
  testID?: string;

  isVisible: boolean;

  onBackdropPress?(): void;

  children?: React.ReactNode;

  modalProps?: object;

  style?: ViewStyle;
}

export default function CustomModal(props: CustomModalProps) {
  return (
    <Modal
      {...props.modalProps}
      useNativeDriver
      hideModalContentWhileAnimating
      animationInTiming={300}
      isVisible={props.isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackButtonPress={props.onBackdropPress}
      onBackdropPress={props.onBackdropPress}
      onSwipeComplete={props.onBackdropPress}
      style={[
        { display: "flex", justifyContent: "flex-end", margin: 0 },
        props.style,
      ]}
    >
      {props.children}
    </Modal>
  );
}
