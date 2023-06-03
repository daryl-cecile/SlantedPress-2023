
export function calculateChunkLengths(maxChunkSize:number, fullLength:number) {
    if (maxChunkSize <= 0) return [fullLength];
    if (fullLength === 0) return [fullLength];
    
    const chunkSizes = [];

    while (fullLength > 0) {
        if (maxChunkSize >= fullLength) {
            chunkSizes.push(fullLength);
            break;
        }
        chunkSizes.push(maxChunkSize);
        fullLength -= maxChunkSize;
    }

    return chunkSizes;
}