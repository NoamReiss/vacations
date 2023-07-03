import React, { useEffect, useState } from "react";
import "./Filters.css";
import { FormControlLabel, Switch } from "@mui/material";

import dayjs from "dayjs";

import { toast } from "react-toastify";
import Vacation from "../../Models/Vacation";

interface Filter {
  label: string;
  value: string;
}

interface FiltersProps {
  filters: Filter[];
  onFilterChange: (filteredVacations: Vacation[]) => void;
  vacations: Vacation[];
  likedVacations: number[];
}

function Filters({
  filters,
  onFilterChange,
  vacations,
  likedVacations,
}: FiltersProps): JSX.Element {
  const [selected, setSelected] = useState<string[]>([]);
  const today = dayjs().startOf("day").toDate();

  useEffect(() => {
    const isOngoing = selected.includes("ongoing");
    const isUpcoming = selected.includes("upcoming");
    if (isOngoing && isUpcoming) {
      toast.warning("Cannot select both ongoing and upcoming filters", {
        position: "top-center",
      });
    }
  }, [selected]);

  const handleFilter = (filter: string) => {
    const disabledFilters: Record<string, boolean> = {
      ongoing: selected.includes("upcoming"),
      upcoming: selected.includes("ongoing"),
    };

    if (disabledFilters[filter]) {
      let selectedFilter = filter === "ongoing" ? "upcoming" : "ongoing";
      toast.info(`Cannot select ${filter} when ${selectedFilter} is selected`, {
        position: "top-center",
      });
      return;
    }
    const updatedFilters = selected.includes(filter)
      ? selected.filter((f) => f !== filter)
      : [...selected, filter];
    setSelected(updatedFilters);

    let filteredVacations: Vacation[] = [...vacations];

    if (updatedFilters.length > 0) {
      filteredVacations = filteredVacations.filter((vacation) => {
        const startDate = new Date(vacation.start_date);
        const endDate = new Date(vacation.end_date);

        return updatedFilters.every((filter) => {
          switch (filter) {
            case "ongoing":
              return startDate <= today && endDate >= today;
            case "upcoming":
              return startDate > today;
            case "liked":
              return likedVacations.includes(vacation.vacation_code!);
            default:
              return false;
          }
        });
      });
    } else {
      filteredVacations = vacations;
    }
    onFilterChange(filteredVacations);
  };

  return (
    <div className="Filters">
      <div className="FilterOptions">
        {filters.map((filter) => {
          return (
            <FormControlLabel
              key={filter.value}
              control={
                <Switch
                  checked={selected.includes(filter.value)}
                  onChange={() => handleFilter(filter.value)}
                  color="primary"
                />
              }
              label={filter.label}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Filters;
