import {
  AppState,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  NativeModules,
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
  const [callStatus, setCallStatus] = useState("idle");
  const [appState, setAppState] = useState<any>(AppState.currentState);
  const telephonyManager = NativeModules.TelephonyManager;
  const [selectedContact, setSelectedContact] = useState<any>();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = (contact: any) => {
    setModalVisible(!isModalVisible);
    setSelectedContact(contact);
  };
  let [contacts, setContacts] = useState<any | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation<NavigationProp<RouteParmaList>>();
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      const handleAppStateChange = (nextAppState: string | any) => {
        if (
          appState.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          Alert.alert("App has come to the foreground!");
        } else if (
          appState === "active" &&
          nextAppState.match(/quit|background/)
        ) {
          Alert.alert("App has gone to the background or is  quit!");
        }
        setAppState(nextAppState);
      };
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
      AppState.addEventListener("change", handleAppStateChange);
    })();
  }, []);

  useEffect(() => {
    const incomingCall = setInterval(async () => {
      if (!contacts || contacts.length === 0) {
        Alert.alert(
          "Incoming call",
          "You have an incoming call from an unknown number",
          [
            {
              text: "Answer",
              onPress: () => {
                navigation.navigate("CallerDetailsScreen", {
                  contact: null,
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

      const randomIndex = Math.floor(Math.random() * contacts.length);
      const currentContact = contacts[randomIndex];
      const phoneNumbers = currentContact.phoneNumbers || [];
      if (phoneNumbers.length === 0) {
        Alert.alert(
          "Incoming call",
          "You have an incoming call from a contact without a phone number",
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

      const incomingCallNumber = phoneNumbers[0].number;
      const encryptedNumber = await encryptNumber(incomingCallNumber);
      await AsyncStorage.setItem("encryptedNumber", encryptedNumber);

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

      if (telephonyManager) {
        const phoneStateListener = {
          onCallStateChanged: function (state: any) {
            switch (state) {
              case telephonyManager.CALL_STATE_IDLE:
                setCallStatus("idle");
                break;
              case telephonyManager.CALL_STATE_OFFHOOK:
                setCallStatus("offhook");
                break;
              case telephonyManager.CALL_STATE_RINGING:
                const incomingNumber = telephonyManager.EXTRA_INCOMING_NUMBER;
                setCallStatus("ringing");
                setCallStatus(incomingNumber);
                break;
              default:
                break;
            }
          },
        };
        telephonyManager.listen(phoneStateListener);
      } else {
        return incomingCallNumber;
      }
    }, 30000);

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
              onPress={() => toggleModal(contact)}
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
        selectedContact={selectedContact}
      />
    </>
  );
}
