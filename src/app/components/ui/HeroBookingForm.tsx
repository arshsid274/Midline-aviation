"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const AIRCRAFT_OPTIONS = [
  { code: "T7-MID", manufacturer: "Gulfstream", category: "Heavy", maxPax: 13 },
  { code: "T7-MIDA", manufacturer: "Gulfstream", category: "Mid Size", maxPax: 8 },
  { code: "T7-MIDB", manufacturer: "Embraer", category: "Heavy", maxPax: 13 },
];

type TripType = "one-way" | "round-trip";
type AirportField = "departure" | "arrival";

type Airport = {
  name: string;
  city: string;
  country: string;
  code: string;
};

const MAX_AIRPORT_SUGGESTIONS = 3;

const normalizeText = (value: string) => value.trim().toLowerCase();

const parseAirportRecord = (item: unknown, fallbackCode = ""): Airport | null => {
  if (!item || typeof item !== "object") return null;

  const airport = item as Record<string, unknown>;
  const name = typeof airport.name === "string" ? airport.name : "";
  const city = typeof airport.city === "string" ? airport.city : "";
  const country = typeof airport.country === "string" ? airport.country : "";
  const codeFromItem = typeof airport.code === "string" ? airport.code : "";
  const iata = typeof airport.iata === "string" ? airport.iata : "";
  const icao = typeof airport.icao === "string" ? airport.icao : "";
  const code = codeFromItem || iata || icao || fallbackCode;

  if (!name || !city || !country || !code) return null;

  return {
    name,
    city,
    country: country.toUpperCase(),
    code: code.toUpperCase(),
  };
};

const scoreAirportMatch = (airport: Airport, query: string) => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return -1;

  const code = normalizeText(airport.code);
  const city = normalizeText(airport.city);
  const country = normalizeText(airport.country);
  const name = normalizeText(airport.name);

  if (code === normalizedQuery) return 120;
  if (city === normalizedQuery) return 110;
  if (country === normalizedQuery) return 100;
  if (code.startsWith(normalizedQuery)) return 95;
  if (city.startsWith(normalizedQuery)) return 90;
  if (name.startsWith(normalizedQuery)) return 85;
  if (country.startsWith(normalizedQuery)) return 80;
  if (code.includes(normalizedQuery)) return 75;
  if (city.includes(normalizedQuery)) return 70;
  if (name.includes(normalizedQuery)) return 65;
  if (country.includes(normalizedQuery)) return 60;

  return -1;
};

const buildAirportSuggestions = (query: string, airports: Airport[]) => {
  const normalizedQuery = normalizeText(query);
  if (normalizedQuery.length < 2) return [];

  const scoredMatches = airports
    .map((airport) => ({ airport, score: scoreAirportMatch(airport, normalizedQuery) }))
    .filter((item) => item.score >= 0);

  if (scoredMatches.length === 0) return [];

  scoredMatches.sort((left, right) => right.score - left.score || left.airport.city.localeCompare(right.airport.city));

  const seenCodes = new Set<string>();
  const suggestions: Airport[] = [];

  for (const item of scoredMatches) {
    const code = item.airport.code.toUpperCase();
    if (seenCodes.has(code)) continue;
    seenCodes.add(code);
    suggestions.push(item.airport);
    if (suggestions.length === MAX_AIRPORT_SUGGESTIONS) break;
  }

  return suggestions;
};

const formatAirportFieldValue = (airport: Airport) => `${airport.city}, ${airport.country} (${airport.code})`;

type HeroBookingFormProps = {
  revealFromBelow?: boolean;
};

const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const padDatePart = (value: number) => value.toString().padStart(2, "0");

const toIsoDate = (value: Date) =>
  `${value.getFullYear()}-${padDatePart(value.getMonth() + 1)}-${padDatePart(value.getDate())}`;

const parseIsoDate = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

  const [yearText, monthText, dayText] = value.split("-");
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);

  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return null;

  const parsedDate = new Date(year, month - 1, day);
  const isValidDate =
    parsedDate.getFullYear() === year && parsedDate.getMonth() === month - 1 && parsedDate.getDate() === day;

  return isValidDate ? parsedDate : null;
};

