
export const setError = (error) => {
    console.error(error);
    throw error;
};

export const setData = (doc) => {
    return {
        id: doc.id,
        ...doc.data()
    }
}