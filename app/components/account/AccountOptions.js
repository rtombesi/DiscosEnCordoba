import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import { map } from "lodash";
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AccountOptions(props) {
  const { userInfo, toastRef, setReloadUserInfo } = props;
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const selectedComponent = (key) => {
    switch (key) {
      case "displayName":
        setRenderComponent(
          <ChangeDisplayNameForm
            displayName={userInfo.displayName}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setReloadUserInfo={setReloadUserInfo}
          />
        );
        setShowModal(true);
        break;
      case "email":
        setRenderComponent(
          <ChangeEmailForm
            email={userInfo.email}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setReloadUserInfo={setReloadUserInfo}
          />
        );
        setShowModal(true);
        break;
      case "password":
        setRenderComponent(
          <ChangePasswordForm setShowModal={setShowModal} toastRef={toastRef} />
        );
        setShowModal(true);
        break;
      default:
        setRenderComponent(null);
        setShowModal(false);
        break;
    }
  };

  const menuOptions = generateOptions(selectedComponent);

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft,
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight,
          }}
          containerStyle={styles.menuItem}
          onPress={menu.onPress}
        />
      ))}
      {renderComponent && (
        <Modal isVisible={showModal} setIsVisible={setShowModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

function generateOptions(selectedComponent) {
  return [
    {
      title: "Cambiar Nombre y Apellido",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#c1c1c1",
      iconNameRight: "chevron-right",
      iconColorRight: "#c1c1c1",
      onPress: () => selectedComponent("displayName"),
    },
    {
      title: "Cambiar Email",
      iconType: "material-community",
      iconNameLeft: "email",
      iconColorLeft: "#c1c1c1",
      iconNameRight: "chevron-right",
      iconColorRight: "#c1c1c1",
      onPress: () => selectedComponent("email"),
    },
    {
      title: "Cambiar Contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#c1c1c1",
      iconNameRight: "chevron-right",
      iconColorRight: "#c1c1c1",
      onPress: () => selectedComponent("password"),
    },
  ];
}

const styles = StyleSheet.create({
  menuItem: {
    borderWidth: 1,
    borderColor: "#e3e3e3",
  },
});
