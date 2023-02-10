module.exports = {
  format_date: (date) => {
    const M = new Date(date).getMonth() + 1;
    const DD = new Date(date).getDate();
    const YYYY = new Date(date).getFullYear();

    return `${M}/${DD}/${YYYY}`;
  },
};
