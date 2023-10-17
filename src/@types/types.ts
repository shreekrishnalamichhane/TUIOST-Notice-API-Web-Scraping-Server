export type TNoticeItem = {
    "title": string | undefined,
    "link": string | undefined,
    'date': string | undefined,
    "hash": string | undefined,
    "author": string | undefined,
}

export type TCacheData = {
    expiredAt: number,
    data: TNoticeItem[]
}