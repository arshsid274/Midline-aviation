"use client";

import { useEffect, useMemo, useState } from "react";

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

export default function HeroBookingForm() {
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

  const primaryDetailsComplete =
    departureCity.trim().length > 0 &&
    arrivalCity.trim().length > 0 &&
    departureDate.length > 0 &&
    departureTime.length > 0 &&
    (!isRoundTrip || (returnDate.length > 0 && returnTime.length > 0));

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
      className="relative z-40 -mt-20 px-4 sm:-mt-24 sm:px-6 md:-mt-28 md:px-10 lg:-mt-40"
    >
      <form
        className="mx-auto w-full max-w-6xl rounded-2xl border border-[#0d1451]/35 bg-[#0d1451]/16 p-4 text-white shadow-[0_22px_55px_rgba(13,20,81,0.26)] backdrop-blur-xl sm:p-5 md:p-6"
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
              className="h-11 w-full rounded-xl border border-white/40 bg-white/10 px-3 text-sm text-[#0d1451] placeholder:text-[#0d1451]/60 focus:border-[#0d1451] focus:outline-none"
              autoComplete="off"
              required
            />
            {activeAirportField === "departure" && departureSuggestions.length > 0 && (
              <ul className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-xl border border-[#0d1451]/20 bg-white shadow-xl">
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
                      <span className="block truncate text-sm font-medium text-[#0d1451]">
                        {airport.city}, {airport.country} ({airport.code})
                      </span>
                      <span className="block truncate text-xs text-[#0d1451]/70">{airport.name}</span>
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
              className="h-11 w-full rounded-xl border border-white/40 bg-white/10 px-3 text-sm text-[#0d1451] placeholder:text-[#0d1451]/60 focus:border-[#0d1451] focus:outline-none"
              autoComplete="off"
              required
            />
            {activeAirportField === "arrival" && arrivalSuggestions.length > 0 && (
              <ul className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-xl border border-[#0d1451]/20 bg-white shadow-xl">
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
                      <span className="block truncate text-sm font-medium text-[#0d1451]">
                        {airport.city}, {airport.country} ({airport.code})
                      </span>
                      <span className="block truncate text-xs text-[#0d1451]/70">{airport.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="date"
            value={departureDate}
            onChange={(event) => setDepartureDate(event.target.value)}
            className="h-11 rounded-xl border border-white/40 bg-white/10 px-3 text-sm text-[#0d1451] focus:border-[#0d1451] focus:outline-none"
            required
          />
          <input
            type="time"
            value={departureTime}
            onChange={(event) => setDepartureTime(event.target.value)}
            className="h-11 rounded-xl border border-white/40 bg-white/10 px-3 text-sm text-[#0d1451] focus:border-[#0d1451] focus:outline-none"
            required
          />
        </div>

        {isRoundTrip && (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <input
              type="date"
              value={returnDate}
              onChange={(event) => setReturnDate(event.target.value)}
              className="h-11 rounded-xl border border-white/40 bg-white/10 px-3 text-sm text-[#0d1451] focus:border-[#0d1451] focus:outline-none"
              required={isRoundTrip}
            />
            <input
              type="time"
              value={returnTime}
              onChange={(event) => setReturnTime(event.target.value)}
              className="h-11 rounded-xl border border-white/40 bg-white/10 px-3 text-sm text-[#0d1451] focus:border-[#0d1451] focus:outline-none"
              required={isRoundTrip}
            />
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
              className="h-11 rounded-xl border border-white/40 bg-white/10 px-3 text-sm text-[#0d1451] placeholder:text-[#0d1451]/60 focus:border-[#0d1451] focus:outline-none"
              required={primaryDetailsComplete}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
              className="h-11 rounded-xl border border-white/40 bg-white/10 px-3 text-sm text-[#0d1451] placeholder:text-[#0d1451]/60 focus:border-[#0d1451] focus:outline-none"
              required={primaryDetailsComplete}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              className="h-11 rounded-xl border border-white/40 bg-white/10 px-3 text-sm text-[#0d1451] placeholder:text-[#0d1451]/60 focus:border-[#0d1451] focus:outline-none"
              required={primaryDetailsComplete}
            />
            <select
              value={selectedAircraft}
              onChange={(event) => {
                setSelectedAircraft(event.target.value);
                setPaxCount("");
              }}
              className="h-11 rounded-xl border border-white/40 bg-white/10 px-3 text-sm text-[#0d1451] focus:border-[#0d1451] focus:outline-none"
              required={primaryDetailsComplete}
            >
              <option value="" className="text-[#0d1451]">
                Select Jet
              </option>
              {AIRCRAFT_OPTIONS.map((aircraft) => (
                <option key={aircraft.code} value={aircraft.code} className="text-[#0d1451]">
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
              className="h-11 rounded-xl border border-white/40 bg-white/10 px-3 text-sm text-[#0d1451] placeholder:text-[#0d1451]/60 focus:border-[#0d1451] focus:outline-none disabled:cursor-not-allowed disabled:opacity-55"
              min={1}
              max={selectedAircraftMaxPax}
              step={1}
              disabled={!selectedAircraft}
              required={primaryDetailsComplete}
            />
          </div>
          {paxErrorMessage && (
            <p className={`mt-2 text-xs ${paxOverGlobalLimit ? "font-semibold text-[#ff1f1f]" : "text-[#ffd7d7]"}`}>
              {paxErrorMessage}
            </p>
          )}
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0d1451] px-5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#016291] disabled:cursor-not-allowed disabled:opacity-55"
            >
              Request Flight
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
