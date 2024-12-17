export function encodeNumber(originalNumber: number): string {
    const divisor = 2024;
    const subtractor = 1131;
  
    // Perform the encoding process
    const encodedValue = (originalNumber / divisor) - subtractor;
  
    // Return the encoded value as a string for simplicity
    return encodedValue.toFixed(6);  // Fixed to 6 decimal places for precision
  }
  


  export function decodeNumber(encodedKey: string): number {
    const divisor = 2024;
    const subtractor = 1131;
  
    // Convert the encoded string back to a number
    const encodedValue = parseFloat(encodedKey);
  
    // Reverse the encoding process
    const decodedValue = (encodedValue + subtractor) * divisor;
  
    return decodedValue;
  }
  