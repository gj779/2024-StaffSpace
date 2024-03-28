import Toast from 'react-native-simple-toast'

export const ShowToast = ({ message }) => {
    return (
        Toast.show(message)
    )
}

