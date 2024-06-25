export function getHours(stringDate:string) {
    const padZero = (number:number)=> {
        return number.toString().padStart(2, "0");
    }

    const date = new Date(stringDate);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());

    return`${hours}:${minutes}`;
}