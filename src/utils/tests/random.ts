export const generateRandomTxt = (max: number): string => {
    const charSet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let result = ""
    for (let i = 0; i < max; i++) {
        result += charSet[Math.floor(Math.random() * charSet.length)];
    }
    return result;
}