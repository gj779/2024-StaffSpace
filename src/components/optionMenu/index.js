import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, Menu, Divider, Provider } from 'react-native-paper';

const OptionMenu = (isVisible, closeMenu, openMenu) => {

    return (
        <Provider>
            <View
                style={{
                    paddingTop: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',

                }}>
                <Menu
                    visible={isVisible}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={openMenu}>Show menu</Button>}
                >
                    <Menu.Item onPress={() => { }} title="Item 1" />
                    <Menu.Item onPress={() => { }} title="Item 2" />
                    <Divider />
                    <Menu.Item onPress={() => { }} title="Item 3" />
                </Menu>
            </View>
        </Provider >
    )
}

export default OptionMenu