'use client'

import { DateTime } from "luxon";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";

export default function Home() {
  const [dateNow] = useState(DateTime.now)
  const [milliseconds, setMilisseconds] = useState(0);
  const [endTime, setEndTime] = useState('')

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEndTime(dateNow.plus({ milliseconds: milliseconds }).setLocale('pt-BR').toLocaleString(DateTime.TIME_24_WITH_SECONDS))
    console.log(endTime)
  };

  return (
    <div className='h-full items-center flex flex-col justify-center gap-10'>
      <h1 className="text-9xl font-body">{endTime}</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="time"
          name=""
          id=""
          className="appearance-none w-32 rounded-md border-solid border-2 border-primary bg-transparent pr-2 text-primary pl-7 py-1.5 text-xl focus:outline-none"
          onChange={(e) => setMilisseconds(parseInt(e.target.value))}
        />
        <button type="submit">OK</button>
      </form>
    </div>
  )
}
