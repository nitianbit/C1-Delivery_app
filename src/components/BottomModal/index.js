import React, { Children, ReactNode } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Close from '../../assets/icons/Close';
import { width } from '../../utils/constants';


const BottomModal = ({ visible, onClose, children, closeAble, title, overlay = true }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={closeAble ? onClose : undefined}
        >
            <View style={[styles.modalContainer, { backgroundColor: overlay ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)' }]}>
                <View style={styles.modalContent}>
                    {title ? <View style={styles.topHeader}>
                        <Text numberOfLines={1} style={styles.modalTitle}>{title}</Text>
                    </View> : null}
                    {closeAble ? <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                        <Close />
                    </TouchableOpacity> : null}
                    <View style={styles.modalBody}>
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: width,
        paddingHorizontal: 20,
        paddingBottom: (5),
        paddingTop: (10),
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        alignItems: 'center',

    },
    topHeader: {
        width: '100%',
        paddingBottom: (25)
    },
    modalBody: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        textAlign: 'center',
        fontSize: (22),
        fontWeight: '600',
        marginBottom: (10),
        // width: '90%'
    },
    closeBtn: {
        padding: 10,
        position: 'absolute',
        right: 15,
        top: (15),
    },
    icon: {}
});

export default BottomModal;
