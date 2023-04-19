import React from "react";
import { View, Text, Image } from "react-native";

const ContactDetails = ({ route }: any) => {
  const { contact } = route.params;

  return (
    <View>
      <Image source={{ uri: contact.thumbnailPath }} />
      <Text>
        {contact.firstName} {contact.lastName}
      </Text>
      {contact.birthday ? (
        <Text>
          Birthday: {contact.birthday.month}/{contact.birthday.day}/
          {contact.birthday.year}
        </Text>
      ) : null}
      {contact.phoneNumbers ? (
        <View>
          <Text>Phone numbers:</Text>
          {contact.phoneNumbers.map((phoneNumber: any, index: number) => (
            <Text key={index}>
              {phoneNumber.label}: {phoneNumber.number}
            </Text>
          ))}
        </View>
      ) : null}
      {contact.emails ? (
        <View>
          <Text>Emails:</Text>
          {contact.emails.map((email: any, index: number) => (
            <Text key={index}>
              {email.label}: {email.email}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
};

export default ContactDetails;
