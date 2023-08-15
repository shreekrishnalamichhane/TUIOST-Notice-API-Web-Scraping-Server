export type TNoticeItem = {
    "title": string,
    "link": string,
    "hash": string,
    "author": string,
}

export type TCacheData = {
    expiredAt: number,
    data: TNoticeItem[]
}