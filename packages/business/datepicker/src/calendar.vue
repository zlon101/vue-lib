<template>
  <div :class="['calendar-comp', dark && 'dark']">
    <span class="r-val" :class="_showSelectClass">{{ _getSelectDateStr }}</span>
    <div class="change-wrap">
      <div class="placeholder-div">
        <div class="select-wrap" data-type="month" :class="{unfold:monthListShow}">
          <span class="val" @click="monthListShow = !monthListShow;">{{ MonthEnum[selectMonth] }}</span>
          <div class="s-container">
            <div class="line"></div>
            <div class="content">
              <ul>
                <li
                  v-for="index in monthList"
                  :class="monthList[index] == selectMonth ? 'select' : ''"
                  :key="'m-' + index"
                  @click.stop='changeSelectMonth'
                  :data-value='index'>
                  {{ MonthEnum[monthList[index]] }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="placeholder-div">
        <div class="select-wrap" data-type="year" :class="{unfold:yearListShow}">
          <span class="val" @click="yearListShow = !yearListShow;">{{ selectYear }}</span>
          <div class="s-container">
            <div class="line"></div>
            <div class="content">
              <ul>
                <li
                  v-for="year in yearList"
                  :class="year == selectYear ? 'select' : ''"
                  :key="'y-' + year"
                  @click.stop='changeSelectYear'
                  :data-value='year'>
                  {{ year }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="calendar">
      <table>
        <tr class="week-text"><td v-for="text in WeekText" :key="text">{{ text }}</td></tr>
        <tr v-for="(dayL, i) in renderDaysList" :key="`row${i}`">
            <td v-for="(day,j) in dayL"
                :key="`col${(i + 1) * j}`"
                :data-y="day.year"
                :data-m="day.month"
                :data-d="day.day"
                :class="{current: day.isCurrent, today: day.isToday, disabled: isDisableBiggerMax(day) || isDisableLessMin(day)}"
                @click.stop="changeSelectDay">{{day.day}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
const WeekText = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
class Day {
  constructor(day, month, year, isToday, isCurrent) {
    this.month = month;
    this.day = day;
    this.year = year;
    this.isCurrent = isCurrent;
    this.isToday = isToday;
  }
}
const Month = {};
Month[(Month.Jan = 0)] = '一月'; // ' Jan';
Month[(Month.Feb = 1)] = '二月'; // ' Feb';
Month[(Month.Mar = 2)] = '三月'; // ' Mar';
Month[(Month.Apr = 3)] = '四月'; // ' Apr';
Month[(Month.May = 4)] = '五月'; // ' May';
Month[(Month.Jun = 5)] = '六月'; // ' Jun';
Month[(Month.Jul = 6)] = '七月'; // ' Jul';
Month[(Month.Aug = 7)] = '八月'; // ' Aug';
Month[(Month.Sep = 8)] = '九月'; // ' Sep';
Month[(Month.Oct = 9)] = '十月'; // ' Oct';
Month[(Month.Nov = 10)] = '十一月'; // ' Nov';
Month[(Month.Dec = 11)] = '十二月'; // ' Dec';

const Week = {};
Week[(Week.Sun = 0)] = 'Sun';
Week[(Week.Mon = 1)] = 'Mon';
Week[(Week.Tue = 2)] = 'Tue';
Week[(Week.Wed = 3)] = 'Wed';
Week[(Week.Thu = 4)] = 'Thu';
Week[(Week.Fri = 5)] = 'Fri';
Week[(Week.Sat = 6)] = 'Sat';

export default {
  name: 'Calendar',
  data() {
    return {
      MonthEnum: Month,
      WeekEnum: Week,
      monthList: [Month.Jan, Month.Feb, Month.Mar, Month.Apr, Month.May, Month.Jun, Month.Jul, Month.Aug, Month.Sep, Month.Oct, Month.Nov, Month.Dec],
      bigMonthList: [Month.Jan, Month.Mar, Month.May, Month.Jul, Month.Aug, Month.Oct, Month.Dec],
      normalMonthList: [Month.Apr, Month.Jun, Month.Sep, Month.Nov],
      defaultDate: null,
      selectYear: 2017,
      selectMonth: 7,
      selectDay: 12,
      yearList: [],
      renderDaysList: [[], [], [], [], [], []],
      monthListShow: false,
      yearListShow: false,
      WeekText,
    };
  },
  props: {
    initDate: [Date, null],
    showSelectResult: Boolean,
    maxDate: {
      type: Date,
      default: () => new Date(),
    },
    minDate: {
      type: Date,
      default: () => new Date(0),
    },
    dark: Boolean,
  },
  computed: {
    _getSelectDateStr() {
      return `${this.selectYear}-${this._addPrefixOneZero(this.selectMonth + 1)}-${this._addPrefixOneZero(this.selectDay)}`;
    },
    _showSelectClass() {
      return {
        show: this.showSelectResult,
      };
    },
  },
  created() {
    // init year list
    const beginYear = 2019;
    const endYear = new Date().getFullYear();
    for (let i = 0; i < endYear - beginYear + 1; i++) {
      this.yearList.push(beginYear + i);
    }
    // init date
    if (this.initDate) {
      this.defaultDate = this.initDate;
    } else {
      this.defaultDate = new Date();
    }
    this.selectYear = this.defaultDate.getFullYear();
    this.selectMonth = this.defaultDate.getMonth();
    this.selectDay = this.defaultDate.getDate();
    this.updateRenderDayList();
  },
  methods: {
    _isLeap() {
      if ((this.selectYear % 4 === 0 && this.selectYear % 100 !== 0) || this.selectYear % 400 === 0) {
        return true;
      }
      return false;
    },
    _getMonthDay(month) {
      if (this.bigMonthList.includes(month)) {
        return 31;
      }
      if (this.normalMonthList.includes(month)) {
        return 30;
      }
      return this._isLeap() ? 29 : 28;
    },
    _getLastMonth() {
      if (this.selectMonth === Month.Jan) {
        return Month.Dec;
      }
      return this.selectMonth - 1;
    },
    _getNextMonth() {
      if (this.selectMonth === Month.Dec) {
        return Month.Jan;
      }
      return this.selectMonth + 1;
    },
    _addPrefixOneZero(i) {
      return `00${i}`.slice(-2);
    },
    _isToday(d, m) {
      return this.selectDay === d && this.selectMonth === m;
    },
    _monthSelectClass(month) {
      return month === this.selectMonth ? 'select' : '';
    },
    _yearSelectClass(year) {
      return year === this.selectYear ? 'select' : '';
    },
    getMonthFirstDay() {
      return new Date(this.selectYear, this.selectMonth, 1).getDay();
    },
    getWeekDay() {
      return new Date(this.selectYear, this.selectMonth, this.selectDay).getDay();
    },
    getMonthDays() {
      return this._getMonthDay(this.selectMonth);
    },
    getLastMonthDays() {
      if (this.selectMonth === Month.Jan) {
        return 31;
      }
      const lastMonth = this.selectMonth - 1;
      return this._getMonthDay(lastMonth);
    },
    updateRenderDayList() {
      const daysList = [];
      const lastDays = this.getLastMonthDays();
      const currentDays = this.getMonthDays();
      let firstDay = this.getMonthFirstDay();
      // if (firstDay == Week.Sun){
      //     firstDay = 7;
      // }
      let lastYear = this.selectYear;
      let nextYear = this.selectYear;
      if (this.selectMonth === Month.Jan) {
        lastYear = this.selectYear - 1;
      }
      if (this.selectMonth === Month.Dec) {
        nextYear = this.selectYear + 1;
      }
      for (; firstDay > 0; firstDay--) {
        const d = lastDays - (firstDay - 1);
        const m = this._getLastMonth();
        daysList.push(new Day(d, m, lastYear, this._isToday(d, m), false));
      }
      for (let i = 0; i < currentDays; i++) {
        const d = i + 1;
        const m = this.selectMonth;
        daysList.push(new Day(d, m, this.selectYear, this._isToday(d, m), true));
      }
      const tmpL = daysList.length;
      for (let i = 0; i < 42 - tmpL; i++) {
        const d = i + 1;
        const m = this._getNextMonth();
        daysList.push(new Day(d, m, nextYear, this._isToday(d, m), false));
      }
      for (let i = 0; i < daysList.length; i++) {
        const row = parseInt(i / 7, 10);
        const col = i % 7;
        this.renderDaysList[row][col] = daysList[i];
      }
    },
    changeSelectMonth(e) {
      this.selectMonth = Number(e.target.dataset.value);
      const maxMonth = new Date().getMonth();
      const maxDay = new Date().getDate();
      const minMonth = this.minDate.getMonth();
      const minDay = this.minDate.getDate();
      if (minMonth === this.selectMonth) { // 相同月份可以切换
        if (this.selectDay < minDay) {
          this.selectDay = minDay;
        }
      } else if (this.selectMonth === maxMonth) { // 相同月份
        this.selectDay = maxDay;
      } else if (minMonth < this.selectMonth && this.selectMonth < maxMonth) {
        this.selectDay = this._getMonthDay(this.selectMonth);
      }
      this.checkMinDate();
      this.monthListShow = false;
      this.updateRenderDayList();
      this.$emit('updateAction', this._getSelectDateStr);
    },
    changeSelectYear(e) {
      this.selectYear = Number(e.target.dataset.value);
      this.checkMinDate();
      this.yearListShow = false;
      this.updateRenderDayList();
      this.$emit('updateAction', this._getSelectDateStr);
    },
    changeSelectDay(e) {
      this.selectYear = Number(e.target.dataset.y);
      this.selectMonth = Number(e.target.dataset.m);
      this.selectDay = Number(e.target.dataset.d);
      this.checkMinDate();
      this.updateRenderDayList();
      this.$emit('updateAction', this._getSelectDateStr);
    },
    checkMinDate() {
      // if (this.isDisableLessMin(new Date(this.selectYear, this.selectMonth, this.selectDay))) {
      //   this.defaultDate = new Date();
      //   this.selectYear = this.defaultDate.getFullYear();
      //   this.selectMonth = this.defaultDate.getMonth();
      //   this.selectDay = this.defaultDate.getDate();
      // }
      const y = this.minDate.getFullYear();
      const m = this.minDate.getMonth();
      const d = this.minDate.getDate();
      const tmpMin = new Date(y, m, d);
      if (new Date(this.selectYear, this.selectMonth, this.selectDay) < tmpMin) {
        this.defaultDate = new Date();
        this.selectYear = this.defaultDate.getFullYear();
        this.selectMonth = this.defaultDate.getMonth();
        this.selectDay = this.defaultDate.getDate();
      }
    },
    isDisableBiggerMax(curDate) {
      return new Date(curDate.year, curDate.month, curDate.day) > this.maxDate;
    },
    // 注意时刻问题，小于当前时间尤其注意，当前时间包括时刻 //
    isDisableLessMin(curDate) {
      const y = this.minDate.getFullYear();
      const m = this.minDate.getMonth();
      const d = this.minDate.getDate();
      return new Date(curDate.year, curDate.month, curDate.day) < new Date(y, m, d);
    },
  },
  watch: {
    initDate(val) {
      if (val instanceof Date) {
        this.selectYear = val.getFullYear();
        this.selectMonth = val.getMonth();
        this.selectDay = val.getDate();
        this.updateRenderDayList();
      }
    },
    minDate(nVal) {
      // this.minDate = nVal;
      this.checkMinDate();
      this.updateRenderDayList();
    },
  },
};
</script>

<style lang="less" scoped>
.calendar-comp {
  width: 100%;
  min-width: 288px;
  color: #333;
  background: #fff;
  &.dark {
    background: #000410;
    .change-wrap {
      .placeholder-div {
        .select-wrap {
          .val {
            color: #fff;
            background: #000410;
            border: 1px solid #3D3D3D;
          }
          &.unfold {
            border: 1px solid #3D3D3D;
            .val {
              border: none
            }
          }
          .s-container {
            background: #000410;
          }
        }
      }
    }
    .calendar {
      table {
        tr {
          td {
            color: #3D3D3D;
            &.disabled {
              color: #fff;
            }
          }
        }
      }
    }
  }

  .r-val {
    box-sizing: border-box;
    display: none;
    width: 288px;
    padding: 10px;
    text-align: center;
    font-size: 16px;
    line-height: 20px;
    border-radius: 8px;
    background: #f7f7f7;

    &.active {
      border: 2px solid #3a51e0;
    }

    &.show {
      display: block;
    }
  }

  .change-wrap {
    margin-top: 15px;
    text-align: center;

    .placeholder-div {
      position: relative;
      display: inline-block;
      width: 100px;
      height: 32px;
      margin-right: 10px;
      vertical-align: top;

      &:last-child {
        margin-right: 0;
      }

      .select-wrap {
        position: relative;
        width: 100%;
        font-size: 12px;

        &:before {
          content: '';
          position: absolute;
          top: 9px;
          right: 8px;
          border-bottom: 5px solid #333;
          border-left: 3px solid transparent;
          border-right: 3px solid transparent;
        }

        &:after {
          content: '';
          position: absolute;
          top: 18px;
          right: 8px;
          border-top: 5px solid #333;
          border-left: 3px solid transparent;
          border-right: 3px solid transparent;
        }

        .val {
          display: block;
          padding: 6px 24px 6px 10px;
          border-radius: 8px;
          font-size: 16px;
          line-height: 20px;
          border: 1px solid #DCDFE6;
          background: #fff;
          cursor: pointer;
        }

        .s-container {
          display: none;
          background: #fff;
          padding: 0 10px 10px 10px;

          .line {
            border-top: 0.5px solid #e6e6e6;
          }

          .content {
            max-height: 200px;
            overflow-y: auto;
            > ul {
              li {
                margin-top: 8px;
                font-size: 14px;
                line-height: 20px;
                color: #ccc;
                text-align: center;
                cursor: pointer;
                &.select,
                &:hover {
                  color: #3a51e0;
                  text-decoration: underline;
                }
              }
            }
          }
        }

        &.unfold {
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 7px rgba(0, 0, 0, 0.15);

          .val {
            border: none;
            border-radius: 0;
          }

          .s-container {
            display: block;
          }
        }
      }
    }
  }

  .calendar {
    margin-top: 20px;

    table {
      width: 100%;
      font-size: 16px;
      line-height: 20px;
      user-select: none;

      tr {
        th {
          text-align: center;
          font-weight: 500;
          padding: 0 0 10px 0;
          border: none;
          color: #333;
        }

        td {
          text-align: center;
          cursor: pointer;
          padding: 10px 0;
          border: none;
          color: #333;

          &:not(.current) {
            color: #ccc;
          }

          &:hover {
            background: rgba(245, 245, 245, 1);
            border-radius: 8px;
          }

          &.today {
            color: #fff;
            background: #3a51e0;
            border-radius: 8px;
          }

          &.disabled {
            color: #ccc;
            cursor: unset;
            pointer-events: none;
            background: transparent;
            &:hover {
              background: transparent;
              border-radius: 0;
            }
          }
        }
      }
    }
  }
}

</style>
