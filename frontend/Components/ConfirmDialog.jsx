import { View } from 'react-native';
import { Button, Dialog, Portal, PaperProvider, Text } from 'react-native-paper';
import { FoodieContext } from './Global';
import { useContext, useEffect } from 'react';

function ConfirmDialog() {
    const { showDialog, setShowDialog } = useContext(FoodieContext);
    const { msg, callable } = showDialog;
    const hideDialog = () => setShowDialog({
        show: false,
        msg: '',
        callable: null
    });
    useEffect(() => {
        console.log('showDialog')
    }, [])

    const Ok = () => {
        callable();
        hideDialog();
    }
    return (
        <Portal>
            <Dialog visible={showDialog} onDismiss={hideDialog}>
                <Dialog.Title>Warning</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">{msg}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Cancel</Button>
                    <Button onPress={Ok}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

export default ConfirmDialog