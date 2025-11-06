export function convertToEthiopianDate(date) {
    if (!date) return null;
    const ethiopian = window.$.calendars.instance('ethiopian')
    const gregorian = window.$.calendars.instance('gregorian');

    let gregorianDate = gregorian.parseDate('yyyy-mm-dd', date);
    let jd = gregorian.toJD(gregorianDate);
    let et = ethiopian.fromJD(jd);
    return ethiopian.formatDate('dd-mm-yyyy', et);
};

export function convertToGregorianDate(date) {
    if (!date) return null;
    const ethiopian = window.$.calendars.instance('ethiopian')
    const gregorian = window.$.calendars.instance('gregorian');

    let ethiopianDate = ethiopian.parseDate('yyyy-mm-dd', date);
    let jd = ethiopian.toJD(ethiopianDate);
    let gr = gregorian.fromJD(jd);
    console.log('gregorian date', gregorian.formatDate('yyyy-mm-dd', gr));
    return gregorian.formatDate('yyyy-mm-dd', gr);
};