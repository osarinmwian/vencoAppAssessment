import {
  AppState,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Permission,
} from "react-native";
import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";

export default function App() {
  let [error, setError] = useState("");
  let [contacts, setContacts] = useState<Contacts.Contact[] | undefined>(
    undefined
  );
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.Birthday,
            Contacts.Fields.Emails,
            Contacts.Fields.FirstName,
            Contacts.Fields.LastName,
            Contacts.Fields.PhoneNumbers,
          ],
        });

        if (data.length > 0) {
          setContacts(data);
        } else {
          setError("No contacts found");
        }
      } else {
        setError("Permission to access contacts denied.");
      }
    })();
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === "active") {
        Alert.alert("Incoming call", "You have an incoming call!", [
          { text: "Answer", onPress: () => console.log("Answer pressed") },
          { text: "Ignore", onPress: () => console.log("Ignore pressed") },
        ]);
      }
    };

    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      AppState.currentState;
    };
  }, []);

  let getContactData = (data: any[] | undefined, property: string) => {
    if (data) {
      return data.map((data, index) => {
        return (
          <View key={index}>
            <Text>
              {data.label}: {data[property]}
            </Text>
          </View>
        );
      });
    }
  };

  let getContactRows = () => {
    if (contacts !== undefined) {
      return contacts.map((contact, index) => {
        return (
          <View key={index} style={styles.contact}>
            <Text>
              Name: {contact.firstName} {contact.lastName}
            </Text>
            {contact.birthday ? (
              <Text>
                Birthday: {contact.birthday.month}/{contact.birthday.day}/
                {contact.birthday.year}
              </Text>
            ) : undefined}
            {getContactData(contact.phoneNumbers, "number")}
            {getContactData(contact.emails, "email")}
          </View>
        );
      });
    } else {
      return <Text>Awaiting contacts...</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>{getContactRows()}</ScrollView>
      <Text>{error}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contact: {
    marginVertical: 8,
  },
});
