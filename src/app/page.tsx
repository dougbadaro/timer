'use client'

import { cookies } from 'next/headers'
import { DateTime, Duration } from "luxon";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [timer, setTimer] = useState(`${DateTime.now().toFormat('HH:mm:ss')}`);
  const [endTime, setEndTime] = useState(DateTime.now)

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const [hourInput, minuteInput, secondInput] = inputValue.split(':');

    const endTime = DateTime.now().plus({ hour: parseInt(hourInput), minute: parseInt(minuteInput), second: parseInt(secondInput) });

    if (endTime.hour < DateTime.now().hour) {
      endTime.plus({ day: 1 });
    }

    setEndTime(endTime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let timeLeft = Duration.fromObject({ milliseconds: 0 })
      if (endTime.hasSame(DateTime.now(), 'day')) {
        timeLeft = endTime.diffNow()
      } else {
        const firstDay = DateTime.fromObject({ day: DateTime.now().day, hour: 23, minute: 59, second: 59 }).diffNow()
        const secondDay = endTime.diff(DateTime.fromObject({ day: endTime.day, hour: 0, minute: 0, second: 0 }))

        timeLeft = Duration.fromMillis(firstDay.milliseconds + secondDay.milliseconds)
        console.log(timeLeft)
      }

      const hours = Math.floor(timeLeft.as('hours'))
      const minutes = Math.floor(timeLeft.as('minutes')) % 60
      const seconds = Math.floor(timeLeft.as('seconds')) % 60 + 1

      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

      setTimer(formattedTime);
    }, 1)

    return () => {
      clearInterval(interval);
    };
  })

  return (
    <div className='h-full items-center flex flex-col justify-center gap-10'>
      <h1 className="text-9xl font-body">{timer}</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name=""
          id=""
          className="appearance-none w-32 rounded-md border-solid border-2 border-primary bg-transparent pr-2 text-primary pl-7 py-1.5 text-xl focus:outline-none"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">OK</button>
      </form>
    </div>
  )
}
