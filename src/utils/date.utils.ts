import { CalendarAtributes } from "../db/calendar"

export const dateFormater = (date: Date) => {
    return date.getFullYear() + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)
}

export const createMultiEventObject = (objectArray: CalendarAtributes[], from: string, to: string): CalendarAtributes[] => {
    const result: CalendarAtributes[] = []
    objectArray.forEach((item) => {
        if(!item.period) {
            return result.push({...item})
        }
        
        let startDate = new Date(item.date)
        let finishDate = new Date(to)

        while (startDate <= finishDate) {
            if (startDate >= new Date(from)) {
                if(!(item.exclude && dateFormater(startDate) === dateFormater(new Date(item.exclude)))) {
                    result.push({
                        ...item,
                        date: dateFormater(startDate) 
                    })
                }
            }
            switch (item.period) {
                case 'day': {
                    startDate.setDate(startDate.getDate() + 1)
                    break
                }
                case 'week': {
                    startDate.setDate(startDate.getDate() + 7)
                    break
                }
                case 'two-week': {
                    startDate.setDate(startDate.getDate() + 14)
                    break
                }
                case 'month': {
                    startDate.setMonth(startDate.getMonth() + 1)
                    break
                }
            }      
        }             
    })

    result.sort((a,b): number => {
        const aDate = new Date(a.date)
        const bDate = new Date(b.date)
        return aDate.valueOf() - bDate.valueOf()
    })

    return result
}