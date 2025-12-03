import { useSelector } from "react-redux";

export function useFilteredCampaigns() {
  const list = useSelector((state) => state.campaigns.list);
  const searchValue = useSelector((state) => state.campaigns.searchValue);
  const startDate = useSelector((state) => state.campaigns.startDate);
  const endDate = useSelector((state) => state.campaigns.endDate);

  const today = new Date();

  const filtered = list
    .map((c) => {
      const start = new Date(c.startDate);
      const end = new Date(c.endDate);

      return {
        ...c,
        isActive: today >= start && today <= end
      };
    })
    .filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchValue.toLowerCase());

      if (!matchesSearch) return false;

      if (!startDate && !endDate) return true;

      const start = new Date(c.startDate);
      const end = new Date(c.endDate);
      const selectedStart = startDate ? new Date(startDate) : null;
      const selectedEnd = endDate ? new Date(endDate) : null;

      const startInside =
        selectedStart &&
        selectedEnd &&
        start >= selectedStart &&
        start <= selectedEnd;

      const endInside =
        selectedStart &&
        selectedEnd &&
        end >= selectedStart &&
        end <= selectedEnd;

      const overlaps =
        selectedStart &&
        selectedEnd &&
        start <= selectedStart &&
        end >= selectedEnd;

      return startInside || endInside || overlaps;
    });

  return filtered;
}
