import { useUserContext } from "@/context/userContext";
import { isToday } from "@/helpers/isToday";


export const Timeline = () => {
    const { users, todayDate } = useUserContext();

    const dates = users.flatMap(user => user.date);
    const todayDates = dates.filter(date => isToday(new Date(date.initialDate), todayDate));

    const calculateTimeDiff = (date1: Date, date2: Date) => {
        const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime());
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        return diffInSeconds;
    }

    return (
        <section className="flex gap-2 p-6 justify-center max-w-[600px] md:w-1/5 h-auto md:height-[600px] max-md:flex-col-reverse reverse">
            <div className="h-full flex md:flex-col justify-between items- md:pt-7">
                <span className="text-center text-xs">00:00</span>
                <span className="text-center text-xs hidden md:block">02:00</span>
                <span className="text-center text-xs hidden md:block">04:00</span>
                <span className="text-center text-xs">06:00</span>
                <span className="text-center text-xs hidden md:block">08:00</span>
                <span className="text-center text-xs hidden md:block">10:00</span>
                <span className="text-center text-xs">12:00</span>
                <span className="text-center text-xs hidden md:block">14:00</span>
                <span className="text-center text-xs hidden md:block">16:00</span>
                <span className="text-center text-xs">18:00</span>
                <span className="text-center text-xs hidden md:block">20:00</span>
                <span className="text-center text-xs hidden md:block">22:00</span>
                <span className="text-center text-xs">24:00</span>
            </div>
            <div className=" h-full flex flex-col items-center gap-4">
                <span className="text-center text-xs">Linea de tiempos</span>
                <div className="w-full h-14 border dark:border-neutral-800 border-gray-700 rounded-md p-1 md:w-20 md:h-full md:p-2 relative flex justify-center items-center">
                    {
                        todayDates.map((date, i) => {
                            if (date === undefined) return null;
                            const date1 = new Date(date.initialDate);
                            const date2 = new Date(date.finalDate);
                            const diff = calculateTimeDiff(date1, date2);
                            const durationPercent = ((diff / 3600) / 24) * 100;
                            const startHour = date1.getHours() + date1.getMinutes() / 60; // Convert to decimal hours
                            const offsetPercent = (startHour / 24) * 100;
                            return (
                                <div key={i}
                                    className={`absolute rounded-md left-0 w-[var(--percent)] h-full md:h-[var(--percent)] md:w-full ${date.color} md:top-[var(--position)] left-[var(--position)] md:left-0`}
                                    style={{ "--percent": `${durationPercent}%`, "--position": `${offsetPercent}%`, backgroundColor: `${date.color}` } as React.CSSProperties}>
                                </div>
                            );
                        })
                    }
                </div>

            </div>
        </section>
    )
}