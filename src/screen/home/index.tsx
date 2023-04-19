import {
  AppState,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { encryptNumber, placeholder } from "../../utils";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RouteParmaList } from "../../navigation/parma_list";
import { styles } from "./styles";
import Input from "../../component/input";
import CallModal from "../call_modal";

export default function HomeScreen() {
  let [error, setError] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  let [contacts, setContacts] = useState<any | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation<NavigationProp<RouteParmaList>>();
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
    const incomingCall = setInterval(async () => {
      const randomIndex = Math.floor(Math.random() * contacts.length);
      const currentContact = contacts[randomIndex];
      const incomingCallNumber = currentContact.phoneNumbers[0].number;
      const encryptedNumber = await encryptNumber(incomingCallNumber);
      await AsyncStorage.setItem("encryptedNumber", encryptedNumber);
      if (!contacts || contacts.length === 0) {
        Alert.alert(
          "Incoming call",
          "You have an incoming call from an unknown number",
          [
            {
              text: "Answer",
              onPress: () => {
                navigation.navigate("CallerDetailsScreen", {
                  contact: currentContact,
                });
              },
            },
            {
              text: "Ignore",
              onPress: () => console.log("Ignore pressed"),
              style: "cancel",
            },
          ]
        );
        return;
      }

      Alert.alert(
        "Incoming call",
        `You have an incoming call from ${currentContact.firstName || "Anna"} ${
          currentContact.lastName || "Haro"
        } (${incomingCallNumber}),  ${
          currentContact.emails?.[0].email || "anaharo24@gmail.com"
        }`,
        [
          {
            text: "Answer",
            onPress: () => {
              navigation.navigate("CallerDetailsScreen", {
                contact: currentContact,
              });
            },
            style: "cancel",
          },
          {
            text: "Ignore",
            onPress: () => console.log("Ignore pressed"),
            style: "cancel",
          },
        ]
      );
    }, 10000000);

    handleEncryptNumber();
    AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "background") {
        clearInterval(incomingCall);
      }
    });

    return () => {
      clearInterval(incomingCall);
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
            <TouchableOpacity
              style={styles.content}
              onPress={() => toggleModal()}
            >
              <Image
                source={{ uri: contact.thumbnailPath || placeholder }}
                style={styles.image}
              />
              <View>
                <Text style={styles.text}>
                  {contact.firstName} {contact.lastName}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      });
    } else {
      return <Text style={styles.text}>No contacts found.</Text>;
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.hwaderText}>Contacts</Text>
        <Input
          placeholder="Search"
          inputStyle={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <ScrollView>{getContactRows()}</ScrollView>
        <Text>{error}</Text>
      </SafeAreaView>
      <CallModal
        isVisible={isModalVisible}
        closeModal={() => setModalVisible(!isModalVisible)}
      />
    </>
  );
}
