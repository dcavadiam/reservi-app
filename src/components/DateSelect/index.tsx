'use client'
import { Button } from "../ui/button"
import { useUserContext } from "@/context/userContext";

export const DateSelect = () => {
    const { todayDate, setTodayDate } = useUserContext();
    const date = new Date(todayDate);

    const handleNextDay = () => {
        setTodayDate(new Date(date.getTime() + 86400000));
    }

    const handlePrevDay = () => {
        setTodayDate(new Date(date.getTime() - 86400000));
    }

   return (
       <div className="flex gap-2">
           <Button onClick={handlePrevDay}> {"<"} </Button>
           <Button>{date.toLocaleDateString()}</Button>
           <Button onClick={handleNextDay}> {">"} </Button>
       </div>
   )
}