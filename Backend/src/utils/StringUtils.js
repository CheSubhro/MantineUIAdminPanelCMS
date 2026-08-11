
// Define the capitalize function
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
   
// Define the truncate function
const truncate = (str, maxLength) => {
    return str.length > maxLength ? str.substring(0, maxLength - 3) + '...' : str;
};
// Define the lowercase function
const lowercase = (str) => {
    return str.toLowerCase();
};
   
// Export the capitalize and truncate functions
export { capitalize, truncate, lowercase };
