import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'

const BaseModal = (props) => {
  return (
        <Modal isVisible={props.isVisible}>
            {props.children}
        </Modal>
  )
}

export default BaseModal

const styles = StyleSheet.create({})