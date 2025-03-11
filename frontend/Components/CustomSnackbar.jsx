import React, { useContext } from 'react'
import { Portal, Snackbar } from 'react-native-paper'
import { FoodieContext } from './Global'

function CustomSnackbar() {
    const { showSnackbar, setShowSnackbar } = useContext(FoodieContext)
    const { show, msg } = showSnackbar

    const onDismissSnackBar = () => {
        setShowSnackbar({ show: false, msg: '' })
    };
    return (
        <Portal>
            <Snackbar
                theme={{ colors: { primary: 'green' } }}
                visible={show}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Close',
                    onPress: () => {
                        // Do something
                    },
                }}>
                {msg}
            </Snackbar>
        </Portal>
    )
}

export default CustomSnackbar