import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { PharmacyColors } from '../constants/Colors';

type CustomInputProps = {
    name: string;
    control: any;
    label?: string;
    mode?: 'flat' | 'outlined';
    style?: ViewStyle | ViewStyle[];
    validationType?: 'email' | 'password' | 'username' | 'required';
    validate?: (value: any) => true | string;
    secureTextEntry?: boolean;
    keyboardType?: any;
};

const getDefaultRules = (type?: CustomInputProps['validationType']) => {
    switch (type) {
        case 'email':
            return {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
            };
        case 'password':
            return {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
            };
        case 'username':
            return {
                required: 'Username is required',
                minLength: { value: 3, message: 'Username must be at least 3 characters' },
            };
        case 'required':
            return { required: 'This field is required' };
        default:
            return {};
    }
};

const CustomInput: React.FC<CustomInputProps & React.ComponentProps<typeof TextInput>> = ({
    name,
    control,
    label,
    mode = 'outlined',
    style,
    validationType,
    validate,
    secureTextEntry,
    keyboardType,
    ...rest
}) => {
    const rules = { ...getDefaultRules(validationType), ...(validate ? { validate } : {}) };

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                const inputRef = useRef<any>(null);

                useEffect(() => {
                    if (error) {
                        // focus the input when there's a validation error
                        setTimeout(() => inputRef.current?.focus?.(), 50);
                    }
                }, [error]);

                return (
                    <View style={componentStyles.wrapper}>
                        <TextInput
                            ref={inputRef}
                            mode={mode}
                            label={label}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            style={[componentStyles.input, style] as any}
                            secureTextEntry={secureTextEntry}
                            keyboardType={keyboardType}
                            outlineColor={error ? PharmacyColors.error : PharmacyColors.borderGray}
                            activeOutlineColor={error ? PharmacyColors.error : PharmacyColors.accent}
                            {...rest}
                        />
                        {error && <Text style={componentStyles.errorText}>{error.message}</Text>}
                    </View>
                );
            }}
        />
    );
};

const componentStyles = StyleSheet.create({
    wrapper: { width: '100%' },
    input: {
        marginBottom: 8,
        backgroundColor: PharmacyColors.white,
    },
    errorText: {
        color: PharmacyColors.error,
        fontSize: 12,
        marginBottom: 12,
        marginLeft: 4,
    },
});

export default CustomInput;