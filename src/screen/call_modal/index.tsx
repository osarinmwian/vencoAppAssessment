import React, { useState } from "react";
import { View, Text, Linking, Alert } from "react-native";
import CustomModal from "../../component/modal";
import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  isVisible: boolean;
  closeModal: () => void;
  selectedContact: any;
};

const CallModal = (props: Props) => {
  const callFriendTapped = () => {
    Linking.openURL(`tel:${props.selectedContact?.phoneNumbers}`).catch((err) =>
      Alert.alert("Failed to open phone app", err.message)
    );
  };
  console.log("SLECTED_CONTACTS", props.selectedContact);
  return (
    <CustomModal
      isVisible={props.isVisible}
      onBackdropPress={props.closeModal}
      style={{ justifyContent: "center" }}
    >
      <View style={styles.modal}>
        <Text style={styles.text}>
          {props.selectedContact?.firstName} {props.selectedContact?.lastName}
        </Text>
        <Text style={styles.text}></Text>
        <TouchableOpacity onPress={() => callFriendTapped()}>
          <Feather name="phone-call" size={50} color="black" />
        </TouchableOpacity>
        {props.selectedContact?.phoneNumbers.map((phoneNumber: any) => (
          <>
            <View key={phoneNumber.id}></View>
            <Text style={styles.text}>{phoneNumber.number}</Text>
          </>
        ))}
      </View>
    </CustomModal>
  );
};

export default CallModal;
