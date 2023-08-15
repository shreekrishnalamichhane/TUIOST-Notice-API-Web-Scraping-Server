const Utils = {
    // Returns the sha256 hash of the given string
    hashCode: (val: string): string => {
        return require("crypto").createHash("sha256").update(val).digest("hex");
    },
}

export default Utils;