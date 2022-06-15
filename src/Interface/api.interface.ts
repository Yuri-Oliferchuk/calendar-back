export interface ICalendarAtributes {
    id?: number
    date: string | Date
    time: string
    event: string
    period: 'day' | 'week' | 'two-week' | 'month' | null
    exclude: string | Date | null
    author: string | null
}

export interface IAPIResponse {
    data?: ICalendarAtributes
    message: string
    code: number
}

export interface IPeriodQuery {
    from: Date | string
    to?: Date | string
}
