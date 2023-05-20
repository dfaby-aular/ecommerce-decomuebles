export const setOuth = (outh) => {
    localStorage.setItem('outh', JSON.stringify(outh));
}

export const getOuth = () => {
    return JSON.parse(localStorage.getItem('outh'));
}

export const removeOuth = () => {
    localStorage.removeItem('outh');
}