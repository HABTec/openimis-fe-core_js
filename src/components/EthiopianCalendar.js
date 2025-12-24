import { min } from 'moment';
import React, { useRef, useEffect } from 'react';;

function EthiopianCalendar(props) {
  const dateInputRef = useRef(null);

  let convertToEthiopianDate = (date) => {
    if (!date) return null;
    const ethiopian = window.$.calendars.instance('ethiopian')
    const gregorian = window.$.calendars.instance('gregorian');

    let gregorianDate = gregorian.parseDate('yyyy-mm-dd', date);
    let jd = gregorian.toJD(gregorianDate);
    let et = ethiopian.fromJD(jd);
    return ethiopian.formatDate('dd-mm-yyyy', et);
  };

  let convertToGregorianDate = (date) => {
    if (!date) return null;
    const ethiopian = window.$.calendars.instance('ethiopian')
    const gregorian = window.$.calendars.instance('gregorian');

    let ethiopianDate = ethiopian.parseDate('yyyy-mm-dd', date);
    let jd = ethiopian.toJD(ethiopianDate);
    let gr = gregorian.fromJD(jd);
    return gregorian.formatDate('yyyy-mm-dd', gr);
  };

  useEffect(() => {
    if (window.$ && window.$.calendarsPicker) {
      const calendar = window.$.calendars.instance('ethiopian');

      $(dateInputRef.current).calendarsPicker({
        calendar: calendar,
        dateFormat: 'dd-mm-yyyy',
        // convertToEthiopianDate(new Date(props.value).toISOString().substr(0, 10))
        ...(props.minDate && {minDate: convertToEthiopianDate(new Date(props.minDate).toISOString().substr(0, 10))}),
        ...(props.maxDate && {maxDate: convertToEthiopianDate(new Date(props.maxDate).toISOString().substr(0, 10))}),
        onSelect: function (dates) {
          props.onChange(convertToGregorianDate(dates[0].formatDate("yyyy-mm-dd")));
        },
      });
    } else {
      console.error('jQuery or Calendars plugin not loaded.');
    }

    return () => {
      if (window.$ && dateInputRef.current) {
        window.$(dateInputRef.current).calendarsPicker('destroy');
      }
    };
  }, []);

  //this function is necessary to avoid date shifting due to timezone differences
  function normalizeDateToNoon(dateString) {
    const date = new Date(dateString);

    date.setHours(12, 0, 0, 0);

    return date;
  }


  useEffect(() => {
    if (dateInputRef.current && props.value) {
      try {

        let val = convertToEthiopianDate(new Date(normalizeDateToNoon(props.value)).toISOString().substr(0, 10));

        dateInputRef.current.value = val;
      } catch (error) {
        console.error("Error setting date input value:", error);
      }
    }
  }, [props.value]);
  return (
    <div className="EthiopianCalendar">
      <input 
      style={{ 
        border: 'none', 
        borderBottom: '1px solid black', 
        background: "transparent", 
        color: props.disabled ? "#635c5c" : 'black',
        width: '100%',
        zIndex: '2000 !important',
        ...(props.disabled ? { borderBottom: '1px solid gray'} : {}), 
      }} 
      type="text" 
      id="dateInput" 
      disabled={props.disabled} 
      ref={dateInputRef} />
    </div>
  );
}

export default EthiopianCalendar;
