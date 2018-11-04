import { webSocket } from 'rxjs/websocket'
import { map } from 'rxjs/operators'

interface WsResponse {
    Code: string,
    Cs: string,
    Data: string
}

export default function (url) {
    const subject = webSocket(`ws://${url}`)

    subject.pipe(map((res: WsResponse) => {
        return {
            code: res.Code,
            type: res.Cs,
            data: JSON.parse(res.Data || '{}'),
        }
    }))

    return {
        subject,
        send: ({code=101, data}) => {
            subject.next({
                Code: code,
                Data: JSON.stringify(data) 
            })
        },
    }
}