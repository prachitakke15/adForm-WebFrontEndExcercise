import { useSelector } from "react-redux";

export function useFilteredCampaigns() {
  const list = useSelector((s) => s.campaigns.list);
  const searchValue = useSelector((s) => s.campaigns.searchValue);
  const startDate = useSelector((s) => s.campaigns.startDate);
  const endDate = useSelector((s) => s.campaigns.endDate);

  const today = new Date();

  return list
    .map((c) => {
      const start = new Date(c.startDate);
      const end = new Date(c.endDate);

      return {
        ...c,
        isActive: today >= start && today <= end,
      };
    })
    .filter((c) => {
      if (!c.name.toLowerCase().includes(searchValue.toLowerCase())) return false;

      if (!startDate && !endDate) return true;

      const s = new Date(startDate);
      const e = new Date(endDate);
      const cs = new Date(c.startDate);
      const ce = new Date(c.endDate);

      if (endDate && startDate && e < s) return false;

      const startInside = cs >= s && cs <= e;
      const endInside = ce >= s && ce <= e;
      const coversRange = cs <= s && ce >= e;

      return startInside || endInside || coversRange;
    });
}
