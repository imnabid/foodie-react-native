import React from 'react'
import { Chip } from 'react-native-paper'

function CustomChip({ id, name, callback }) {
    return (
        <Chip icon="information"
            onClose={() => callback(id)}
        >{name}</Chip>
    )
}

export default CustomChip