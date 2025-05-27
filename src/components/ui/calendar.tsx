"use client"

import * as React from "react"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { cn } from "@/lib/utils"

function Calendar({
  className,
  value,
  onChange,
  ...props
}: {
  className?: string;
  value?: Date;
  onChange?: (date: Date | null) => void;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar
        value={value}
        onChange={onChange}
        className={cn("p-3", className)}
        sx={{
          width: '100%',
          '& .MuiPickersCalendarHeader-root': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px',
          },
          '& .MuiPickersDay-root': {
            margin: '2px',
          },
          '& .MuiPickersCalendarHeader-label': {
            fontSize: '0.875rem',
            fontWeight: 500,
          },
          '& .MuiPickersArrowSwitcher-root': {
            display: 'flex',
            gap: '4px',
          },
          '& .MuiPickersArrowSwitcher-button': {
            padding: '4px',
          },
        }}
        {...props}
      />
    </LocalizationProvider>
  )
}

export { Calendar }
