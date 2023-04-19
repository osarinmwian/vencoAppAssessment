import {
  AppState,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  TextInput,
} from "react-native";
import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { encryptNumber, placeholder } from "../../utils";
import { COLORS, SIZE } from "../../../assets/theme";

export default function HomeScreen() {
  let [error, setError] = useState("");
  let [contacts, setContacts] = useState<any | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
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
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };
  let getContactRows = () => {
    let filteredContacts = contacts?.filter((contact: any) =>
      contact.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredContacts?.length > 0) {
      return filteredContacts.map((contact: any, index: any) => {
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
            </View>
          </View>
        );
      });
    } else {
      return <Text style={styles.text}>No contacts found.</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Contacts</Text>
      <TextInput
        placeholder="Search"
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearch}
      />
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
  text: {
    fontSize: SIZE.h10,
    color: COLORS.gray,
    alignSelf: "center",
    marginVertical: 10,
  },
  searchInput: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    borderColor: COLORS.gray,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: COLORS.background,
  },
});
