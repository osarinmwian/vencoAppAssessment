import React from "react";
import { View, Text, Image } from "react-native";
import { placeholder } from "../../utils";
import { styles } from "./styles";

const CallerDetailsScreen = ({ route }: any) => {
  const { contact } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: contact.thumbnailPath || placeholder }}
          style={styles.image}
        />
        <View style={styles.viewStyle}>
          <Text style={styles.headerText}>Name:</Text>
          <Text style={styles.text}>
            {contact.firstName} {contact.lastName}
          </Text>
        </View>

        {contact.phoneNumbers ? (
          <View>
            <Text style={styles.headerText}>Phone numbers:</Text>
            {contact.phoneNumbers.map((phoneNumber: any, index: number) => (
              <Text key={index} style={styles.text}>
                {phoneNumber.label}: {phoneNumber.number}
              </Text>
            ))}
          </View>
        ) : null}
        {contact.emails ? (
          <View style={styles.viewStyle}>
            <Text style={styles.headerText}>Emails:</Text>
            {contact.emails.map((email: any, index: number) => (
              <Text key={index} style={styles.text}>
                {email.label}: {email.email}
              </Text>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default CallerDetailsScreen;
