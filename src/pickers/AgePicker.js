import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import DatePicker from './DatePicker';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


function AgePicker(props) {
  const [date, setDate] = React.useState(null);
  const [randomDate, setRandomDate] = React.useState(null);
  const [month, setMonth] = React.useState(null);
  const [day, setDay] = React.useState(null);
  const [year, setYear] = React.useState(null);
  const [age, setAge] = React.useState(null);
  const { value } = props;


  const classes = useStyles();
  let convertToEthiopianDate = (date) => {
    if (!date) return null;
    const ethiopian = window.$.calendars.instance('ethiopian')
    const gregorian = window.$.calendars.instance('gregorian');

    let gregorianDate = gregorian.parseDate('yyyy-mm-dd', date);
    let jd = gregorian.toJD(gregorianDate);
    let et = ethiopian.fromJD(jd);
    return ethiopian.formatDate('dd-mm-yyyy', et);
  };

  let setManualRandomDate = (date) => {
    setRandomDate(date);
    props.onChange(date);
  }

  let setManualDate = (date) => {
    setDate(date);
    props.onChange(date);
  }

  let convertToGregorianDate = (date) => {
    if (!date) return null;
    const ethiopian = window.$.calendars.instance('ethiopian')
    const gregorian = window.$.calendars.instance('gregorian');

    let ethiopianDate = ethiopian.parseDate('yyyy-mm-dd', date);
    let jd = ethiopian.toJD(ethiopianDate);
    let gr = gregorian.fromJD(jd);
    return gregorian.formatDate('yyyy-mm-dd', gr);
  };


  const handleMonth = (event) => {
    setMonth(event.target.value);
    handleChangeToGregorian("m" , event.target.value);
  };
  const handleDay = (event) => {
    setDay(event.target.value);
    handleChangeToGregorian("d" , event.target.value);
  };
  const handleYear = (value) => {
    setYear(value);
    handleChangeToGregorian("y" , value);
  };

  const handleChangeToGregorian = (type , value) => {
      let randomMonth = Math.floor(Math.random() * ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].length - 1)) + 1;
      randomMonth = randomMonth < 10 ? `0${randomMonth}` : randomMonth;
      let randomDay = Math.floor(Math.random() * (5 - 1)) + 1;
      randomDay = randomDay < 10 ? `0${randomDay}` : randomDay;
      if (type == "d") {
        let datestr = `${year}-${month}-${value}`;
        let date = convertToGregorianDate(datestr);
        setManualRandomDate(date);
        setManualDate(date);
      }
      else if (type == "m") {
        let datestr = `${year}-${value}-${randomDay}`;
        setDay(randomDay);
        let date = convertToGregorianDate(datestr);
        setManualRandomDate(date);
        setManualDate(date);
      }
      else if (type == "y" ) {
        let datestr = `${value}-${randomMonth}-${randomDay}`;
        setMonth(randomMonth);
        setDay(randomDay);
        let date = convertToGregorianDate(datestr);
        setManualRandomDate(date);
        setManualDate(date);
    }
  }

  const days = (selectedMonth = month) => {
    if (selectedMonth >= 1 && selectedMonth <= 12) {
      return Array.from({ length: 30 }, (_, i) => i + 1);
    }
    if (selectedMonth === 13) {
      const isLeapYear = year % 4 === 3;
      const daysInPagumen = isLeapYear ? 6 : 5;
      return Array.from({ length: daysInPagumen }, (_, i) => i + 1);
    }
    return [];
  }
  const handleDate = (date) => {
    setDate(date);
    let ethiopianDate = convertToEthiopianDate(date);
    const [day, month, year] = ethiopianDate.split('-').map(Number);
    setDay(day);
    setMonth(month);
    setYear(year);
    setAge(new Date().getFullYear() - new Date(date).getFullYear());
    props.onChange(date);
  }
  const localDate = () => {
    if (!value) return null;
    let ethiopianDate = convertToEthiopianDate(value);
    const [day, month, year] = ethiopianDate.split('-').map(Number);
    return {
      date: value,
      day: day,
      month: month,
      year: year
    }
  }

  return (
    <div className="AgePicker">
      <Grid container >
        <Grid item xs={3}>
          <DatePicker
            value={localDate()?.date}
            required
            readOnly={props.readOnly}
            minDate={props.minDate}
            maxDate={props.maxDate}
            label="core.dob"
            onChange={(date) => handleDate(date)}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl className={classes.formControl}>
             <TextField
                id="age"
                type="number"
                required={props?.required}
                disabled={props.readOnly}
                value={age}
                onChange={(v) => {
                  let currentDate = new Date();
                  let ethiopianDate = convertToEthiopianDate(`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`);
                  let [day, month, year] = ethiopianDate.split('-').map(Number);
                  let dobYear = year - Number(v.target.value);
                  setAge(v.target.value);
                  handleYear(dobYear)
                }}
              />
          </FormControl>
        </Grid>
        <Grid item xs={3} >
          <FormControl className={classes.formControl}>
            <Select
              labelId="month"
              id="demo-simple-select"
              value={localDate()?.month || month}
              onChange={handleMonth}
              disabled={!year}
            >
              <MenuItem key={1} value={1}>Meskerem</MenuItem>
              <MenuItem key={2} value={2}>Tikimt</MenuItem>
              <MenuItem key={3} value={3}>Hidar</MenuItem>
              <MenuItem key={4} value={4}>Tahsas</MenuItem>
              <MenuItem key={5} value={5}>Tir</MenuItem>
              <MenuItem key={6} value={6}>Yekatit</MenuItem>
              <MenuItem key={7} value={7}>Megabit</MenuItem>
              <MenuItem key={8} value={8}>Miyazya</MenuItem>
              <MenuItem key={9} value={9}>Ginbot</MenuItem>
              <MenuItem key={1} value={10}>Sene</MenuItem>
              <MenuItem key={1} value={11}>Hamle</MenuItem>
              <MenuItem key={1} value={12}>Nehase</MenuItem>
              <MenuItem key={1} value={13}>Pagumen</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl className={classes.formControl}>
            <Select
              labelId="day"
              id="demo-simple-select"
              value={localDate()?.day || day}
              onChange={handleDay}
              disabled={!year || !month}
            >
              {days().map((day) => (
                <MenuItem key={day} value={day}>{day}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

      </Grid>
    </div>
  );
}

export default AgePicker;
