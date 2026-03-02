import { isPastTimeSlotToday, isSameDay } from "@/utils/utils";

interface TimeSlotGridProps {
    timeSlots: string[];
    selectedTimes: string[];
    availableMap: Record<string, boolean>;
    loading: boolean;
    normalizedDate: Date | null;
    onTimeToggle: (time: string, isSelected: boolean) => void | Promise<void>;
}

export default function TimeSlotGrid({
    timeSlots,
    selectedTimes,
    availableMap,
    loading,
    normalizedDate,
    onTimeToggle,
}: TimeSlotGridProps) {
    const now = new Date();
    const isToday = normalizedDate ? isSameDay(normalizedDate, now) : false;

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(55px,1fr))] gap-2">
            {timeSlots.map((time) => {
                const isSelected = selectedTimes.includes(time);
                const isAvailable = availableMap[time] === true;

                const isPastTime = normalizedDate
                    ? isToday && isPastTimeSlotToday(time, normalizedDate)
                    : false;

                const isDisabled = loading || !isAvailable || isPastTime;

                return (
                    <button
                        key={time}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => void onTimeToggle(time, isSelected)}
                        className={`active:scale-[0.95] hover:bg-background-200 hover:border-none hover:text-inherit border rounded-[5px] body-t7 w-[55px] h-[25px] 
                        ${isSelected ? "bg-secondary text-white border-none" : "border-background-200"}
                        ${isDisabled ? "opacity-40 cursor-not-allowed" : ""} transition-all ease-in-out`}
                    >
                        {time}
                    </button>
                );
            })}
        </div>
    );
}
