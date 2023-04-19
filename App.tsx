import {
  AppState,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const encryptNumber = async (phoneNumber: string): Promise<string> => {
  const mapping: {
    [key: string]: string;
    "0": string;
    "1": string;
    "2": string;
    "3": string;
    "4": string;
    "5": string;
    "6": string;
    "7": string;
    "8": string;
    "9": string;
    "+": string;
    "-": string;
    "(": string;
    ")": string;
    " ": string;
  } = {
    "0": "x",
    "1": "b",
    "2": "z",
    "3": "n",
    "4": "m",
    "5": "p",
    "6": "a",
    "7": "s",
    "8": "d",
    "9": "f",
    "+": "t",
    "-": "u",
    "(": "q",
    ")": "w",
    " ": "e",
  };

  let encrypted = "";
  for (let i = 0; i < phoneNumber.length; i++) {
    const char = phoneNumber[i];
    if (char in mapping) {
      encrypted += mapping[char];
    } else {
      encrypted += char;
    }
  }

  // Store encrypted data to database or file system
  // ...

  return encrypted;
};
export default function App() {
  let [error, setError] = useState("");
  let [contacts, setContacts] = useState<Contacts.Contact[] | undefined>(
    undefined
  );
  const [encryptedNumber, setEncryptedNumber] = useState("");

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
    const handleAppStateChange = async (nextAppState: string) => {
      if (nextAppState === "active") {
        const incomingCallNumber = "1234567890"; // example incoming call number
        const storedNumber = await AsyncStorage.getItem("encryptedNumber");
        if (incomingCallNumber === storedNumber) {
          Alert.alert(
            "Incoming call",
            `You have an incoming call from John Doe (${incomingCallNumber})!`,
            [
              {
                text: "Answer",
                onPress: () => console.log("Answer pressed"),
              },
              {
                text: "Ignore",
                onPress: () => console.log("Ignore pressed"),
              },
            ]
          );
        }
      }
    };
    handleEncryptNumber();
    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      AppState.addEventListener("change", handleAppStateChange);
    };
  }, []);
  const handleEncryptNumber = async () => {
    const incomingCallNumber = "1234567890"; // example incoming call number
    const encryptedNumber = await encryptNumber(incomingCallNumber); // encrypt the incoming call number
    setEncryptedNumber(encryptedNumber);
    await AsyncStorage.setItem("encryptedNumber", encryptedNumber); // store the encrypted number in AsyncStorage
  };

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
