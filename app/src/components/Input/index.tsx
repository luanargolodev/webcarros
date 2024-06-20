import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {}

export function Input({ ...rest }: Props) {
  return (
    <TextInput
      {...rest}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
    borderWidth: 1,
    height: 40,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 4,
  }
})