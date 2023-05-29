import { increment } from 'firebase/firestore/lite';

export const generateErrorForm = (objectError, objectValues) => {
    const keys = Object.keys(objectValues);
    if (!keys.length) return objectError;
    const err = {};
    Object.keys({ ...objectError }).forEach((i) => {

        if (!keys.includes(i) || objectValues[i].trim() === "") {
            err[i] = true;
        }
    });
    return Object.keys(err).length ? err : null;
};

export const round = (value, roundValue = 2) =>
    parseFloat(value.toFixed(roundValue));

export const toPercentage = (value, percentage = 0) =>
    round(parseFloat(value) * (parseFloat(percentage) / 100));

//Validate 
export const objectError = {
    name: true,
    color: true,
    description: true,
    imageURL: true,
}

export const validateItem = (item, { oldPrice, oldStock }) => {
    if (item.stock !== oldStock) {
        let val = item.stock - oldStock;
        if (oldStock > item.stock) val = oldStock - item.stock;
        item.stock = increment(val)
    }
    if (item.price !== oldPrice) {
        let val = item.price - oldPrice;
        if (oldPrice > item.price) val = oldPrice - item.price;
        item.price = increment(val)
    }
    return item;
}

export const validateProduct = (item) => {
    const err = generateErrorForm(objectError, item);
    if (item.price === 0) err.price = true;
    if (item.stock === 0) err.stock = true;
    return err;
}