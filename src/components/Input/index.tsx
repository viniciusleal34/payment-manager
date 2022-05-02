import React, { useEffect, useRef, useState, useCallback } from "react";
import { Text, TouchableOpacity, TextInputProps } from "react-native";
import { useField } from "@unform/core";
import { Container, TextInput, Icon } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
  password?: boolean;
  editable?: boolean;
  desc?: boolean;
  rawText?: string;
  onInitialData?: any;
  ref?: any;
}

interface InputValueReferer {
  value: string;
}

const Input: React.FC<InputProps> = ({
  name,
  icon,
  password,
  editable,
  desc,
  onInitialData,
  rawText,
  ...rest
}) => {
  const inputElementRef = useRef<any>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const inputValueRef = useRef<InputValueReferer>({ value: defaultValue });
  const [pass, setPass] = useState(password || false);

  const [isFocused, setIsFocused] = useState(false);
  const [isField, setIsField] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    if (inputValueRef.current.value) {
      setIsField(true);
    } else {
      setIsField(false);
    }
  }, []);

  useEffect(() => {
    if (onInitialData) onInitialData(defaultValue);
  }, [defaultValue, onInitialData]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: "value",
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({
          text: value,
        });
      },
      clearValue() {
        inputElementRef.current.value = "";
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, rawText, registerField]);

  useEffect(() => {
    inputValueRef.current.value = defaultValue;
  }, [defaultValue]);

  const handleSecure = useCallback(() => {
    setPass(!pass);
  }, [pass]);

  return (
    <>
      <Container
        isFocused={isFocused}
        isErrored={!!error}
        editable={editable}
        desc={desc}
      >
        {icon && (
          <Icon
            editable={editable}
            name={icon}
            size={20}
            isFocused={isFocused}
            isField={isField}
          />
        )}
        <TextInput
          {...rest}
          ref={inputElementRef}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          secureTextEntry={pass}
          editable={editable}
          selectionColor="#fff"
          onChangeText={(value: string) => {
            if (inputValueRef.current) {
              inputValueRef.current.value = value;
            }
          }}
        />
        {password && (
          <TouchableOpacity onPress={handleSecure}>
            {!pass && <Icon name="eye" size={20} color={"#666360"} />}
            {pass && <Icon name="eye-off" size={20} color={"#666360"} />}
          </TouchableOpacity>
        )}
      </Container>

      {error && (
        <Text style={{ color: "#fff", fontFamily: "Montserrat_100Thin" }}>
          {error}
        </Text>
      )}
    </>
  );
};

export default Input;