const formatTimeLabel = (value: string) => {
  if (!/^\d{2}:\d{2}$/.test(value)) return "";

  const [hoursText, minutesText] = value.split(":");
  const hours = Number(hoursText);
  const minutes = Number(minutesText);

  if (!Number.isInteger(hours) || !Number.isInteger(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return "";
  }

  const suffix = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hours12}:${minutesText} ${suffix}`;
};

const parseManualTimeValue = (value: string) => {
  const normalizedValue = value.trim().toUpperCase();
  if (!normalizedValue) return null;

  const twentyFourHourMatch = normalizedValue.match(/^(\d{1,2}):(\d{2})$/);
  if (twentyFourHourMatch) {
    const hours = Number(twentyFourHourMatch[1]);
    const minutes = Number(twentyFourHourMatch[2]);

    if (Number.isInteger(hours) && Number.isInteger(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      return `${padDatePart(hours)}:${padDatePart(minutes)}`;
    }

    return null;
  }

  const twelveHourMatch = normalizedValue.match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/);
  if (!twelveHourMatch) return null;

  const hours12 = Number(twelveHourMatch[1]);
  const minutes = Number(twelveHourMatch[2]);
  const period = twelveHourMatch[3];

  if (!Number.isInteger(hours12) || !Number.isInteger(minutes) || hours12 < 1 || hours12 > 12 || minutes < 0 || minutes > 59) {
    return null;
  }

  const hours24 = period === "PM" ? (hours12 % 12) + 12 : hours12 % 12;
  return `${padDatePart(hours24)}:${padDatePart(minutes)}`;
};

const TIME_OPTIONS = Array.from({ length: 96 }, (_, index) => {
  const hours = Math.floor(index / 4);
  const minutes = (index % 4) * 15;
  const value = `${padDatePart(hours)}:${padDatePart(minutes)}`;

  return {
    value,
    label: formatTimeLabel(value),
  };
});

type CalendarDay = {
  iso: string;
  day: number;
  inCurrentMonth: boolean;
  isToday: boolean;
};

const buildCalendarDays = (monthStart: Date): CalendarDay[] => {
  const start = new Date(monthStart.getFullYear(), monthStart.getMonth(), 1);
  start.setDate(start.getDate() - start.getDay());

  const today = new Date();

  return Array.from({ length: 42 }, (_, index) => {
    const dayDate = new Date(start);
    dayDate.setDate(start.getDate() + index);

    const iso = toIsoDate(dayDate);
    const isToday =
      dayDate.getFullYear() === today.getFullYear() &&
      dayDate.getMonth() === today.getMonth() &&
      dayDate.getDate() === today.getDate();

    return {
      iso,
      day: dayDate.getDate(),
      inCurrentMonth: dayDate.getMonth() === monthStart.getMonth(),
      isToday,
    };
  });
};

type DatePickerFieldProps = {
  value: string;
  onChange: (nextValue: string) => void;
  placeholder: string;
  minDateValue?: string;
};

function DatePickerField({ value, onChange, placeholder, minDateValue }: DatePickerFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [manualDateError, setManualDateError] = useState("");
  const [monthCursor, setMonthCursor] = useState(() => {
    const selected = parseIsoDate(value.trim());
    const baseDate = selected ?? new Date();
    return new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  });
  const minDateCandidate = (minDateValue ?? "").trim();
  const minimumIsoDate = parseIsoDate(minDateCandidate) ? minDateCandidate : null;
  const calendarDays = useMemo(() => buildCalendarDays(monthCursor), [monthCursor]);

  const applyManualDateValue = (rawValue: string) => {
    const normalizedValue = rawValue.trim();

    if (!normalizedValue) {
      onChange("");
      setManualDateError("");
      return true;
    }

    const parsedDate = parseIsoDate(normalizedValue);
    if (!parsedDate) {
      setManualDateError("Use YYYY-MM-DD format.");
      return false;
    }

    if (minimumIsoDate && normalizedValue < minimumIsoDate) {
      setManualDateError(`Date must be on or after ${minimumIsoDate}.`);
      return false;
    }

    onChange(normalizedValue);
    setMonthCursor(new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1));
    setManualDateError("");
    return true;
  };

  useEffect(() => {
    if (!isOpen) return;

    const closeIfOutside = (event: MouseEvent | TouchEvent) => {
      const targetNode = event.target;
      if (!(targetNode instanceof Node)) return;
      if (!containerRef.current?.contains(targetNode)) {
        setIsOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", closeIfOutside);
    window.addEventListener("touchstart", closeIfOutside);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("mousedown", closeIfOutside);
      window.removeEventListener("touchstart", closeIfOutside);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <div className="flex h-11 w-full rounded-xl border border-white/40 bg-white/10 text-sm backdrop-blur-sm transition-colors focus-within:border-white hover:bg-white/15">
        <input
          type="text"
          inputMode="numeric"
          value={value}
          placeholder="YYYY-MM-DD"
          aria-label={placeholder}
          onChange={(event) => {
            onChange(event.target.value);
            if (manualDateError) setManualDateError("");
          }}
          onBlur={() => {
            applyManualDateValue(value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              applyManualDateValue(value);
            }
          }}
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-white/95 placeholder:text-white/58 focus:outline-none"
        />
        <button
          type="button"
          onClick={() =>
            setIsOpen((current) => {
              const nextState = !current;

              if (nextState) {
                const selected = parseIsoDate(value.trim());
                const baseDate = selected ?? new Date();
                setMonthCursor(new Date(baseDate.getFullYear(), baseDate.getMonth(), 1));
              }

              return nextState;
            })
          }
          className="h-full shrink-0 border-l border-white/22 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75 transition-colors hover:bg-white/12"
        >
          Pick
        </button>
      </div>

      {manualDateError && <p className="mt-1 px-1 text-[11px] text-[#ffd7d7]">{manualDateError}</p>}

      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-2 rounded-2xl border border-white/30 bg-[linear-gradient(90deg,rgba(17,26,90,0.94)_0%,rgba(10,110,164,0.94)_100%)] p-3 shadow-2xl backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() =>
                setMonthCursor((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))
              }
              className="rounded-lg border border-white/25 px-2 py-1 text-xs font-medium text-white/85 transition-colors hover:bg-white/10"
            >
              Prev
            </button>
            <p className="text-sm font-semibold text-white">
              {MONTH_LABELS[monthCursor.getMonth()]} {monthCursor.getFullYear()}
            </p>
            <button
              type="button"
              onClick={() =>
                setMonthCursor((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))
              }
              className="rounded-lg border border-white/25 px-2 py-1 text-xs font-medium text-white/85 transition-colors hover:bg-white/10"
            >
              Next
            </button>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1">
            {WEEKDAY_LABELS.map((label) => (
              <span
                key={label}
                className="text-center text-[10px] font-medium uppercase tracking-[0.16em] text-white/55"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day) => {
              const isDisabled = minimumIsoDate ? day.iso < minimumIsoDate : false;
              const isSelected = day.iso === value;

              const dayClassName = [
                "h-8 rounded-lg text-xs font-medium transition-colors",
                day.inCurrentMonth ? "text-white/90" : "text-white/42",
                day.isToday ? "border border-white/35" : "",
                isSelected ? "border-none bg-[#41b3b5]/45 text-white" : "",
                !isSelected && !isDisabled ? "hover:bg-white/12" : "",
                isDisabled ? "cursor-not-allowed text-white/28" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <button
                  key={day.iso}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => {
                    onChange(day.iso);
                    setManualDateError("");
                    setIsOpen(false);
                  }}
                  className={dayClassName}
                >
                  {day.day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

type TimePickerFieldProps = {
  value: string;
  onChange: (nextValue: string) => void;
  placeholder: string;
};

function TimePickerField({ value, onChange, placeholder }: TimePickerFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [manualTimeError, setManualTimeError] = useState("");
  const normalizedTimeValue = parseManualTimeValue(value);

  const applyManualTimeValue = (rawValue: string) => {
    const normalizedInput = rawValue.trim();

    if (!normalizedInput) {
      onChange("");
      setManualTimeError("");
      return true;
    }

    const parsedTime = parseManualTimeValue(normalizedInput);
    if (!parsedTime) {
      setManualTimeError("Use HH:MM or h:mm AM/PM.");
      return false;
    }

    onChange(parsedTime);
    setManualTimeError("");
    return true;
  };

  useEffect(() => {
    if (!isOpen) return;

    const closeIfOutside = (event: MouseEvent | TouchEvent) => {
      const targetNode = event.target;
      if (!(targetNode instanceof Node)) return;
      if (!containerRef.current?.contains(targetNode)) {
        setIsOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", closeIfOutside);
    window.addEventListener("touchstart", closeIfOutside);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("mousedown", closeIfOutside);
      window.removeEventListener("touchstart", closeIfOutside);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <div className="flex h-11 w-full rounded-xl border border-white/40 bg-white/10 text-sm backdrop-blur-sm transition-colors focus-within:border-white hover:bg-white/15">
        <input
          type="text"
          inputMode="text"
          value={value}
          placeholder="HH:MM or 2:30 PM"
          aria-label={placeholder}
          onChange={(event) => {
            onChange(event.target.value);
            if (manualTimeError) setManualTimeError("");
          }}
          onBlur={() => {
            applyManualTimeValue(value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              applyManualTimeValue(value);
            }
          }}
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-white/95 placeholder:text-white/58 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="h-full shrink-0 border-l border-white/22 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75 transition-colors hover:bg-white/12"
        >
          Pick
        </button>
      </div>

      {manualTimeError && <p className="mt-1 px-1 text-[11px] text-[#ffd7d7]">{manualTimeError}</p>}

      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-2 rounded-2xl border border-white/30 bg-[linear-gradient(90deg,rgba(17,26,90,0.94)_0%,rgba(10,110,164,0.94)_100%)] p-2 shadow-2xl backdrop-blur-xl">
          <div className="mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/60">
            Select Time
          </div>
          <p className="mb-2 px-1 text-[11px] text-white/55">Or type manually: HH:MM or h:mm AM/PM</p>
          <div className="max-h-56 overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-1">
              {TIME_OPTIONS.map((option) => {
                const isSelected = option.value === normalizedTimeValue;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setManualTimeError("");
                      setIsOpen(false);
                    }}
                    className={`rounded-lg px-2 py-1.5 text-left text-xs font-medium transition-colors ${
                      isSelected ? "bg-[#41b3b5]/45 text-white" : "text-white/88 hover:bg-white/12"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HeroBookingForm({ revealFromBelow = false }: HeroBookingFormProps) {
  const [tripType, setTripType] = useState<TripType>("one-way");
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [airportOptions, setAirportOptions] = useState<Airport[]>([]);
  const [activeAirportField, setActiveAirportField] = useState<AirportField | null>(null);
  const [paxCount, setPaxCount] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedAircraft, setSelectedAircraft] = useState("");

  const isRoundTrip = tripType === "round-trip";
  const selectedAircraftDetails = AIRCRAFT_OPTIONS.find((aircraft) => aircraft.code === selectedAircraft);
  const selectedAircraftMaxPax = selectedAircraftDetails?.maxPax ?? 13;
  const paxHasValue = paxCount.trim().length > 0;
  const paxNumber = paxHasValue ? Number(paxCount) : Number.NaN;
  const paxHasInvalidFormat = paxHasValue && (!Number.isFinite(paxNumber) || !Number.isInteger(paxNumber));
  const paxOverGlobalLimit = Number.isFinite(paxNumber) && paxNumber > 13;
  const paxOverSelectedLimit = Number.isFinite(paxNumber) && paxNumber > selectedAircraftMaxPax;
  const paxUnderMinimum = Number.isFinite(paxNumber) && paxNumber < 1;
  const paxErrorMessage = paxOverGlobalLimit
    ? "Our aircraft is not able to book more than 13 people in a single go."
    : paxOverSelectedLimit
      ? `Selected jet ${selectedAircraftDetails?.code} allows up to ${selectedAircraftMaxPax} people only.`
      : paxHasInvalidFormat || paxUnderMinimum
        ? "Please enter a whole number of people starting from 1."
      : "";
  const paxIsInvalid = paxHasInvalidFormat || paxUnderMinimum || paxOverGlobalLimit || paxOverSelectedLimit;

  useEffect(() => {
    let stillMounted = true;

    const loadAirportOptions = async () => {
      try {
        const response = await fetch("/data/airports.json");
        if (!response.ok) return;

        const payload = (await response.json()) as unknown;
        let parsedAirports: Airport[] = [];

        if (Array.isArray(payload)) {
          parsedAirports = payload
            .map((item) => parseAirportRecord(item))
            .filter((airport): airport is Airport => airport !== null);
        } else if (payload && typeof payload === "object") {
          parsedAirports = Object.entries(payload)
            .map(([fallbackCode, item]) => parseAirportRecord(item, fallbackCode))
            .filter((airport): airport is Airport => airport !== null);
        } else {
          return;
        }

        if (stillMounted) {
          setAirportOptions(parsedAirports);
        }
      } catch (error) {
        console.error("Failed to load airport options:", error);
      }
    };

    void loadAirportOptions();

    return () => {
      stillMounted = false;
    };
  }, []);

  const departureSuggestions = useMemo(
    () => buildAirportSuggestions(departureCity, airportOptions),
    [departureCity, airportOptions]
  );
  const arrivalSuggestions = useMemo(() => buildAirportSuggestions(arrivalCity, airportOptions), [arrivalCity, airportOptions]);

  const handleAirportSelect = (field: AirportField, airport: Airport) => {
    const nextValue = formatAirportFieldValue(airport);

    if (field === "departure") {
      setDepartureCity(nextValue);
    } else {
      setArrivalCity(nextValue);
    }

    setActiveAirportField(null);
  };

  const closeSuggestionsAfterBlur = (field: AirportField) => {
    window.setTimeout(() => {
      setActiveAirportField((currentField) => (currentField === field ? null : currentField));
    }, 100);
  };

  const departureDateIsValid = parseIsoDate(departureDate.trim()) !== null;
  const departureTimeIsValid = parseManualTimeValue(departureTime.trim()) !== null;
  const returnDateIsValid = parseIsoDate(returnDate.trim()) !== null;
  const returnTimeIsValid = parseManualTimeValue(returnTime.trim()) !== null;
  const returnDateIsAfterDeparture = returnDate.trim() >= departureDate.trim();

  const primaryDetailsComplete =
    departureCity.trim().length > 0 &&
    arrivalCity.trim().length > 0 &&
    departureDateIsValid &&
    departureTimeIsValid &&
    (!isRoundTrip || (returnDateIsValid && returnTimeIsValid && returnDateIsAfterDeparture));

  const contactDetailsComplete =
    fullName.trim().length > 0 &&
    emailAddress.trim().length > 0 &&
    phoneNumber.trim().length > 0 &&
    selectedAircraft.trim().length > 0 &&
    paxHasValue &&
    !paxIsInvalid;

  const canSubmit = primaryDetailsComplete && contactDetailsComplete;

  const changeTripType = (nextType: TripType) => {
    setTripType(nextType);
    if (nextType === "one-way") {
      setReturnDate("");
      setReturnTime("");
    }
  };

  return (
    <section
      aria-label="Flight booking form"
      className="relative z-40 -mt-[40vh] px-4 sm:px-6 md:px-10"
    >
      <form
        className={`mx-auto w-full max-w-6xl rounded-2xl border border-[#111a5a]/35 bg-[linear-gradient(90deg,rgba(17,26,90,0.16)_0%,rgba(10,110,164,0.16)_100%)] p-4 text-white shadow-[0_22px_55px_rgba(17,26,90,0.26)] backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-5 md:p-6 ${
          revealFromBelow ? "translate-y-0 opacity-100 delay-[180ms]" : "translate-y-16 opacity-0"
        }`}
        onSubmit={(event) => {
          event.preventDefault();
          if (!canSubmit) return;
        }}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/90">Book Your Flight</p>
          <div className="relative inline-grid grid-cols-2 rounded-full border border-white/40 bg-black/25 p-1">
            <span
              aria-hidden="true"
              className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-[#016291] transition-transform duration-300 ${
                isRoundTrip ? "translate-x-[calc(100%+4px)]" : "translate-x-1"
              }`}
            />
            <button
              type="button"
              onClick={() => changeTripType("one-way")}
              className={`relative z-[1] rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                !isRoundTrip ? "text-white" : "text-white/75"
              }`}
            >
              One Way
            </button>
            <button
              type="button"
              onClick={() => changeTripType("round-trip")}
              className={`relative z-[1] rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                isRoundTrip ? "text-white" : "text-white/75"
              }`}
            >
              Round Trip
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Departure City, Country or Airport Code"
              value={departureCity}
              onChange={(event) => setDepartureCity(event.target.value)}
              onFocus={() => setActiveAirportField("departure")}
              onBlur={() => closeSuggestionsAfterBlur("departure")}
              className="h-11 w-full rounded-xl border border-white/40 bg-white/10 px-3 text-sm text-[#111a5a] placeholder:text-[#111a5a]/60 focus:border-[#111a5a] focus:outline-none"
              autoComplete="off"
              required
            />
            {activeAirportField === "departure" && departureSuggestions.length > 0 && (
              <ul className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-xl border border-[#111a5a]/20 bg-white shadow-xl">
                {departureSuggestions.map((airport) => (
                  <li key={`${airport.code}-${airport.name}`}>
                    <button
                      type="button"
                      onMouseDown={(event) => {
                        event.preventDefault();
                        handleAirportSelect("departure", airport);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-[#ebf4fa] focus:bg-[#ebf4fa]"
                    >
                      <span className="block truncate text-sm font-medium text-[#111a5a]">
                        {airport.city}, {airport.country} ({airport.code})
                      </span>
                      <span className="block truncate text-xs text-[#111a5a]/70">{airport.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Arrival City, Country or Airport Code"
              value={arrivalCity}
              onChange={(event) => setArrivalCity(event.target.value)}
              onFocus={() => setActiveAirportField("arrival")}
              onBlur={() => closeSuggestionsAfterBlur("arrival")}
              className="h-11 w-full rounded-xl border border-white/40 bg-white/10 px-3 text-sm text-[#111a5a] placeholder:text-[#111a5a]/60 focus:border-[#111a5a] focus:outline-none"
              autoComplete="off"
              required
            />
            {activeAirportField === "arrival" && arrivalSuggestions.length > 0 && (
              <ul className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-xl border border-[#111a5a]/20 bg-white shadow-xl">
                {arrivalSuggestions.map((airport) => (
                  <li key={`${airport.code}-${airport.name}`}>
                    <button
                      type="button"
                      onMouseDown={(event) => {
                        event.preventDefault();
                        handleAirportSelect("arrival", airport);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-[#ebf4fa] focus:bg-[#ebf4fa]"
                    >
                      <span className="block truncate text-sm font-medium text-[#111a5a]">
                        {airport.city}, {airport.country} ({airport.code})
                      </span>
                      <span className="block truncate text-xs text-[#111a5a]/70">{airport.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <DatePickerField value={departureDate} onChange={setDepartureDate} placeholder="Departure Date" />
          <TimePickerField value={departureTime} onChange={setDepartureTime} placeholder="Departure Time" />
        </div>

        {isRoundTrip && (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <DatePickerField
              value={returnDate}
              onChange={setReturnDate}
              placeholder="Return Date"
              minDateValue={departureDate}
            />
            <TimePickerField value={returnTime} onChange={setReturnTime} placeholder="Return Time" />
          </div>
        )}

        <div
          className={`overflow-hidden transition-all duration-500 ${
            primaryDetailsComplete
              ? "mt-4 max-h-[340px] border-t border-white/25 pt-4 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="h-11 rounded-xl border border-white/40 bg-white/10 px-3 text-sm text-[#111a5a] placeholder:text-[#111a5a]/60 focus:border-[#111a5a] focus:outline-none"
              required={primaryDetailsComplete}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
              className="h-11 rounded-xl border border-white/40 bg-white/10 px-3 text-sm text-[#111a5a] placeholder:text-[#111a5a]/60 focus:border-[#111a5a] focus:outline-none"
              required={primaryDetailsComplete}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              className="h-11 rounded-xl border border-white/40 bg-white/10 px-3 text-sm text-[#111a5a] placeholder:text-[#111a5a]/60 focus:border-[#111a5a] focus:outline-none"
              required={primaryDetailsComplete}
            />
            <select
              value={selectedAircraft}
              onChange={(event) => {
                setSelectedAircraft(event.target.value);
                setPaxCount("");
              }}
              className="h-11 rounded-xl border border-white/40 bg-white/10 px-3 text-sm text-[#111a5a] focus:border-[#111a5a] focus:outline-none"
              required={primaryDetailsComplete}
            >
              <option value="" className="text-[#111a5a]">
                Select Jet
              </option>
              {AIRCRAFT_OPTIONS.map((aircraft) => (
                <option key={aircraft.code} value={aircraft.code} className="text-[#111a5a]">
                  {`${aircraft.code} - ${aircraft.manufacturer} - ${aircraft.category} - Max ${aircraft.maxPax}`}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="No. of People"
              value={paxCount}
              onChange={(event) => {
                const nextValue = event.target.value;
                if (nextValue.length === 0) {
                  setPaxCount("");
                  return;
                }
                if (!/^\d+$/.test(nextValue)) return;
                setPaxCount(nextValue);
              }}
              className="h-11 rounded-xl border border-white/40 bg-white/10 px-3 text-sm text-[#111a5a] placeholder:text-[#111a5a]/60 focus:border-[#111a5a] focus:outline-none disabled:cursor-not-allowed disabled:opacity-55"
              min={1}
              max={selectedAircraftMaxPax}
              step={1}
              disabled={!selectedAircraft}
              required={primaryDetailsComplete}
            />
          </div>
          {paxErrorMessage && (
            <p className={`mt-2 text-xs ${paxOverGlobalLimit ? "font-semibold text-[#ff1f1f]" : "font-semibold text-[#b91c1c]"}`}>
              {paxErrorMessage}
            </p>
          )}
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[linear-gradient(90deg,#111a5a_0%,#0a6ea4_100%)] px-5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#016291] disabled:cursor-not-allowed disabled:opacity-55"
            >
              Request Flight
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
