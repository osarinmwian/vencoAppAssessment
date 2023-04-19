import {
  AppState,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { encryptNumber, placeholder } from "./src/utils";
import { COLORS } from "./assets/theme";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  let [error, setError] = useState("");
  let [contacts, setContacts] = useState<any | undefined>();

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
            Contacts.Fields.Image,
          ],
        });
        console.log("data", data);
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
      if (nextAppState === "active" && contacts && contacts.length > 0) {
        const storedNumber = await AsyncStorage.getItem("encryptedNumber");
        const incomingCallNumber = contacts[0].phoneNumbers[0].number;
        if (incomingCallNumber === storedNumber) {
          const contact = contacts.find((contact: { phoneNumbers: any[] }) =>
            contact.phoneNumbers.find(
              (phoneNumber: { number: string }) =>
                phoneNumber.number === incomingCallNumber
            )
          );
          if (contact) {
            const navigation = useNavigation();
            navigation.navigate("ContactDetails", { contact });
          } else {
            Alert.alert(
              "Incoming call",
              `phone number ${incomingCallNumber} not found !`,
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
      }
    };
    handleEncryptNumber();
    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      AppState.addEventListener("change", handleAppStateChange);
    };
  }, []);
  const handleEncryptNumber = async () => {
    if (contacts && contacts.length > 0) {
      const incomingCallNumber = contacts[0].phoneNumbers[0].number;
      const encryptedNumber = await encryptNumber(incomingCallNumber);
      await AsyncStorage.setItem("encryptedNumber", encryptedNumber);
    }
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
      return contacts.map((contact: any, index: any) => {
        return (
          <View key={index} style={styles.contact}>
            <View
              style={{
                backgroundColor: COLORS.background,

                marginVertical: 5,
                borderRadius: 10,
                flexDirection: "row",
                width: "100%",
                height: 50,
              }}
            >
              <Image
                source={{ uri: contact.thumbnailPath || placeholder }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,

                  margin: 10,
                }}
              />
              <View>
                <Text style={{ marginTop: 15 }}>
                  {contact.firstName} {contact.lastName}
                </Text>
              </View>

              {/* {contact.birthday ? (
                <Text>
                  Birthday: {contact.birthday.month}/{contact.birthday.day}/
                  {contact.birthday.year}
                </Text>
              ) : undefined}
              {getContactData(contact.phoneNumbers, "number")}
              {getContactData(contact.emails, "email")} */}
            </View>
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
    backgroundColor: COLORS.white,
    marginTop: 50,
  },
  contact: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
});
