import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useBackHandler = (condition, onBackPress = null) => {
    useEffect(() => {
        const handleBackPress = () => {
            if (condition) {
                // custom
                if (onBackPress) onBackPress();
                return true;
            }
            return false; //default
        };


        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            backHandler.remove();
        };
    }, [condition, onBackPress]);
};

export default useBackHandler;
