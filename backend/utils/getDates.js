import dotenv from "dotenv";
dotenv.config();

export function getWinterSemesterEndDate() {
    const [month,day] = process.env.WINTER_SEM_END.split("-");
    return {month: month, day: day};
}

export function getSummerSemesterEndDate() {
    const [month,day] = process.env.SUMMER_SEM_END.split("-");
    return {month: month, day: day};
}