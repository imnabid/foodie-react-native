// src/SignupPage.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MultiSelectComponent from './MultiSelectComponent';
import { axiosInstance } from './axios';
import Global, { FoodieContext } from './Global';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';


const SignupPage = ({ navigation }) => {
    const [allergies, setAllergies] = useState([])
    const { setShowSnackbar } = useContext(FoodieContext)

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        address: Yup.string().required('Address is required'),
        phoneNumber: Yup.string().matches(/^\d+$/, 'Phone Number must be digits only').required('Phone Number is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        // allergies: Yup.array().min(1, 'Select at least one allergy').required('Allergies are required'),
    });

    useEffect(() => {
        getAllegies()
    }, [])

    const getAllegies = () => {
        axiosInstance.get('/allergies')
            .then((res) => {
                console.log('allergies', res.data)
                setAllergies(res.data)

            }).catch((err) => {
                console.log('error', err)
            })
    }

    const handleSignup = (values) => {
        const data = {
            fullName: values.fullName,
            email: values.email,
            address: values.address,
            phoneNumber: values.phoneNumber,
            password: values.password,
            allergies: values.allergies,
        }
        axiosInstance.post('/signup', data)
            .then((res) => {
                if (res.status === 200) {
                    setShowSnackbar({ show: true, msg: 'User Created' })
                    Toast.show({
                        type: 'success',
                        text1: 'OTP Verification',
                        text2: 'Please Enter the OTP'
                    })
                    // navigation.navigate('Login')
                    navigation.navigate('otp', {email: values.email})
                }
            }).catch((err) => {
                console.log('error', err)
            })
    }

    return (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    padding: 25,
                    marginTop: 20,
                    paddingBottom: 0,
                    marginBottom: 20
                }}
            >
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Home')}>
                    <Icon name="arrow-left" size={25} color={"#df2020"} />
                </TouchableOpacity>

                <Text
                    style={{
                        textAlign: "center",
                        flex: 1,
                        lineHeight: 25,
                        fontSize: Global.fontSize.large,
                        fontWeight: "bold",
                        color: "#df2020",
                    }}
                >
                    Sign Up
                </Text>

            </View>
            <Formik
                initialValues={{
                    fullName: '',
                    email: '',
                    address: '',
                    phoneNumber: '',
                    password: '',
                    confirmPassword: '',
                    allergies: [],
                }}
                validationSchema={validationSchema}
                onSubmit={values => handleSignup(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                    <ScrollView contentContainerStyle={styles.container}>

                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            onChangeText={handleChange('fullName')}
                            onBlur={handleBlur('fullName')}
                            value={values.fullName}

                        />
                        {touched.fullName && errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                        />
                        {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            onChangeText={handleChange('address')}
                            onBlur={handleBlur('address')}
                            value={values.address}
                        />
                        {touched.address && errors.address && <Text style={styles.error}>{errors.address}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            onChangeText={handleChange('phoneNumber')}
                            onBlur={handleBlur('phoneNumber')}
                            value={values.phoneNumber}
                            keyboardType="phone-pad"
                        />
                        {touched.phoneNumber && errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}
                        <MultiSelectComponent
                            data={allergies}
                            placeholder="Allergies"
                            selected={values.allergies}
                            setSelected={(item) => setFieldValue('allergies', item)}
                        />
                        {touched.allergies && errors.allergies && <Text style={styles.error}>{errors.allergies}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                        />
                        {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            secureTextEntry
                        />
                        {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}


                        <Button title="Sign Up" onPress={handleSubmit} />
                    </ScrollView>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        color: '#343a40',
    },
    input: {
        height: 50,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 12,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
    },
    error: {
        fontSize: 12,
        color: '#dc3545',
        marginBottom: 8,
        marginLeft: 4,
    },
});

export default SignupPage;
