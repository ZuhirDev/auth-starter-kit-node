import { useCallback, useState } from 'react';

const useModal = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(null);

    const open = useCallback((newData = null) => {
        setData(newData);
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        setData(null);
    }, []);

    return { isOpen, open, close, data };
}

export default useModal;