let earliestYear = 1900;
const currentYear = new Date().getFullYear();
const yearList = [];

for (earliestYear; earliestYear <= currentYear; earliestYear++) {
  yearList.unshift(earliestYear);
}

export {yearList};
