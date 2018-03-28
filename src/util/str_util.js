export default function mk2digit(time){
    return time < 10 ? `0${time}` : time
}