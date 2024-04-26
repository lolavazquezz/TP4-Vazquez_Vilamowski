class ValidacionesHelper {
    getIntegerOrDefault = (value, defaultValue) => {

    if (typeof value === 'number') return value;
    else return defaultValue;
}
    getStringOrDefault = (value, defaultValue) => {
    if (typeof value === 'string') return value;
    else return defaultValue;
}
}
export default new ValidacionesHelper();
