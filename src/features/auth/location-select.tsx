"use client";

import { useState, useMemo } from "react";
import { Country, State, City } from "country-state-city";
import { Button } from "@/components/ui/button";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxTrigger,
    ComboboxValue,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";

interface LocationValue {
    country: string;
    countryCode: string;
    state?: string;
    stateCode?: string;
    city: string;
    latitude: number;
    longitude: number;
}

interface LocationSelectProps {
    onChange: (value: LocationValue) => void;
    errors?: {
        country?: { message?: string };
        city?: { message?: string };
    };
}

interface CountryItem { value: string; label: string; name: string }
interface StateItem { value: string; label: string; name: string }
interface CityItem { value: string; label: string; lat: number; lng: number }

export function LocationSelect({ onChange, errors }: LocationSelectProps) {
    const [selectedCountry, setSelectedCountry] = useState<CountryItem | null>(null);
    const [selectedState, setSelectedState] = useState<StateItem | null>(null);
    const [selectedCity, setSelectedCity] = useState<CityItem | null>(null);

    const countryItems = useMemo<CountryItem[]>(() =>
        Country.getAllCountries().map((c) => ({
            value: c.isoCode,
            label: `${c.flag} ${c.name}`,
            name: c.name,
        })), []);

    const stateItems = useMemo<StateItem[]>(() => {
        if (!selectedCountry) return [];
        return State.getStatesOfCountry(selectedCountry.value).map((s) => ({
            value: s.isoCode,
            label: s.name,
            name: s.name,
        }));
    }, [selectedCountry]);

    const cityItems = useMemo<CityItem[]>(() => {
        if (!selectedCountry) return [];
        const raw = selectedState
            ? City.getCitiesOfState(selectedCountry.value, selectedState.value)
            : City.getCitiesOfCountry(selectedCountry.value) ?? [];

        const seen = new Set<string>();
        return raw
            .filter((c) => {
                if (seen.has(c.name)) return false;
                seen.add(c.name);
                return true;
            })
            .map((c) => ({
                value: c.name,
                label: c.name,
                lat: parseFloat(c.latitude ?? "0"),
                lng: parseFloat(c.longitude ?? "0"),
            }));
    }, [selectedCountry, selectedState]);

    const handleCountryChange = (item: CountryItem | null) => {
        if (!item) return;
        setSelectedCountry(item);
        setSelectedState(null);
        setSelectedCity(null);
    };

    const handleStateChange = (item: StateItem | null) => {
        if (!item) return;
        setSelectedState(item);
        setSelectedCity(null);
    };

    const handleCityChange = (item: CityItem | null) => {
        if (!item || !selectedCountry) return;
        setSelectedCity(item);
        onChange({
            country: selectedCountry.name,
            countryCode: selectedCountry.value,
            state: selectedState?.name,
            stateCode: selectedState?.value,
            city: item.label,
            latitude: item.lat,
            longitude: item.lng,
        });
    };

    return (
        <div className="space-y-4">
            {/* Страна */}
            <div>
                <Label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    Страна
                </Label>
                <Combobox items={countryItems} value={selectedCountry} onValueChange={handleCountryChange}>
                    <ComboboxTrigger
                        render={
                            <Button variant="outline" className="w-full bg-zinc-50 py-6 px-5 justify-between font-normal dark:text-zinc-300">
                                <ComboboxValue placeholder="Выберите страну" />
                            </Button>
                        }
                    />
                    <ComboboxContent>
                        <ComboboxInput showTrigger={false} placeholder="Поиск..." />
                        <ComboboxEmpty>Не найдено</ComboboxEmpty>
                        <ComboboxList>
                            {(item) => (
                                <ComboboxItem key={item.value} value={item}>
                                    {item.label}
                                </ComboboxItem>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
                {errors?.country && (
                    <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
                )}
            </div>

            {/* Регион */}
            {stateItems.length > 0 && (
                <div>
                    <Label
                        htmlFor="firstName"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Регион / Область
                    </Label>
                    <Combobox items={stateItems} value={selectedState} onValueChange={handleStateChange}>
                        <ComboboxTrigger
                            render={
                                <Button variant="outline" className="w-full py-6 px-5 bg-zinc-50 justify-between font-normal dark:text-zinc-300">
                                    <ComboboxValue placeholder="Выберите регион" />
                                </Button>
                            }
                        />
                        <ComboboxContent>
                            <ComboboxInput showTrigger={false} placeholder="Поиск..." />
                            <ComboboxEmpty>Не найдено</ComboboxEmpty>
                            <ComboboxList>
                                {(item) => (
                                    <ComboboxItem key={item.value} value={item}>
                                        {item.label}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </div>
            )}

            {/* Город */}
            <div>
                <Label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    Город
                </Label>
                <Combobox items={cityItems} value={selectedCity} onValueChange={handleCityChange}>
                    <ComboboxTrigger
                        render={
                            <Button
                                variant="outline"
                                className="w-full py-6 px-5 bg-zinc-50 justify-between font-normal dark:text-zinc-300"
                                disabled={!selectedCountry}
                            >
                                <ComboboxValue
                                    placeholder={
                                        !selectedCountry
                                            ? "Сначала выберите страну"
                                            : "Выберите город"
                                    }
                                />
                            </Button>
                        }
                    />
                    <ComboboxContent>
                        <ComboboxInput showTrigger={false} placeholder="Поиск..." />
                        <ComboboxEmpty>Не найдено</ComboboxEmpty>
                        <ComboboxList>
                            {(item) => (
                                <ComboboxItem key={item.value} value={item}>
                                    {item.label}
                                </ComboboxItem>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
                {errors?.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                )}
            </div>
        </div>
    );
}